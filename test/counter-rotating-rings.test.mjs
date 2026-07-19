import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(
  new URL('../src/components/CounterRotatingRings.tsx', import.meta.url),
  'utf8',
)
const hero = readFileSync(new URL('../src/components/HeroSection.tsx', import.meta.url), 'utf8')

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
  assert.match(source, /<circle className="ring-node/)
})

test('mounts rings against the fixed hero scroll target', () => {
  assert.match(hero, /ref={sectionRef}/)
  assert.match(hero, /<CounterRotatingRings scrollTarget={sectionRef} \/>/)
  assert.doesNotMatch(hero, /border-dashed border-gold\/40/)
})
