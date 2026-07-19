# Bilingual Content And Project Navigation Design

## Goal

Provide a complete Traditional Chinese and English experience across the portfolio, replace corrupted copy, and make project detail pages easier to continue exploring.

## Language Behavior

- The first visit defaults to Traditional Chinese (`zh-TW`).
- A compact `中 / EN` segmented control appears in the desktop navigation and mobile menu.
- The selected language is stored under a stable `localStorage` key and restored on later visits.
- Changing language immediately updates visible content, `document.documentElement.lang`, the document title, and the meta description without navigation or reload.
- Invalid or unavailable stored values fall back to `zh-TW`.

## Translation Architecture

- Add a focused `LanguageProvider` and `useLanguage()` hook using React Context.
- Keep static interface copy in one typed bilingual dictionary.
- Store bilingual site, journey, category, and project content as `{ zh, en }` values rather than conditional strings scattered through components.
- Project IDs, URLs, image paths, GitHub links, demo links, icons, and category keys remain language-independent.
- Components consume the active localized view so layouts and animation behavior remain unchanged.

## Translation Scope

The following content must have complete Traditional Chinese and English variants:

- navigation, hero, About, Projects, Journey, Featured Project, Contact, and Footer;
- project category labels, all project names, summaries, tags where translation is appropriate, and case-study Problem, Approach, and Result;
- project card actions, empty states, accessibility labels, resume action, and mobile menu labels;
- project-not-found state and all project-detail headings and actions;
- document title and meta description.

Technical product names, library names, repository names, and established tool names remain unchanged.

## Project Detail Navigation

- Derive previous and next projects from the canonical `projects` array.
- Navigation wraps at both ends so every project has both actions.
- Display a three-part footer navigation: Previous Project, Back to All Projects, and Next Project.
- Back to All Projects links to `/#projects`.
- Previous and Next links use localized labels and localized project names.
- Route changes retain the active language and scroll the next case study to the top.

## Related Projects

- Show up to three projects after the case-study content.
- Prefer projects with the same category as the current project.
- Exclude the current project and avoid duplicates.
- If the category has fewer than three alternatives, fill remaining slots from the canonical project order.
- Reuse the existing project card visual language at a compact size.

## Error Handling

- Unknown project IDs render a localized not-found message and a localized Back to All Projects action.
- Corrupted or missing stored language values never prevent rendering.
- The language provider can only expose `zh-TW` or `en`.

## Accessibility And Responsive Behavior

- The language control uses buttons with `aria-pressed` and an accessible group label.
- Focus treatment follows the existing `focus-ring` pattern.
- The compact control cannot resize the navigation when labels change.
- Project footer navigation stacks on mobile and presents previous/back/next in a predictable reading order.
- Related cards remain readable without horizontal overflow.

## Verification

- Add test-first contract coverage for default language, storage validation, HTML language updates, project adjacency, wraparound behavior, and related-project filtering.
- Run the new tests in a failing state before implementation.
- Run all tests, TypeScript checking, and the Vite production build after implementation.
- Inspect desktop and mobile layouts in both languages, including language persistence after reload and all four project-detail navigation areas.
