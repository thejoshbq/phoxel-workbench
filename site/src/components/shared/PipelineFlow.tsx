import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface Stage {
  name: string
  accent: string
  route: string
  role: string
}

const STAGES: Stage[] = [
  { name: 'Hardware', accent: '#C084FC', route: '/hardware', role: 'Build the rig' },
  { name: 'Firmware', accent: '#FF9100', route: '/firmware', role: 'Flash paradigm' },
  { name: 'Reacher', accent: '#39FF14', route: '/reacher', role: 'Run the server' },
  { name: 'Labrynth', accent: '#00E5FF', route: '/labrynth', role: 'Control & log' },
  { name: 'Pynapse', accent: '#38BDF8', route: '/pynapse', role: 'Align & extract' },
  { name: 'Axplorer', accent: '#00D4D8', route: '/axplorer', role: 'Analyze' },
]

// SVG geometry
const SLOT = 120
const NODE_W = 96
const NODE_H = 40
const NODE_Y = 20
const VB_W = STAGES.length * SLOT
const nodeX = (i: number) => i * SLOT + (SLOT - NODE_W) / 2
const nodeCx = (i: number) => i * SLOT + SLOT / 2

/**
 * The platform "demo": a left-to-right data-flow diagram from hardware to
 * analysis. Nodes light up in sequence as the section scrolls into view, and
 * a signal travels each connector. Decorative SVG is aria-hidden; the labelled
 * list below is the real, navigable, screen-reader content.
 */
export default function PipelineFlow() {
  const ref = useRef<HTMLDivElement>(null)
  // Reduced-motion users see everything revealed immediately (lazy init avoids
  // a synchronous setState in the effect).
  const [visible, setVisible] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible])

  return (
    <div ref={ref} className="panel-border p-6 sm:p-8" style={{ backgroundColor: 'var(--color-panel)' }}>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .pipe-dot { display: none; }
          .pipe-node, .pipe-link { transition: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Decorative diagram */}
      <svg
        viewBox={`0 0 ${VB_W} 80`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        <defs>
          {STAGES.slice(0, -1).map((_, i) => (
            <path
              key={i}
              id={`pipe-path-${i}`}
              d={`M${nodeX(i) + NODE_W},${NODE_Y + NODE_H / 2} L${nodeX(i + 1)},${NODE_Y + NODE_H / 2}`}
            />
          ))}
        </defs>

        {/* Connectors */}
        {STAGES.slice(0, -1).map((_, i) => (
          <line
            key={i}
            className="pipe-link"
            x1={nodeX(i) + NODE_W}
            y1={NODE_Y + NODE_H / 2}
            x2={nodeX(i + 1)}
            y2={NODE_Y + NODE_H / 2}
            stroke={STAGES[i + 1].accent}
            strokeOpacity={0.3}
            strokeWidth={1}
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease-out',
              transitionDelay: `${i * 0.12 + 0.06}s`,
            }}
          />
        ))}

        {/* Nodes */}
        {STAGES.map((s, i) => (
          <g
            key={s.name}
            className="pipe-node"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.45s ease-out',
              transitionDelay: `${i * 0.12}s`,
            }}
          >
            <rect
              x={nodeX(i)}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx={3}
              fill="none"
              stroke={s.accent}
              strokeOpacity={0.5}
              strokeWidth={1}
            />
            <text
              x={nodeCx(i)}
              y={NODE_Y + NODE_H / 2 + 3.5}
              textAnchor="middle"
              fill={s.accent}
              fontSize={10}
              fontFamily="monospace"
            >
              {s.name}
            </text>
          </g>
        ))}

        {/* Traveling signal dots */}
        {visible &&
          STAGES.slice(0, -1).map((_, i) => (
            <circle key={i} r={3.5} fill={STAGES[i + 1].accent} className="pipe-dot" opacity={0}>
              <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`}>
                <mpath href={`#pipe-path-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.1;0.85;1"
                dur="2.6s"
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
              />
            </circle>
          ))}
      </svg>

      {/* Accessible, navigable stage list */}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-6">
        {STAGES.map((s, i) => (
          <li key={s.name} className="flex items-center gap-2">
            <Link
              to={s.route}
              className="flex flex-col px-2 py-1 transition-colors duration-150 group"
              aria-label={`${s.name} — ${s.role}`}
            >
              <span
                className="label-caps text-[0.6rem] group-hover:underline"
                style={{ color: s.accent }}
              >
                {s.name}
              </span>
              <span className="text-[0.55rem]" style={{ color: 'var(--color-text-dim)' }}>
                {s.role}
              </span>
            </Link>
            {i < STAGES.length - 1 && (
              <span aria-hidden="true" style={{ color: 'var(--color-text-dim)' }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
