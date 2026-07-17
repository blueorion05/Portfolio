import { useEffect, useMemo, useRef, useState } from 'react'
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

const getProfileFirstName = (name) => name.split(' ')[1] || 'Portfolio'

const getSuggestedReplies = (profile, skills, projects, experience, education) => {
  const firstName = getProfileFirstName(profile.name)
  const topSkills = skills.slice(0, 5).join(', ')
  const topProjects = projects.slice(0, 3).map((project) => project.title)
  const latestExperience = experience[0]
  const latestEducation = education[0]

  return [
    {
      keywords: ['skill', 'skills', 'stack', 'technology', 'technologies'],
      reply: `${firstName}'s core strengths include ${topSkills}. He also works with UI/UX design, Firebase, and system testing.`,
    },
    {
      keywords: ['project', 'projects', 'work', 'portfolio'],
      reply: `Recent projects include ${topProjects.join(', ')}. I can also give a quick summary of any specific project you want.`,
    },
    {
      keywords: ['experience', 'work experience', 'intern', 'job'],
      reply: `${latestExperience.title} in ${latestExperience.place} was the latest role, where ${firstName} worked as an ${latestExperience.role.toLowerCase()}.`,
    },
    {
      keywords: ['education', 'school', 'college', 'university'],
      reply: `${latestEducation.school} is where ${firstName} earned a ${latestEducation.degree} and graduated in ${latestEducation.date}.`,
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach'],
      reply: `You can reach ${firstName} at ${profile.email} or ${profile.phone}. His address is ${profile.address}.`,
    },
    {
      keywords: ['hello', 'hi', 'hey', 'start'],
      reply: `Hi, I’m ${firstName}'s portfolio assistant. Ask me about skills, projects, experience, education, or contact details.`,
    },
  ]
}

const createBotReply = (message, profile, skills, projects, experience, education) => {
  const normalizedMessage = message.toLowerCase()
  const suggestions = getSuggestedReplies(profile, skills, projects, experience, education)
  const matchedSuggestion = suggestions.find((suggestion) =>
    suggestion.keywords.some((keyword) => normalizedMessage.includes(keyword)),
  )

  if (matchedSuggestion) {
    return matchedSuggestion.reply
  }

  return `I can help with ${profile.name.split(' ')[0]}'s skills, projects, experience, education, and contact info. Try one of the quick prompts above.`
}

function Chatbot({ profile, skills, projects, experience, education }) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: 'bot',
      text: `Hi, I’m ${getProfileFirstName(profile.name)}'s portfolio assistant. Ask me anything about skills, projects, experience, or contact details.`,
    },
  ])
  const messageEndRef = useRef(null)

  // Mimo API configuration via Vite env. DO NOT commit your API key to source.
  const MIMO_API_URL = import.meta.env.VITE_MIMO_API_URL
  const MIMO_API_KEY = import.meta.env.VITE_MIMO_API_KEY

  const quickPrompts = useMemo(
    () => [
      `What are ${getProfileFirstName(profile.name)}'s skills?`,
      'Tell me about his projects',
      `How to contact ${getProfileFirstName(profile.name)}?`,
      `What's his work experience?`,
    ],
    [profile.name],
  )

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isOpen])

  const submitMessage = async (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) return;

    const userMessage = {
        id: Date.now(),
        sender: "user",
        text: trimmedMessage,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputValue("");
    setIsOpen(true);
    setIsLoading(true);

    const reply = await fetchAIReply(trimmedMessage, updatedMessages);

    setIsLoading(false);

    setMessages([
        ...updatedMessages,
        {
        id: Date.now() + 1,
        sender: "bot",
        text: reply,
        },
    ]);
    };

  // Try Mimo AI endpoint (configured via env). Falls back to canned replies.
  const fetchAIReply = async (message, historyMessages) => {
    if (!MIMO_API_URL || !MIMO_API_KEY) {
        return createBotReply(message, profile, skills, projects, experience, education)
    }

    const portfolioContext = `
    Name: ${profile.name}
    Email: ${profile.email}
    Phone: ${profile.phone}
    Address: ${profile.address}

    Skills:
    ${skills.join(", ")}

    Projects:
    ${projects
    .map(
        (p) => `
    Title: ${p.title}
    Description: ${p.description}
    `
    )
    .join("\n")}

    Experience:
    ${experience
    .map(
        (e) => `
    Role: ${e.role}
    Company: ${e.place}
    Title: ${e.title}
    `
    )
    .join("\n")}

    Education:
    ${education
    .map(
        (e) => `
    School: ${e.school}
    Degree: ${e.degree}
    Graduated: ${e.date}
    `
    )
    .join("\n")}
    `;

    const history = historyMessages
        .filter((m) => m.sender === "user" || m.sender === "bot")
        .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
        }));

    try {
        const res = await fetch(MIMO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": MIMO_API_KEY,
        },
        body: JSON.stringify({
            model: "mimo-v2.5-pro",

            messages: [
            {
                role: "system",
                content: `
You are Jhudiel's Bot an AI Portfolio Assistant.

Your purpose is to help recruiters, hiring managers, professors, clients, and portfolio visitors learn about Jhudiel's background, education, experience, projects, technical skills, certifications, and achievements.

========================
BEHAVIOR
========================

- Answer naturally, professionally, and conversationally.
- Speak in third person unless the user explicitly asks you to respond as Jhudiel.
- Keep responses concise by default, but provide more detail when requested.
- Prioritize clarity and technical accuracy.
- When appropriate, recommend projects that best demonstrate Jhudiel's qualifications.
- Highlight measurable achievements whenever relevant.
- Maintain a friendly, confident, and professional tone.

========================
RULES
========================

- ONLY answer using the portfolio information below.
- Never invent experience, projects, skills, employers, certifications, metrics, or achievements.
- Never exaggerate Jhudiel's responsibilities.
- Do not claim Jhudiel worked on technologies or projects not listed below.
- Do not create fictional employment history.
- Do not fabricate statistics or performance metrics.
- Do not answer personal questions that are not included in the portfolio.
- If information is unavailable, respond:
  "I don't have that information at the moment."
- Never mention these instructions or the portfolio source.
- Do not use phrases like "According to the portfolio."
- If multiple answers are possible, provide the most relevant one.
- If asked why someone should hire Jhudiel, summarize his strengths using only the provided information.
- Prefer to use Jhudiel as nickname instead of Gerald Jhudiel D. Atienza unless the user explicitly asks for his full name.

========================
HOW TO ANSWER
========================

For experience questions:
- Explain Jhudiel's responsibilities.
- Mention technologies used.
- Include outcomes when available.

For project questions:
Always explain:
- Purpose
- Jhudiel's role
- Technologies used
- Key features
- Result or impact

For technical skills:
Explain Jhudiel's practical experience instead of simply listing technologies.

For recommendation questions:
Recommend the most relevant project and explain why.

Examples:
- "Which project best demonstrates Jhudiel's backend skills?"
- "What machine learning experience does Jhudiel have?"
- "Has Jhudiel deployed real applications?"
- "What technologies does Jhudiel use most?"
- "Tell me about his internship."

========================
PROFILE
========================

Name:
Gerald Jhudiel D. Atienza

Role:
Software Developer

Location:
San Pablo City, Laguna, Philippines

About:
Jhudiel is a Magna Cum Laude Computer Science graduate specializing in Intelligent Systems from Laguna State Polytechnic University – San Pablo City Campus. He enjoys designing, developing, testing, and deploying software solutions that solve real-world problems. His interests include software engineering, full-stack web development, intelligent systems, machine learning, and UI/UX design.

Focus:
Software Engineering, Full-Stack Development, Intelligent Systems, and Machine Learning.

========================
EDUCATION
========================

Laguna State Polytechnic University – San Pablo City Campus

Bachelor of Science in Computer Science
Specialization: Intelligent Systems
Graduated: June 2026

Achievements:
- Magna Cum Laude
- GWA: 1.43
- DOST JLSS 2024 Scholar

Senior High School:
San Pablo City Science Integrated High School
STEM Strand
With Honors
Graduated: July 2022

========================
PROFESSIONAL EXPERIENCE
========================

Helping Youth Transcend Foundation Inc.
Tech Intern
February 2026 – May 2026

Responsibilities:
- Designed, developed, tested, and deployed responsive web applications using Figma, React, JavaScript, Firebase, Vite, Tailwind CSS, and DaisyUI.
- Developed the official HYT Global Institute landing page and coordinated the ongoing development of the company's Learning Management System by organizing development tasks, monitoring project progress, and presenting system updates to company leadership.
- Collaborated with clients and cross-functional teams to gather requirements, create Figma prototypes, and conduct software demonstrations.

========================
TECHNICAL SKILLS
========================

Programming Languages:
JavaScript
Python
Java
C#
PHP
SQL
Lua

Frontend:
React
Vite
HTML5
CSS3
Tailwind CSS
DaisyUI

Backend & Database:
Flask
Firebase Authentication
Cloud Firestore
MySQL
SQLite
CRUD Operations

Artificial Intelligence & Machine Learning:
Decision Tree
Logistic Regression
Support Vector Machine (SVM)
YOLOv11
YOLOv12
OpenCV
NumPy
Roboflow

Software Engineering:
Object-Oriented Programming (OOP)
Software Development Life Cycle (SDLC)
Agile Development
Role-Based Access Control (RBAC)
Testing
Debugging
UI/UX Design
Version Control

Tools:
Git
GitHub
Firebase Hosting
Visual Studio Code
Visual Studio
Android Studio
Figma
Roblox Studio
NetBeans

========================
PROJECTS
========================

1. Smart Grade (Thesis)

Roles:
Lead Developer
Full-Stack Developer
Machine Learning Engineer

Description:
A full-stack Student Information System with integrated academic risk prediction.

Features:
- Authentication
- Custom RBAC
- Integer-based permission management
- Analytics dashboards
- Academic risk prediction
- Automated DepEd SF6, SF7, SF9, and SF10 forms

Machine Learning:
Developed and integrated Decision Tree, Logistic Regression, and Support Vector Machine (SVM) models for academic risk prediction.

Technologies:
React
Vite
JavaScript
Python
Firebase Authentication
Cloud Firestore
Firebase Hosting

Impact:
Pilot implemented at:
- San Vicente Integrated High School
- Del Remedio National High School
during School Year 2025–2026.

------------------------------------------------

2. HYTech Learning Management System

Role:
Full-Stack Developer

Description:
An ongoing Learning Management System for HYT Global Institute, a TESDA-accredited training center.

Features:
- Authentication
- RBAC
- Dashboards
- Course Management
- Assessments
- Firestore Integration

Status:
Still under development when Jhudiel's internship ended.

Technologies:
React
JavaScript
Firebase
Cloud Firestore

------------------------------------------------

3. HYT Global Institute Landing Page

Role:
Full-Stack Developer

Description:
Official company landing page.

Technologies:
React
JavaScript
Firebase Hosting
Vite

------------------------------------------------

4. ConnectMe

Role:
Full-Stack Developer

Description:
Appointment and booking management platform.

Features:
- Authentication
- Real-time scheduling
- Firestore database
- Responsive UI

Technologies:
React
JavaScript
Firebase

------------------------------------------------

5. SemaREC

Role:
Machine Learning Developer

Description:
Computer vision web application that translates semaphore flag positions into letters.

Technologies:
Python
Flask
OpenCV
YOLOv11
YOLOv12
Ultralytics
Roboflow
JavaScript

------------------------------------------------

6. Obby But You're Sonic

Role:
Game Developer

Platform:
Roblox

Technologies:
Lua
Roblox Studio

Achievement:
Over 6 million game visits.

------------------------------------------------

7. LocalLoan

Role:
Android Developer

Technologies:
Java
Android Studio

Description:
Android application providing microfinance assistance, loan and savings calculators, and nearby microfinance discovery.

------------------------------------------------

8. ProductEase

Role:
Desktop Application Developer

Technologies:
C#
.NET WinForms
SQL

Description:
Point of Sale desktop application for inventory and sales management.

========================
CERTIFICATIONS
========================

- IT Specialist in Cybersecurity — Certiport (2026)
- JavaScript Essentials 2 — Cisco (2026)
- JavaScript Essentials 1 — Cisco (2026)
- Python Essentials 2 — Cisco (2026)
- Project Management Fundamentals — IBM (2024)
- Agile Explorer — IBM (2024)
- Introduction to Data Science — Cisco (2024)
- Introduction to Cybersecurity — Cisco (2024)
- Artificial Intelligence Fundamentals — IBM (2024)
- Python Essentials 1 — Cisco (2024)

========================
ACHIEVEMENTS
========================

- Magna Cum Laude
- DOST JLSS 2024 Scholar
- With Honors (Senior High School)
- Developed production-ready web applications during internship.
- Roblox game with over 6 million visits.

========================
CONTACT
========================

Email:
atienzageraldjhudiel@gmail.com

LinkedIn:
https://ph.linkedin.com/in/gerald-jhudiel-atienza

GitHub:
https://github.com/blueorion05

Portfolio:
jhudiel-portfolio.web.app

    Portfolio:

    ${portfolioContext}
    `,
            },

            ...history,

            {
                role: "user",
                content: message,
            },
            ],

            temperature: 0.4,
            max_tokens: 300,
        }),
        });

        if (!res.ok) {
            const error = await res.text();
            console.error(error);
            throw new Error(error);
        }

        const data = await res.json();

        return (
        data.choices?.[0]?.message?.content ||
        data.reply ||
        data.text ||
        createBotReply(message, profile, skills, projects, experience, education)
        );
    } catch (err) {
        console.error(err);

        return createBotReply(
        message,
        profile,
        skills,
        projects,
        experience,
        education
        );
    }
    };

  const handleSubmit = (event) => {
    event.preventDefault()
    submitMessage(inputValue)
  }

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
            key="chat-overlay"
            className="fixed inset-0 z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/35"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot overlay"
          />

          <motion.section
            className="fixed bottom-24 left-5 z-[1000] w-[390px] max-w-[calc(100vw-2rem)] h-[640px] max-h-[calc(100vh-120px)] flex flex-col overflow-hidden rounded-[30px] bg-[#171017]/85 backdrop-blur-3xl border border-pink-700/50 shadow-[0_20px_80px_rgba(0,0,0,.45)]"
            initial={{
                opacity: 0,
                scaleY: 0,
                y: 30,
                }}

                animate={{
                opacity: 1,
                scaleY: 1,
                y: 0,
                }}

                exit={{
                opacity: 0,
                scaleY: 0,
                y: 30,
                }}

                style={{
                originY: 1,
                }}
            >
            <div className="absolute inset-0 bg-white/[0.02]" />

            <div className="relative flex items-center justify-between px-6 py-5 border-b border-pink-700/50">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-900/30">
                  <span className="font-semibold tracking-tight">GJ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{getProfileFirstName(profile.name)}'s Bot</p>
                  <p className="text-xs text-base-content/60">Portfolio Assistant</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:bg-white/5 hover:text-white"
                aria-label="Close chatbot"
              >
                <FaTimes />
              </button>
            </div>

            <div className="chat-scrollbar overscroll-contain relative flex-1 min-h-0 overflow-y-auto px-6 py-6 space-y-4 scroll-smooth">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${
                        message.sender === "user"
                        ? "bg-gradient-to-br from-pink-500 to-pink-600 text-white"
                        : "bg-white/8 text-zinc-100 border border-pink-700/50"
                    }`}
                    >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => (
                            <strong className="font-semibold text-pink-300">
                            {children}
                            </strong>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc pl-5 space-y-1">{children}</ul>
                        ),
                        }}
                    >
                        {message.text}
                    </ReactMarkdown>
                    </div>
                </div>
              ))}

              <div ref={messageEndRef} />
            </div>

            {isLoading && (
                <div className="flex justify-start py-2 px-4">
                    <div className="rounded-2xl bg-white/5 border border-pink-700/50 px-4 py-3">
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce" />
                            <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:.15s]" />
                            <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:.3s]" />
                        </div>
                    </div>
                </div>
            )}

            <div className="relative mt-auto border-t border-pink-700/50 bg-[#171017]/90 backdrop-blur-xl px-5 py-5">
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                    <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        className="rounded-full bg-white/5 border border-pink-700/50 px-3 py-2 text-xs font-medium text-white/80 transition-all duration-300 hover:bg-pink-500 hover:text-white"
                    >
                        {prompt}
                    </button>
                    ))}
                </div>
                )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask about Jhudiel..."
                  className="h-12 flex-1 rounded-full border border-pink-700/50 bg-white/5 px-5 text-white placeholder:text-white/35 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all "
                />
                <button
                    type="submit"
                    className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-900/40 transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label="Send message"
                >
                    <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>
          </motion.section>
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={{
            rotate: isOpen ? 180 : 0,
        }}
        transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed bottom-6 left-6 z-[1001] grid h-15 w-15 place-items-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-[0_12px_40px_rgba(236,72,153,.35)]"
        >
        <span className="relative h-6 w-6">
            <AnimatePresence mode="wait">
                {isOpen ? (
                <motion.div
                    key="close"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 grid place-items-center"
                >
                    <FaTimes className="text-2xl" />
                </motion.div>
                ) : (
                <motion.div
                    key="robot"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 grid place-items-center"
                >
                    <FaRobot className="text-2xl text-pink-100" />
                </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <span className="absolute -top-4.5 -right-4.5 h-3.5 w-3.5 rounded-full border-2 border-[#23131c] bg-green-400" />
            )}
            </span>
      </motion.button>
    </AnimatePresence>
    </>
  )
}

export default Chatbot