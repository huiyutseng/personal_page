import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import FeaturedProjectSection from '../components/FeaturedProjectSection'
import HeroSection from '../components/HeroSection'
import JourneySection from '../components/JourneySection'
import ProjectsSection from '../components/ProjectsSection'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    // wait a tick so the sections below Hero have mounted/laid out first
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection />
      <FeaturedProjectSection />
      <ContactSection />
    </main>
  )
}
