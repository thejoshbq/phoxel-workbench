import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Server,
  Cpu,
  Box,
  Database,
  LineChart,
  ScanEye,
} from 'lucide-react'

/**
 * Single source of truth for the Phoxel Workbench tool catalog.
 * Consumed by the navbar Tools menu, the /tools hub, the landing ecosystem
 * grid, the command palette, and the pipeline diagram. Add a tool here and it
 * appears everywhere — do not hardcode tool lists elsewhere.
 */

export type ToolStatus = 'live' | 'stable' | 'beta' | 'wip'
export type ToolCategory = 'Control' | 'Hardware' | 'Data' | 'Analysis'

export interface Tool {
  /** stable id / key */
  id: string
  /** display name */
  name: string
  /** short uppercase kicker (matches each page's hero label) */
  kicker: string
  /** one-line description */
  tagline: string
  /** accent color as a hex literal (usable in CSS vars, SVG, and canvas) */
  accent: string
  status: ToolStatus
  category: ToolCategory
  /** in-app route */
  route: string
  /** canonical source repo */
  githubUrl: string
  /** optional install / get hint shown on cards */
  install?: string
  Icon: LucideIcon
}

export const STATUS_META: Record<ToolStatus, { label: string; pulse: boolean }> = {
  live: { label: 'Live', pulse: true },
  stable: { label: 'Stable', pulse: false },
  beta: { label: 'Beta', pulse: false },
  wip: { label: 'In progress', pulse: false },
}

export const CATEGORY_ORDER: ToolCategory[] = ['Control', 'Hardware', 'Data', 'Analysis']

export const tools: Tool[] = [
  {
    id: 'labrynth',
    name: 'Labrynth',
    kicker: 'Behavioral control system',
    tagline:
      'Browser-based control for head-fixed operant and classical conditioning — no scripting required.',
    accent: '#00E5FF',
    status: 'live',
    category: 'Control',
    route: '/labrynth',
    githubUrl: 'https://github.com/Otis-Lab-MUSC/labrynth',
    Icon: LayoutDashboard,
  },
  {
    id: 'reacher',
    name: 'Reacher',
    kicker: 'Python backend',
    tagline:
      'The experiment server — control, stream, and log hardware from a single process.',
    accent: '#39FF14',
    status: 'stable',
    category: 'Control',
    route: '/reacher',
    githubUrl: 'https://github.com/Otis-Lab-MUSC/reacher',
    install: 'pip install reacher2p',
    Icon: Server,
  },
  {
    id: 'firmware',
    name: 'Firmware',
    kicker: 'Arduino firmware',
    tagline:
      'Paradigm firmware for Arduino — fixed-ratio, progressive-ratio, variable-interval, omission, and Pavlovian.',
    accent: '#FF9100',
    status: 'stable',
    category: 'Hardware',
    route: '/firmware',
    githubUrl: 'https://github.com/Otis-Lab-MUSC/reacher/tree/main/firmware',
    Icon: Cpu,
  },
  {
    id: 'hardware',
    name: 'Hardware',
    kicker: '3D-printable rig',
    tagline:
      '3D-printable head-fixation rig and operant hardware models, ready to print.',
    accent: '#C084FC',
    status: 'stable',
    category: 'Hardware',
    route: '/hardware',
    githubUrl: 'https://github.com/Otis-Lab-MUSC/reacher-hardware-models',
    Icon: Box,
  },
  {
    id: 'pynapse',
    name: 'Pynapse',
    kicker: 'Neural data engine',
    tagline:
      'Loading, alignment, and peri-event tensor extraction for calcium imaging and behavior.',
    accent: '#38BDF8',
    status: 'stable',
    category: 'Data',
    route: '/pynapse',
    githubUrl: 'https://github.com/thejoshbq/pynapse',
    Icon: Database,
  },
  {
    id: 'axplorer',
    name: 'Axplorer',
    kicker: 'Imaging data explorer',
    tagline:
      'Interactive peri-event analysis and visualization dashboard for aligned neural data.',
    accent: '#00D4D8',
    status: 'beta',
    category: 'Analysis',
    route: '/axplorer',
    githubUrl: 'https://github.com/thejoshbq/axplorer',
    Icon: LineChart,
  },
  {
    id: 'roigbiv',
    name: 'Roigbiv',
    kicker: 'ROI segmentation',
    tagline:
      'Consensus cell-detection and ROI segmentation for two-photon calcium imaging.',
    accent: '#F472B6',
    status: 'wip',
    category: 'Analysis',
    route: '/roigbiv',
    githubUrl: 'https://github.com/thejoshbq/roigbiv',
    Icon: ScanEye,
  },
]

/** Tools grouped by category in canonical order, skipping empty groups. */
export const toolsByCategory: { category: ToolCategory; items: Tool[] }[] =
  CATEGORY_ORDER.map(category => ({
    category,
    items: tools.filter(t => t.category === category),
  })).filter(group => group.items.length > 0)

export const getTool = (id: string): Tool | undefined => tools.find(t => t.id === id)
