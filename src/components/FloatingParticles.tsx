import { useMemo } from 'react'

interface FloatingParticlesProps {
  count?: number
  className?: string
}

interface Dot {
  left: number
  top: number
  size: number
  delay: number
  duration: number
  kind: 'twinkle' | 'drift'
  color: string
}

const COLORS = ['#F7F3EC', '#D8B46A', '#B8A7D9', '#F2B8C1']

/**
 * Sparse, slow-moving ambient star/light dots for dark navy sections.
 * Purely CSS-driven (no three.js) and cheap enough to leave mounted;
 * respects prefers-reduced-motion globally via globals.css.
 */
export default function FloatingParticles({ count = 22, className = 'absolute inset-0' }: FloatingParticlesProps) {
  const dots = useMemo<Dot[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      kind: i % 3 === 0 ? 'drift' : 'twinkle',
      color: COLORS[i % COLORS.length],
    }))
  }, [count])

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
            animation: `${dot.kind === 'drift' ? 'drift' : 'twinkle'} ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
