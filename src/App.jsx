import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import data from './data'

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
        <Education education={data.education} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} interests={data.interests} />
        <Certifications certifications={data.certifications} />
        <Contact profile={data.profile} />
      </div>
    </main>
  )
}

export default App
