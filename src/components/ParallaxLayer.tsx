import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  /** total vertical travel in px as the section scrolls through the viewport */
  offset?: number
  className?: string
}

/**
 * Wraps a decorative/background layer and drifts it vertically (slower or
 * faster than the page scroll) as its section passes through the viewport,
 * giving the ambient stars/decorations a sense of depth. No-op under
 * prefers-reduced-motion.
 */
export default function ParallaxLayer({ children, offset = 40, className = '' }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  )
}
