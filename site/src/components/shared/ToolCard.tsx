import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'
import type { Tool } from '../../data/tools'
import { STATUS_META } from '../../data/tools'

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const navigate = useNavigate()
  const status = STATUS_META[tool.status]
  const { Icon } = tool

  return (
    <div
      className="panel-border p-6 flex flex-col gap-4 transition-all duration-200 group cursor-pointer h-full"
      style={{ backgroundColor: 'var(--color-panel)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = tool.accent)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
      onClick={() => navigate(tool.route)}
      role="link"
      aria-label={`Explore ${tool.name}`}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          navigate(tool.route)
        }
      }}
    >
      {/* Header: icon + status */}
      <div className="flex items-center justify-between">
        <div style={{ color: tool.accent }}>
          <Icon size={20} />
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-block w-2 h-2 rounded-full${status.pulse ? ' status-pulse' : ''}`}
            style={{ backgroundColor: tool.accent, color: tool.accent }}
          />
          <span className="label-caps text-[0.55rem]" style={{ color: 'var(--color-text-dim)' }}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Kicker + name */}
      <div className="flex flex-col gap-1">
        <span className="label-caps text-[0.6rem]" style={{ color: 'var(--color-text-dim)' }}>
          {tool.kicker}
        </span>
        <h3
          className="text-xl font-bold tracking-[0.04em] glitch-text"
          style={{ color: tool.accent, textShadow: `0 0 8px ${tool.accent}40` }}
        >
          {tool.name}
        </h3>
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text)' }}>
        {tool.tagline}
      </p>

      {tool.install && (
        <code
          className="text-[0.7rem] px-2 py-1 panel-border block overflow-x-auto"
          style={{ color: 'var(--color-text-dim)', backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          {tool.install}
        </code>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <Link
          to={tool.route}
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-2 label-caps text-[0.6rem] transition-all duration-150 group-hover:gap-3"
          style={{ color: tool.accent }}
        >
          Explore <ArrowRight size={12} />
        </Link>
        <a
          href={tool.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          aria-label={`${tool.name} on GitHub`}
          className="transition-colors duration-150"
          style={{ color: 'var(--color-text-dim)' }}
          onMouseEnter={e => (e.currentTarget.style.color = tool.accent)}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
        >
          <Github size={14} />
        </a>
      </div>
    </div>
  )
}
