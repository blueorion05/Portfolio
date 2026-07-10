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
    You are Jhudiel's Portfolio Assistant.

    Rules:

    - ONLY answer using the portfolio information below.
    - No need to say based on the portfolio, just answer directly.
    - Do not invent projects, skills or experience.
    - Be professional and concise.
    - If the answer is not in the portfolio, politely say you don't know.

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