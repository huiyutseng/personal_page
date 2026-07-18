import { motion, useReducedMotion } from 'framer-motion'
import { Brain, Eye, Sprout, type LucideIcon } from 'lucide-react'
import { site } from '../data/site'
import { fadeUpInView } from '../lib/motion'
import FloralDecoration from './FloralDecoration'
import FloatingParticles from './FloatingParticles'
import ParallaxLayer from './ParallaxLayer'

const ICONS: Record<string, LucideIcon> = { Eye, Brain, Sprout }

export default function AboutSection() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section id="about" className="relative overflow-hidden bg-navy-deep px-5 py-24 sm:px-8 lg:py-32">
      <ParallaxLayer offset={40} className="pointer-events-none absolute inset-0">
        <FloatingParticles count={16} className="absolute inset-0" />
      </ParallaxLayer>
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          {...fadeUpInView(0, reduceMotion)}
          className="relative overflow-hidden rounded-[20px] border border-gold/25 bg-cream px-6 py-14 shadow-[0_30px_70px_-30px_rgba(4,16,31,0.6)] sm:px-12 lg:px-16"
        >
          <FloralDecoration
            tone="lavender"
            className="pointer-events-none absolute -left-4 -top-4 h-24 w-24 opacity-80 sm:h-32 sm:w-32"
          />
          <FloralDecoration
            tone="lavender"
            flip
            className="pointer-events-none absolute -bottom-6 -right-4 h-24 w-24 opacity-80 sm:h-32 sm:w-32"
          />

          <div className="relative text-center">
            <h2 className="font-serif-en text-4xl font-medium text-ink-light sm:text-5xl">{site.about.title}</h2>
            <div className="mx-auto mt-3 h-px w-16 bg-gold" />
            <p className="mt-4 font-serif-en text-lg italic text-ink-light-soft">{site.about.subtitle}</p>
          </div>

          <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {site.about.columns.map((col, i) => {
              const Icon = ICONS[col.icon]
              return (
                <motion.div
                  key={col.title}
                  {...fadeUpInView(0.12 * (i + 1), reduceMotion)}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-lavender/40 bg-lavender/10 text-lavender">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-serif-en text-xl text-ink-light">{col.title}</h3>
                  <p className="mt-3 whitespace-pre-line font-sans-tc text-sm leading-relaxed text-ink-light-soft">
                    {col.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
