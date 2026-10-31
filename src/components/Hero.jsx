import React, { useEffect, useRef, useState } from 'react'
import { motion as Motion } from 'motion/react'
import { FaArrowDown, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import profilePic from '../assets/profilepic.jpg'

export default function Hero({ profile, onHeroVisibilityChange, onNavigateSection }) {
  const shellRef = useRef(null)
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

  const handleSectionClick = (event, href) => {
    if (onNavigateSection) {
      onNavigateSection(event, href)
    }
  }

  return (
    <section id="home" className="hero-section" ref={shellRef} data-hero-active={heroIsActive}>
      <div className="hero-grid">
        <Motion.div key={`hero-copy-${heroAnimationSeed}`} className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .07, delayChildren: .08 } } }}>
          <Motion.p className="eyebrow hero-copy__item" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .28 }}><span className="status-dot" /> Developer profile</Motion.p>
          <Motion.h1 className="hero-title hero-copy__item" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .38, ease: 'easeOut' }}>I build digital worlds with <em>intelligence.</em></Motion.h1>
          <Motion.p className="hero-intro hero-copy__item" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .3 }}>I&apos;m {profile.name}, a Magna Cum Laude Computer Science graduate specializing in Intelligent Systems. I build practical web applications, interfaces, and tools that make complex ideas feel clear.</Motion.p>
          <Motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: .28 }}>
            <a href="/projects" onClick={(event) => handleSectionClick(event, '/projects')} className="button button--accent">Explore experiences <FaArrowUpRightFromSquare aria-hidden="true" /></a>
            <a href="/about" onClick={(event) => handleSectionClick(event, '/about')} className="text-link">View profile <FaArrowDown aria-hidden="true" /></a>
          </Motion.div>
          <Motion.div className="hero-socials" aria-label="Social links" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} transition={{ duration: .3 }}>
            <a href="https://github.com/blueorion05" target="_blank" rel="noreferrer">GitHub <FaArrowUpRightFromSquare aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/gerald-jhudiel-atienza/" target="_blank" rel="noreferrer">LinkedIn <FaArrowUpRightFromSquare aria-hidden="true" /></a>
          </Motion.div>
        </Motion.div>

        <Motion.div key={`hero-portrait-${heroAnimationSeed}`} className="hero-visual hero-portrait" initial={{ opacity: 0, x: 18, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .48, delay: .15, ease: 'easeOut' }}>
          <div className="hero-visual__label">Selected signal <span>01 / 04</span></div>
          <div className="hero-visual__frame">
            <img src={profilePic} alt={`${profile.name} portrait`} />
            <div className="hero-visual__caption"><span>Gerald Jhudiel D. Atienza</span><span>CS / Intelligent Systems</span></div>
          </div>
          <div className="hero-visual__note">Designing at the intersection<br />of systems + people</div>
        </Motion.div>
      </div>
    </section>
  )
}
