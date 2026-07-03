import { useEffect, useRef, useState } from 'react'

const EASE = 0.22
const BURST_COLORS = ['#F7F3EC', '#D8B46A', '#B8A7D9', '#F2B8C1']
const HOVER_SELECTOR =
  'a, button, [role="button"], summary, input, textarea, select, [data-cursor-hover]'

interface Burst {
  id: number
  x: number
  y: number
  angle: number
  dist: number
  color: string
}

function BurstDot({ x, y, angle, dist, color, onDone }: Burst & { onDone: (id: number) => void }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(true))
    const timer = window.setTimeout(() => onDone(-1), 650)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dx = Math.cos(angle) * dist
  const dy = Math.sin(angle) * dist

  return (
    <span
      className="fixed left-0 top-0 z-[99998] rounded-full transition-all ease-out"
      style={{
        width: 5,
        height: 5,
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        transitionDuration: '650ms',
        transform: `translate3d(${x + (active ? dx : 0)}px, ${y + (active ? dy : 0)}px, 0) scale(${active ? 1 : 0})`,
        opacity: active ? 0 : 1,
        pointerEvents: 'none',
      }}
    />
  )
}

/**
 * Custom star cursor for desktop pointers. Follows the mouse via
 * requestAnimationFrame with a light smoothing lag, grows + rotates over
 * interactive elements, and bursts a few mini stars on click.
 * Auto-disabled on touch/coarse pointers and eased-to-instant under
 * prefers-reduced-motion.
 */
export default function StarCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const reducedMotionRef = useRef(false)
  const burstIdRef = useRef(0)

  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)')
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = rm.matches
    setEnabled(fine.matches)

    const onFineChange = () => setEnabled(fine.matches)
    const onRmChange = () => {
      reducedMotionRef.current = rm.matches
    }
    fine.addEventListener('change', onFineChange)
    rm.addEventListener('change', onRmChange)
    return () => {
      fine.removeEventListener('change', onFineChange)
      rm.removeEventListener('change', onRmChange)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    const handleOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      setHovering(!!el?.closest(HOVER_SELECTOR))
    }
    const handleDown = (e: MouseEvent) => {
      setClicking(true)
      window.setTimeout(() => setClicking(false), 180)
      if (reducedMotionRef.current) return
      const count = 6 + Math.floor(Math.random() * 5)
      const next: Burst[] = Array.from({ length: count }, () => ({
        id: burstIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        angle: Math.random() * Math.PI * 2,
        dist: 14 + Math.random() * 18,
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      }))
      setBursts((prev) => [...prev, ...next].slice(-60))
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    window.addEventListener('mousedown', handleDown)

    const loop = () => {
      const ease = reducedMotionRef.current ? 1 : EASE
      pos.current.x += (target.current.x - pos.current.x) * ease
      pos.current.y += (target.current.y - pos.current.y) * ease
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  const removeBurst = () => {
    setBursts((prev) => (prev.length ? prev.slice(1) : prev))
  }

  if (!enabled) return null

  return (
    <>
      <div ref={outerRef} className="fixed left-0 top-0 z-[99999]" style={{ pointerEvents: 'none' }}>
        <div
          className={`-translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out ${
            clicking ? 'scale-[0.55]' : hovering ? 'scale-[1.55] rotate-[32deg]' : 'scale-100 rotate-0'
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            style={{
              filter: `drop-shadow(0 0 ${hovering ? 8 : 5}px rgba(184,167,217,${hovering ? 0.95 : 0.55}))`,
            }}
          >
            <path
              d="M12 1 L14.5 9 L23 12 L14.5 15 L12 23 L9.5 15 L1 12 L9.5 9 Z"
              fill={hovering ? '#D8B46A' : '#F7F3EC'}
              stroke="#B8A7D9"
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>
      {bursts.map((b) => (
        <BurstDot key={b.id} {...b} onDone={removeBurst} />
      ))}
    </>
  )
}
