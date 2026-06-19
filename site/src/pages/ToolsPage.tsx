import { Link } from 'react-router-dom'
import GlitchText from '../components/shared/GlitchText'
import ToolCard from '../components/shared/ToolCard'
import PipelineFlow from '../components/shared/PipelineFlow'
import { toolsByCategory } from '../data/tools'

/**
 * The experiment, end to end. PipelineFlow above shows the *tools* in sequence;
 * this is the *procedure* a researcher actually runs, ported from the retired
 * docs/ Jekyll site (issue #15).
 */
const WORKFLOW: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Build',
    body: '3D-print the mechanical components — lever assemblies, head-fixation mounts, syringe-pump housings, and enclosure panels — from the hardware models, ready for FDM or resin printing.',
  },
  {
    step: '02',
    title: 'Wire',
    body: 'Connect the Arduino UNO to reward solenoids or syringe pumps, operant levers, lick sensors, and cue lights. The REACHERDevices firmware library provides pin abstractions for each device type.',
  },
  {
    step: '03',
    title: 'Flash',
    body: 'Upload paradigm firmware to the Arduino directly from the Labrynth GUI, which drives avrdude under the hood to flash pre-compiled .hex binaries — no Arduino IDE required.',
  },
  {
    step: '04',
    title: 'Configure',
    body: 'Set session parameters in the browser: animal ID, paradigm (FR, PR, VI, omission, or Pavlovian), schedule values, timeouts, and reward amounts. Config is sent to the Arduino over serial JSON before the session begins.',
  },
  {
    step: '05',
    title: 'Run',
    body: 'Execute the behavioral session with real-time monitoring of lever presses, rewards, licks, and cues over WebSocket streaming — alongside two-photon calcium imaging for simultaneous neural recording.',
  },
  {
    step: '06',
    title: 'Export',
    body: 'Save timestamped behavioral event logs from the completed session. Two-photon TIFF stacks are saved separately by the imaging software.',
  },
  {
    step: '07',
    title: 'Segment',
    body: 'Run Roigbiv to identify regions of interest in the two-photon stacks, using Cellpose models fine-tuned on two-photon data to produce a binary mask for each ROI.',
  },
  {
    step: '08',
    title: 'Analyze',
    body: 'Load behavioral logs and segmented neural traces into Axplorer for peri-event time histogram (PETH) analysis — classifying neurons as excited, inhibited, or non-responsive and exploring population patterns across animals and conditions.',
  },
]

const PREREQS: { req: string; version: string; usedBy: string }[] = [
  { req: 'Python', version: '3.10+', usedBy: 'reacher, pynapse, axplorer, roigbiv' },
  { req: 'Node.js', version: '18+', usedBy: 'labrynth' },
  { req: 'Arduino CLI / avrdude', version: 'latest', usedBy: 'reacher (firmware uploads)' },
  { req: 'CUDA', version: '11.8+ (optional)', usedBy: 'roigbiv (GPU segmentation)' },
  { req: '3D printer', version: 'FDM / resin', usedBy: 'hardware models' },
]

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

      {/* Experimental workflow — the procedure, step by step */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        <p className="label-caps mb-2" style={{ color: 'var(--color-text-dim)' }}>
          The Experiment, Step by Step
        </p>
        <p className="text-sm max-w-2xl leading-relaxed mb-6" style={{ color: 'var(--color-text-dim)' }}>
          An 8-step pipeline from hardware assembly through neural data analysis.
        </p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW.map(s => (
            <li
              key={s.step}
              className="panel-border p-4 flex flex-col gap-2"
              style={{ backgroundColor: 'var(--color-panel)' }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className="label-caps text-[0.7rem]"
                  style={{ color: 'var(--color-accent-labrynth)' }}
                >
                  {s.step}
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {s.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
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

      {/* Getting started — the two entry paths + prerequisites */}
      <section className="w-full max-w-6xl mx-auto mt-4 mb-12">
        <p className="label-caps mb-6" style={{ color: 'var(--color-text-dim)' }}>
          Getting Started
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Path A: run experiments */}
          <div className="panel-border p-6 flex flex-col gap-3" style={{ backgroundColor: 'var(--color-panel)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-accent-labrynth)' }}>
              Running experiments
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
              Download the standalone installer from the{' '}
              <a
                href="https://github.com/Otis-Lab-MUSC/labrynth/releases"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent-labrynth)' }}
              >
                Labrynth releases page
              </a>
              . It bundles the Python backend, React frontend, and firmware binaries into a single
              desktop app — no development environment required.
            </p>
          </div>

          {/* Path B: development */}
          <div className="panel-border p-6 flex flex-col gap-3" style={{ backgroundColor: 'var(--color-panel)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-accent-labrynth)' }}>
              Development
            </p>
            <pre
              className="text-[0.7rem] leading-relaxed overflow-x-auto p-3 rounded"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: 'var(--color-text)' }}
            >
              <code>{`git clone https://github.com/Otis-Lab-MUSC/reacher.git
git clone https://github.com/Otis-Lab-MUSC/labrynth.git

cd reacher && pip install -e .   # backend + firmware hex
cd ../labrynth && npm install && npm run build`}</code>
            </pre>
            <p className="text-[0.7rem] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
              Firmware source ships inside <code style={{ color: 'var(--color-accent-labrynth)' }}>reacher</code> —
              there is no separate firmware repo to clone.
            </p>
          </div>
        </div>

        {/* Prerequisites */}
        <p className="label-caps mt-10 mb-4" style={{ color: 'var(--color-text-dim)' }}>
          Prerequisites
        </p>
        <div className="panel-border overflow-x-auto" style={{ backgroundColor: 'var(--color-panel)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: 'var(--color-text-dim)' }}>
                <th className="text-left font-semibold px-4 py-2">Requirement</th>
                <th className="text-left font-semibold px-4 py-2">Version</th>
                <th className="text-left font-semibold px-4 py-2">Used by</th>
              </tr>
            </thead>
            <tbody>
              {PREREQS.map(p => (
                <tr key={p.req} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text)' }}>{p.req}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-dim)' }}>{p.version}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-dim)' }}>{p.usedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-relaxed mt-6" style={{ color: 'var(--color-text-dim)' }}>
          All Phoxel Workbench repositories are released under the MIT License. Using the Workbench in
          your research, or have a question?{' '}
          <Link to="/contact" style={{ color: 'var(--color-accent-labrynth)' }}>
            Get in touch
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
