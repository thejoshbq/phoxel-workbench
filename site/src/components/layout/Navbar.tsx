import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// note: menu closes on item click (below) rather than via a route-change effect
import { ChevronDown, Github } from 'lucide-react'
import GlitchText from '../shared/GlitchText'
import { tools } from '../../data/tools'

const GITHUB_URL = 'https://github.com/thejoshbq/phoxel-workbench'

function ToolsMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toolsActive = tools.some(t => t.route === location.pathname) || location.pathname === '/tools'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 label-caps text-[0.65rem] transition-colors duration-150"
        style={{ color: toolsActive ? 'var(--color-accent-labrynth)' : 'var(--color-text-dim)' }}
      >
        Tools
        <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-72 panel-border z-30 py-2"
          style={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
          role="menu"
        >
          {tools.map(t => (
            <NavLink
              key={t.id}
              to={t.route}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-2 transition-colors duration-150 group"
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-panel)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <span
                className="mt-1 inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: t.accent, boxShadow: `0 0 6px ${t.accent}` }}
              />
              <span className="flex flex-col">
                <span className="text-sm font-semibold tracking-[0.04em]" style={{ color: t.accent }}>
                  {t.name}
                </span>
                <span className="text-[0.65rem] leading-snug" style={{ color: 'var(--color-text-dim)' }}>
                  {t.kicker}
                </span>
              </span>
            </NavLink>
          ))}
          <div className="border-t mt-1 pt-1 px-4" style={{ borderColor: 'var(--color-border)' }}>
            <NavLink
              to="/tools"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block py-2 label-caps text-[0.6rem] transition-colors duration-150"
              style={{ color: 'var(--color-accent-labrynth)' }}
            >
              View all tools →
            </NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  return (
    <header
      className="relative z-20 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'rgba(0,0,0,0.85)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <NavLink
          to="/"
          className="label-caps tracking-widest text-[0.65rem] hover:text-accent transition-colors duration-150"
          style={{ color: 'var(--color-text-dim)' }}
        >
          <GlitchText>
            <span style={{ color: 'var(--color-accent-labrynth)' }}>PHOXEL</span>
            {' '}Workbench
          </GlitchText>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            end
            className="label-caps text-[0.65rem] transition-colors duration-150"
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent-labrynth)' : 'var(--color-text-dim)',
            })}
          >
            Home
          </NavLink>

          <ToolsMenu />

          <NavLink
            to="/contact"
            className="label-caps text-[0.65rem] transition-colors duration-150"
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent-labrynth)' : 'var(--color-text-dim)',
            })}
          >
            Contact
          </NavLink>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center transition-colors duration-150"
            style={{ color: 'var(--color-text-dim)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-labrynth)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
          >
            <Github size={14} />
          </a>
        </nav>
      </div>
    </header>
  )
}
