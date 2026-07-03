import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, Code2, CircleCheck, CircleHelp, Lightbulb, Sparkles, SquareArrowOutUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback'
import { projects } from '../data/projects'
import { fadeUpInView } from '../lib/motion'

const BLOCKS = [
  { key: 'problem', label: 'The Problem', icon: CircleHelp } as const,
  { key: 'approach', label: 'My Approach', icon: Lightbulb } as const,
  { key: 'result', label: 'The Result', icon: CircleCheck } as const,
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  const reduceMotion = Boolean(useReducedMotion())

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-black px-5 text-center">
        <Sparkles className="h-10 w-10 text-lavender" strokeWidth={1.25} />
        <h1 className="font-serif-en text-3xl text-ink-dark">找不到這個專案</h1>
        <Link to="/" data-cursor-hover className="focus-ring text-gold hover:underline">
          ← 回到首頁
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-navy-black px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/#projects"
          data-cursor-hover
          className="focus-ring inline-flex items-center gap-2 font-sans-tc text-sm text-ink-dark-soft transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          回到所有專案
        </Link>

        <motion.header {...fadeUpInView(0, reduceMotion)} className="mt-8">
          <span className="font-sans-tc text-xs uppercase tracking-wider text-lavender">{project.category}</span>
          <h1 className="mt-2 font-serif-en text-4xl font-medium text-ink-dark sm:text-5xl">{project.name}</h1>
          <p className="mt-3 font-serif-en text-lg italic text-ink-dark-soft">{project.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lavender/25 bg-lavender/10 px-3 py-1 font-sans-tc text-xs text-ink-dark-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-lavender/30 px-5 py-2 font-sans-tc text-sm text-ink-dark transition-colors hover:border-gold hover:text-gold"
              >
                <Code2 className="h-4 w-4" strokeWidth={1.5} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-lavender px-5 py-2 font-sans-tc text-sm font-medium text-navy-black transition-colors hover:bg-lavender-pink"
              >
                <SquareArrowOutUpRight className="h-4 w-4" strokeWidth={1.5} />
                Live Demo
              </a>
            )}
          </div>
        </motion.header>

        <motion.div
          {...fadeUpInView(0.1, reduceMotion)}
          className="mt-10 overflow-hidden rounded-2xl border border-gold/20"
        >
          <ImageWithFallback
            src={project.image}
            alt={`${project.name} 專案畫面`}
            className="w-full object-cover"
            fallbackClassName="aspect-video w-full"
            icon={<Sparkles className="h-10 w-10 text-lavender/60" strokeWidth={1} />}
          />
        </motion.div>

        <div className="mt-14 space-y-10 divide-y divide-lavender/10">
          {BLOCKS.map((block, i) => {
            const Icon = block.icon
            return (
              <motion.section key={block.key} {...fadeUpInView(0.1 * i, reduceMotion)} className={i > 0 ? 'pt-10' : ''}>
                <h2 className="flex items-center gap-3 font-serif-en text-xl text-ink-dark">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  {block.label}
                </h2>
                <p className="mt-3 font-sans-tc text-base leading-relaxed text-ink-dark-soft">
                  {project.detail[block.key]}
                </p>
              </motion.section>
            )
          })}
        </div>
      </div>
    </main>
  )
}
