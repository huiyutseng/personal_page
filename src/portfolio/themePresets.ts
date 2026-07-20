import type { ThemeConfig } from './schema'

const MIDNIGHT_LAVENDER: ThemeConfig = {
  id: 'midnight-lavender',
  label: { 'zh-TW': '午夜薰衣草', en: 'Midnight Lavender' },
  colors: {
    navyDeep: '#07182d',
    navyBlack: '#04101f',
    navyCard: '#0c2138',
    cream: '#f7f3ec',
    creamLight: '#fffdf8',
    lavender: '#b8a7d9',
    lavenderPink: '#d8c4e8',
    pinkSoft: '#f2b8c1',
    gold: '#d8b46a',
    goldWarm: '#c89555',
    inkDark: '#f7f3ec',
    inkDarkSoft: '#c9c6c2',
    inkLight: '#172033',
    inkLightSoft: '#65616a',
  },
}

const ROSE_GOLD_DAWN: ThemeConfig = {
  id: 'rose-gold-dawn',
  label: { 'zh-TW': '玫瑰金曙光', en: 'Rose Gold Dawn' },
  colors: {
    navyDeep: '#2b1625',
    navyBlack: '#1a0e17',
    navyCard: '#3a1f30',
    cream: '#fbeee6',
    creamLight: '#fff8f3',
    lavender: '#e8a2b0',
    lavenderPink: '#f0bfc9',
    pinkSoft: '#f6d5c3',
    gold: '#d98a5f',
    goldWarm: '#c06f46',
    inkDark: '#fbeee6',
    inkDarkSoft: '#d8c2c9',
    inkLight: '#2b1625',
    inkLightSoft: '#6b525d',
  },
}

const SAGE_MINIMALIST: ThemeConfig = {
  id: 'sage-minimalist',
  label: { 'zh-TW': '鼠尾草極簡', en: 'Sage Minimalist' },
  colors: {
    navyDeep: '#17231b',
    navyBlack: '#0f1712',
    navyCard: '#202f25',
    cream: '#f3f1e8',
    creamLight: '#faf9f2',
    lavender: '#9db98f',
    lavenderPink: '#b9cfaf',
    pinkSoft: '#d7c9a8',
    gold: '#c9a34b',
    goldWarm: '#a9853a',
    inkDark: '#f3f1e8',
    inkDarkSoft: '#c7c9bd',
    inkLight: '#202b1f',
    inkLightSoft: '#5c6357',
  },
}

const OCEAN_SLATE: ThemeConfig = {
  id: 'ocean-slate',
  label: { 'zh-TW': '深海板岩', en: 'Ocean Slate' },
  colors: {
    navyDeep: '#0a2433',
    navyBlack: '#051620',
    navyCard: '#103245',
    cream: '#eef4f6',
    creamLight: '#f8fbfc',
    lavender: '#7fb8c4',
    lavenderPink: '#a3cfd7',
    pinkSoft: '#cde3d9',
    gold: '#e0a458',
    goldWarm: '#c2853c',
    inkDark: '#eef4f6',
    inkDarkSoft: '#b9c9cd',
    inkLight: '#123240',
    inkLightSoft: '#5b7079',
  },
}

export const THEME_PRESETS: ThemeConfig[] = [
  MIDNIGHT_LAVENDER,
  ROSE_GOLD_DAWN,
  SAGE_MINIMALIST,
  OCEAN_SLATE,
]

export function getThemePresetById(id: string): ThemeConfig | undefined {
  return THEME_PRESETS.find((preset) => preset.id === id)
}
