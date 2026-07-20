import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Locale } from '../../i18n/types'

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'zh-TW', label: '中文' },
  { id: 'en', label: 'EN' },
]

export default function LocaleTabs({ render }: { render: (locale: Locale) => ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh-TW')

  return (
    <div>
      <div className="mb-3 flex gap-1">
        {LOCALES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id)}
            className={`rounded px-2 py-1 text-xs transition-colors ${
              locale === item.id ? 'bg-slate-100 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {render(locale)}
    </div>
  )
}
