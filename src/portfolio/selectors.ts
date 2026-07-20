import { categoryLabels, chineseTagLabels } from '../data/projects.ts'
import type { LocalizedJourneyMilestone, LocalizedProject } from '../data/types'
import type { Locale } from '../i18n/types'
import type { PortfolioData, PortfolioProject } from './schema'

export function localizeProject(project: PortfolioProject, locale: Locale): LocalizedProject {
  const { content, ...metadata } = project
  return {
    ...metadata,
    tags:
      locale === 'zh-TW'
        ? project.tags.map((tag) => chineseTagLabels[tag] ?? tag)
        : project.tags,
    ...content[locale],
    categoryLabel: categoryLabels[locale][project.category],
  }
}

export function getLocalizedProjects(data: PortfolioData, locale: Locale): LocalizedProject[] {
  return data.projects.map((project) => localizeProject(project, locale))
}

export function getFeaturedProject(data: PortfolioData, locale: Locale): LocalizedProject {
  const featured = data.projects.find((project) => project.featured) ?? data.projects[0]
  return localizeProject(featured, locale)
}

export function getLocalizedJourney(
  data: PortfolioData,
  locale: Locale,
): LocalizedJourneyMilestone[] {
  return data.journey.map((milestone) => ({
    id: milestone.id,
    icon: milestone.icon,
    title: milestone.title[locale],
    description: milestone.description[locale],
  }))
}
