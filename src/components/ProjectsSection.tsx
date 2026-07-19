import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PROJECT_CATEGORIES, categoryLabels, getLocalizedProjects } from '../data/projects'
import { site } from '../data/site'
import type { ProjectCategory } from '../data/types'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUpInView } from '../lib/motion'
import ProjectCard from './ProjectCard'
import FloatingParticles from './FloatingParticles'
import FloralDecoration from './FloralDecoration'
import ParallaxLayer from './ParallaxLayer'
import ScrollFlower from './ScrollFlower'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export default function ProjectsSection() {
  const { locale } = useLanguage()
  const copy = site[locale]
  const projects = getLocalizedProjects(locale)
  const reduceMotion = Boolean(useReducedMotion())
  const [active, setActive] = useState<ProjectCategory>(PROJECT_CATEGORIES[0])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [trackMetrics, setTrackMetrics] = useState({ cardStep: 0, visibleCount: 3 })
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const filtered = projects.filter((p) => p.category === active)
  const maxStartIndex = Math.max(0, filtered.length - trackMetrics.visibleCount)
  const centeredStartIndex = clamp(
    Math.floor((filtered.length - trackMetrics.visibleCount) / 2),
    0,
    maxStartIndex,
  )
  const hoveredStartIndex =
    hoveredIndex === null
      ? centeredStartIndex
      : clamp(hoveredIndex - Math.floor(trackMetrics.visibleCount / 2), 0, maxStartIndex)
  const translateX = -(hoveredStartIndex * trackMetrics.cardStep)

  useEffect(() => {
    setHoveredIndex(null)
  }, [active])

  useEffect(() => {
    const measureTrack = () => {
      const viewport = viewportRef.current
      const track = trackRef.current
      const firstCard = track?.querySelector<HTMLElement>('[data-project-card]')
      if (!viewport || !track || !firstCard) return

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '0')
      const cardStep = firstCard.offsetWidth + gap
      const visibleCount = Math.max(1, Math.round((viewport.clientWidth + gap) / cardStep))
      setTrackMetrics({ cardStep, visibleCount })
    }

    measureTrack()
    window.addEventListener('resize', measureTrack)
    return () => window.removeEventListener('resize', measureTrack)
  }, [active, filtered.length])

  return (
    <section id="projects" className="relative z-10 min-h-screen overflow-hidden bg-navy-black px-5 py-24 sm:px-8 lg:py-32">
      <ParallaxLayer offset={40} className="pointer-events-none absolute inset-0">
        <FloatingParticles count={42} className="absolute inset-0" interactive />
      </ParallaxLayer>
      <ScrollFlower origin="top" className="pointer-events-none absolute -left-8 top-6 h-32 w-32 opacity-60">
        <FloralDecoration tone="gold" className="h-full w-full" />
      </ScrollFlower>
      <ScrollFlower origin="bottom" className="pointer-events-none absolute -right-8 bottom-10 hidden h-36 w-36 opacity-50 md:block">
        <FloralDecoration tone="lavender" flip className="h-full w-full" />
      </ScrollFlower>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div {...fadeUpInView(0, reduceMotion)} className="text-center">
          <h2 className="font-serif-en text-4xl font-medium text-ink-dark sm:text-5xl">{copy.projects.title}</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold" />
          <p className="mt-4 font-serif-en text-lg italic text-ink-dark-soft">{copy.projects.subtitle}</p>
        </motion.div>

        <motion.div
          {...fadeUpInView(0.1, reduceMotion)}
          className="mt-10 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label={copy.projects.tabsLabel}
        >
          {PROJECT_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              data-cursor-hover
              onClick={() => setActive(category)}
              className={`focus-ring rounded-full border px-5 py-2 font-sans-tc text-sm transition-all duration-300 active:scale-95 ${
                active === category
                  ? 'border-gold bg-gold/15 text-gold'
                  : 'border-lavender/25 text-ink-dark-soft hover:border-lavender/60 hover:text-ink-dark'
              }`}
            >
              {categoryLabels[locale][category]}
            </button>
          ))}
        </motion.div>

        <div ref={viewportRef} className="relative mt-12 overflow-hidden px-0 sm:-mx-4 sm:px-4">
          <motion.div
            ref={trackRef}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{ x: reduceMotion ? 0 : translateX }}
            transition={{ type: 'spring', stiffness: 130, damping: 24, mass: 0.7 }}
            className="flex w-max gap-7 pb-2 will-change-transform"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  data-project-card
                  onMouseEnter={() => setHoveredIndex(i)}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
                  className="w-[min(82vw,360px)] flex-none sm:w-[calc((100vw-160px)/2)] lg:w-[calc((min(100vw,72rem)-56px)/3)]"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length > 0 && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-black to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-black to-transparent" />
            </>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-sans-tc text-sm text-ink-dark-soft">{copy.projects.empty}</p>
        )}
      </div>
    </section>
  )
}
