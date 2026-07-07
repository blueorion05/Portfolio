import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import data from './data'
import { FaArrowUp } from "react-icons/fa";

const validSectionPaths = new Set(['home', ...data.navigationLinks.map((link) => link.href.replace(/^\//, ''))])

const getSectionIdFromPath = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, '')

  if (!normalizedPath || normalizedPath === '/') return 'home'

  return normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroNameVisible, setHeroNameVisible] = useState(true)

  const scrollToSection = (pathname, behavior = 'auto') => {
    const sectionId = getSectionIdFromPath(pathname)
    const targetSection = document.getElementById(sectionId) || document.getElementById('home')

    if (targetSection) {
      targetSection.scrollIntoView({ behavior, block: 'start' })
    }
  }

  const normalizePath = (pathname) => {
    const sectionId = getSectionIdFromPath(pathname)

    return validSectionPaths.has(sectionId) ? `/${sectionId}` : '/home'
  }

  const handleSectionNavigation = (event, pathname) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }

    event.preventDefault()
    const normalizedPath = normalizePath(pathname)
    window.history.pushState({}, '', normalizedPath)
    scrollToSection(normalizedPath, 'smooth')
  }

  const handleBackToTop = () => {
    window.history.pushState({}, '', '/home')
    scrollToSection('/home', 'smooth')
  }

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0)
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })

    const syncInitialLocation = () => {
      window.history.replaceState({}, '', '/home')
      scrollToSection('/home')
    }

    const syncSectionFromLocation = () => {
      const normalizedPath = normalizePath(window.location.pathname)
      scrollToSection(normalizedPath)
    }

    syncInitialLocation()
    window.addEventListener('popstate', syncSectionFromLocation)

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('popstate', syncSectionFromLocation)
    }
  }, [])

  return (
    <main data-theme="night" className="min-h-screen w-full overflow-x-hidden bg-base-100 text-base-content">
      <Header
        navigationLinks={data.navigationLinks}
        heroNameVisible={heroNameVisible}
        scrollProgress={scrollProgress}
        onNavigateSection={handleSectionNavigation}
      />

      <div className="w-full">
        <Hero
          profile={data.profile}
          onHeroVisibilityChange={setHeroNameVisible}
          onNavigateSection={handleSectionNavigation}
        />
        <AboutSection
          profile={data.profile}
          education={data.education}
          experience={data.experience}
          certifications={data.certifications}
        />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} interests={data.interests} />
        <Contact profile={data.profile} />
      </div>

      {scrollProgress > 0.08 && (
        <button
          type="button"
          onClick={handleBackToTop}
          className="btn btn-circle btn-primary fixed bottom-5 right-5 z-50 border-none shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          aria-label="Back to top"
          title="Back to top"
        >
          <FaArrowUp className="text-lg leading-none" />
        </button>
      )}
    </main>
  )
}

export default App
