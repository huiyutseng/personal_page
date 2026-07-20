import type { ThemeColors, ThemeConfig } from './schema'

const KEYWORD_HUES: Record<string, number> = {
  海洋: 200,
  ocean: 200,
  sea: 200,
  blue: 210,
  森林: 140,
  forest: 140,
  green: 140,
  nature: 130,
  玫瑰: 340,
  rose: 340,
  pink: 330,
  romantic: 330,
  日落: 25,
  sunset: 25,
  orange: 30,
  warm: 20,
  極簡: 220,
  minimal: 220,
  gray: 220,
  grey: 220,
  皇家: 260,
  royal: 260,
  purple: 270,
  violet: 265,
  沙漠: 40,
  desert: 40,
  sand: 42,
  earth: 35,
  夜晚: 230,
  night: 230,
  midnight: 235,
  dark: 235,
  薄荷: 165,
  mint: 165,
  teal: 175,
  aqua: 185,
  櫻花: 350,
  sakura: 350,
  cherry: 350,
  blossom: 345,
  金色: 45,
  gold: 45,
  luxury: 45,
  沙灘: 42,
  火焰: 10,
  fire: 10,
  red: 5,
  flame: 12,
}

function hashString(input: string): number {
  let hash = 0
  for (const char of input) {
    hash = (Math.imul(hash, 31) + char.codePointAt(0)!) >>> 0
  }
  return hash
}

function resolveBaseHue(keyword: string): number {
  const trimmed = keyword.trim()
  if (!trimmed) return 235
  const lower = trimmed.toLowerCase()
  if (lower in KEYWORD_HUES) return KEYWORD_HUES[lower]
  if (trimmed in KEYWORD_HUES) return KEYWORD_HUES[trimmed]
  return hashString(trimmed) % 360
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100
  const lNorm = l / 100
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lNorm - c / 2
  let r = 0
  let g = 0
  let b = 0
  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }
  const toHex = (value: number) => Math.round((value + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hsl(h: number, s: number, l: number): string {
  return hslToHex(((h % 360) + 360) % 360, s, l)
}

function deriveColors(baseHue: number): ThemeColors {
  const warmHue = baseHue + 40
  const softHue = baseHue - 60
  return {
    navyBlack: hsl(baseHue, 45, 7),
    navyDeep: hsl(baseHue, 42, 10),
    navyCard: hsl(baseHue, 38, 14),
    cream: hsl(warmHue, 35, 94),
    creamLight: hsl(warmHue, 40, 98),
    lavender: hsl(baseHue, 42, 68),
    lavenderPink: hsl(baseHue, 48, 80),
    pinkSoft: hsl(softHue, 55, 78),
    gold: hsl(warmHue, 55, 60),
    goldWarm: hsl(warmHue, 50, 50),
    inkDark: hsl(warmHue, 35, 94),
    inkDarkSoft: hsl(baseHue, 8, 80),
    inkLight: hsl(baseHue, 35, 14),
    inkLightSoft: hsl(baseHue, 10, 42),
  }
}

export function generateThemeFromKeyword(keyword: string): ThemeConfig {
  const trimmed = keyword.trim() || 'default'
  const baseHue = resolveBaseHue(keyword)
  return {
    id: `keyword-${hashString(trimmed).toString(36)}`,
    label: { 'zh-TW': `關鍵詞：${trimmed}`, en: `Keyword: ${trimmed}` },
    colors: deriveColors(baseHue),
  }
}
