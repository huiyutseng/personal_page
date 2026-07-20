import { usePortfolio } from '../../portfolio/PortfolioContext'
import LocaleTabs from './LocaleTabs'
import TextArea from './TextArea'
import TextField from './TextField'

const ICON_OPTIONS = ['ShieldCheck', 'Landmark', 'Globe2', 'GraduationCap', 'BrainCircuit'] as const

export default function JourneyEditor() {
  const { data, setData } = usePortfolio()

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400">
        Milestones are edited in place (add/remove is not part of this MVP).
      </p>
      <LocaleTabs
        render={(locale) => (
          <div className="space-y-3">
            {data.journey.map((milestone, index) => (
              <div key={milestone.id} className="rounded border border-slate-800 p-2">
                <label className="mb-2 block text-xs text-slate-300">
                  <span className="mb-1 block">Icon</span>
                  <select
                    value={milestone.icon}
                    onChange={(event) => {
                      const icon = event.target.value as (typeof ICON_OPTIONS)[number]
                      setData((prev) => ({
                        ...prev,
                        journey: prev.journey.map((m, i) => (i === index ? { ...m, icon } : m)),
                      }))
                    }}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100"
                  >
                    {ICON_OPTIONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </label>
                <TextField
                  label="Title"
                  value={milestone.title[locale]}
                  onChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      journey: prev.journey.map((m, i) =>
                        i === index ? { ...m, title: { ...m.title, [locale]: value } } : m,
                      ),
                    }))
                  }
                />
                <TextArea
                  label="Description"
                  value={milestone.description[locale]}
                  onChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      journey: prev.journey.map((m, i) =>
                        i === index ? { ...m, description: { ...m.description, [locale]: value } } : m,
                      ),
                    }))
                  }
                />
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
