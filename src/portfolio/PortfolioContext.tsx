import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { buildDefaultPortfolio } from './defaultData'
import { addProject, createEmptyProject, moveProject, removeProject, updateProject } from './projectOps'
import { THEME_COLOR_CSS_VARS } from './schema'
import type { PortfolioData, PortfolioProject, ProjectCategory, ThemeColors, ThemeConfig } from './schema'
import { getThemePresetById } from './themePresets'
import { isPortfolioData } from './validate'

const STORAGE_KEY = 'portfolio:data'

function loadInitialData(): PortfolioData {
  if (typeof window === 'undefined') return buildDefaultPortfolio()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildDefaultPortfolio()
    const parsed = JSON.parse(raw)
    if (isPortfolioData(parsed)) return parsed
  } catch {
    // malformed localStorage content — fall through to the default seed
  }
  return buildDefaultPortfolio()
}

export type ImportResult = { ok: true } | { ok: false; error: 'invalid-json' | 'invalid-shape' }

interface PortfolioContextValue {
  data: PortfolioData
  setData: (updater: PortfolioData | ((prev: PortfolioData) => PortfolioData)) => void
  addProject: (category: ProjectCategory) => void
  removeProject: (id: string) => void
  moveProject: (id: string, direction: 'up' | 'down') => void
  updateProject: (id: string, patch: Partial<Omit<PortfolioProject, 'id'>>) => void
  applyTheme: (theme: ThemeConfig) => void
  applyPresetById: (id: string) => void
  importData: (json: string) => ImportResult
  exportData: () => string
  resetToDefault: () => void
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(loadInitialData)
  const saveTimeout = useRef<number | undefined>(undefined)

  const setData = useCallback(
    (updater: PortfolioData | ((prev: PortfolioData) => PortfolioData)) => {
      setDataState((prev) =>
        typeof updater === 'function' ? (updater as (prev: PortfolioData) => PortfolioData)(prev) : updater,
      )
    },
    [],
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.clearTimeout(saveTimeout.current)
    saveTimeout.current = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }, 300)
    return () => window.clearTimeout(saveTimeout.current)
  }, [data])

  useEffect(() => {
    const root = document.documentElement
    const entries = Object.entries(THEME_COLOR_CSS_VARS) as [keyof ThemeColors, string][]
    for (const [key, cssVar] of entries) {
      root.style.setProperty(cssVar, data.theme.colors[key])
    }
  }, [data.theme])

  const value = useMemo<PortfolioContextValue>(
    () => ({
      data,
      setData,
      addProject: (category) =>
        setData((prev) => ({ ...prev, projects: addProject(prev.projects, createEmptyProject(category)) })),
      removeProject: (id) => setData((prev) => ({ ...prev, projects: removeProject(prev.projects, id) })),
      moveProject: (id, direction) =>
        setData((prev) => ({ ...prev, projects: moveProject(prev.projects, id, direction) })),
      updateProject: (id, patch) =>
        setData((prev) => ({ ...prev, projects: updateProject(prev.projects, id, patch) })),
      applyTheme: (theme) => setData((prev) => ({ ...prev, theme })),
      applyPresetById: (id) => {
        const preset = getThemePresetById(id)
        if (preset) setData((prev) => ({ ...prev, theme: preset }))
      },
      importData: (json) => {
        let parsed: unknown
        try {
          parsed = JSON.parse(json)
        } catch {
          return { ok: false, error: 'invalid-json' }
        }
        if (!isPortfolioData(parsed)) return { ok: false, error: 'invalid-shape' }
        setDataState(parsed)
        return { ok: true }
      },
      exportData: () => JSON.stringify(data, null, 2),
      resetToDefault: () => setDataState(buildDefaultPortfolio()),
    }),
    [data, setData],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used within PortfolioProvider')
  return context
}
