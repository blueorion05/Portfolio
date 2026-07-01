import { useState } from 'react'

export default function Header({ navigationLinks = [], heroNameVisible, scrollProgress = 0, onNavigateSection }) {
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

  return (
    <header className={`fixed inset-x-0 top-0 z-50 lg:border-b lg:border-base-300/40 lg:bg-base-100/80 lg:backdrop-blur-xl ${!heroNameVisible ? 'border-b border-base-300/40 bg-base-100/80 backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'}`}>
      <div className="relative flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-3 lg:justify-start">
          <a
            href="/home"
            onClick={(event) => handleSectionClick(event, '/home')}
            className={`btn btn-primary btn-sm rounded-full px-5 font-black tracking-wide shadow-lg transition-all duration-500 sm:btn-md ${!heroNameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
            Gerald Jhudiel D. Atienza
          </a>

          <button
            type="button"
            className="btn btn-ghost btn-circle lg:hidden xl:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <nav id="primary-navigation" className={`${menuOpen ? 'flex' : 'hidden'} flex-col gap-2 lg:flex lg:flex-row lg:justify-end`} aria-label="Primary">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleSectionClick(event, link.href)}
              className="btn btn-ghost btn-sm rounded-full px-4 text-base-content/80 hover:bg-base-200/80 hover:text-base-content">
              {link.label}
            </a>
          ))}
        </nav>

        <div className={`absolute inset-x-0 bottom-0 h-1 overflow-hidden ${!heroNameVisible ? 'bg-base-300/20' : 'hidden lg:block'}`}>
          <span
            className="block h-full origin-left rounded-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 transition-transform duration-300"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </div>
    </header>
  )
}
