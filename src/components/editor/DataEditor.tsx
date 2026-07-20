import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { usePortfolio } from '../../portfolio/PortfolioContext'

export default function DataEditor() {
  const { exportData, importData, resetToDefault } = usePortfolio()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  function handleExport() {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const text = await file.text()
    const result = importData(text)
    if (result.ok) {
      setMessage({ type: 'success', text: 'Portfolio data imported.' })
    } else {
      setMessage({
        type: 'error',
        text:
          result.error === 'invalid-json'
            ? 'That file is not valid JSON.'
            : 'That JSON does not match the portfolio schema — nothing was changed.',
      })
    }
  }

  function handleReset() {
    if (window.confirm('Reset all content and theme back to the default portfolio? This cannot be undone.')) {
      resetToDefault()
      setMessage({ type: 'success', text: 'Reset to the default portfolio.' })
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">
        Edits autosave to this browser&apos;s local storage as you type. Export a JSON snapshot to back it up or
        move it to another browser.
      </p>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleExport}
          className="w-full rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-white"
        >
          Export portfolio.json
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
        >
          Import JSON…
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleImportFile}
        />

        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-md border border-red-900 px-3 py-2 text-sm text-red-400 hover:bg-red-950"
        >
          Reset to default
        </button>
      </div>

      {message && (
        <p className={`text-xs ${message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </div>
  )
}
