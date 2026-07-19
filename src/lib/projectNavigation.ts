interface NavigableProject {
  id: string
  category: string
}

export function getProjectNavigation<T extends NavigableProject>(
  projects: readonly T[],
  currentId: string,
) {
  const currentIndex = projects.findIndex((project) => project.id === currentId)
  if (currentIndex < 0 || projects.length === 0) return null

  const current = projects[currentIndex]
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]
  const sameCategory = projects.filter(
    (project) => project.id !== current.id && project.category === current.category,
  )
  const remaining = projects.filter(
    (project) => project.id !== current.id && project.category !== current.category,
  )

  return {
    previous,
    next,
    related: [...sameCategory, ...remaining].slice(0, 3),
  }
}
