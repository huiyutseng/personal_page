import { useState } from 'react'
import { usePortfolio } from '../../portfolio/PortfolioContext'
import type { ThemeConfig } from '../../portfolio/schema'
import { generateThemeFromKeyword } from '../../portfolio/themeGenerator'
import { THEME_PRESETS } from '../../portfolio/themePresets'

function Swatch({ theme }: { theme: ThemeConfig }) {
  const colors = [
    theme.colors.navyDeep,
    theme.colors.gold,
    theme.colors.lavender,
    theme.colors.cream,
    theme.colors.pinkSoft,
  ]
  return (
    <div className="flex h-6 w-full overflow-hidden rounded">
      {colors.map((color, index) => (
        <div key={index} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}

export default function ThemeEditor() {
  const { data, applyTheme, applyPresetById } = usePortfolio()
  const [keyword, setKeyword] = useState('')
  const [preview, setPreview] = useState<ThemeConfig | null>(null)

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium text-slate-400">
          Current theme: <span className="text-slate-200">{data.theme.label.en}</span>
        </p>
        <div className="space-y-2">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPresetById(preset.id)}
              className={`w-full rounded-md border p-2 text-left transition-colors ${
                data.theme.id === preset.id ? 'border-slate-100' : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-200">
                <span>{preset.label.en}</span>
                {data.theme.id === preset.id && <span className="text-[10px] text-slate-400">active</span>}
              </div>
              <Swatch theme={preset} />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-slate-800 p-3">
        <p className="mb-2 text-xs font-medium text-slate-400">Generate from a keyword</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="e.g. ocean, 森林, sunset"
            className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 focus:border-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setPreview(generateThemeFromKeyword(keyword))}
            className="shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900"
          >
            Preview
          </button>
        </div>

        {preview && (
          <div className="mt-3">
            <p className="mb-1 text-[11px] text-slate-500">{preview.label.en} (not applied yet)</p>
            <Swatch theme={preview} />
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  applyTheme(preview)
                  setPreview(null)
                }}
                className="rounded-md bg-emerald-500/90 px-3 py-1.5 text-xs font-medium text-slate-950 hover:bg-emerald-400"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Discard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
