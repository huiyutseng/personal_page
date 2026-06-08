import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: '首頁' },
  { to: '/projects', label: '所有專案' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-white tracking-tight hover:text-sky-400 transition-colors">
          Huiyut<span className="text-sky-400">.</span>
        </Link>
        <ul className="flex gap-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors ${
                  pathname === to ? 'text-sky-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
