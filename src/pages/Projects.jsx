import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects.json'

const ALL_TYPES = ['全部', ...Array.from(new Set(projects.map(p => p.type)))]

export default function Projects() {
  const [activeType, setActiveType] = useState('全部')
  const [search, setSearch] = useState('')

  const filtered = projects.filter(p => {
    const matchType = activeType === '全部' || p.type === activeType
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
    return matchType && matchSearch
  })

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-2">所有專案</h1>
      <p className="text-slate-400 mb-10">我做過的 side project、課堂作業與 AI 實驗。</p>

      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeType === type
                  ? 'bg-sky-500 border-sky-500 text-white'
                  : 'border-slate-600 text-slate-400 hover:border-sky-500 hover:text-sky-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="搜尋專案名稱或技術…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ml-auto px-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 w-full sm:w-64"
        />
      </div>

      {/* Count */}
      <p className="text-slate-500 text-sm mb-6">共 {filtered.length} 個專案</p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-4">🔍</p>
          <p>找不到符合的專案，試試其他關鍵字。</p>
        </div>
      )}

      <footer className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Huiyut Tseng · Built with React + Vite + Tailwind CSS</p>
      </footer>
    </main>
  )
}
