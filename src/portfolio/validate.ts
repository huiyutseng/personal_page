import { THEME_COLOR_KEYS } from './schema.ts'
import type { PortfolioData } from './schema'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasLocales(value: unknown): value is Record<'zh-TW' | 'en', unknown> {
  return isObject(value) && 'zh-TW' in value && 'en' in value
}

function isValidTheme(value: unknown): boolean {
  if (!isObject(value)) return false
  if (typeof value.id !== 'string') return false
  if (!hasLocales(value.label)) return false
  if (!isObject(value.colors)) return false
  return THEME_COLOR_KEYS.every((key) => typeof (value.colors as Record<string, unknown>)[key] === 'string')
}

function isValidProject(value: unknown): boolean {
  if (!isObject(value)) return false
  if (typeof value.id !== 'string') return false
  if (typeof value.category !== 'string') return false
  if (!Array.isArray(value.tags)) return false
  if (typeof value.image !== 'string') return false
  if (!hasLocales(value.content)) return false
  const content = value.content as Record<'zh-TW' | 'en', unknown>
  return (['zh-TW', 'en'] as const).every((locale) => {
    const entry = content[locale]
    if (!isObject(entry)) return false
    if (typeof entry.name !== 'string' || typeof entry.summary !== 'string') return false
    if (!isObject(entry.detail)) return false
    const detail = entry.detail as Record<string, unknown>
    return (
      typeof detail.problem === 'string' &&
      typeof detail.approach === 'string' &&
      typeof detail.result === 'string'
    )
  })
}

function isValidJourneyMilestone(value: unknown): boolean {
  if (!isObject(value)) return false
  if (typeof value.id !== 'string') return false
  if (typeof value.icon !== 'string') return false
  return hasLocales(value.title) && hasLocales(value.description)
}

function isValidSiteContent(value: unknown): boolean {
  if (!isObject(value)) return false
  return (
    Array.isArray(value.nav) &&
    isObject(value.hero) &&
    isObject(value.about) &&
    isObject(value.projects) &&
    isObject(value.journey) &&
    isObject(value.featured) &&
    isObject(value.contact) &&
    typeof value.footer === 'string' &&
    isObject(value.common) &&
    isObject(value.projectDetail)
  )
}

export function isPortfolioData(value: unknown): value is PortfolioData {
  if (!isObject(value)) return false
  if (typeof value.version !== 'number') return false
  if (!isValidTheme(value.theme)) return false

  if (!isObject(value.site) || typeof value.site.brand !== 'string' || !isObject(value.site.contact)) {
    return false
  }

  if (!hasLocales(value.content)) return false
  const content = value.content as Record<'zh-TW' | 'en', unknown>
  if (!isValidSiteContent(content['zh-TW']) || !isValidSiteContent(content.en)) return false

  if (!Array.isArray(value.projects) || !value.projects.every(isValidProject)) return false
  if (!Array.isArray(value.journey) || !value.journey.every(isValidJourneyMilestone)) return false

  return true
}
