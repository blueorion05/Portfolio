import { useState } from 'react'

const getSectionIdFromPath = (pathname) => pathname.replace(/^\/+|\/+$/g, '') || 'home'

export default function Header({ navigationLinks = [], heroNameVisible, scrollProgress = 0, activeSection = 'home', onNavigateSection }) {
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
    <header className={`fixed inset-x-0 top-0 z-50 lg:border-b lg:border-base-300/40 lg:bg-base-100/80 lg:backdrop-blur-xl ${!heroNameVisible || menuOpen ? 'border-b border-base-300/40 bg-base-100/80 backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'}`}>
      <div className="relative flex w-full flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10 lg:flex-row lg:items-center lg:justify-center lg:gap-150">
        <div className="flex items-center justify-between gap-3 lg:justify-start">
          <a
            href="/home"
            onClick={(event) => handleSectionClick(event, '/home')}
            className={`btn bg-pink-700 btn-sm rounded-full px-5 font-black tracking-wide shadow-lg transition-all duration-500 sm:btn-md ${!heroNameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
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
            (() => {
              const isActive = getSectionIdFromPath(link.href) === activeSection

              return (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleSectionClick(event, link.href)}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative btn btn-ghost btn-md overflow-hidden px-4 transition-colors duration-300 hover:bg-base-200/80 ${isActive ? 'text-pink-400' : 'text-base-content/75 hover:text-pink-300'}`}>
              <span className="relative z-10">{link.label}</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-4 bottom-2 h-0.5 origin-left rounded-full bg-pink-700 transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
              />
            </a>
              )
            })()
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
