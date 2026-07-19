import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ScrollFlowerProps {
  children: ReactNode
  className?: string
  /** total rotation in degrees across the section's scroll range */
  rotate?: number
  /** scale at the start/end of the scroll range */
  scaleRange?: [number, number]
  /**
   * Where the flower grows from. Match this to whichever edge the flower is
   * anchored to (e.g. a flower pinned to `bottom-0` should grow from
   * "bottom") so scaling it up pushes further into the section instead of
   * past the edge, where the parent's overflow-hidden would clip it.
   */
  origin?: 'center' | 'top' | 'bottom' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
}

/**
 * Wraps a decorative flower/ornament and grows + spins it as its section
 * scrolls through the viewport. No-op under prefers-reduced-motion.
 */
export default function ScrollFlower({
  children,
  className = '',
  rotate = 55,
  scaleRange = [0.82, 1.18],
  origin = 'center',
}: ScrollFlowerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateValue = useTransform(scrollYProgress, [0, 1], [-rotate / 2, rotate / 2])
  const scaleValue = useTransform(scrollYProgress, [0, 1], scaleRange)

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { rotate: rotateValue, scale: scaleValue, transformOrigin: origin }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
