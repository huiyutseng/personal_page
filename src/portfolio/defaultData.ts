import { journey } from '../data/journey.ts'
import { projects } from '../data/projects.ts'
import { site, siteShared } from '../data/site.ts'
import type { PortfolioData, SiteContent } from './schema.ts'
import { THEME_PRESETS } from './themePresets.ts'

export const DEFAULT_THEME = THEME_PRESETS[0]

export function buildDefaultPortfolio(): PortfolioData {
  return {
    version: 1,
    theme: structuredClone(DEFAULT_THEME),
    site: structuredClone(siteShared),
    content: {
      'zh-TW': structuredClone(site['zh-TW']) as unknown as SiteContent,
      en: structuredClone(site.en) as unknown as SiteContent,
    },
    projects: structuredClone(projects),
    journey: structuredClone(journey),
  }
}
