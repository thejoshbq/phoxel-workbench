import { useEffect, useRef } from 'react'

interface NeuralCanvasProps {
  className?: string
  /** node color; defaults to the labrynth accent */
  color?: string
}

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const ACCENT = '#00E5FF'
const NODE_COUNT = 46
const LINK_DIST = 130
const POINTER_DIST = 170

/**
 * Decorative neural-grid backdrop: drifting nodes with synaptic links that
 * react to the pointer. Pure canvas + requestAnimationFrame, no dependencies.
 * Honors prefers-reduced-motion by painting a single static frame.
 * Pointer-events are disabled so it never interferes with UI beneath it.
 */
export default function NeuralCanvas({ className = '', color = ACCENT }: NeuralCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    // Non-null locals so TS keeps the narrowing inside the closures below.
    const cv = canvas
    const ctx = context

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    const pointer = { x: -9999, y: -9999 }
    let raf = 0

    function rand(seed: number) {
      // deterministic-ish spread without Math.random (also unavailable in some envs)
      return ((Math.sin(seed * 12.9898) * 43758.5453) % 1 + 1) % 1
    }

    function seedNodes() {
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: rand(i + 1) * width,
        y: rand(i + 101) * height,
        vx: (rand(i + 201) - 0.5) * 0.25,
        vy: (rand(i + 301) - 0.5) * 0.25,
      }))
    }

    function resize() {
      const parent = cv.parentElement
      width = parent ? parent.offsetWidth : cv.offsetWidth
      height = parent ? parent.offsetHeight : cv.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, Math.floor(width * dpr))
      cv.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (nodes.length === 0) seedNodes()
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.18
            ctx.strokeStyle = color
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      // nodes + pointer glow
      ctx.globalAlpha = 1
      for (const n of nodes) {
        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y)
        const near = pd < POINTER_DIST
        ctx.fillStyle = color
        ctx.globalAlpha = near ? 0.9 : 0.4
        const r = near ? 2.4 : 1.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fill()
        if (near) {
          ctx.globalAlpha = (1 - pd / POINTER_DIST) * 0.25
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    function onPointer(e: PointerEvent) {
      const rect = cv.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    function onLeave() {
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    const ro = new ResizeObserver(resize)
    if (cv.parentElement) ro.observe(cv.parentElement)

    if (reduced) {
      draw() // single static frame
    } else {
      window.addEventListener('pointermove', onPointer)
      window.addEventListener('pointerleave', onLeave)
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
    />
  )
}
