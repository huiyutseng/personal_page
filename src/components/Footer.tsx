import { Sparkles } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { usePortfolio } from '../portfolio/PortfolioContext'

export default function Footer() {
  const { locale } = useLanguage()
  const { data } = usePortfolio()
  const copy = data.content[locale]
  const siteShared = data.site
  return (
    <footer className="border-t border-gold/10 bg-navy-black px-5 py-10 text-center sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <span className="flex items-center gap-2 font-serif-en text-sm text-ink-dark-soft">
          <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
          {siteShared.brand}
        </span>
        <span className="font-sans-tc text-xs text-ink-dark-soft/70">{copy.footer}</span>
      </div>
    </footer>
  )
}
