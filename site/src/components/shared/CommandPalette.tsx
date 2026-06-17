import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CornerDownLeft, Github } from 'lucide-react'
import { tools } from '../../data/tools'

const GITHUB_URL = 'https://github.com/thejoshbq/phoxel-workbench'

interface Command {
  id: string
  label: string
  hint: string
  accent: string
  kind: 'route' | 'external'
  target: string
}

const STATIC_BEFORE: Command[] = [
  { id: 'home', label: 'Home', hint: 'Landing page', accent: '#C8E8E8', kind: 'route', target: '/' },
  { id: 'tools', label: 'All Tools', hint: 'The workbench hub', accent: '#00E5FF', kind: 'route', target: '/tools' },
]

const STATIC_AFTER: Command[] = [
  { id: 'contact', label: 'Contact', hint: 'Get in touch', accent: '#C8E8E8', kind: 'route', target: '/contact' },
  { id: 'github', label: 'GitHub', hint: 'Source on GitHub', accent: '#C8E8E8', kind: 'external', target: GITHUB_URL },
]

const ALL_COMMANDS: Command[] = [
  ...STATIC_BEFORE,
  ...tools.map<Command>(t => ({
    id: t.id,
    label: t.name,
    hint: t.kicker,
    accent: t.accent,
    kind: 'route',
    target: t.route,
  })),
  ...STATIC_AFTER,
]

/**
 * Global command palette. Open with ⌘K / Ctrl-K (or click nothing — it is
 * keyboard-first). Fuzzy-ish filter over every tool and top-level route;
 * arrow keys to move, Enter to go, Escape to close. Modal dialog with focus
 * trapped to the input.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_COMMANDS
    return ALL_COMMANDS.filter(c => `${c.label} ${c.hint}`.toLowerCase().includes(q))
  }, [query])

  // Derived clamp — keeps the highlight in range as results shrink without an effect.
  const activeIndex = Math.min(active, Math.max(0, results.length - 1))

  // Global open shortcut.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Reset + focus on open. State updates run inside rAF (after paint), not
  // synchronously in the effect body.
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => {
      setQuery('')
      setActive(0)
      inputRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [open])

  function run(cmd: Command | undefined) {
    if (!cmd) return
    setOpen(false)
    if (cmd.kind === 'external') {
      window.open(cmd.target, '_blank', 'noopener,noreferrer')
    } else {
      navigate(cmd.target)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((activeIndex + 1) % Math.max(1, results.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((activeIndex - 1 + results.length) % Math.max(1, results.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[activeIndex])
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onMouseDown={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg panel-border overflow-hidden"
        style={{ backgroundColor: 'rgba(0,0,0,0.97)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-dim)' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a tool or page…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--color-text)' }}
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="label-caps text-[0.55rem] px-1.5 py-0.5 panel-border" style={{ color: 'var(--color-text-dim)' }}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-xs" style={{ color: 'var(--color-text-dim)' }}>
              No matches
            </li>
          )}
          {results.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => run(c)}
                onMouseEnter={() => setActive(i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                style={{ backgroundColor: i === activeIndex ? 'var(--color-panel)' : 'transparent' }}
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: c.accent, boxShadow: i === activeIndex ? `0 0 6px ${c.accent}` : 'none' }}
                  />
                  <span className="flex flex-col min-w-0">
                    <span className="text-sm truncate" style={{ color: 'var(--color-text)' }}>
                      {c.label}
                    </span>
                    <span className="text-[0.65rem] truncate" style={{ color: 'var(--color-text-dim)' }}>
                      {c.hint}
                    </span>
                  </span>
                </span>
                {c.kind === 'external' ? (
                  <Github size={13} style={{ color: 'var(--color-text-dim)' }} />
                ) : (
                  i === activeIndex && <CornerDownLeft size={13} style={{ color: c.accent }} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
