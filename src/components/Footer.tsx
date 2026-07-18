import { Sparkles } from 'lucide-react'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-navy-black px-5 py-10 text-center sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
        <span className="flex items-center gap-2 font-serif-en text-sm text-ink-dark-soft">
          <Sparkles className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
          {site.brand}
        </span>
      </div>
    </footer>
  )
}
