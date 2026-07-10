import React from 'react'
import { motion } from 'framer-motion'
import cSharpLogo from '../assets/skills/c-sharp.png'
import javaLogo from '../assets/skills/java.png'
import pythonLogo from '../assets/skills/python.png'
import luaLogo from '../assets/skills/lua.png'
import javascriptLogo from '../assets/skills/javascript.png'
import htmlLogo from '../assets/skills/html.png'
import cssLogo from '../assets/skills/css.png'
import reactLogo from '../assets/skills/react.png'
import viteLogo from '../assets/skills/vite.svg'
import tailwindLogo from '../assets/skills/tailwindcss.png'
import daisyUiLogo from '../assets/skills/daisyui.png'
import firebaseLogo from '../assets/skills/firebase.png'
import mysqlLogo from '../assets/skills/mysql.png'
import sqliteLogo from '../assets/skills/sqlite.png'
import gitLogo from '../assets/skills/git.png'
import githubLogo from '../assets/skills/github.png'
import visualStudioCodeLogo from '../assets/skills/visual-studio-code.png'
import visualStudioLogo from '../assets/skills/visual-studio.png'
import androidStudioLogo from '../assets/skills/android-studio.png'
import robloxStudioLogo from '../assets/skills/roblox-studio.png'

const skillVisuals = {
  'C#': { type: 'image', src: cSharpLogo, alt: 'C sharp logo' },
  Java: { type: 'image', src: javaLogo, alt: 'Java logo' },
  Python: { type: 'image', src: pythonLogo, alt: 'Python logo' },
  Lua: { type: 'image', src: luaLogo, alt: 'Lua logo' },
  JavaScript: { type: 'image', src: javascriptLogo, alt: 'JavaScript logo' },
  HTML: { type: 'image', src: htmlLogo, alt: 'HTML logo' },
  CSS: { type: 'image', src: cssLogo, alt: 'CSS logo' },
  React: { type: 'image', src: reactLogo, alt: 'React logo' },
  Vite: { type: 'image', src: viteLogo, alt: 'Vite logo' },
  'Tailwind CSS': { type: 'image', src: tailwindLogo, alt: 'Tailwind CSS logo' },
  daisyUI: { type: 'image', src: daisyUiLogo, alt: 'daisyUI logo' },
  Firebase: { type: 'image', src: firebaseLogo, alt: 'Firebase logo' },
  MySQL: { type: 'image', src: mysqlLogo, alt: 'MySQL logo' },
  SQLite: { type: 'image', src: sqliteLogo, alt: 'SQLite logo' },
  Git: { type: 'image', src: gitLogo, alt: 'Git logo' },
  GitHub: { type: 'image', src: githubLogo, alt: 'GitHub logo' },
  'Visual Studio Code': { type: 'image', src: visualStudioCodeLogo, alt: 'Visual Studio Code logo' },
  'Visual Studio': { type: 'image', src: visualStudioLogo, alt: 'Visual Studio logo' },
  'Android Studio': { type: 'image', src: androidStudioLogo, alt: 'Android Studio logo' },
  'Roblox Studio': { type: 'image', src: robloxStudioLogo, alt: 'Roblox Studio logo' },
}

const skillFallbacks = {
  'C#': { colors: ['rgba(40,44,52,0.98)', 'rgba(85,122,255,0.95)'] },
  Java: { colors: ['rgba(235,120,39,0.98)', 'rgba(66,39,16,0.95)'] },
  Python: { colors: ['rgba(64,120,192,0.98)', 'rgba(246,208,63,0.95)'] },
  Lua: { colors: ['rgba(75,95,255,0.98)', 'rgba(29,37,98,0.95)'] },
  JavaScript: { colors: ['rgba(240,219,79,0.98)', 'rgba(24,24,24,0.95)'] },
  HTML: { colors: ['rgba(227,76,38,0.98)', 'rgba(96,31,11,0.95)'] },
  CSS: { colors: ['rgba(38,77,228,0.98)', 'rgba(21,43,133,0.95)'] },
  React: { colors: ['rgba(97,218,251,0.98)', 'rgba(12,74,110,0.95)'] },
  Vite: { colors: ['rgba(163,105,255,0.98)', 'rgba(43,28,79,0.95)'] },
  'Tailwind CSS': { colors: ['rgba(56,189,248,0.98)', 'rgba(8,47,73,0.95)'] },
  daisyUI: { colors: ['rgba(251,146,60,0.98)', 'rgba(120,53,15,0.95)'] },
  Firebase: { colors: ['rgba(255,163,69,0.98)', 'rgba(255,107,29,0.95)'] },
  MySQL: { colors: ['rgba(0,114,187,0.98)', 'rgba(20,61,88,0.95)'] },
  SQLite: { colors: ['rgba(0,93,158,0.98)', 'rgba(11,47,82,0.95)'] },
  Git: { colors: ['rgba(240,80,51,0.98)', 'rgba(103,29,10,0.95)'] },
  GitHub: { colors: ['rgba(255,255,255,0.98)', 'rgba(31,41,55,0.95)'] },
  'Visual Studio Code': { colors: ['rgba(0,122,204,0.98)', 'rgba(9,35,61,0.95)'] },
  'Visual Studio': { colors: ['rgba(120,75,220,0.98)', 'rgba(51,26,110,0.95)'] },
  'Android Studio': { colors: ['rgba(52,211,153,0.98)', 'rgba(6,78,59,0.95)'] },
  'Roblox Studio': { colors: ['rgba(255,255,255,0.98)', 'rgba(69,85,105,0.95)'] },
  'UI/UX Design': { colors: ['rgba(255,152,80,0.98)', 'rgba(127,53,14,0.95)'] },
  'System Testing': { colors: ['rgba(56,189,248,0.98)', 'rgba(17,24,39,0.95)'] },
  Troubleshooting: { colors: ['rgba(244,114,182,0.98)', 'rgba(76,29,149,0.95)'] },
  'Machine Learning': { colors: ['rgba(245,158,11,0.98)', 'rgba(124,45,18,0.95)'] },
  'Computer Vision': { colors: ['rgba(96,165,250,0.98)', 'rgba(30,64,175,0.95)'] },
  'Project Management': { colors: ['rgba(34,197,94,0.98)', 'rgba(20,83,45,0.95)'] },
}

const skillGroups = [
  {
    title: 'Programming Languages',
    description: 'Core languages used for software development and scripting.',
    skills: ['C#', 'Java', 'Python', 'Lua', 'JavaScript'],
  },
  {
    title: 'Web & Frontend',
    description: 'Tools and technologies used to build responsive interfaces.',
    skills: ['HTML', 'CSS', 'React', 'Vite', 'Tailwind CSS', 'daisyUI', 'UI/UX Design'],
  },
  {
    title: 'Data & Backend',
    description: 'Services and databases used for app data and persistence.',
    skills: ['Firebase', 'MySQL', 'SQLite'],
  },
  {
    title: 'Tools & Platforms',
    description: 'Development environments and collaboration tools.',
    skills: ['Git', 'GitHub', 'Visual Studio Code', 'Visual Studio', 'Android Studio', 'Roblox Studio'],
  },
  {
    title: 'Practices & Specializations',
    description: 'Supporting skills and technical disciplines applied across projects.',
    skills: ['System Testing', 'Troubleshooting', 'Machine Learning', 'Computer Vision', 'Project Management'],
  },
]

const allGroupedSkills = new Set(skillGroups.flatMap((group) => group.skills))

const createSvgFallbackDataUri = (skill) => {
  const fallback = skillFallbacks[skill] ?? {
    colors: ['rgba(71,85,105,0.98)', 'rgba(15,23,42,0.95)'],
  }
  const [startColor, endColor] = fallback.colors
  const label = skill.trim().charAt(0).toUpperCase() || '?'

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
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">${label}</text>
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

const getVisibleSkillGroups = (skills = []) => {
  const providedSkills = new Set(skills)
  const visibleSkills = new Set([...skillGroups.flatMap((group) => group.skills), ...providedSkills])

  const groups = skillGroups
    .map((group) => ({
      ...group,
      skills: group.skills.filter((skill) => visibleSkills.has(skill)),
    }))
    .filter((group) => group.skills.length > 0)

  const extraSkills = [...visibleSkills].filter((skill) => !allGroupedSkills.has(skill))

  if (extraSkills.length > 0) {
    groups.push({
      title: 'Other Skills',
      description: 'Additional skills that do not currently have dedicated logo assets.',
      skills: extraSkills,
    })
  }

  return groups
}

export default function Skills({ skills = [] }) {
  const visibleSkillGroups = getVisibleSkillGroups(skills)

  return (
    <section id="tech" className="mx-auto max-w-6xl space-y-10 border-b border-base-300/30 px-4 py-20 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 max-w-3xl">
          <p className="badge badge-outline mb-3 uppercase tracking-[0.35em]">Tech Stack</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Technical strengths and personal interests</h2>
          <p className="mt-3 max-w-2xl text-sm text-base-content/70 sm:text-base">
            A list of technologies and tools I've worked with.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-1">
        {visibleSkillGroups.map((group) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <article key={group.title} className="rounded-[2rem] border border-base-300/40 bg-base-200/70 p-5 shadow-xl shadow-black/10 backdrop-blur-sm sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="badge badge-outline mb-2 uppercase tracking-[0.3em]">{group.title}</p>
                  <h3 className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">{group.title}</h3>
                  <p className="mt-2 max-w-xl text-sm text-base-content/70">{group.description}</p>
                </div>
                <span className="rounded-full border border-base-300/50 bg-base-100/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-base-content/70">
                  {group.skills.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => {
                  const visual = getSkillVisual(skill)

                  return (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-3 rounded-full border border-base-300/50 bg-base-100/75 px-4 py-3 text-base-content/90 shadow-lg shadow-black/10"
                    >
                      <img
                        className="h-8 w-8 flex-none rounded-full bg-base-100/80 object-contain p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                        src={visual.src}
                        alt={visual.alt}
                        loading="lazy"
                      />
                      <span className="whitespace-nowrap text-sm font-medium sm:text-base">{skill}</span>
                    </div>
                  )
                })}
              </div>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
