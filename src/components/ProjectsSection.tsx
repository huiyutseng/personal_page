import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PROJECT_CATEGORIES, projects } from '../data/projects'
import { site } from '../data/site'
import type { ProjectCategory } from '../data/types'
import { fadeUpInView } from '../lib/motion'
import ProjectCard from './ProjectCard'
import FloatingParticles from './FloatingParticles'
import ParallaxLayer from './ParallaxLayer'

// how close to the edge (px) the cursor must be to trigger auto-scroll
const EDGE_ZONE = 90
// px scrolled per animation frame while hovering an edge
const SCROLL_SPEED = 6

export default function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion())
  const [active, setActive] = useState<ProjectCategory>(PROJECT_CATEGORIES[0])
  const filtered = projects.filter((p) => p.category === active)

  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollDirRef = useRef(0)

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 })
  }, [active])

  useEffect(() => {
    if (reduceMotion) return
    let raf: number
    const tick = () => {
      const el = scrollerRef.current
      if (el && scrollDirRef.current !== 0) {
        el.scrollLeft += scrollDirRef.current * SCROLL_SPEED
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const x = e.clientX - left
    if (x < EDGE_ZONE) {
      scrollDirRef.current = -1
    } else if (x > width - EDGE_ZONE) {
      scrollDirRef.current = 1
    } else {
      scrollDirRef.current = 0
    }
  }

  const handlePointerLeave = () => {
    scrollDirRef.current = 0
  }

  return (
    <section id="projects" className="relative overflow-hidden bg-navy-black px-5 py-24 sm:px-8 lg:py-32">
      <ParallaxLayer offset={40} className="pointer-events-none absolute inset-0">
        <FloatingParticles count={16} className="absolute inset-0" />
      </ParallaxLayer>
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fadeUpInView(0, reduceMotion)} className="text-center">
          <h2 className="font-serif-en text-4xl font-medium text-ink-dark sm:text-5xl">{site.projects.title}</h2>
          <div className="mx-auto mt-3 h-px w-16 bg-gold" />
          <p className="mt-4 font-serif-en text-lg italic text-ink-dark-soft">{site.projects.subtitle}</p>
        </motion.div>

        <motion.div
          {...fadeUpInView(0.1, reduceMotion)}
          className="mt-10 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="專案分類"
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
              {category}
            </button>
          ))}
        </motion.div>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            className="no-scrollbar flex gap-7 overflow-x-auto"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
                  className="w-full flex-none sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-18.66px)]"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length > 0 && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-black to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-black to-transparent" />
            </>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-sans-tc text-sm text-ink-dark-soft">此分類即將加入新作品。</p>
        )}
      </div>
    </section>
  )
}
