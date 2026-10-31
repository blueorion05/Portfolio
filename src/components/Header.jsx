import { useState } from 'react'
import { motion as Motion } from 'motion/react'

const getSectionIdFromPath = (pathname) => pathname.replace(/^\/+|\/+$/g, '') || 'home'

export default function Header({ navigationLinks = [], heroNameVisible, activeSection = 'home', onNavigateSection, theme = 'light', onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const handleSectionClick = (event, href) => {
    handleLinkClick()

    if (onNavigateSection) {
      onNavigateSection(event, href)
    }
  }

  const themeLabel = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'

  const themeToggle = (
    <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={themeLabel} title={themeLabel}>
      {theme === 'light' ? (
        <svg viewBox="0 0 24 24" className="theme-toggle__icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="theme-toggle__icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.5 8.5 0 1 0 20.5 14.3Z" />
        </svg>
      )}
    </button>
  )

  return (
    <header className={`site-header ${!heroNameVisible || menuOpen ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <div className="site-header__brand">
          <a
            href="/home"
            onClick={(event) => handleSectionClick(event, "/home")}
            className="wordmark"
          >
            <span className="wordmark__mark">GJ</span><span className="wordmark__letters">DA<span>.</span></span>
          </a>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>

        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'primary-nav--open' : ''}`} aria-label="Primary">
          {navigationLinks.map((link) => (
            (() => {
              const isActive = getSectionIdFromPath(link.href) === activeSection

              return (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleSectionClick(event, link.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`nav-link ${
                  isActive
                    ? 'nav-link--active'
                    : ''
                }`}>
              <span className="relative z-10">{link.label}</span>
              {isActive && <Motion.span className="nav-link__indicator" layoutId="active-nav-indicator" transition={{ type: 'spring', stiffness: 520, damping: 34 }} aria-hidden="true" />}
            </a>
              )
            })()
          ))}
          <span className="nav-divider" aria-hidden="true" />
          {themeToggle}
        </nav>

      </div>
    </header>
  )
}
