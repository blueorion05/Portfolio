import React, { useEffect, useRef, useState } from 'react'

const getConciseDescription = (description) => description.split(/(?<=\.)\s+/)[0] || description

const createPlaceholderImage = (title) => {
  const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#172033" />
          <stop offset="55%" stop-color="#24324a" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stop-color="#7c8cff" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#7c8cff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bg)" />
      <rect width="800" height="500" fill="url(#glow)" />
      <circle cx="660" cy="120" r="90" fill="#ffffff" fill-opacity="0.08" />
      <circle cx="150" cy="380" r="130" fill="#ffffff" fill-opacity="0.06" />
      <rect x="64" y="64" width="672" height="372" rx="28" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12" />
      <text x="100" y="214" fill="#f8fafc" font-family="Arial, sans-serif" font-size="44" font-weight="700">Project Preview</text>
      <text x="100" y="276" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="30" font-weight="400">${safeTitle}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default function Projects({ projects = [] }) {
  const sectionRef = useRef(null)
  const [viewCycle, setViewCycle] = useState(0)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return undefined

    let wasVisible = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisible) {
          setViewCycle((cycle) => cycle + 1)
        }

        wasVisible = entry.isIntersecting
      },
      {
        threshold: 0.3,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="mx-auto max-w-6xl space-y-10 border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Projects</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Selected work</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={`${project.title}-${viewCycle}`}
            className="project-card group overflow-hidden rounded-3xl border border-base-300/40 bg-base-200/65 shadow-xl backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-2xl"
            style={{ '--reveal-delay': `${index * 140}ms` }}
          >
            <figure className="relative aspect-[16/10] overflow-hidden border-b border-base-300/30">
              <img
                src={createPlaceholderImage(project.title)}
                alt={`${project.title} placeholder preview`}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </figure>
            <div className="space-y-4 p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl font-bold leading-tight tracking-tight">{project.title}</h3>
                <span className="badge badge-outline badge-secondary whitespace-nowrap">{project.category}</span>
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-base-content/55">{project.stack}</p>
              <p className="text-sm leading-6 text-base-content/75">
                {getConciseDescription(project.description)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
