import { useEffect, useRef } from 'react'

const COLORS = ['#F7F3EC', '#D8B46A', '#B8A7D9', '#F2B8C1']
const SHAPES = ['spark-dot', 'spark-star', 'spark-cross', 'spark-dot'] as const
const MIN_DISTANCE = 8
const MAX_DISTANCE = 14
const MAX_PARTICLES = 55

/**
 * A short-lived star-dust trail that follows the mouse on desktop. Particles
 * are plain DOM nodes appended/removed imperatively (no React state churn)
 * so this stays cheap even on fast mouse movement. Disabled on touch
 * devices and under prefers-reduced-motion.
 */
export default function SparkleTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const nextThreshold = useRef(MIN_DISTANCE)
  const queue = useRef<{ el: HTMLSpanElement; timer: number }[]>([])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    const container = containerRef.current
    if (!container) return

    const spawn = (x: number, y: number) => {
      if (queue.current.length >= MAX_PARTICLES) {
        const oldest = queue.current.shift()
        if (oldest) {
          window.clearTimeout(oldest.timer)
          oldest.el.remove()
        }
      }

      const size = 3 + Math.random() * 7
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const duration = 500 + Math.random() * 400
      const dx = (Math.random() - 0.5) * 30
      const dy = -(8 + Math.random() * 26)

      const el = document.createElement('span')
      el.className = `spark-particle ${shape}`
      el.style.left = `${x - size / 2}px`
      el.style.top = `${y - size / 2}px`
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.backgroundColor = color
      el.style.boxShadow = `0 0 ${size}px ${color}`
      el.style.animationDuration = `${duration}ms`
      el.style.setProperty('--dx', `${dx}px`)
      el.style.setProperty('--dy', `${dy}px`)
      el.style.setProperty('--r0', `${Math.random() * 40 - 20}deg`)
      el.style.setProperty('--r1', `${Math.random() * 80 - 40}deg`)
      el.style.setProperty('--r2', `${Math.random() * 140 - 70}deg`)

      container.appendChild(el)
      const timer = window.setTimeout(() => {
        el.remove()
        queue.current = queue.current.filter((p) => p.el !== el)
      }, duration + 40)

      queue.current.push({ el, timer })
    }

    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      if (!lastPoint.current) {
        lastPoint.current = { x, y }
        return
      }
      const dist = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y)
      if (dist < nextThreshold.current) return
      lastPoint.current = { x, y }
      nextThreshold.current = MIN_DISTANCE + Math.random() * (MAX_DISTANCE - MIN_DISTANCE)
      spawn(x, y)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      queue.current.forEach((p) => {
        window.clearTimeout(p.timer)
        p.el.remove()
      })
      queue.current = []
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" />
}
