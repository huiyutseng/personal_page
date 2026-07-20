import { motion, useReducedMotion } from 'framer-motion'
import { BrainCircuit, GraduationCap, Landmark, Globe2, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUpInView } from '../lib/motion'
import { usePortfolio } from '../portfolio/PortfolioContext'
import { getLocalizedJourney } from '../portfolio/selectors'
import FloatingParticles from './FloatingParticles'
import FloralDecoration from './FloralDecoration'
import ParallaxLayer from './ParallaxLayer'
import ScrollFlower from './ScrollFlower'
import ScrollPlanet from './ScrollPlanet'

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Landmark,
  Globe2,
  GraduationCap,
  BrainCircuit,
}

export default function JourneySection() {
  const { locale } = useLanguage()
  const { data } = usePortfolio()
  const copy = data.content[locale]
  const milestones = getLocalizedJourney(data, locale)
  const reduceMotion = Boolean(useReducedMotion())
  const n = milestones.length

  return (
    <section id="journey" className="relative overflow-hidden bg-navy-deep px-5 py-24 sm:px-8 lg:py-32">
      <ParallaxLayer offset={40} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(216,180,106,0.08),transparent)]" />
        <FloatingParticles count={42} className="absolute inset-0" interactive />
      </ParallaxLayer>
      <ScrollPlanet tone="lavender" size={40} xRange={[92, 78, 68]} yRange={[18, 64, 118]} scaleRange={[0.75, 0.92, 0.35]} />
      <ScrollFlower origin="bottom" className="pointer-events-none absolute -left-6 bottom-4 h-28 w-28 opacity-60">
        <FloralDecoration tone="lavender" className="h-full w-full" />
      </ScrollFlower>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div {...fadeUpInView(0, reduceMotion)} className="text-center">
          <h2 className="font-serif-en text-4xl font-medium text-ink-dark sm:text-5xl">{copy.journey.title}</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold" />
          <p className="mt-4 font-serif-en text-lg italic text-ink-dark-soft">{copy.journey.subtitle}</p>
        </motion.div>

        {/* Desktop: horizontal vine */}
        <div className="relative mt-20 hidden md:block">
          <svg viewBox="0 0 1000 60" className="absolute inset-x-0 top-8 h-6 w-full overflow-visible" aria-hidden="true">
            <motion.path
              d="M20 30 C 160 -10, 220 70, 360 30 S 620 -10, 740 30 S 900 60, 980 30"
              fill="none"
              stroke="#D8B46A"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>

          <ol className="relative grid grid-cols-5 gap-4">
            {milestones.map((item, i) => {
              const Icon = ICONS[item.icon]
              return (
                <motion.li
                  key={item.id}
                  {...fadeUpInView(0.15 * i + 0.2, reduceMotion)}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 bg-navy-card text-gold transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_22px_rgba(216,180,106,0.55)]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                    <Sparkles className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 text-lavender opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </span>
                  <h3 className="mt-4 font-serif-en text-base text-ink-dark">{item.title}</h3>
                  <p className="mt-2 font-sans-tc text-xs leading-relaxed text-ink-dark-soft">{item.description}</p>
                  <span className="sr-only">
                    {locale === 'zh-TW'
                      ? `第 ${i + 1} 個里程碑，共 ${n} 個`
                      : `Milestone ${i + 1} of ${n}`}
                  </span>
                </motion.li>
              )
            })}
          </ol>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="relative mt-16 space-y-10 border-l border-gold/30 pl-8 md:hidden">
          {milestones.map((item, i) => {
            const Icon = ICONS[item.icon]
            return (
              <motion.li key={item.id} {...fadeUpInView(0.08 * i, reduceMotion)} className="group relative">
                <span className="absolute -left-[41px] flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-navy-card text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif-en text-base text-ink-dark">{item.title}</h3>
                <p className="mt-1.5 font-sans-tc text-xs leading-relaxed text-ink-dark-soft">{item.description}</p>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
