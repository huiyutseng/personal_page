import { useEffect, useMemo, useRef } from 'react'

interface FloatingParticlesProps {
  count?: number
  className?: string
  /** scatter dots away from the mouse cursor when it gets close (desktop only) */
  interactive?: boolean
}

interface Dot {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  kind: 'twinkle' | 'drift'
  color: string
}

const COLORS = ['#F7F3EC', '#D8B46A', '#B8A7D9', '#F2B8C1']
const REPEL_RADIUS = 140
const REPEL_STRENGTH = 62
const REPEL_EASE = 0.17

/**
 * Sparse, slow-moving ambient star/light dots for dark navy sections.
 * CSS-driven twinkle/drift (respects prefers-reduced-motion globally via
 * globals.css); optionally also scatters away from a fine-pointer mouse via
 * a separate JS-driven transform on a wrapping span, so it never fights the
 * CSS keyframe's own transform on the inner dot.
 */
export default function FloatingParticles({
  count = 22,
  className = 'absolute inset-0',
  interactive = true,
}: FloatingParticlesProps) {
  const dots = useMemo<Dot[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      kind: i % 3 === 0 ? 'drift' : 'twinkle',
      color: COLORS[i % COLORS.length],
    }))
  }, [count])

  const wrapperRefs = useRef<(HTMLSpanElement | null)[]>([])
  const offsets = useRef<{ x: number; y: number }[]>(dots.map(() => ({ x: 0, y: 0 })))
  const mouse = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    offsets.current = dots.map(() => ({ x: 0, y: 0 }))
    wrapperRefs.current = wrapperRefs.current.slice(0, dots.length)
  }, [dots])

  useEffect(() => {
    if (!interactive) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    const handleLeave = () => {
      mouse.current = null
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)

    let raf = 0
    const tick = () => {
      wrapperRefs.current.forEach((el, i) => {
        if (!el) return
        const offset = offsets.current[i]
        let targetX = 0
        let targetY = 0
        if (mouse.current) {
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = cx - mouse.current.x
          const dy = cy - mouse.current.y
          const dist = Math.hypot(dx, dy)
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
            targetX = (dx / dist) * force
            targetY = (dy / dist) * force
          }
        }
        offset.x += (targetX - offset.x) * REPEL_EASE
        offset.y += (targetY - offset.y) * REPEL_EASE
        el.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [interactive, dots.length])

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          ref={(el) => {
            wrapperRefs.current[i] = el
          }}
          className="absolute"
          style={{ left: `${dot.left}%`, top: `${dot.top}%` }}
        >
          <span
            className="block rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
              animation: `${dot.kind === 'drift' ? 'drift' : 'twinkle'} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
            }}
          />
        </span>
      ))}
    </div>
  )
}
