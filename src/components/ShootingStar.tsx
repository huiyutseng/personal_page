import { useEffect, useRef, useState } from 'react'

interface Meteor {
  id: number
  top: number
  left: number
  duration: number
  length: number
  dx: number
  dy: number
}

const SPAWN_INTERVAL_MS = 15000
const ANGLE_RAD = (35 * Math.PI) / 180

function createMeteor(id: number): Meteor {
  const distance = 480 + Math.random() * 220
  return {
    id,
    top: Math.random() * 35,
    left: 5 + Math.random() * 55,
    duration: 1.3 + Math.random() * 0.5,
    length: 90 + Math.random() * 70,
    dx: distance * Math.cos(ANGLE_RAD),
    dy: distance * Math.sin(ANGLE_RAD),
  }
}

/**
 * Occasional shooting star that streaks across the whole viewport,
 * regardless of which section is scrolled into view. Fixed + pointer-events-none
 * so it never blocks clicks; disabled under prefers-reduced-motion.
 */
export default function ShootingStar() {
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (rm.matches) return

    let timeout: number
    const spawn = () => {
      const id = idRef.current++
      const meteor = createMeteor(id)
      setMeteors((prev) => [...prev, meteor])
      window.setTimeout(() => {
        setMeteors((prev) => prev.filter((m) => m.id !== id))
      }, meteor.duration * 1000 + 200)
      timeout = window.setTimeout(spawn, SPAWN_INTERVAL_MS)
    }
    timeout = window.setTimeout(spawn, SPAWN_INTERVAL_MS)

    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden" aria-hidden="true">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute h-[2px] w-[2px] rounded-full bg-cream"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            boxShadow: '0 0 6px 1px rgba(247,243,236,0.85)',
            animation: `meteor-fall ${m.duration}s linear forwards`,
            ['--meteor-dx' as string]: `${m.dx}px`,
            ['--meteor-dy' as string]: `${m.dy}px`,
          }}
        >
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2"
            style={{
              width: m.length,
              height: 1,
              background: 'linear-gradient(90deg, rgba(247,243,236,0.9), transparent)',
            }}
          />
        </span>
      ))}
    </div>
  )
}
