import type { Locale, LocalizedText } from '../i18n/types'

export type ProjectCategory = 'Data & Systems' | 'AI & Interaction' | 'Creative Experiments'

export interface ProjectDetail {
  problem: string
  approach: string
  result: string
}

export interface ProjectContent {
  name: string
  summary: string
  detail: ProjectDetail
}

export interface Project {
  id: string
  category: ProjectCategory
  content: Record<Locale, ProjectContent>
  tags: string[]
  image: string
  github?: string
  demo?: string
  featured?: boolean
}

export interface LocalizedProject extends Omit<Project, 'content' | 'category'>, ProjectContent {
  category: ProjectCategory
  categoryLabel: string
}

export interface JourneyMilestone {
  id: string
  icon: 'ShieldCheck' | 'Landmark' | 'Globe2' | 'GraduationCap' | 'BrainCircuit'
  title: LocalizedText
  description: LocalizedText
}

export interface LocalizedJourneyMilestone extends Omit<JourneyMilestone, 'title' | 'description'> {
  title: string
  description: string
}
