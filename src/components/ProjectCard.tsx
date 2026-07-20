import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { LocalizedProject } from '../data/types'
import { useLanguage } from '../i18n/LanguageContext'
import { usePortfolio } from '../portfolio/PortfolioContext'
import ImageWithFallback from './ImageWithFallback'

export default function ProjectCard({ project }: { project: LocalizedProject }) {
  const { locale } = useLanguage()
  const { data } = usePortfolio()
  const copy = data.content[locale]
  return (
    <motion.div layout className="group relative h-full">
      <Link
        to={`/projects/${project.id}`}
        data-cursor-hover
        aria-label={`${copy.projects.viewDetails}: ${project.name}`}
        className="focus-ring relative flex h-full flex-col overflow-hidden rounded-2xl border border-lavender/15 bg-navy-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_20px_45px_-20px_rgba(216,180,106,0.35)]"
      >
        <span className="pointer-events-none absolute right-3 top-3 z-10 text-gold opacity-0 transition-opacity duration-300 group-hover:animate-[twinkle_1.6s_ease-in-out_infinite] group-hover:opacity-90">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>

        <div className="relative aspect-[16/10] overflow-hidden">
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            fallbackClassName="h-full w-full"
            icon={<Sparkles className="h-8 w-8 text-lavender/60" strokeWidth={1} />}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-black/70 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="font-sans-tc text-xs uppercase tracking-wider text-lavender">{project.categoryLabel}</span>
          <h3 className="mt-2 font-serif-en text-xl text-ink-dark">{project.name}</h3>
          <p className="mt-2 font-sans-tc text-sm leading-relaxed text-ink-dark-soft">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lavender/25 bg-lavender/10 px-2.5 py-0.5 font-sans-tc text-xs text-ink-dark-soft"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-end pt-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-navy-black">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
