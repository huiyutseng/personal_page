# Counter-Rotating Concentric Rings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four fixed-center gold SVG rings around the hero portrait, with alternating scroll-driven rotation and visibly asymmetric markings.

**Architecture:** A dedicated `CounterRotatingRings` component owns SVG geometry and derives four smoothed rotation values from the hero section's scroll progress. `HeroSection` supplies its section ref and replaces the two static borders with the component.

**Tech Stack:** React 19, TypeScript 6, Framer Motion 12, SVG, Node built-in test runner, Vite 5.

## Global Constraints

- Ring directions are clockwise, counterclockwise, clockwise, counterclockwise.
- Every ring shares SVG center `200 200`; no ring receives x/y animation.
- Scroll controls rotation; stopping scroll leaves rings at their current angles.
- Each ring contains a gap, dash pattern, tick, or node.
- Decorative SVG is non-interactive and hidden from assistive technology.
- Reduced-motion users receive fixed decorative angles.
- No new runtime or test dependency is added.

---

### Task 1: Ring Component Contract And Implementation

**Files:**
- Create: `test/counter-rotating-rings.test.mjs`
- Create: `src/components/CounterRotatingRings.tsx`

**Interfaces:**
- Consumes: `RefObject<HTMLElement | null>` named `scrollTarget`.
- Produces: default React component `CounterRotatingRings({ scrollTarget })`.

- [ ] **Step 1: Write the failing source contract test**

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../src/components/CounterRotatingRings.tsx', import.meta.url), 'utf8')

test('defines four alternating scroll-driven rings with asymmetric markings', () => {
  assert.match(source, /data-ring="1"/)
  assert.match(source, /data-ring="2"/)
  assert.match(source, /data-ring="3"/)
  assert.match(source, /data-ring="4"/)
  assert.match(source, /\[0, 360\]/)
  assert.match(source, /\[0, -295\]/)
  assert.match(source, /\[0, 425\]/)
  assert.match(source, /\[0, -245\]/)
  assert.match(source, /strokeDasharray/)
  assert.match(source, /<circle[^>]+className="ring-node/)
})
```

- [ ] **Step 2: Run the contract test and verify RED**

Run: `node --test test/counter-rotating-rings.test.mjs`
Expected: FAIL with `ENOENT` for `CounterRotatingRings.tsx`.

- [ ] **Step 3: Implement the SVG component**

```tsx
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { RefObject } from 'react'

interface CounterRotatingRingsProps {
  scrollTarget: RefObject<HTMLElement | null>
}

export default function CounterRotatingRings({ scrollTarget }: CounterRotatingRingsProps) {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ['start start', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 95, damping: 24, mass: 0.35 })
  const ring1 = useTransform(progress, [0, 1], [0, 360])
  const ring2 = useTransform(progress, [0, 1], [0, -295])
  const ring3 = useTransform(progress, [0, 1], [0, 425])
  const ring4 = useTransform(progress, [0, 1], [0, -245])
  const rotations = reduceMotion ? [10, -22, 36, -48] : [ring1, ring2, ring3, ring4]

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-[-12%] h-[124%] w-[124%] overflow-visible" viewBox="0 0 400 400">
      <defs>
        <filter id="gold-ring-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.g data-ring="1" style={{ rotate: rotations[0], transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="190" fill="none" stroke="#D8B46A" strokeWidth="1.2" strokeDasharray="5 9 30 13" />
        <circle className="ring-node" cx="200" cy="10" r="4" fill="#F7F3EC" filter="url(#gold-ring-glow)" />
      </motion.g>
      <motion.g data-ring="2" style={{ rotate: rotations[1], transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="174" fill="none" stroke="#C89555" strokeWidth="1.8" strokeDasharray="160 24 62 40 490 318" />
        <path d="M200 20v12 M374 200h-12" stroke="#D8B46A" strokeWidth="2" />
        <circle className="ring-node" cx="77" cy="77" r="3" fill="#D8B46A" />
      </motion.g>
      <motion.g data-ring="3" style={{ rotate: rotations[2], transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="158" fill="none" stroke="#D8B46A" strokeWidth="1" strokeDasharray="2 7 18 5 45 12" />
        <circle className="ring-node" cx="200" cy="42" r="4.5" fill="#D8B46A" />
        <circle className="ring-node" cx="312" cy="312" r="2.5" fill="#F7F3EC" />
      </motion.g>
      <motion.g data-ring="4" style={{ rotate: rotations[3], transformOrigin: '200px 200px' }}>
        <circle cx="200" cy="200" r="143" fill="none" stroke="#D8B46A" strokeWidth="2" strokeDasharray="205 18 370 36 270" />
        <path d="M200 53v10 M337 200h-10 M200 337v-7" stroke="#F7F3EC" strokeWidth="1.5" />
        <circle className="ring-node" cx="99" cy="99" r="3.5" fill="#F7F3EC" filter="url(#gold-ring-glow)" />
      </motion.g>
    </svg>
  )
}
```

- [ ] **Step 4: Run the test and typecheck**

Run: `node --test test/counter-rotating-rings.test.mjs`
Expected: PASS, 1 test.

Run: `npm run typecheck`
Expected: exit 0.

### Task 2: Hero Integration And Visual Verification

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `test/counter-rotating-rings.test.mjs`

**Interfaces:**
- Consumes: `CounterRotatingRings` default export and hero `sectionRef`.
- Produces: portrait composition with animated ring layer behind the image and floral details.

- [ ] **Step 1: Extend the test before integration**

```js
const hero = readFileSync(new URL('../src/components/HeroSection.tsx', import.meta.url), 'utf8')

test('mounts rings against the fixed hero scroll target', () => {
  assert.match(hero, /ref={sectionRef}/)
  assert.match(hero, /<CounterRotatingRings scrollTarget={sectionRef} \/>/)
  assert.doesNotMatch(hero, /border-dashed border-gold\/40/)
})
```

- [ ] **Step 2: Run the integration test and verify RED**

Run: `node --test test/counter-rotating-rings.test.mjs`
Expected: FAIL because `HeroSection` does not contain `sectionRef` or `CounterRotatingRings`.

- [ ] **Step 3: Integrate the component**

```tsx
import { useRef } from 'react'
import CounterRotatingRings from './CounterRotatingRings'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  // existing motion setup remains unchanged

  return (
    <section ref={sectionRef} id="home" className="...">
      {/* existing content */}
      <div className="relative aspect-square w-full max-w-[360px]">
        <CounterRotatingRings scrollTarget={sectionRef} />
        <div className="absolute inset-0 overflow-hidden rounded-full ...">
          {/* existing portrait */}
        </div>
        {/* existing flowers and twinkles */}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run all automated verification**

Run: `node --test test/counter-rotating-rings.test.mjs`
Expected: PASS, 2 tests.

Run: `npm run build`
Expected: TypeScript and Vite exit 0.

- [ ] **Step 5: Inspect responsive behavior**

Run: `npm run dev -- --host 127.0.0.1`
Expected: Vite prints a local URL.

Inspect at desktop and mobile widths. Confirm all four groups share the portrait center, directions alternate while scrolling, no horizontal drift occurs, every ring has visible asymmetric details, floral decorations remain visible, and the composition does not overlap hero text.

- [ ] **Step 6: Commit**

```bash
git add src/components/CounterRotatingRings.tsx src/components/HeroSection.tsx test/counter-rotating-rings.test.mjs docs/superpowers/plans/2026-07-19-counter-rotating-rings.md
git commit -m "feat: add scroll-driven concentric hero rings"
```
