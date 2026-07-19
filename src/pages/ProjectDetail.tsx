import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  CircleHelp,
  Code2,
  Lightbulb,
  Sparkles,
  SquareArrowOutUpRight,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback'
import ProjectCard from '../components/ProjectCard'
import { localizeProject, projects } from '../data/projects'
import { site } from '../data/site'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUpInView } from '../lib/motion'
import { getProjectNavigation } from '../lib/projectNavigation'

export default function ProjectDetail() {
  const { id } = useParams()
  const { locale } = useLanguage()
  const copy = site[locale]
  const projectSource = projects.find((project) => project.id === id)
  const navigation = id ? getProjectNavigation(projects, id) : null
  const reduceMotion = Boolean(useReducedMotion())

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [id])

  if (!projectSource || !navigation) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy-black px-5 text-center">
        <Sparkles className="h-10 w-10 text-lavender" strokeWidth={1.25} />
        <h1 className="font-serif-en text-3xl text-ink-dark">{copy.projectDetail.notFound}</h1>
        <Link to="/#projects" data-cursor-hover className="focus-ring text-gold hover:underline">
          ← {copy.projectDetail.back}
        </Link>
      </main>
    )
  }

  const project = localizeProject(projectSource, locale)
  const previous = localizeProject(navigation.previous, locale)
  const next = localizeProject(navigation.next, locale)
  const related = navigation.related.map((item) => localizeProject(item, locale))
  const blocks = [
    { key: 'problem', label: copy.projectDetail.problem, icon: CircleHelp },
    { key: 'approach', label: copy.projectDetail.approach, icon: Lightbulb },
    { key: 'result', label: copy.projectDetail.result, icon: CircleCheck },
  ] as const

  return (
    <main className="min-h-screen bg-navy-black px-5 pb-24 pt-32 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/#projects"
          data-cursor-hover
          className="focus-ring inline-flex items-center gap-2 font-sans-tc text-sm text-ink-dark-soft transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          {copy.projectDetail.back}
        </Link>

        <motion.header {...fadeUpInView(0, reduceMotion)} className="mt-8">
          <span className="font-sans-tc text-xs uppercase tracking-wider text-lavender">
            {project.categoryLabel}
          </span>
          <h1 className="mt-2 font-serif-en text-4xl font-medium text-ink-dark sm:text-5xl">
            {project.name}
          </h1>
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
                {copy.projectDetail.liveDemo}
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
            alt={`${project.name} ${copy.projectDetail.imageAlt}`}
            className="w-full object-cover"
            fallbackClassName="aspect-video w-full"
            icon={<Sparkles className="h-10 w-10 text-lavender/60" strokeWidth={1} />}
          />
        </motion.div>

        <div className="mt-14 space-y-10 divide-y divide-lavender/10">
          {blocks.map((block, index) => {
            const Icon = block.icon
            return (
              <motion.section
                key={block.key}
                {...fadeUpInView(0.1 * index, reduceMotion)}
                className={index > 0 ? 'pt-10' : ''}
              >
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
      </article>

      <nav
        aria-label={copy.projectDetail.navigationLabel}
        className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-3 border-y border-lavender/15 py-6 sm:grid-cols-3"
      >
        <Link
          to={`/projects/${previous.id}`}
          data-cursor-hover
          className="focus-ring group flex min-h-24 flex-col justify-center rounded-lg px-4 py-3 text-left transition-colors hover:bg-lavender/8"
        >
          <span className="flex items-center gap-2 font-sans-tc text-xs text-lavender">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {copy.projectDetail.previous}
          </span>
          <span className="mt-2 font-serif-en text-lg text-ink-dark">{previous.name}</span>
        </Link>

        <Link
          to="/#projects"
          data-cursor-hover
          className="focus-ring flex min-h-24 items-center justify-center rounded-lg px-4 py-3 text-center font-sans-tc text-sm text-gold transition-colors hover:bg-gold/8"
        >
          {copy.projectDetail.back}
        </Link>

        <Link
          to={`/projects/${next.id}`}
          data-cursor-hover
          className="focus-ring group flex min-h-24 flex-col justify-center rounded-lg px-4 py-3 text-left transition-colors hover:bg-lavender/8 sm:text-right"
        >
          <span className="flex items-center gap-2 font-sans-tc text-xs text-lavender sm:justify-end">
            {copy.projectDetail.next}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 font-serif-en text-lg text-ink-dark">{next.name}</span>
        </Link>
      </nav>

      <section className="mx-auto mt-16 max-w-6xl" aria-labelledby="related-projects-title">
        <div className="text-center">
          <h2 id="related-projects-title" className="font-serif-en text-3xl text-ink-dark">
            {copy.projectDetail.related}
          </h2>
          <div className="mx-auto mt-3 h-px w-14 bg-gold" />
        </div>
        <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
