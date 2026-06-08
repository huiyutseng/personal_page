import { useParams, Link } from 'react-router-dom'
import Tag from '../components/Tag'
import projects from '../data/projects.json'

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-sky-400 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-sky-500 rounded-full inline-block" />
        {title}
      </h2>
      <div className="text-slate-300 leading-relaxed">{children}</div>
    </section>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-sky-400 mt-1 shrink-0">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-32 text-center">
        <p className="text-6xl mb-6">🤷</p>
        <h1 className="text-2xl font-bold text-white mb-4">找不到這個專案</h1>
        <Link to="/projects" className="text-sky-400 hover:underline">← 回到專案列表</Link>
      </main>
    )
  }

  const {
    name, oneLineSummary, type, completedAt, tags,
    motivation, problem, method, architecture, technicalChoices,
    challenges, solutions, results, futureImprovements,
    screenshot, github, demo,
  } = project

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-slate-500">
        <Link to="/" className="hover:text-sky-400 transition-colors">首頁</Link>
        <span className="mx-2">/</span>
        <Link to="/projects" className="hover:text-sky-400 transition-colors">專案</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-300">{name}</span>
      </div>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">{type}</span>
          <span className="text-xs text-slate-500">{completedAt}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{name}</h1>
        <p className="text-xl text-slate-300 mb-6">{oneLineSummary}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
        <div className="flex gap-3 flex-wrap">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 text-sm font-medium transition-colors flex items-center gap-2">
              <span>⬡</span> GitHub Repo
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium transition-colors flex items-center gap-2">
              <span>▶</span> Live Demo
            </a>
          )}
        </div>
      </header>

      {/* Screenshot */}
      {screenshot && (
        <div className="mb-12 rounded-xl overflow-hidden border border-slate-700">
          <img src={screenshot} alt={`${name} 截圖`} className="w-full" />
        </div>
      )}

      <div className="divide-y divide-slate-800">
        <div className="pb-10">
          <Section title="專案動機">
            <p>{motivation}</p>
          </Section>
          <Section title="問題背景">
            <p>{problem}</p>
          </Section>
        </div>

        <div className="py-10">
          <Section title="作法與流程">
            <p>{method}</p>
          </Section>
          <Section title="系統架構">
            <p>{architecture}</p>
          </Section>
          <Section title="技術選型">
            <p>{technicalChoices}</p>
          </Section>
        </div>

        <div className="py-10">
          <Section title="開發過程遇到的挫折">
            <BulletList items={challenges} />
          </Section>
          <Section title="解決方式">
            <BulletList items={solutions} />
          </Section>
        </div>

        <div className="py-10">
          <Section title="成果數據">
            <BulletList items={results} />
          </Section>
          <Section title="未來改進方向">
            <BulletList items={futureImprovements} />
          </Section>
        </div>
      </div>

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <Link to="/projects" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
          ← 回到所有專案
        </Link>
      </div>

      <footer className="mt-20 py-8 text-center text-slate-600 text-sm">
        <p>© 2026 Huiyut Tseng</p>
      </footer>
    </main>
  )
}
