import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LOCALE_STORAGE_KEY, readInitialLocale } from './locale'
import type { Locale } from './types'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const metadata: Record<Locale, { title: string; description: string }> = {
  'zh-TW': {
    title: '曾慧瑜｜資料、AI 與互動設計作品集',
    description: '曾慧瑜的個人作品集，聚焦資料分析、AI 互動、使用者行為與創意科技。',
  },
  en: {
    title: 'Huiyu Tseng | Data, AI & Interaction Portfolio',
    description:
      'Huiyu Tseng’s portfolio exploring data analysis, AI interaction, human behavior, and creative technology.',
  },
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'zh-TW'
    return readInitialLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY))
  })

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.lang = locale
    document.title = metadata[locale].title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', metadata[locale].description)
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === 'zh-TW' ? 'en' : 'zh-TW')),
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
