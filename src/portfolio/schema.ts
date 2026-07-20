import type { Locale, LocalizedText } from '../i18n/types'
import type { JourneyMilestone, Project, ProjectCategory } from '../data/types'

export type PortfolioProject = Project

export interface ThemeColors {
  navyDeep: string
  navyBlack: string
  navyCard: string
  cream: string
  creamLight: string
  lavender: string
  lavenderPink: string
  pinkSoft: string
  gold: string
  goldWarm: string
  inkDark: string
  inkDarkSoft: string
  inkLight: string
  inkLightSoft: string
}

export const THEME_COLOR_KEYS: (keyof ThemeColors)[] = [
  'navyDeep',
  'navyBlack',
  'navyCard',
  'cream',
  'creamLight',
  'lavender',
  'lavenderPink',
  'pinkSoft',
  'gold',
  'goldWarm',
  'inkDark',
  'inkDarkSoft',
  'inkLight',
  'inkLightSoft',
]

export const THEME_COLOR_CSS_VARS: Record<keyof ThemeColors, string> = {
  navyDeep: '--color-navy-deep',
  navyBlack: '--color-navy-black',
  navyCard: '--color-navy-card',
  cream: '--color-cream',
  creamLight: '--color-cream-light',
  lavender: '--color-lavender',
  lavenderPink: '--color-lavender-pink',
  pinkSoft: '--color-pink-soft',
  gold: '--color-gold',
  goldWarm: '--color-gold-warm',
  inkDark: '--color-ink-dark',
  inkDarkSoft: '--color-ink-dark-soft',
  inkLight: '--color-ink-light',
  inkLightSoft: '--color-ink-light-soft',
}

export interface ThemeConfig {
  id: string
  label: LocalizedText
  colors: ThemeColors
}

export interface NavItem {
  id: string
  label: string
}

export interface AboutColumn {
  icon: 'Eye' | 'Brain' | 'Sprout'
  title: string
  body: string
}

export interface SiteContent {
  nav: NavItem[]
  hero: {
    greeting: string
    name: string
    tagline: string[]
    description: string[]
    ctaPrimary: string
    ctaSecondary: string
    sideNote: string[]
    scrollHint: string
    portraitAlt: string
  }
  about: {
    title: string
    subtitle: string
    columns: AboutColumn[]
  }
  projects: {
    title: string
    subtitle: string
    viewDetails: string
    tabsLabel: string
    empty: string
  }
  journey: {
    title: string
    subtitle: string
  }
  featured: {
    eyebrow: string
    viewDetails: string
  }
  contact: {
    title: string
    subtitle: string
    resumeLabel: string
    deviceNames: string[]
    previewAlt: string
  }
  footer: string
  common: {
    connect: string
    openMenu: string
    closeMenu: string
    language: string
  }
  projectDetail: {
    back: string
    notFound: string
    problem: string
    approach: string
    result: string
    imageAlt: string
    liveDemo: string
    previous: string
    next: string
    navigationLabel: string
    related: string
  }
}

export interface PortfolioSiteMeta {
  brand: string
  contact: {
    email: string
    github: string
    githubUrl: string
    linkedin: string
    linkedinUrl: string
    resumePath: string
    devicePreviewImage: string
  }
  hero: {
    portraitImage: string
  }
}

export interface PortfolioData {
  version: number
  theme: ThemeConfig
  site: PortfolioSiteMeta
  content: Record<Locale, SiteContent>
  projects: PortfolioProject[]
  journey: JourneyMilestone[]
}

export type { ProjectCategory }
