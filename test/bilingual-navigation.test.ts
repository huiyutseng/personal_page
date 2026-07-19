import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { localizeProject, projects } from '../src/data/projects.ts'
import { site } from '../src/data/site.ts'
import { isLocale, readInitialLocale } from '../src/i18n/locale.ts'
import { getProjectNavigation } from '../src/lib/projectNavigation.ts'

test('accepts only supported locales and defaults to Traditional Chinese', () => {
  assert.equal(isLocale('zh-TW'), true)
  assert.equal(isLocale('en'), true)
  assert.equal(isLocale('zh'), false)
  assert.equal(readInitialLocale(null), 'zh-TW')
  assert.equal(readInitialLocale('unexpected'), 'zh-TW')
  assert.equal(readInitialLocale('en'), 'en')
})

test('wraps previous and next projects at both ends', () => {
  const projects = [
    { id: 'alpha', category: 'data' },
    { id: 'beta', category: 'data' },
    { id: 'gamma', category: 'creative' },
  ]

  const first = getProjectNavigation(projects, 'alpha')
  const last = getProjectNavigation(projects, 'gamma')

  assert.equal(first?.previous.id, 'gamma')
  assert.equal(first?.next.id, 'beta')
  assert.equal(last?.previous.id, 'beta')
  assert.equal(last?.next.id, 'alpha')
})

test('prefers related projects in the same category and excludes the current project', () => {
  const projects = [
    { id: 'alpha', category: 'data' },
    { id: 'beta', category: 'data' },
    { id: 'gamma', category: 'creative' },
    { id: 'delta', category: 'data' },
    { id: 'epsilon', category: 'ai' },
  ]

  const navigation = getProjectNavigation(projects, 'alpha')

  assert.deepEqual(
    navigation?.related.map((project) => project.id),
    ['beta', 'delta', 'gamma'],
  )
  assert.equal(navigation?.related.some((project) => project.id === 'alpha'), false)
})

test('language provider updates document language and persists the locale', () => {
  const providerSource = readFileSync(
    new URL('../src/i18n/LanguageContext.tsx', import.meta.url),
    'utf8',
  )
  const localeSource = readFileSync(new URL('../src/i18n/locale.ts', import.meta.url), 'utf8')

  assert.match(localeSource, /huiyu-locale/)
  assert.match(providerSource, /document\.documentElement\.lang = locale/)
  assert.match(providerSource, /localStorage\.setItem/)
})

test('site and every project provide complete bilingual content', () => {
  assert.ok(site['zh-TW'])
  assert.ok(site.en)
  assert.equal(projects.length, 15)

  for (const project of projects) {
    assert.ok(project.content['zh-TW'].name)
    assert.ok(project.content.en.name)
    assert.ok(project.content['zh-TW'].detail.problem)
    assert.ok(project.content.en.detail.result)
  }
})

test('project tags are localized in Traditional Chinese', () => {
  const project = projects.find((item) => item.id === 'risk-dashboard-concept')
  assert.ok(project)
  assert.deepEqual(localizeProject(project, 'zh-TW').tags, [
    '儀表板',
    '風險分析',
    '系統思考',
  ])
  assert.deepEqual(localizeProject(project, 'en').tags, project.tags)
})

test('all visible sections consume the active language', () => {
  const files = [
    'Navbar.tsx',
    'HeroSection.tsx',
    'AboutSection.tsx',
    'ProjectsSection.tsx',
    'ProjectCard.tsx',
    'JourneySection.tsx',
    'FeaturedProjectSection.tsx',
    'ContactSection.tsx',
    'Footer.tsx',
  ]

  for (const file of files) {
    const source = readFileSync(
      new URL(`../src/components/${file}`, import.meta.url),
      'utf8',
    )
    assert.match(source, /useLanguage/)
  }

  const navbar = readFileSync(
    new URL('../src/components/Navbar.tsx', import.meta.url),
    'utf8',
  )
  assert.match(navbar, /aria-pressed/)
  assert.match(navbar, /切換為繁體中文/)
  assert.match(navbar, /Switch to English/)
  assert.match(navbar, /lang=\{value\}/)
})

test('the repository test command is part of the deployment workflow', () => {
  const packageSource = readFileSync(new URL('../package.json', import.meta.url), 'utf8')
  const workflowSource = readFileSync(
    new URL('../.github/workflows/deploy.yml', import.meta.url),
    'utf8',
  )

  assert.match(packageSource, /"test": "node --test/)
  assert.match(workflowSource, /node-version: '24'/)
  assert.match(workflowSource, /run: npm test/)
})

test('project detail renders localized exploration navigation', () => {
  const source = readFileSync(
    new URL('../src/pages/ProjectDetail.tsx', import.meta.url),
    'utf8',
  )

  assert.match(source, /useLanguage/)
  assert.match(source, /getProjectNavigation/)
  assert.match(source, /projectDetail\.previous/)
  assert.match(source, /projectDetail\.back/)
  assert.match(source, /projectDetail\.next/)
  assert.match(source, /projectDetail\.related/)
})

test('static document metadata starts with valid Traditional Chinese copy', () => {
  const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.match(source, /曾慧瑜的個人作品集/)
  assert.match(source, /<html lang="zh-TW">/)
})
