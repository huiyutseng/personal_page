import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { RefObject } from 'react'

interface CounterRotatingRingsProps {
  scrollTarget: RefObject<HTMLElement | null>
}

const fixedRotations = [10, -22, 36, -48] as const

export default function CounterRotatingRings({ scrollTarget }: CounterRotatingRingsProps) {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start start', 'end start'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 24,
    mass: 0.35,
  })
  const ring1 = useTransform(progress, [0, 1], [0, 360])
  const ring2 = useTransform(progress, [0, 1], [0, -295])
  const ring3 = useTransform(progress, [0, 1], [0, 425])
  const ring4 = useTransform(progress, [0, 1], [0, -245])
  const rotations = reduceMotion ? fixedRotations : [ring1, ring2, ring3, ring4]

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-[-14%] h-[128%] w-[128%] overflow-visible"
      viewBox="0 0 400 400"
    >
      <defs>
        <filter id="gold-ring-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g
        data-ring="1"
        style={{ rotate: rotations[0], transformOrigin: '200px 200px' }}
      >
        <circle
          cx="200"
          cy="200"
          r="192"
          fill="none"
          stroke="#D8B46A"
          strokeWidth="1.2"
          strokeDasharray="5 9 30 13"
          opacity="0.68"
        />
        <path d="M200 3v12 M397 200h-9" stroke="#F7F3EC" strokeWidth="1.5" />
        <circle
          className="ring-node"
          cx="200"
          cy="8"
          r="4"
          fill="#F7F3EC"
          filter="url(#gold-ring-glow)"
        />
      </motion.g>

      <motion.g
        data-ring="2"
        style={{ rotate: rotations[1], transformOrigin: '200px 200px' }}
      >
        <circle
          cx="200"
          cy="200"
          r="181"
          fill="none"
          stroke="#C89555"
          strokeWidth="1.8"
          strokeDasharray="160 24 62 40 490 318"
          opacity="0.9"
        />
        <path d="M200 14v14 M386 200h-13" stroke="#D8B46A" strokeWidth="2" />
        <circle className="ring-node" cx="72" cy="72" r="3" fill="#D8B46A" />
      </motion.g>

      <motion.g
        data-ring="3"
        style={{ rotate: rotations[2], transformOrigin: '200px 200px' }}
      >
        <circle
          cx="200"
          cy="200"
          r="171"
          fill="none"
          stroke="#D8B46A"
          strokeWidth="1"
          strokeDasharray="2 7 18 5 45 12"
          opacity="0.74"
        />
        <path d="M79 79l9 9 M321 79l-8 8" stroke="#C89555" strokeWidth="1.6" />
        <circle className="ring-node" cx="200" cy="29" r="4.5" fill="#D8B46A" />
        <circle className="ring-node" cx="321" cy="321" r="2.5" fill="#F7F3EC" />
      </motion.g>

      <motion.g
        data-ring="4"
        style={{ rotate: rotations[3], transformOrigin: '200px 200px' }}
      >
        <circle
          cx="200"
          cy="200"
          r="161"
          fill="none"
          stroke="#D8B46A"
          strokeWidth="2"
          strokeDasharray="205 18 370 36 270"
          opacity="0.82"
        />
        <path
          d="M200 34v11 M366 200h-11 M200 366v-8"
          stroke="#F7F3EC"
          strokeWidth="1.5"
        />
        <circle
          className="ring-node"
          cx="86"
          cy="86"
          r="3.5"
          fill="#F7F3EC"
          filter="url(#gold-ring-glow)"
        />
      </motion.g>
    </svg>
  )
}
