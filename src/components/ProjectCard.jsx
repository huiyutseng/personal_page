import { Link } from 'react-router-dom'
import Tag from './Tag'

const TYPE_ICON = {
  'Web Development': '🌐',
  'Data Analysis': '📊',
  'AI / Machine Learning': '🤖',
  'Automation': '⚙️',
  'School Projects': '📚',
}

export default function ProjectCard({ project }) {
  const { id, name, oneLineSummary, tags, type, completedAt, screenshot, github, demo } = project
  const icon = TYPE_ICON[type] ?? '💡'

  return (
    <div className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-sky-500 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10 flex flex-col">
      {/* thumbnail */}
      <div className="h-40 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-5xl">
        {screenshot
          ? <img src={screenshot} alt={name} className="w-full h-full object-cover" />
          : <span>{icon}</span>
        }
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">{type}</span>
          <span className="text-xs text-slate-500">{completedAt}</span>
        </div>

        <h3 className="font-semibold text-white text-lg leading-snug mb-2 group-hover:text-sky-400 transition-colors">
          <Link to={`/projects/${id}`}>{name}</Link>
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{oneLineSummary}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 4).map(tag => <Tag key={tag} label={tag} />)}
          {tags.length > 4 && <span className="text-xs text-slate-500 self-center">+{tags.length - 4}</span>}
        </div>

        <div className="flex gap-3 mt-auto">
          <Link
            to={`/projects/${id}`}
            className="flex-1 text-center py-1.5 text-sm rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-medium transition-colors"
          >
            查看詳情
          </Link>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
