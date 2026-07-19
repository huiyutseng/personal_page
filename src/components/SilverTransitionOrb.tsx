import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function SilverTransitionOrb() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const x = useTransform(scrollYProgress, (progress) => {
    const arc = Math.sin(progress * Math.PI)
    return `${-38 + arc * 58}vw`
  })
  const y = useTransform(scrollYProgress, (progress) => `${-30 + progress * 74}vh`)

  return (
    <div ref={ref} className="pointer-events-none relative z-[6] h-0" aria-hidden="true">
      <motion.div
        className="fixed left-[22%] top-1/2 z-[6] h-14 w-14 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff,#d7dce6_42%,#8791a4_76%,#4d5564)] opacity-95 shadow-[0_0_38px_8px_rgba(215,220,230,0.36)] ring-1 ring-white/40 sm:h-16 sm:w-16"
        style={
          reduceMotion
            ? { x: '0vw', y: '-24vh' }
            : {
                x,
                y,
              }
        }
      />
    </div>
  )
}
