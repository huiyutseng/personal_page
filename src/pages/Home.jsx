import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects.json'

const SKILLS = [
  { label: 'Python', icon: '🐍' },
  { label: 'React', icon: '⚛️' },
  { label: 'Data Analysis', icon: '📊' },
  { label: 'Machine Learning', icon: '🤖' },
  { label: 'SQL', icon: '🗄️' },
  { label: 'Git / GitHub', icon: '📦' },
]

const INTERESTS = ['AI 應用開發', '資料科學', '前端工程', '自動化工具', '系統設計']

const featured = projects.filter(p => p.featured)
const latest = projects.slice(0, 3)

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-5xl mx-auto px-4 py-20">
        <div className="mb-3 text-sky-400 font-mono text-sm">Hi, I&apos;m</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          Huiyut Tseng
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-2xl">
          學生開發者，專注於 <span className="text-sky-400 font-medium">AI 應用</span>、
          <span className="text-sky-400 font-medium">資料分析</span> 與
          <span className="text-sky-400 font-medium">全端開發</span>。
        </p>
        <p className="text-slate-400 text-base max-w-xl mb-10 leading-relaxed">
          喜歡把想法做成可以跑的東西。這裡放的是我做過的 side project、課堂專案、
          AI 實驗，以及它們背後踩過的坑和學到的東西。
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-lg transition-colors"
          >
            看所有專案 →
          </Link>
          <a
            href="https://github.com/huiyutseng"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-sky-400 font-semibold rounded-lg transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:uuuuuuuuuu0913@gmail.com"
            className="px-6 py-3 border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-sky-400 font-semibold rounded-lg transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">技術能力</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {SKILLS.map(({ label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-sky-500 transition-colors"
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs text-slate-300 font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 mr-2">感興趣領域：</span>
          {INTERESTS.map(i => (
            <span key={i} className="text-sm px-3 py-1 rounded-full bg-slate-800 text-sky-400 border border-sky-500/30">
              {i}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">精選專案</h2>
          <Link to="/projects" className="text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Latest Projects */}
      {latest.some(p => !p.featured) && (
        <section className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">最新專案</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.filter(p => !p.featured).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Huiyut Tseng · Built with React + Vite + Tailwind CSS</p>
      </footer>
    </main>
  )
}
