import { motion, useReducedMotion } from 'framer-motion'
import { Bird, Briefcase, Code2, Download, Mail } from 'lucide-react'
import { site } from '../data/site'
import { fadeUpInView } from '../lib/motion'
import FloralDecoration from './FloralDecoration'
import ImageWithFallback from './ImageWithFallback'

const LINKS = [
  { icon: Mail, label: site.contact.email, href: `mailto:${site.contact.email}` },
  { icon: Code2, label: site.contact.github, href: site.contact.githubUrl },
  { icon: Briefcase, label: site.contact.linkedin, href: site.contact.linkedinUrl },
]

const DEVICES = [
  { name: 'Desktop', className: 'aspect-[16/10] w-full' },
  { name: 'Tablet', className: 'aspect-[4/3] w-2/3' },
  { name: 'Mobile', className: 'aspect-[9/16] w-1/3' },
]

export default function ContactSection() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section id="contact" className="relative bg-navy-black px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...fadeUpInView(0, reduceMotion)}
          className="grid grid-cols-1 gap-8 rounded-[20px] border border-lavender/25 bg-cream p-6 shadow-[0_30px_70px_-30px_rgba(4,16,31,0.6)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14"
        >
          <div className="relative">
            <FloralDecoration
              tone="lavender"
              className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 opacity-70"
            />
            <Bird className="absolute bottom-0 left-2 h-8 w-8 text-ink-light-soft/70" strokeWidth={1.25} />

            <h2 className="font-serif-en text-4xl font-medium text-ink-light sm:text-5xl">{site.contact.title}</h2>
            <p className="mt-3 font-serif-en text-lg italic text-ink-light-soft">{site.contact.subtitle}</p>

            <ul className="mt-8 space-y-4">
              {LINKS.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cursor-hover
                    className="focus-ring group inline-flex items-center gap-3 font-sans-tc text-sm text-ink-light transition-colors duration-300 hover:text-gold-warm"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-lavender/40 text-lavender transition-colors duration-300 group-hover:border-gold group-hover:text-gold-warm">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.contact.resumePath}
              download
              data-cursor-hover
              className="focus-ring mt-9 inline-flex items-center gap-2 rounded-full bg-lavender px-6 py-3 font-sans-tc text-sm font-medium text-navy-black transition-all duration-300 hover:bg-lavender-pink active:scale-95"
            >
              {site.contact.resumeLabel}
              <Download className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>

          <div className="flex flex-wrap items-end justify-center gap-4 rounded-2xl border border-lavender/15 bg-navy-deep/95 p-6">
            {DEVICES.map((device) => (
              <div key={device.name} className={`${device.className} min-w-[64px]`}>
                <div className="overflow-hidden rounded-lg border border-gold/25 bg-navy-card shadow-lg">
                  <ImageWithFallback
                    src={site.contact.devicePreviewImage}
                    alt={`${device.name} 版面預覽`}
                    className="h-full w-full object-cover"
                    fallbackClassName="h-full w-full"
                  />
                </div>
                <p className="mt-2 text-center font-sans-tc text-[11px] tracking-wide text-ink-dark-soft">
                  {device.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
