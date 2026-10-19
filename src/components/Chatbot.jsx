import { useEffect, useMemo, useRef, useState } from 'react'
import { FaPaperPlane, FaRobot, FaTimes } from 'react-icons/fa'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  // Prefer a server-side proxy in production. A VITE key is only suitable for local experimentation.
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
  const GEMINI_API_MODEL = import.meta.env.VITE_GEMINI_API_MODEL || 'gemini-3.8-flash'
  const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL || `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_API_MODEL}:generateContent`
  const isOpenAICompatible = GEMINI_API_URL.includes('/chat/completions')

  const quickPrompts = useMemo(
    () => [
      `What are ${getProfileFirstName(profile.name)}'s skills?`,
      'Tell me about his projects',
      `How to contact ${getProfileFirstName(profile.name)}?`,
      `What's his work experience?`,
    ],
    [profile.name],
  )

  const portfolioContext = useMemo(() => [
    `Name: ${profile.name}`,
    `Role: ${profile.role}`,
    `Location: ${profile.address}`,
    `Email: ${profile.email}`,
    `Skills: ${skills.join(', ')}`,
    `Projects: ${projects.map(({ title, category, description }) => `${title} (${category}): ${description}`).join('\n')}`,
    `Experience: ${experience.map(({ role, title, place, date }) => `${role} at ${title}, ${place} (${date})`).join('\n')}`,
    `Education: ${education.map(({ degree, school, date }) => `${degree} at ${school} (${date})`).join('\n')}`,
  ].join('\n'), [education, experience, profile, projects, skills])

  const systemPrompt = useMemo(
    () => `You are Jhudiel's portfolio assistant. Answer naturally and concisely in 2-5 sentences using only the portfolio information below. Always finish your last sentence. Never invent facts, metrics, employers, skills, or project features. If information is unavailable, say: "I don't have that information at the moment."\n\n${portfolioContext}`,
    [portfolioContext],
  )

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isOpen])

  const submitMessage = async (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isLoading) return;

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

    const reply = await fetchAIReply(trimmedMessage, messages);

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

  // Try Gemini (or a configured proxy) and fall back to factual local replies on failure.
  const fetchAIReply = async (message, historyMessages) => {
    const hasConfiguredAI = GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_URL

    if (!hasConfiguredAI) return createBotReply(message, profile, skills, projects, experience, education)

    const history = historyMessages
      .slice(-6)
      .filter(({ sender }) => sender === 'user' || sender === 'bot')
      .map(({ sender, text }) => ({ role: sender === 'bot' ? 'assistant' : 'user', content: text }))

    try {
      const requestUrl = GEMINI_API_KEY && !import.meta.env.VITE_GEMINI_API_URL
        ? `${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`
        : GEMINI_API_URL
      const requestBody = isOpenAICompatible
        ? { model: GEMINI_API_MODEL, messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }], temperature: 0.4, max_tokens: 700 }
        : { contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nConversation:\n${history.map(({ role, content }) => `${role}: ${content}`).join('\n')}\nuser: ${message}` }] }], generationConfig: { temperature: 0.4, maxOutputTokens: 700 } }
      const res = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(GEMINI_API_KEY && isOpenAICompatible ? { Authorization: `Bearer ${GEMINI_API_KEY}` } : {}),
          ...(GEMINI_API_KEY && !isOpenAICompatible ? { 'x-goog-api-key': GEMINI_API_KEY } : {}),
        },
        body: JSON.stringify(requestBody),
      })

        if (!res.ok) {
            const error = await res.text();
            console.error(error);
            throw new Error(error);
        }

        const data = await res.json();

        return (
        (isOpenAICompatible
          ? data.choices?.[0]?.message?.content
          : data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('')) ||
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
      {isOpen && (
        <div
            key="chat-overlay"
            className="chatbot-overlay fixed inset-0 z-999"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/35"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot overlay"
          />

          <section
            className="chatbot-panel fixed bottom-24 left-5 z-1000 w-97.5 max-w-[calc(100vw-2rem)] h-160 max-h-[calc(100vh-120px)] flex flex-col overflow-hidden rounded-[30px] border shadow-[0_20px_80px_rgba(0,0,0,.25)]"
            >
            <div className="chatbot-panel__wash absolute inset-0" />

            <div className="chatbot-panel__header relative flex items-center justify-between px-6 py-5 border-b">
              <div className="flex items-center gap-3">
                <div className="chatbot-avatar grid h-11 w-11 place-items-center rounded-full text-white shadow-lg">
                  <span className="font-semibold tracking-tight">GJ</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{getProfileFirstName(profile.name)}'s Bot</p>
                  <p className="chatbot-muted text-xs">Portfolio Assistant</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="chatbot-close btn btn-ghost btn-sm btn-circle"
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
                        ? "chatbot-message--user text-white"
                        : "chatbot-message--bot text-base-content border"
                    }`}
                    >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => (
                            <strong className="font-semibold chatbot-highlight">
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
                    <div className="chatbot-typing rounded-2xl border px-4 py-3">
                        <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full animate-bounce" />
                            <span className="h-2 w-2 rounded-full animate-bounce [animation-delay:.15s]" />
                            <span className="h-2 w-2 rounded-full animate-bounce [animation-delay:.3s]" />
                        </div>
                    </div>
                </div>
            )}

            <div className="chatbot-panel__footer relative mt-auto border-t px-5 py-5">
              {messages.length === 1 && (
                <div className="mb-3 flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                    <button
                        key={prompt}
                        type="button"
                        onClick={() => submitMessage(prompt)}
                        className="chatbot-prompt rounded-full border px-3 py-2 text-xs font-medium transition-all duration-300"
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
                  className="chatbot-input h-12 flex-1 rounded-full border px-5 transition-all "
                />
                <button
                    type="submit"
                    className="chatbot-send flex items-center justify-center h-12 w-12 rounded-full text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    aria-label="Send message"
                >
                    <FaPaperPlane className="text-sm" />
                </button>
              </form>
            </div>
          </section>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="chatbot-launch fixed bottom-6 left-6 z-1001 grid h-15 w-15 place-items-center rounded-full text-white shadow-lg"
        >
        <span className="relative h-6 w-6">
                {isOpen ? (
              <div
                    className="absolute inset-0 grid place-items-center"
                >
                    <FaTimes className="text-2xl" />
              </div>
                ) : (
              <div
                    className="absolute inset-0 grid place-items-center"
                >
                    <FaRobot className="text-2xl" />
              </div>
                )}

            {!isOpen && (
                <span className="chatbot-status absolute -top-4.5 -right-4.5 h-3.5 w-3.5 rounded-full border-2" />
            )}
            </span>
      </button>
    </>
  )
}

export default Chatbot