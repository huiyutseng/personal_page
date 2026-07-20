import { useState } from 'react'
import ContentEditor from '../components/editor/ContentEditor'
import DataEditor from '../components/editor/DataEditor'
import JourneyEditor from '../components/editor/JourneyEditor'
import ProjectsEditor from '../components/editor/ProjectsEditor'
import ThemeEditor from '../components/editor/ThemeEditor'
import Footer from '../components/Footer'
import Home from './Home'

const TABS = [
  { id: 'content', label: 'Content' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'theme', label: 'Theme' },
  { id: 'data', label: 'Data' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function Editor() {
  const [tab, setTab] = useState<TabId>('content')

  return (
    <div className="flex h-screen w-full flex-col bg-slate-950 text-slate-100 lg:flex-row">
      <div className="order-2 flex-1 overflow-y-auto lg:order-1">
        <div className="sticky top-0 z-10 bg-slate-950/90 px-4 py-2 text-xs uppercase tracking-wide text-slate-400 backdrop-blur">
          Live Preview <span className="normal-case text-slate-500">(fixed navbar chrome not shown here — edit its labels in the Content tab)</span>
        </div>
        <Home />
        <Footer />
      </div>

      <div className="order-1 flex w-full shrink-0 flex-col border-b border-slate-800 lg:order-2 lg:h-full lg:w-[420px] lg:border-b-0 lg:border-l">
        <div className="flex gap-1 overflow-x-auto p-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors ${
                tab === item.id ? 'bg-slate-100 text-slate-900' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto border-t border-slate-800 p-4">
          {tab === 'content' && <ContentEditor />}
          {tab === 'projects' && <ProjectsEditor />}
          {tab === 'journey' && <JourneyEditor />}
          {tab === 'theme' && <ThemeEditor />}
          {tab === 'data' && <DataEditor />}
        </div>
      </div>
    </div>
  )
}
