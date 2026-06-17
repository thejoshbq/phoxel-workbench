import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'
import GlitchText from '../components/shared/GlitchText'
import NeuralCanvas from '../components/shared/NeuralCanvas'
import ToolCard from '../components/shared/ToolCard'
import { tools } from '../data/tools'

const BASE = import.meta.env.BASE_URL
const GITHUB_URL = 'https://github.com/thejoshbq/phoxel-workbench'

export default function LandingPage() {
  const navigate = useNavigate()
  const [corrupted] = useState(() => sessionStorage.getItem('rs-booted') !== '1')

  function handleCorruptEnd() {
    sessionStorage.setItem('rs-booted', '1')
  }

  return (
    <div
      className={`relative z-10 flex flex-col items-center px-4${corrupted ? ' page-corrupt' : ''}`}
      onAnimationEnd={corrupted ? handleCorruptEnd : undefined}
    >
      {/* Hero */}
      <section className="relative w-full max-w-6xl pt-16 sm:pt-24 pb-12 flex flex-col items-center text-center">
        {/* Interactive canvas backdrop */}
        <NeuralCanvas className="absolute inset-0 -z-10" />

        {/* Banner */}
        <img
          src={`${BASE}phoxel-wordmark.svg`}
          alt="Phoxel Workbench"
          className="w-full max-w-2xl mb-10 opacity-90"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0,229,255,0.2))' }}
        />

        <p className="label-caps mb-3" style={{ color: 'var(--color-accent-labrynth)' }}>
          Otis Lab — Phoxel Workbench
        </p>
        <GlitchText
          as="h1"
          className="text-3xl sm:text-5xl font-bold tracking-[0.04em] leading-tight mb-5"
          style={{ color: 'var(--color-text)' }}
        >
          Built for the bench,
          <br />
          <span style={{ color: 'var(--color-accent-labrynth)' }}>not the terminal.</span>
        </GlitchText>
        <p className="text-sm sm:text-base max-w-xl leading-relaxed mb-8" style={{ color: 'var(--color-text-dim)' }}>
          Open-source tools for running and analyzing neuroscience experiments —
          from live behavioral control to interactive data exploration.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 panel-border label-caps text-[0.65rem] transition-colors duration-150"
            style={{ color: 'var(--color-accent-labrynth)', borderColor: 'var(--color-accent-labrynth)' }}
          >
            Explore the Workbench <ArrowRight size={12} />
          </Link>
          <Link
            to="/labrynth"
            className="inline-flex items-center gap-2 px-5 py-2.5 panel-border label-caps text-[0.65rem] transition-colors duration-150"
            style={{ color: 'var(--color-text-dim)', borderColor: 'var(--color-border)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent-labrynth)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            Try Labrynth live
          </Link>
        </div>
      </section>

      {/* Ecosystem grid */}
      <section className="w-full max-w-6xl pb-20">
        <div className="flex items-center justify-between mb-6">
          <p className="label-caps" style={{ color: 'var(--color-text-dim)' }}>
            The Workbench
          </p>
          <Link
            to="/tools"
            className="flex items-center gap-2 label-caps text-[0.6rem] transition-all duration-150 hover:gap-3"
            style={{ color: 'var(--color-accent-labrynth)' }}
          >
            All tools <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Research & Citation */}
      <section className="w-full max-w-2xl pb-24 flex flex-col gap-5">
        <p className="label-caps" style={{ color: 'var(--color-text-dim)' }}>
          Research &amp; Citation
        </p>
        <div
          className="panel-border p-6 flex flex-col gap-3"
          style={{ backgroundColor: 'var(--color-panel)' }}
        >
          <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-accent-labrynth)' }}>
            Using the Phoxel Workbench in your research?
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>
            A platform preprint is in preparation. In the meantime, please cite the relevant tool's
            repository — each includes a <code style={{ color: 'var(--color-accent-labrynth)' }}>CITATION.cff</code> with
            recommended citation metadata. Published experiments built on the Workbench will be
            featured here.
          </p>
          <button
            type="button"
            onClick={() => navigate('/contact')}
            className="self-start label-caps text-[0.6rem] mt-1 transition-colors duration-150"
            style={{ color: 'var(--color-accent-labrynth)' }}
          >
            Tell us about your work →
          </button>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 label-caps text-[0.6rem] transition-colors duration-150"
          style={{ color: 'var(--color-text-dim)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent-labrynth)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
        >
          <Github size={12} /> View the source on GitHub
        </a>
      </section>
    </div>
  )
}
