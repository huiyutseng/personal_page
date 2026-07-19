import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

interface PlanetStop {
  left: string
  top: string
  scale: number
}

interface SectionStop {
  sectionId: string
  yellow: PlanetStop
  purple: PlanetStop
}

// One stop per section — the two planets travel from one stop to the next
// as the user scrolls through the section between them. Position is a %
// of the viewport (the overlay is `fixed inset-0`), so it's the same
// coordinate space regardless of which section is actually scrolled past.
const STOPS: SectionStop[] = [
  { sectionId: 'home', yellow: { left: '8%', top: '18%', scale: 0.82 }, purple: { left: '88%', top: '82%', scale: 0.32 } },
  { sectionId: 'about', yellow: { left: '92%', top: '12%', scale: 0.28 }, purple: { left: '6%', top: '58%', scale: 0.92 } },
  { sectionId: 'projects', yellow: { left: '88%', top: '86%', scale: 0.72 }, purple: { left: '10%', top: '10%', scale: 0.26 } },
  { sectionId: 'journey', yellow: { left: '55%', top: '4%', scale: 0.96 }, purple: { left: '48%', top: '96%', scale: 0.24 } },
  { sectionId: 'featured', yellow: { left: '10%', top: '62%', scale: 0.54 }, purple: { left: '92%', top: '26%', scale: 0.82 } },
  { sectionId: 'contact', yellow: { left: '-16%', top: '112%', scale: 0.28 }, purple: { left: '116%', top: '-18%', scale: 0.42 } },
]

const GRADIENTS = {
  yellow: 'radial-gradient(circle at 32% 28%, #FCEFC7, #E8B84B 45%, #B4791E 78%, #6b4410 100%)',
  purple: 'radial-gradient(circle at 32% 28%, #EFE3FB, #A981E0 45%, #6C3FA6 78%, #3a1f5c 100%)',
}

/**
 * Exactly two planets, shared across the whole site, living in a single
 * fixed full-viewport overlay behind section content. A GSAP timeline
 * (one scrubbed tween per section-to-section gap, keyed to that section's
 * own scroll range) carries them from stop to stop as the user scrolls,
 * with a big scale swing on top of the position move for a near/far
 * depth feel. Only active on the single-page section route ("/"); hidden
 * elsewhere (e.g. the project detail route) and under prefers-reduced-motion.
 */
export default function PlanetOverlay() {
  const yellowRef = useRef<HTMLDivElement>(null)
  const purpleRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const yellow = yellowRef.current
    const purple = purpleRef.current
    if (!yellow || !purple) return

    const ctx = gsap.context(() => {
      gsap.set([yellow, purple], { xPercent: -50, yPercent: -50 })
      gsap.set(yellow, { ...STOPS[0].yellow })
      gsap.set(purple, { ...STOPS[0].purple })

      for (let i = 0; i < STOPS.length - 1; i++) {
        const from = STOPS[i]
        const to = STOPS[i + 1]
        const trigger = document.getElementById(from.sectionId)
        if (!trigger) continue

        const scrollTrigger = {
          trigger,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
        gsap.to(yellow, { ...to.yellow, ease: 'none', scrollTrigger })
        gsap.to(purple, { ...to.purple, ease: 'none', scrollTrigger })
      }
    })

    return () => ctx.revert()
  }, [isHome])

  if (!isHome) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-70" aria-hidden="true">
      <div
        ref={yellowRef}
        className="absolute aspect-square rounded-full"
        style={{
          width: 'clamp(92px, 12vw, 210px)',
          background: GRADIENTS.yellow,
          boxShadow: '0 0 54px 4px rgba(232,184,75,0.22)',
        }}
      />
      <div
        ref={purpleRef}
        className="absolute aspect-square rounded-full"
        style={{
          width: 'clamp(82px, 10vw, 180px)',
          background: GRADIENTS.purple,
          boxShadow: '0 0 54px 4px rgba(108,63,166,0.22)',
        }}
      />
    </div>
  )
}
