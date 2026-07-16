import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const STRENGTH = 0.35
const MAX_OFFSET = 14

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

type MagneticButtonProps = React.ComponentPropsWithoutRef<typeof motion.a>

/** Anchor that pulls toward the cursor within its own bounds, then springs back. */
export default function MagneticButton({ children, style, onMouseMove, onMouseLeave, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

  return (
    <motion.a
      ref={ref}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={(e) => {
        if (!reduceMotion && ref.current) {
          const rect = ref.current.getBoundingClientRect()
          x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * STRENGTH, -MAX_OFFSET, MAX_OFFSET))
          y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * STRENGTH, -MAX_OFFSET, MAX_OFFSET))
        }
        onMouseMove?.(e)
      }}
      onMouseLeave={(e) => {
        x.set(0)
        y.set(0)
        onMouseLeave?.(e)
      }}
      {...props}
    >
      {children}
    </motion.a>
  )
}
