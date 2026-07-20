import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ShootingStar from './components/ShootingStar'
import SparkleTrail from './components/SparkleTrail'
import StarCursor from './components/StarCursor'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

// The editor is a dev-only authoring tool: it is never bundled into the
// reachable production app. The dynamic import is only ever invoked when
// import.meta.env.DEV is true, so production builds never request this chunk.
const Editor = import.meta.env.DEV ? lazy(() => import('./pages/Editor')) : null

export default function App() {
  const location = useLocation()

  if (import.meta.env.DEV && Editor && location.pathname === '/editor') {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-navy-black text-ink-dark">
            Loading editor…
          </div>
        }
      >
        <Editor />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-navy-black text-ink-dark">
      <StarCursor />
      <SparkleTrail />
      <ShootingStar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}
