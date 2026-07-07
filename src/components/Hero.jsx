import React, { useEffect, useRef, useState } from 'react'
import profilePic from '../assets/profilepic.jpg'

export default function Hero({ profile, onHeroVisibilityChange, onNavigateSection }) {
  const shellRef = useRef(null)
  const [heroGlow, setHeroGlow] = useState({ x: 50, y: 35 })
  const [heroIsActive, setHeroIsActive] = useState(true)
  const [heroAnimationSeed, setHeroAnimationSeed] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroIsActive(entry.isIntersecting)

        if (entry.isIntersecting) {
          setHeroAnimationSeed((value) => value + 1)
        }

        if (onHeroVisibilityChange) onHeroVisibilityChange(entry.isIntersecting)
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' }
    )

    if (shellRef.current) observer.observe(shellRef.current)
    return () => observer.disconnect()
  }, [onHeroVisibilityChange])

  const handlePointerMove = (event) => {
    const shell = shellRef.current
    if (!shell) return
    const rect = shell.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setHeroGlow({ x, y })
  }

  const heroStyle = {
    backgroundImage:
      `radial-gradient(circle at ${heroGlow.x}% ${heroGlow.y}%, rgba(56, 189, 248, 0.18), transparent 22%), ` +
      'radial-gradient(circle at 20% 18%, rgba(251, 191, 36, 0.14), transparent 26%), ' +
      'radial-gradient(circle at 78% 10%, rgba(168, 85, 247, 0.14), transparent 24%), ' +
      'linear-gradient(135deg, rgba(6, 10, 18, 0.96), rgba(11, 18, 32, 0.94) 52%, rgba(8, 14, 25, 0.98))',
  }

  const handleSectionClick = (event, href) => {
    if (onNavigateSection) {
      onNavigateSection(event, href)
    }
  }

  return (
    <section id="home" className="mx-auto max-w-6xl space-y-10 overflow-hidden border-b border-base-300/20 py-4 lg:py-19">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 px-6 py-8 shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          style={heroStyle}
          ref={shellRef}
          onPointerMove={handlePointerMove}
          data-hero-active={heroIsActive}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-8">
            <div key={`hero-copy-${heroAnimationSeed}`} className="hero-copy max-w-3xl space-y-6 text-center lg:text-left">
              <div className="hero-copy__item flex flex-wrap justify-center gap-3 lg:justify-start">
                <span className="badge badge-outline badge-warning border-white/15 bg-white/5 px-4 py-3 uppercase tracking-[0.35em] text-[0.65rem] text-amber-200">
                  Computer Science Graduate
                </span>
                <span className="badge badge-outline border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sky-100">
                  Intelligent Systems
                </span>
              </div>

              <div className="hero-copy__item space-y-4">
                <p className="text-sm uppercase tracking-[0.4em] text-base-content/45">Portfolio overview</p>
                <h1 className="text-balance text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[5.2rem]">{profile.name}</h1>
                <p className="max-w-2xl text-pretty text-base leading-8 text-slate-200/78 sm:text-lg">
                  I build practical systems across web, mobile, and desktop with a focus on intelligent systems, clear user experiences, and useful real-world outcomes.
                </p>
              </div>

              <div className="hero-actions flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="/projects" onClick={(event) => handleSectionClick(event, '/projects')} className="btn btn-primary rounded-full border-0 bg-sky-500 px-6 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400">
                  View Projects
                </a>
                <a href="/contact" onClick={(event) => handleSectionClick(event, '/contact')} className="btn rounded-full border-white/15 bg-white/5 px-6 text-white hover:border-white/25 hover:bg-white/10">
                  Contact Me
                </a>
              </div>
            </div>

            <div key={`hero-portrait-${heroAnimationSeed}`} className="hero-portrait relative mx-auto w-full max-w-[24rem] lg:max-w-[80%] lg:justify-self-end">
              <div className="absolute inset-x-8 top-8 h-[70%] rounded-full bg-gradient-to-b from-sky-400/20 via-violet-500/10 to-transparent blur-3xl" />
              <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 p-3 shadow-2xl shadow-sky-950/40">
                <div className="relative aspect-[4/5] overflow-hidden rounded-full bg-slate-900">
                  <img src={profilePic} alt={`${profile.name} portrait`} className="h-full w-full object-cover object-[center_80%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_38%,rgba(59,130,246,0.16)_100%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
