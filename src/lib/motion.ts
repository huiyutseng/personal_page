/** Shared "elegant, unhurried" easing curve used across the site. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Fade-in + rise-up entrance used for hero copy and section headers.
 * Pass `reduceMotion` from `useReducedMotion()` to collapse it to a no-op.
 */
export function fadeUp(delay = 0, reduceMotion = false) {
  if (reduceMotion) return {}
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  }
}

/** Same as fadeUp but triggers once the element scrolls into view. */
export function fadeUpInView(delay = 0, reduceMotion = false) {
  if (reduceMotion) {
    return { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
  }
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  }
}
