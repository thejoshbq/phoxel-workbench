import { Github, AlignCenter, BarChart2, Download } from 'lucide-react'
import FeatureCard from '../components/shared/FeatureCard'
import GlitchText from '../components/shared/GlitchText'

const ACCENT = 'var(--color-accent-axplorer)'
// Hex literal for SVG presentation attributes (CSS vars don't resolve there).
const VIZ = '#00D4D8'

const steps = [
  {
    title: 'Load a session',
    body: 'Import .tif imaging stacks alongside Labrynth behavioral logs — timestamps line up automatically.',
  },
  {
    title: 'Align to an event',
    body: 'Pick a cue, lick, or reward and Axplorer re-centers every cell’s trace on that moment.',
  },
  {
    title: 'Explore & export',
    body: 'Read population PETHs, response metrics, and per-cell rasters, then export figures and data.',
  },
]

const features = [
  {
    icon: <AlignCenter size={18} />,
    title: 'Load and Align',
    description:
      'Import imaging sessions and automatically align neural activity to behavioral events. Flexible epoch definitions work across paradigms.',
  },
  {
    icon: <BarChart2 size={18} />,
    title: 'PETH at a Glance',
    description:
      'Peri-event time histograms in seconds. Select cells, choose an event, and visualize population-level responses instantly.',
  },
  {
    icon: <Download size={18} />,
    title: 'Export Anywhere',
    description:
      'Save figures as SVG or PNG and processed data in standard formats. Drop straight into your manuscript or analysis pipeline.',
  },
]

const questions = [
  {
    q: 'What problem does Axplorer solve?',
    a: 'Processing two-photon calcium imaging data typically involves chaining together multiple Python packages, writing custom alignment code, and re-running scripts every time you tweak a parameter. Axplorer collapses that pipeline into a single interactive interface so you can explore your data before you commit to an analysis approach.',
  },
  {
    q: 'Who is it for?',
    a: 'Any lab using two-photon imaging alongside behavioral paradigms — especially groups already using Labrynth. Axplorer is designed so that the same person who ran the experiment can explore the results without needing a data-science background.',
  },
  {
    q: 'What makes it different?',
    a: 'Axplorer is built for speed of exploration, not pipeline automation. The goal is to get from raw .tif stacks to interpretable plots in a single session. It integrates natively with Labrynth session files so behavioral timestamps are already correctly formatted.',
  },
]

export default function AxplorerPage() {
  return (
    <div className="relative z-10 flex flex-col px-4 pb-24">
      {/* Hero */}
      <section className="w-full max-w-6xl mx-auto pt-16 sm:pt-24 pb-12">
        <p className="label-caps mb-3" style={{ color: ACCENT }}>
          Imaging data explorer
        </p>
        <GlitchText
          as="h1"
          className="text-4xl sm:text-5xl font-bold tracking-[0.04em] leading-tight mb-4 glow-axplorer"
          style={{ color: ACCENT }}
        >
          Axplorer
        </GlitchText>
        <p className="text-base sm:text-lg max-w-xl leading-relaxed mb-5" style={{ color: 'var(--color-text)' }}>
          Explore two-photon imaging data interactively.
        </p>
        <div className="flex items-center gap-2 mb-8">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: VIZ, boxShadow: `0 0 6px ${VIZ}` }} />
          <span className="label-caps text-[0.6rem]" style={{ color: 'var(--color-text-dim)' }}>
            Beta — in active development
          </span>
        </div>
        <a
          href="https://github.com/thejoshbq/axplorer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 panel-border label-caps text-[0.65rem] transition-colors duration-150"
          style={{ color: ACCENT, borderColor: 'var(--color-border)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = VIZ)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <Github size={12} /> View on GitHub
        </a>
      </section>

      {/* 3 questions */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <p className="label-caps mb-6" style={{ color: 'var(--color-text-dim)' }}>
          Overview
        </p>
        <div className="flex flex-col gap-6">
          {questions.map(({ q, a }) => (
            <div key={q} className="panel-border p-6" style={{ backgroundColor: 'var(--color-panel)' }}>
              <h3 className="text-sm font-semibold mb-2 tracking-[0.04em] glitch-text" style={{ color: ACCENT }}>
                {q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <p className="label-caps mb-6" style={{ color: 'var(--color-text-dim)' }}>
          Features
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map(f => (
            <FeatureCard key={f.title} {...f} accent={ACCENT} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-6xl mx-auto">
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .peth-sweep { display: none; }
          }
        `}</style>
        <p className="label-caps mb-4" style={{ color: 'var(--color-text-dim)' }}>
          How it works
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {steps.map((s, i) => (
            <div key={s.title} className="panel-border p-5 flex flex-col gap-2" style={{ backgroundColor: 'var(--color-panel)' }}>
              <span className="label-caps text-[0.6rem]" style={{ color: VIZ }}>
                Step {i + 1}
              </span>
              <h3 className="text-sm font-semibold tracking-[0.04em]" style={{ color: 'var(--color-text)' }}>
                {s.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Animated PETH explainer */}
        <div className="panel-border p-6 sm:p-8" style={{ backgroundColor: 'var(--color-panel)' }} aria-hidden="true">
          <svg viewBox="0 0 600 170" xmlns="http://www.w3.org/2000/svg" className="w-full">
            {/* axes */}
            <line x1="60" y1="140" x2="560" y2="140" stroke={VIZ} strokeOpacity={0.3} strokeWidth={1} />
            <line x1="60" y1="20" x2="60" y2="140" stroke={VIZ} strokeOpacity={0.3} strokeWidth={1} />
            {/* event marker */}
            <line x1="300" y1="20" x2="300" y2="140" stroke={VIZ} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 4" />
            <text x="300" y="158" textAnchor="middle" fill={VIZ} fontSize={9} fontFamily="monospace">event (t=0)</text>
            {/* response traces */}
            <path d="M60,118 L300,118 C330,70 360,58 392,86 C430,118 500,114 560,116" fill="none" stroke={VIZ} strokeOpacity={0.9} strokeWidth={1.5} />
            <path d="M60,124 L300,124 C332,96 366,92 396,108 C440,126 500,122 560,124" fill="none" stroke={VIZ} strokeOpacity={0.55} strokeWidth={1.5} />
            <path d="M60,112 L300,112 C326,52 362,40 394,78 C432,116 500,110 560,113" fill="none" stroke={VIZ} strokeOpacity={0.3} strokeWidth={1.5} />
            {/* sweeping playhead */}
            <line className="peth-sweep" y1="20" y2="140" stroke={VIZ} strokeOpacity={0.7} strokeWidth={1}>
              <animate attributeName="x1" values="60;560;60" keyTimes="0;0.5;1" dur="5s" repeatCount="indefinite" />
              <animate attributeName="x2" values="60;560;60" keyTimes="0;0.5;1" dur="5s" repeatCount="indefinite" />
            </line>
          </svg>
          <p className="text-[0.65rem] text-center mt-2" style={{ color: 'var(--color-text-dim)' }}>
            Peri-event time histogram — population responses aligned to a behavioral event.
          </p>
        </div>

        <p className="text-xs leading-relaxed mt-4" style={{ color: 'var(--color-text-dim)' }}>
          Axplorer is in <span style={{ color: VIZ }}>beta</span> — the dashboard ships with the package today;
          a hosted interactive demo is on the roadmap.
        </p>
        <a
          href="https://github.com/thejoshbq/axplorer"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 panel-border label-caps text-[0.65rem] transition-colors duration-150"
          style={{ color: ACCENT, borderColor: 'var(--color-border)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = VIZ)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <Github size={12} /> View on GitHub
        </a>
      </section>
    </div>
  )
}
