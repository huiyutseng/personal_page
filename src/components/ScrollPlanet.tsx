import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ScrollPlanetProps {
  className?: string
  /** Percent stops of the section width the planet travels through. */
  xRange?: [number, number] | [number, number, number]
  /** Percent stops of the section height the planet travels through. */
  yRange?: [number, number] | [number, number, number]
  size?: number
  tone?: 'gold' | 'lavender'
  /**
   * [start, mid, end] scale multipliers applied on top of `size` — the
   * default arcs small → large → small, like the planet drifting closer
   * then further away as it travels.
   */
  scaleRange?: [number, number, number]
}

const GRADIENTS = {
  gold: 'radial-gradient(circle at 35% 30%, #F2E4C4, #D8B46A 55%, #8a6a34 100%)',
  lavender: 'radial-gradient(circle at 35% 30%, #E9DEF7, #B8A7D9 55%, #5f4f86 100%)',
}

/**
 * A small glowing "planet" that travels across its section as the page
 * scrolls past it — a bigger, single-point scroll-linked move to complement
 * the ambient star drift, with a scale arc for a sense of near/far depth.
 * No-op (fixed at its midpoint) under prefers-reduced-motion.
 */
export default function ScrollPlanet({
  className = '',
  xRange = [8, 82],
  yRange = [75, 12],
  size = 64,
  tone = 'lavender',
  scaleRange = [0.55, 1.4, 0.6],
}: ScrollPlanetProps) {
  // tracked separately from the moving dot itself — using the animated
  // element as its own scroll target would feed back on itself (as its
  // position changes, so does the "progress" measured from its rect)
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xInput = xRange.length === 3 ? [0, 0.55, 1] : [0, 1]
  const yInput = yRange.length === 3 ? [0, 0.55, 1] : [0, 1]
  const left = useTransform(
    scrollYProgress,
    xInput,
    xRange.map((value) => `${value}%`),
  )
  const top = useTransform(
    scrollYProgress,
    yInput,
    yRange.map((value) => `${value}%`),
  )
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange)

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={
          reduceMotion
            ? {
                left: `${xRange.length === 3 ? xRange[1] : (xRange[0] + xRange[1]) / 2}%`,
                top: `${yRange.length === 3 ? yRange[1] : (yRange[0] + yRange[1]) / 2}%`,
                width: size,
                height: size,
                background: GRADIENTS[tone],
                boxShadow: '0 0 30px -4px rgba(184,167,217,0.5)',
              }
            : {
                left,
                top,
                width: size,
                height: size,
                background: GRADIENTS[tone],
                rotate,
                scale,
                boxShadow: '0 0 30px -4px rgba(184,167,217,0.5)',
              }
        }
      />
    </div>
  )
}
