import assert from 'node:assert/strict'
import test from 'node:test'
import { buildDefaultPortfolio } from '../src/portfolio/defaultData.ts'
import { addProject, createEmptyProject, moveProject, removeProject, updateProject } from '../src/portfolio/projectOps.ts'
import { getFeaturedProject, getLocalizedJourney, getLocalizedProjects } from '../src/portfolio/selectors.ts'
import { isPortfolioData } from '../src/portfolio/validate.ts'

test('buildDefaultPortfolio produces a complete bilingual dataset', () => {
  const data = buildDefaultPortfolio()
  assert.equal(data.version, 1)
  assert.ok(data.theme.colors.gold)
  assert.ok(data.content['zh-TW'])
  assert.ok(data.content.en)
  assert.ok(data.projects.length > 0)
  assert.ok(data.journey.length > 0)
})

test('buildDefaultPortfolio returns independent copies each call', () => {
  const first = buildDefaultPortfolio()
  first.projects.push(createEmptyProject('Data & Systems'))
  const second = buildDefaultPortfolio()
  assert.notEqual(first.projects.length, second.projects.length)
})

test('selectors localize projects, featured project, and journey', () => {
  const data = buildDefaultPortfolio()
  const localized = getLocalizedProjects(data, 'zh-TW')
  assert.equal(localized.length, data.projects.length)
  assert.ok(localized[0].name)

  const featured = getFeaturedProject(data, 'en')
  assert.ok(featured.name)

  const journey = getLocalizedJourney(data, 'zh-TW')
  assert.equal(journey.length, data.journey.length)
  assert.ok(journey[0].title)
})

test('projectOps: add, update, remove', () => {
  const data = buildDefaultPortfolio()
  const created = createEmptyProject('Creative Experiments')
  const added = addProject(data.projects, created)
  assert.equal(added.length, data.projects.length + 1)

  const updated = updateProject(added, created.id, { image: '/images/new.png' })
  assert.equal(updated.find((p) => p.id === created.id)?.image, '/images/new.png')

  const removed = removeProject(updated, created.id)
  assert.equal(removed.length, data.projects.length)
})

test('projectOps: moveProject swaps neighbors and clamps at boundaries', () => {
  const list = [
    createEmptyProject('Data & Systems'),
    createEmptyProject('Data & Systems'),
    createEmptyProject('Data & Systems'),
  ]
  list[0].id = 'a'
  list[1].id = 'b'
  list[2].id = 'c'

  const movedUp = moveProject(list, 'b', 'up')
  assert.deepEqual(movedUp.map((p) => p.id), ['b', 'a', 'c'])

  const noopAtTop = moveProject(list, 'a', 'up')
  assert.deepEqual(noopAtTop.map((p) => p.id), ['a', 'b', 'c'])

  const noopAtBottom = moveProject(list, 'c', 'down')
  assert.deepEqual(noopAtBottom.map((p) => p.id), ['a', 'b', 'c'])

  const movedDown = moveProject(list, 'a', 'down')
  assert.deepEqual(movedDown.map((p) => p.id), ['b', 'a', 'c'])
})

test('isPortfolioData accepts default data and rejects malformed input', () => {
  const data = buildDefaultPortfolio()
  assert.equal(isPortfolioData(data), true)
  assert.equal(isPortfolioData(null), false)
  assert.equal(isPortfolioData({}), false)
  assert.equal(isPortfolioData({ ...data, projects: 'nope' }), false)
  assert.equal(isPortfolioData({ ...data, theme: { id: 'x' } }), false)

  const brokenProjects = structuredClone(data)
  brokenProjects.projects[0] = { ...brokenProjects.projects[0], content: undefined } as never
  assert.equal(isPortfolioData(brokenProjects), false)
})
