import type { ProjectCategory, ProjectContent } from '../data/types'
import type { PortfolioProject } from './schema'

export function addProject(
  list: PortfolioProject[],
  project: PortfolioProject,
): PortfolioProject[] {
  return [...list, project]
}

export function removeProject(list: PortfolioProject[], id: string): PortfolioProject[] {
  return list.filter((project) => project.id !== id)
}

export function moveProject(
  list: PortfolioProject[],
  id: string,
  direction: 'up' | 'down',
): PortfolioProject[] {
  const index = list.findIndex((project) => project.id === id)
  if (index < 0) return list

  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= list.length) return list

  const next = [...list]
  ;[next[index], next[targetIndex]] = [next[targetIndex], next[index]]
  return next
}

export function updateProject(
  list: PortfolioProject[],
  id: string,
  patch: Partial<Omit<PortfolioProject, 'id'>>,
): PortfolioProject[] {
  return list.map((project) => (project.id === id ? { ...project, ...patch } : project))
}

function emptyProjectContent(): ProjectContent {
  return { name: '', summary: '', detail: { problem: '', approach: '', result: '' } }
}

export function createEmptyProject(category: ProjectCategory): PortfolioProject {
  const id = `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
  return {
    id,
    category,
    tags: [],
    image: '',
    featured: false,
    content: {
      'zh-TW': emptyProjectContent(),
      en: emptyProjectContent(),
    },
  }
}
