import GlitchText from '../components/shared/GlitchText'
import ToolCard from '../components/shared/ToolCard'
import PipelineFlow from '../components/shared/PipelineFlow'
import { toolsByCategory } from '../data/tools'

export default function ToolsPage() {
  return (
    <div className="relative z-10 flex flex-col px-4 pb-24">
      {/* Hero */}
      <section className="w-full max-w-6xl mx-auto pt-16 sm:pt-24 pb-10">
        <p className="label-caps mb-3" style={{ color: 'var(--color-accent-labrynth)' }}>
          The Phoxel Workbench
        </p>
        <GlitchText
          as="h1"
          className="text-4xl sm:text-5xl font-bold tracking-[0.04em] leading-tight mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          Every tool,{' '}
          <span style={{ color: 'var(--color-accent-labrynth)' }}>one workbench.</span>
        </GlitchText>
        <p className="text-sm sm:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
          An integrated, open-source stack for head-fixed mouse neuroscience — from 3D-printed
          hardware and Arduino firmware through live behavioral control to calcium-imaging analysis.
          Each tool stands alone; together they form one pipeline.
        </p>
      </section>

      {/* Pipeline visualization */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <p className="label-caps mb-6" style={{ color: 'var(--color-text-dim)' }}>
          The Pipeline
        </p>
        <PipelineFlow />
      </section>

      {/* Tool grid, grouped by category */}
      {toolsByCategory.map(({ category, items }) => (
        <section key={category} className="w-full max-w-6xl mx-auto mb-12">
          <p className="label-caps mb-6" style={{ color: 'var(--color-text-dim)' }}>
            {category}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
