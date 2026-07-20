import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { fadeUp as fadeUpBase } from '../lib/motion'
import { usePortfolio } from '../portfolio/PortfolioContext'
import CounterRotatingRings from './CounterRotatingRings'
import FloatingParticles from './FloatingParticles'
import FloralDecoration from './FloralDecoration'
import ImageWithFallback from './ImageWithFallback'
import MagneticButton from './MagneticButton'
import ParallaxLayer from './ParallaxLayer'
import ScrollFlower from './ScrollFlower'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { locale } = useLanguage()
  const { data } = usePortfolio()
  const copy = data.content[locale]
  const siteShared = data.site
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay: number) => fadeUpBase(delay, Boolean(reduceMotion))

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-10 flex min-h-screen items-center overflow-hidden bg-navy-deep pt-36"
    >
      {/* ambient background — drifts slightly on scroll for a sense of depth */}
      <ParallaxLayer offset={50} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_20%,rgba(184,167,217,0.16),transparent),radial-gradient(ellipse_50%_40%_at_10%_85%,rgba(216,180,106,0.10),transparent)]" />
        <FloatingParticles count={26} />
        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
          <path
            d="M40 60 C 200 140, 120 320, 320 380 S 560 520, 680 640"
            fill="none"
            stroke="#D8B46A"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
        <ScrollFlower origin="bottom left" rotate={22} scaleRange={[0.88, 1.04]} className="absolute -left-8 bottom-0 h-56 w-40 opacity-58">
          <FloralDecoration tone="lavender" variant="wildVine" className="h-full w-full" />
        </ScrollFlower>
        <ScrollFlower origin="top right" rotate={-24} scaleRange={[0.94, 1.12]} className="absolute right-2 top-20 hidden h-40 w-40 opacity-42 md:block">
          <FloralDecoration tone="gold" flip className="h-full w-full" />
        </ScrollFlower>
      </ParallaxLayer>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* left column */}
        <div className="text-center lg:text-left">
          <motion.p {...fadeUp(0)} className="font-serif-en text-lg italic text-lavender">
            {copy.hero.greeting}
          </motion.p>
          <motion.h1
            {...fadeUp(0.08)}
            className="mt-2 font-serif-en text-5xl font-medium leading-[1.05] text-ink-dark sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-gold-warm via-gold to-lavender-pink bg-clip-text text-transparent">
              {copy.hero.name}
            </span>
            .
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-6 font-serif-en text-xl italic text-ink-dark-soft sm:text-2xl">
            {copy.hero.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-6 font-sans-tc text-base leading-relaxed text-ink-dark-soft">
            {copy.hero.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <MagneticButton
              href="#projects"
              data-cursor-hover
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="focus-ring group inline-flex items-center gap-2 rounded-full bg-lavender px-7 py-3 font-sans-tc text-sm font-medium text-navy-black shadow-[0_8px_30px_-8px_rgba(184,167,217,0.6)] transition-all duration-300 hover:bg-lavender-pink hover:shadow-[0_10px_36px_-6px_rgba(216,196,232,0.7)] active:scale-95"
            >
              {copy.hero.ctaPrimary}
              <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.75} />
            </MagneticButton>
            <MagneticButton
              href="#about"
              data-cursor-hover
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3 font-sans-tc text-sm font-medium text-ink-dark transition-all duration-300 hover:border-gold hover:bg-gold/10 active:scale-95"
            >
              {copy.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>
        </div>

        {/* right column — portrait */}
        <motion.div {...fadeUp(0.2)} className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
          <div className="relative aspect-square w-full max-w-[360px]">
            <CounterRotatingRings scrollTarget={sectionRef} />
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_0_60px_-10px_rgba(184,167,217,0.45)]">
              <ImageWithFallback
                src={siteShared.hero.portraitImage}
                alt={copy.hero.portraitAlt}
                className="h-full w-full object-cover"
                fallbackClassName="h-full w-full"
                icon={<Sparkles className="h-10 w-10 text-lavender/70" strokeWidth={1} />}
              />
            </div>
            <ScrollFlower origin="bottom left" rotate={-16} scaleRange={[0.92, 1.04]} className="pointer-events-none absolute -bottom-10 -left-12 h-32 w-24 opacity-82">
              <FloralDecoration tone="lavender" variant="sprig" className="h-full w-full" />
            </ScrollFlower>
            <ScrollFlower origin="top right" rotate={-33} scaleRange={[0.88, 1.05]} className="pointer-events-none absolute -right-8 -top-6 h-24 w-24 opacity-90">
              <FloralDecoration tone="gold" flip className="h-full w-full" />
            </ScrollFlower>
            {[0.15, 0.55, 0.85].map((t, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-cream"
                style={{
                  left: `${10 + t * 80}%`,
                  top: `${(i % 2 === 0 ? 8 : 88) + (i - 1) * 4}%`,
                  animationDelay: `${i * 0.6}s`,
                  boxShadow: '0 0 8px #F7F3EC',
                }}
              />
            ))}
          </div>

          <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 translate-x-full text-right font-serif-en text-sm italic leading-relaxed text-ink-dark-soft xl:block">
            {copy.hero.sideNote.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        data-cursor-hover
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        {...fadeUp(0.5)}
        className="focus-ring absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-ink-dark-soft"
      >
        <span className="font-sans-tc text-xs tracking-widest">{copy.hero.scrollHint}</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={reduceMotion ? {} : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}
