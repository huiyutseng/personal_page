import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CircleHelp, CircleCheck, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProject, localizeProject } from '../data/projects'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUpInView } from '../lib/motion'
import FloatingParticles from './FloatingParticles'
import FloralDecoration from './FloralDecoration'
import ImageWithFallback from './ImageWithFallback'
import ParallaxLayer from './ParallaxLayer'
import ScrollFlower from './ScrollFlower'
import ScrollPlanet from './ScrollPlanet'

export default function FeaturedProjectSection() {
  const { locale } = useLanguage()
  const copy = site[locale]
  const project = localizeProject(featuredProject, locale)
  const blocks = [
    { key: 'problem', label: copy.projectDetail.problem, icon: CircleHelp },
    { key: 'approach', label: copy.projectDetail.approach, icon: Lightbulb },
    { key: 'result', label: copy.projectDetail.result, icon: CircleCheck },
  ] as const
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section className="relative overflow-hidden bg-navy-black px-5 py-24 sm:px-8 lg:py-32">
      <ParallaxLayer offset={40} className="pointer-events-none absolute inset-0">
        <FloatingParticles count={34} className="absolute inset-0" interactive />
      </ParallaxLayer>
      <ScrollPlanet tone="gold" size={44} xRange={[4, 22]} yRange={[4, 88]} />
      <ScrollFlower origin="top" className="pointer-events-none absolute -right-6 top-8 h-28 w-28 opacity-55">
        <FloralDecoration tone="gold" flip className="h-full w-full" />
      </ScrollFlower>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          {...fadeUpInView(0, reduceMotion)}
          className="grid grid-cols-1 gap-10 rounded-[20px] border border-gold/20 bg-cream p-6 shadow-[0_30px_70px_-30px_rgba(4,16,31,0.6)] sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14"
        >
          <div className="overflow-hidden rounded-2xl">
            <ImageWithFallback
              src={project.image}
              alt={`${project.name} ${copy.projectDetail.imageAlt}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
              fallbackClassName="aspect-[4/3] w-full"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-3 font-sans-tc text-xs uppercase tracking-wider text-gold-warm">{copy.featured.eyebrow}</span>
            <h2 className="font-serif-en text-3xl font-medium text-ink-light sm:text-4xl">{project.name}</h2>
            <p className="mt-2 font-sans-tc text-sm text-ink-light-soft">{project.summary}</p>

            <div className="mt-8 space-y-6">
              {blocks.map((block) => {
                const Icon = block.icon
                return (
                  <div key={block.key} className="flex gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lavender/40 text-lavender">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-serif-en text-base text-ink-light">{block.label}</h3>
                      <p className="mt-1 font-sans-tc text-sm leading-relaxed text-ink-light-soft">
                        {project.detail[block.key]}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              to={`/projects/${project.id}`}
              data-cursor-hover
              className="focus-ring group mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-lavender px-6 py-3 font-sans-tc text-sm font-medium text-navy-black transition-all duration-300 hover:bg-lavender-pink active:scale-95"
            >
              {copy.featured.viewDetails}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
