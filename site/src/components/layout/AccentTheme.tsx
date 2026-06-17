import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { tools } from '../../data/tools'

const DEFAULT_ACCENT = '#00E5FF'

const ROUTE_ACCENT: Record<string, string> = Object.fromEntries(
  tools.map(t => [t.route, t.accent]),
)

/**
 * Drives the global `--tool-accent` CSS variable from the active route, so
 * shared chrome (selection, focus rings, scrollbar) subtly re-themes to the
 * current tool's color. Renders nothing.
 */
export default function AccentTheme() {
  const { pathname } = useLocation()
  useEffect(() => {
    const accent = ROUTE_ACCENT[pathname] ?? DEFAULT_ACCENT
    document.documentElement.style.setProperty('--tool-accent', accent)
  }, [pathname])
  return null
}
