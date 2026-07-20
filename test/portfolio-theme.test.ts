import assert from 'node:assert/strict'
import test from 'node:test'
import { THEME_COLOR_KEYS } from '../src/portfolio/schema.ts'
import { generateThemeFromKeyword } from '../src/portfolio/themeGenerator.ts'
import { getThemePresetById, THEME_PRESETS } from '../src/portfolio/themePresets.ts'

const HEX_RE = /^#[0-9a-f]{6}$/i

test('every preset has a unique id and all 14 color tokens as valid hex', () => {
  const ids = new Set(THEME_PRESETS.map((preset) => preset.id))
  assert.equal(ids.size, THEME_PRESETS.length)

  for (const preset of THEME_PRESETS) {
    for (const key of THEME_COLOR_KEYS) {
      assert.match(preset.colors[key], HEX_RE, `${preset.id}.${key} should be a valid hex color`)
    }
  }
})

test('getThemePresetById finds an existing preset and returns undefined for unknown ids', () => {
  assert.equal(getThemePresetById('midnight-lavender')?.id, 'midnight-lavender')
  assert.equal(getThemePresetById('does-not-exist'), undefined)
})

test('generateThemeFromKeyword is deterministic for the same keyword', () => {
  const first = generateThemeFromKeyword('ocean')
  const second = generateThemeFromKeyword('ocean')
  assert.deepEqual(first, second)
})

test('generateThemeFromKeyword produces distinct palettes for distinct keywords', () => {
  const ocean = generateThemeFromKeyword('ocean')
  const forest = generateThemeFromKeyword('forest')
  assert.notEqual(ocean.colors.gold, forest.colors.gold)
  assert.notEqual(ocean.id, forest.id)
})

test('generateThemeFromKeyword resolves curated bilingual dictionary keywords', () => {
  const zh = generateThemeFromKeyword('海洋')
  const en = generateThemeFromKeyword('ocean')
  assert.deepEqual(zh.colors, en.colors)
})

test('generateThemeFromKeyword always returns all 14 valid hex tokens, even for unknown or empty keywords', () => {
  for (const keyword of ['a completely unlisted phrase', '', '   ', '隨便亂打的字']) {
    const theme = generateThemeFromKeyword(keyword)
    for (const key of THEME_COLOR_KEYS) {
      assert.match(theme.colors[key], HEX_RE, `keyword "${keyword}" -> ${key}`)
    }
  }
})
