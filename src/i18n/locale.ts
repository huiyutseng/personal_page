import type { Locale } from './types'

export const DEFAULT_LOCALE: Locale = 'zh-TW'
export const LOCALE_STORAGE_KEY = 'huiyu-locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'zh-TW' || value === 'en'
}

export function readInitialLocale(value: string | null): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE
}
