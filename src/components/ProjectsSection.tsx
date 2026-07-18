import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { PROJECT_CATEGORIES, projects } from '../data/projects'
import { site } from '../data/site'
import type { ProjectCategory } from '../data/types'
import { fadeUpInView } from '../lib/motion'
import ProjectCard from './ProjectCard'
import FloatingParticles from './FloatingParticles'

export default function ProjectsSection() {
  const reduceMotion = Boolean(useReducedMotion())
  const [active, setActive] = useState<ProjectCategory>(PROJECT_CATEGORIES[0])
  const filtered = projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="relative bg-navy-black px-5 py-24 sm:px-8 lg:py-32">
      <FloatingParticles count={16} />
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

        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.06 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-sans-tc text-sm text-ink-dark-soft">此分類即將加入新作品。</p>
        )}
      </div>
    </section>
  )
}
