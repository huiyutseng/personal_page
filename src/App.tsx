import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ShootingStar from './components/ShootingStar'
import SparkleTrail from './components/SparkleTrail'
import StarCursor from './components/StarCursor'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
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
