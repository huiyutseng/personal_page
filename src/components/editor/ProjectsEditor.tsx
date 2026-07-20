import { useState } from 'react'
import type { MouseEvent } from 'react'
import { PROJECT_CATEGORIES, categoryLabels } from '../../data/projects'
import type { ProjectCategory } from '../../data/types'
import { usePortfolio } from '../../portfolio/PortfolioContext'
import LocaleTabs from './LocaleTabs'
import TextArea from './TextArea'
import TextField from './TextField'

function stopSummaryToggle(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
}

export default function ProjectsEditor() {
  const { data, addProject, removeProject, moveProject, updateProject } = usePortfolio()
  const [newCategory, setNewCategory] = useState<ProjectCategory>(PROJECT_CATEGORIES[0])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded border border-slate-800 p-2">
        <select
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value as ProjectCategory)}
          className="flex-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100"
        >
          {PROJECT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {categoryLabels.en[category]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => addProject(newCategory)}
          className="shrink-0 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-900"
        >
          + Add project
        </button>
      </div>

      {data.projects.map((project, index) => (
        <details key={project.id} className="rounded-md border border-slate-800">
          <summary className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-slate-200">
            <span className="truncate">
              {project.content['zh-TW'].name || project.content.en.name || project.id}
            </span>
            <span className="flex shrink-0 gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={(event) => {
                  stopSummaryToggle(event)
                  moveProject(project.id, 'up')
                }}
                className="rounded px-1.5 py-0.5 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                disabled={index === data.projects.length - 1}
                onClick={(event) => {
                  stopSummaryToggle(event)
                  moveProject(project.id, 'down')
                }}
                className="rounded px-1.5 py-0.5 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-30"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={(event) => {
                  stopSummaryToggle(event)
                  if (window.confirm('Remove this project?')) removeProject(project.id)
                }}
                className="rounded px-1.5 py-0.5 text-xs text-red-400 hover:bg-red-950"
              >
                Delete
              </button>
            </span>
          </summary>

          <div className="border-t border-slate-800 p-3">
            <label className="mb-3 block text-xs text-slate-300">
              <span className="mb-1 block">Category</span>
              <select
                value={project.category}
                onChange={(event) =>
                  updateProject(project.id, { category: event.target.value as ProjectCategory })
                }
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100"
              >
                {PROJECT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabels.en[category]}
                  </option>
                ))}
              </select>
            </label>
            <TextField
              label="Image path"
              value={project.image}
              onChange={(value) => updateProject(project.id, { image: value })}
            />
            <TextField
              label="Tags (comma-separated)"
              value={project.tags.join(', ')}
              onChange={(value) =>
                updateProject(project.id, {
                  tags: value
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                })
              }
            />
            <TextField
              label="GitHub URL"
              value={project.github ?? ''}
              onChange={(value) => updateProject(project.id, { github: value || undefined })}
            />
            <TextField
              label="Demo URL"
              value={project.demo ?? ''}
              onChange={(value) => updateProject(project.id, { demo: value || undefined })}
            />
            <label className="mb-3 flex items-center gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={Boolean(project.featured)}
                onChange={(event) => updateProject(project.id, { featured: event.target.checked })}
              />
              Featured project
            </label>

            <LocaleTabs
              render={(locale) => {
                const content = project.content[locale]
                const update = (patch: Partial<typeof content>) =>
                  updateProject(project.id, {
                    content: { ...project.content, [locale]: { ...content, ...patch } },
                  })
                return (
                  <>
                    <TextField label="Name" value={content.name} onChange={(value) => update({ name: value })} />
                    <TextArea
                      label="Summary"
                      value={content.summary}
                      onChange={(value) => update({ summary: value })}
                    />
                    <TextArea
                      label="Problem"
                      value={content.detail.problem}
                      onChange={(value) => update({ detail: { ...content.detail, problem: value } })}
                    />
                    <TextArea
                      label="Approach"
                      value={content.detail.approach}
                      onChange={(value) => update({ detail: { ...content.detail, approach: value } })}
                    />
                    <TextArea
                      label="Result"
                      value={content.detail.result}
                      onChange={(value) => update({ detail: { ...content.detail, result: value } })}
                    />
                  </>
                )
              }}
            />
          </div>
        </details>
      ))}
    </div>
  )
}
