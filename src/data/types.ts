export type ProjectCategory = 'Data & Systems' | 'AI & Interaction' | 'Creative Experiments'

export interface ProjectDetail {
  problem: string
  approach: string
  result: string
}

export interface Project {
  id: string
  category: ProjectCategory
  name: string
  /** one-line tech/summary line shown under the title, e.g. "Emotion Tracking · Streamlit · Data Visualization" */
  summary: string
  tags: string[]
  /** path under /public, e.g. "/images/life-insight-ai.png" — see src/data/README placeholder note */
  image: string
  github?: string
  demo?: string
  detail: ProjectDetail
  featured?: boolean
}

export interface JourneyMilestone {
  id: string
  /** lucide-react icon component name, resolved in JourneySection */
  icon: 'ShieldCheck' | 'Landmark' | 'Globe2' | 'GraduationCap' | 'BrainCircuit'
  title: string
  description: string
}
