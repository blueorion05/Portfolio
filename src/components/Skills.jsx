import React from 'react'
import reactLogo from '../assets/react.svg'
import aiCertificate from '../assets/artificial-intelligence-fundamentals.png'
import javascriptCertificate from '../assets/javascript-essentials-2.png'
import pythonCertificate from '../assets/python-essentials-2.png'
import projectManagementCertificate from '../assets/project-management-fundamentals.png'

const fallbackIcons = {
  'C#': { label: 'C#', colors: ['rgba(40,44,52,0.98)', 'rgba(85,122,255,0.95)'] },
  Java: { label: 'J', colors: ['rgba(235,120,39,0.98)', 'rgba(66,39,16,0.95)'] },
  Python: { label: 'Py', colors: ['rgba(64,120,192,0.98)', 'rgba(246,208,63,0.95)'] },
  Lua: { label: 'Lua', colors: ['rgba(75,95,255,0.98)', 'rgba(29,37,98,0.95)'] },
  Firebase: { label: 'F', colors: ['rgba(255,163,69,0.98)', 'rgba(255,107,29,0.95)'] },
  React: { label: 'R', colors: ['rgba(97,218,251,0.98)', 'rgba(12,74,110,0.95)'] },
  Vite: { label: 'V', colors: ['rgba(163,105,255,0.98)', 'rgba(43,28,79,0.95)'] },
  'UI/UX Design': { label: 'UX', colors: ['rgba(255,152,80,0.98)', 'rgba(127,53,14,0.95)'] },
  'System Testing': { label: 'QA', colors: ['rgba(56,189,248,0.98)', 'rgba(17,24,39,0.95)'] },
  Troubleshooting: { label: 'TS', colors: ['rgba(244,114,182,0.98)', 'rgba(76,29,149,0.95)'] },
  'Android Studio': { label: 'A', colors: ['rgba(52,211,153,0.98)', 'rgba(6,78,59,0.95)'] },
  'Roblox Studio': { label: 'RB', colors: ['rgba(255,255,255,0.98)', 'rgba(69,85,105,0.95)'] },
  'Machine Learning': { label: 'ML', colors: ['rgba(245,158,11,0.98)', 'rgba(124,45,18,0.95)'] },
  'Computer Vision': { label: 'CV', colors: ['rgba(96,165,250,0.98)', 'rgba(30,64,175,0.95)'] },
  'Project Management': { label: 'PM', colors: ['rgba(34,197,94,0.98)', 'rgba(20,83,45,0.95)'] },
}

const skillVisuals = {
  'C#': { type: 'fallback' },
  Java: { type: 'fallback' },
  Python: { type: 'image', src: pythonCertificate, alt: 'Python Essentials certificate image' },
  Lua: { type: 'fallback' },
  JavaScript: { type: 'image', src: javascriptCertificate, alt: 'JavaScript Essentials certificate image' },
  'UI/UX Design': { type: 'fallback' },
  'System Testing': { type: 'fallback' },
  Troubleshooting: { type: 'fallback' },
  Firebase: { type: 'fallback' },
  React: { type: 'image', src: reactLogo, alt: 'React logo' },
  Vite: { type: 'fallback' },
  'Android Studio': { type: 'fallback' },
  'Roblox Studio': { type: 'fallback' },
  'Machine Learning': { type: 'image', src: aiCertificate, alt: 'Artificial intelligence fundamentals certificate image' },
  'Computer Vision': { type: 'fallback' },
  'Project Management': { type: 'image', src: projectManagementCertificate, alt: 'Project management fundamentals certificate image' },
}

const splitSkillsIntoRows = (skills) => {
  const midpoint = Math.ceil(skills.length / 2)

  return [skills.slice(0, midpoint), skills.slice(midpoint)]
}

const createSvgFallbackDataUri = (skill) => {
  const fallback = fallbackIcons[skill] ?? {
    label: skill.slice(0, 2).toUpperCase(),
    colors: ['rgba(71,85,105,0.98)', 'rgba(15,23,42,0.95)'],
  }
  const [startColor, endColor] = fallback.colors

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="88" height="88" viewBox="0 0 88 88" fill="none">
      <defs>
        <linearGradient id="bg" x1="10" y1="8" x2="78" y2="80" gradientUnits="userSpaceOnUse">
          <stop stop-color="${startColor}" />
          <stop offset="1" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="84" height="84" rx="24" fill="url(#bg)" />
      <circle cx="27" cy="24" r="8" fill="rgba(255,255,255,0.18)" />
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">${fallback.label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const getSkillVisual = (skill) => {
  const visual = skillVisuals[skill]

  if (visual?.type === 'image') return visual

  return {
    type: 'image',
    src: createSvgFallbackDataUri(skill),
    alt: `${skill} icon`,
  }
}

export default function Skills({ skills = [] }) {
  const [topRow, bottomRow] = splitSkillsIntoRows(skills)

  return (
    <section id="skills" className="w-full border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <div className="mb-8 max-w-3xl">
        <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Skills & Interests</p>
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Technical strengths and personal interests</h2>
        <p className="mt-3 max-w-2xl text-sm text-base-content/70 sm:text-base">
          A moving showcase of the tools and disciplines I use most often, arranged in two continuous directions for a more dynamic presentation.
        </p>
      </div>

      <div className="skills-marquee-wrap space-y-4">
        <div className="skills-marquee">
          <div className="skills-marquee__track">
            {[...topRow, ...topRow].map((skill, index) => {
              const visual = getSkillVisual(skill)

              return (
                <div key={`${skill}-${index}`} className="skills-marquee__item badge badge-lg badge-outline border-base-300/50 bg-base-200/75 px-4 py-3 text-base-content/85 shadow-lg shadow-black/10">
                  <img className="skills-marquee__icon" src={visual.src} alt={visual.alt} loading="lazy" />
                  <span className="whitespace-nowrap text-sm font-medium sm:text-base">{skill}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="skills-marquee skills-marquee--reverse">
          <div className="skills-marquee__track">
            {[...bottomRow, ...bottomRow].map((skill, index) => {
              const visual = getSkillVisual(skill)

              return (
                <div key={`${skill}-${index}`} className="skills-marquee__item badge badge-lg badge-outline border-base-300/50 bg-base-200/75 px-4 py-3 text-base-content/85 shadow-lg shadow-black/10">
                  <img className="skills-marquee__icon" src={visual.src} alt={visual.alt} loading="lazy" />
                  <span className="whitespace-nowrap text-sm font-medium sm:text-base">{skill}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
