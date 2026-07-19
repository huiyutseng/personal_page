# Bilingual Portfolio And Project Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a complete Traditional Chinese and English portfolio with persisted language selection and continuous project-detail exploration.

**Architecture:** A typed React language context owns locale state and document metadata. Bilingual data objects preserve stable project IDs and category keys while selectors expose localized views. Pure project-navigation helpers calculate previous, next, and related projects for the detail page.

**Tech Stack:** React 19, TypeScript 6, React Router 7, Framer Motion 12, Node built-in test runner, Vite 5.

## Global Constraints

- Default locale is `zh-TW`; supported locales are exactly `zh-TW` and `en`.
- Locale selection persists in `localStorage` and updates `<html lang>`, title, and description.
- Existing layout, animation, stable project IDs, URLs, assets, and external links remain unchanged.
- Every user-facing label and content block has both locales.
- Previous and next navigation wrap; related projects exclude the current project and return at most three.
- No new dependency is added.

---

### Task 1: Language Core And Pure Selectors

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/locale.ts`
- Create: `src/i18n/LanguageContext.tsx`
- Create: `src/lib/projectNavigation.ts`
- Create: `test/bilingual-navigation.test.mjs`
- Modify: `src/main.tsx`

**Interfaces:**
- `type Locale = 'zh-TW' | 'en'`
- `isLocale(value: unknown): value is Locale`
- `readInitialLocale(value: string | null): Locale`
- `LanguageProvider` provides `{ locale, setLocale, toggleLocale }`.
- `getProjectNavigation(projects, id)` returns `{ previous, next, related }`.

- [ ] Write a Node source-contract test asserting supported locales, Chinese fallback, storage key, document language update, provider mounting, wraparound project navigation, and related exclusion.
- [ ] Run `node --test test/bilingual-navigation.test.mjs`; expect failure because the new modules do not exist.
- [ ] Implement the typed locale helpers, context provider, document metadata effect, provider mounting, and pure project-navigation selector.
- [ ] Run `node --test test/bilingual-navigation.test.mjs`; expect all Task 1 tests to pass.
- [ ] Run `npm run typecheck`; expect exit 0.

### Task 2: Bilingual Data And Site-Wide UI

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/data/site.ts`
- Modify: `src/data/journey.ts`
- Modify: `src/data/projects.ts`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/components/AboutSection.tsx`
- Modify: `src/components/ProjectsSection.tsx`
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/JourneySection.tsx`
- Modify: `src/components/FeaturedProjectSection.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `test/bilingual-navigation.test.mjs`

**Interfaces:**
- `LocalizedText = Record<Locale, string>`.
- `LocalizedStringArray = Record<Locale, readonly string[]>`.
- `localizeProject(project, locale): LocalizedProject`.
- `localizeJourney(milestone, locale): LocalizedJourneyMilestone`.
- `site[locale]` exposes matching nav, hero, about, projects, journey, contact, footer, and common keys.

- [ ] Extend the source-contract test to require both locale keys for every project, all UI sections to consume `useLanguage`, and the Navbar to expose `aria-pressed` language controls.
- [ ] Run the focused test; expect failure because existing data and components are monolingual.
- [ ] Convert site, journey, categories, and all fifteen project records to complete bilingual data while preserving technical names and stable IDs.
- [ ] Connect every visible section and accessibility label to the active locale; add fixed-size desktop and mobile `中 / EN` controls.
- [ ] Run `node --test test/bilingual-navigation.test.mjs test/counter-rotating-rings.test.mjs`; expect all tests to pass.
- [ ] Run `npm run typecheck`; expect exit 0.

### Task 3: Project Detail Exploration

**Files:**
- Modify: `src/pages/ProjectDetail.tsx`
- Modify: `src/components/ProjectCard.tsx`
- Modify: `test/bilingual-navigation.test.mjs`

**Interfaces:**
- Consumes `getProjectNavigation(projects, project.id)`.
- Renders localized previous, back, next, and related labels and localized project views.

- [ ] Extend the contract test to require Previous Project, Back to All Projects, Next Project, and Related Projects translation keys and rendered navigation regions.
- [ ] Run the focused test; expect failure because the detail footer does not exist.
- [ ] Localize the not-found state, case-study blocks, image alt text, and external actions.
- [ ] Add responsive previous/back/next navigation with localized project names.
- [ ] Add up to three compact related project cards using the selector output.
- [ ] Run `node --test test/bilingual-navigation.test.mjs test/counter-rotating-rings.test.mjs`; expect all tests to pass.
- [ ] Run `npm run build`; expect TypeScript and Vite exit 0.
- [ ] Inspect desktop and 390px mobile layouts in both languages, reload to confirm persistence, and verify previous/next wraparound and related exclusions.
- [ ] Commit the plan, tests, language core, bilingual data, components, and project detail page with message `feat: add bilingual portfolio navigation`.
