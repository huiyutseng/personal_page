import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sparkles, X } from 'lucide-react'
import { site } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const sections = site.nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[9000]">
      <div
        className={`transition-colors duration-500 ${
          scrolled ? 'bg-navy-black/80 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              goTo('home')
            }}
            className="focus-ring flex items-center gap-2.5"
            data-cursor-hover
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-gold/60">
              <span className="absolute inset-0 animate-[spin_16s_linear_infinite] rounded-full border border-dashed border-lavender/50" />
              <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
            </span>
            <span className="font-serif-en text-lg tracking-wide text-ink-dark">{site.brand}</span>
          </a>

          <div className="hidden md:block">
            <a
              href="#contact"
              data-cursor-hover
              onClick={(e) => {
                e.preventDefault()
                goTo('contact')
              }}
              className="focus-ring group inline-flex items-center gap-2 rounded-full border border-lavender/50 bg-lavender/10 px-5 py-2 text-sm text-ink-dark transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold active:scale-95"
            >
              Let&apos;s Connect
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
            </a>
          </div>

          <button
            type="button"
            className="focus-ring inline-flex items-center justify-center rounded-full p-2 text-ink-dark md:hidden"
            aria-label={menuOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* section pager — jump between sections instead of scrolling through them */}
        <div className={`flex justify-center px-5 pb-3 sm:px-8 ${menuOpen ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-lavender/20 bg-navy-card/60 p-1 backdrop-blur-md">
            {site.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                data-cursor-hover
                aria-current={activeId === item.id ? 'true' : undefined}
                onClick={() => goTo(item.id)}
                className="focus-ring relative rounded-full px-3 py-1.5 font-sans-tc text-xs tracking-wide transition-colors duration-300 sm:px-4 sm:text-sm"
              >
                {activeId === item.id && (
                  <motion.span
                    layoutId="section-pager-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeId === item.id ? 'text-navy-black' : 'text-ink-dark-soft hover:text-ink-dark'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-20 z-[8999] flex flex-col bg-navy-black/92 px-8 py-10 backdrop-blur-md md:hidden">
          <ul className="flex flex-1 flex-col items-center justify-center gap-8">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goTo(item.id)
                  }}
                  className={`focus-ring font-serif-en text-3xl transition-colors ${
                    activeId === item.id ? 'text-gold' : 'text-ink-dark'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              goTo('contact')
            }}
            className="focus-ring mx-auto flex items-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-ink-dark"
          >
            Let&apos;s Connect
            <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </a>
        </div>
      )}
    </header>
  )
}
