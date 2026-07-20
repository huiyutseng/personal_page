import { usePortfolio } from '../../portfolio/PortfolioContext'
import type { SiteContent } from '../../portfolio/schema'
import type { Locale } from '../../i18n/types'
import LocaleTabs from './LocaleTabs'
import TextArea from './TextArea'
import TextField from './TextField'

const ICON_OPTIONS = ['Eye', 'Brain', 'Sprout'] as const

function linesToArray(value: string): string[] {
  return value.split('\n')
}

export default function ContentEditor() {
  const { data, setData } = usePortfolio()

  function updateSiteMeta(updater: (site: typeof data.site) => typeof data.site) {
    setData((prev) => ({ ...prev, site: updater(prev.site) }))
  }

  function updateContent(locale: Locale, updater: (content: SiteContent) => SiteContent) {
    setData((prev) => ({ ...prev, content: { ...prev.content, [locale]: updater(prev.content[locale]) } }))
  }

  return (
    <div className="space-y-4">
      <details open className="rounded-md border border-slate-800">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-slate-200">Site & Contact</summary>
        <div className="border-t border-slate-800 p-3">
          <TextField
            label="Brand name"
            value={data.site.brand}
            onChange={(value) => updateSiteMeta((site) => ({ ...site, brand: value }))}
          />
          <TextField
            label="Email"
            value={data.site.contact.email}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, email: value } }))
            }
          />
          <TextField
            label="GitHub handle"
            value={data.site.contact.github}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, github: value } }))
            }
          />
          <TextField
            label="GitHub URL"
            value={data.site.contact.githubUrl}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, githubUrl: value } }))
            }
          />
          <TextField
            label="LinkedIn handle"
            value={data.site.contact.linkedin}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, linkedin: value } }))
            }
          />
          <TextField
            label="LinkedIn URL"
            value={data.site.contact.linkedinUrl}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, linkedinUrl: value } }))
            }
          />
          <TextField
            label="Resume file path"
            value={data.site.contact.resumePath}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, resumePath: value } }))
            }
          />
          <TextField
            label="Device preview image"
            value={data.site.contact.devicePreviewImage}
            onChange={(value) =>
              updateSiteMeta((site) => ({ ...site, contact: { ...site.contact, devicePreviewImage: value } }))
            }
          />
          <TextField
            label="Portrait image"
            value={data.site.hero.portraitImage}
            onChange={(value) => updateSiteMeta((site) => ({ ...site, hero: { ...site.hero, portraitImage: value } }))}
          />
        </div>
      </details>

      <details open className="rounded-md border border-slate-800">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-slate-200">Hero</summary>
        <div className="border-t border-slate-800 p-3">
          <LocaleTabs
            render={(locale) => {
              const hero = data.content[locale].hero
              const update = (patch: Partial<typeof hero>) =>
                updateContent(locale, (content) => ({ ...content, hero: { ...content.hero, ...patch } }))
              return (
                <>
                  <TextField label="Greeting" value={hero.greeting} onChange={(v) => update({ greeting: v })} />
                  <TextField label="Name" value={hero.name} onChange={(v) => update({ name: v })} />
                  <TextArea
                    label="Tagline (one line per row)"
                    value={hero.tagline.join('\n')}
                    onChange={(v) => update({ tagline: linesToArray(v) })}
                  />
                  <TextArea
                    label="Description (one line per row)"
                    value={hero.description.join('\n')}
                    onChange={(v) => update({ description: linesToArray(v) })}
                  />
                  <TextField label="Primary CTA" value={hero.ctaPrimary} onChange={(v) => update({ ctaPrimary: v })} />
                  <TextField
                    label="Secondary CTA"
                    value={hero.ctaSecondary}
                    onChange={(v) => update({ ctaSecondary: v })}
                  />
                  <TextArea
                    label="Side note (one line per row)"
                    value={hero.sideNote.join('\n')}
                    onChange={(v) => update({ sideNote: linesToArray(v) })}
                  />
                  <TextField label="Scroll hint" value={hero.scrollHint} onChange={(v) => update({ scrollHint: v })} />
                  <TextField
                    label="Portrait alt text"
                    value={hero.portraitAlt}
                    onChange={(v) => update({ portraitAlt: v })}
                  />
                </>
              )
            }}
          />
        </div>
      </details>

      <details className="rounded-md border border-slate-800">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-slate-200">About</summary>
        <div className="border-t border-slate-800 p-3">
          <LocaleTabs
            render={(locale) => {
              const about = data.content[locale].about
              const update = (patch: Partial<typeof about>) =>
                updateContent(locale, (content) => ({ ...content, about: { ...content.about, ...patch } }))
              return (
                <>
                  <TextField label="Title" value={about.title} onChange={(v) => update({ title: v })} />
                  <TextField label="Subtitle" value={about.subtitle} onChange={(v) => update({ subtitle: v })} />
                  {about.columns.map((column, index) => (
                    <div key={index} className="mb-3 rounded border border-slate-800 p-2">
                      <label className="mb-2 block text-xs text-slate-300">
                        <span className="mb-1 block">Icon</span>
                        <select
                          value={column.icon}
                          onChange={(event) => {
                            const columns = about.columns.map((c, i) =>
                              i === index ? { ...c, icon: event.target.value as (typeof ICON_OPTIONS)[number] } : c,
                            )
                            update({ columns })
                          }}
                          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100"
                        >
                          {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </label>
                      <TextField
                        label="Column title"
                        value={column.title}
                        onChange={(value) => {
                          const columns = about.columns.map((c, i) => (i === index ? { ...c, title: value } : c))
                          update({ columns })
                        }}
                      />
                      <TextArea
                        label="Column body"
                        value={column.body}
                        onChange={(value) => {
                          const columns = about.columns.map((c, i) => (i === index ? { ...c, body: value } : c))
                          update({ columns })
                        }}
                      />
                    </div>
                  ))}
                </>
              )
            }}
          />
        </div>
      </details>

      <details className="rounded-md border border-slate-800">
        <summary className="cursor-pointer px-3 py-2 text-sm font-medium text-slate-200">
          Navigation, Contact & Footer
        </summary>
        <div className="border-t border-slate-800 p-3">
          <LocaleTabs
            render={(locale) => {
              const content = data.content[locale]
              const updateNav = (index: number, label: string) => {
                const nav = content.nav.map((item, i) => (i === index ? { ...item, label } : item))
                updateContent(locale, (c) => ({ ...c, nav }))
              }
              const updateContact = (patch: Partial<typeof content.contact>) =>
                updateContent(locale, (c) => ({ ...c, contact: { ...c.contact, ...patch } }))
              const updateFeatured = (patch: Partial<typeof content.featured>) =>
                updateContent(locale, (c) => ({ ...c, featured: { ...c.featured, ...patch } }))
              const updateProjectsCopy = (patch: Partial<typeof content.projects>) =>
                updateContent(locale, (c) => ({ ...c, projects: { ...c.projects, ...patch } }))
              const updateJourneyCopy = (patch: Partial<typeof content.journey>) =>
                updateContent(locale, (c) => ({ ...c, journey: { ...c.journey, ...patch } }))
              return (
                <>
                  <p className="mb-2 mt-1 text-xs font-medium text-slate-400">Nav labels</p>
                  {content.nav.map((item, index) => (
                    <TextField
                      key={item.id}
                      label={item.id}
                      value={item.label}
                      onChange={(value) => updateNav(index, value)}
                    />
                  ))}

                  <p className="mb-2 mt-3 text-xs font-medium text-slate-400">Projects section</p>
                  <TextField
                    label="Title"
                    value={content.projects.title}
                    onChange={(v) => updateProjectsCopy({ title: v })}
                  />
                  <TextField
                    label="Subtitle"
                    value={content.projects.subtitle}
                    onChange={(v) => updateProjectsCopy({ subtitle: v })}
                  />
                  <TextField
                    label="Empty-state text"
                    value={content.projects.empty}
                    onChange={(v) => updateProjectsCopy({ empty: v })}
                  />

                  <p className="mb-2 mt-3 text-xs font-medium text-slate-400">Journey section</p>
                  <TextField
                    label="Title"
                    value={content.journey.title}
                    onChange={(v) => updateJourneyCopy({ title: v })}
                  />
                  <TextField
                    label="Subtitle"
                    value={content.journey.subtitle}
                    onChange={(v) => updateJourneyCopy({ subtitle: v })}
                  />

                  <p className="mb-2 mt-3 text-xs font-medium text-slate-400">Featured project section</p>
                  <TextField
                    label="Eyebrow"
                    value={content.featured.eyebrow}
                    onChange={(v) => updateFeatured({ eyebrow: v })}
                  />

                  <p className="mb-2 mt-3 text-xs font-medium text-slate-400">Contact section</p>
                  <TextField label="Title" value={content.contact.title} onChange={(v) => updateContact({ title: v })} />
                  <TextField
                    label="Subtitle"
                    value={content.contact.subtitle}
                    onChange={(v) => updateContact({ subtitle: v })}
                  />
                  <TextField
                    label="Resume button label"
                    value={content.contact.resumeLabel}
                    onChange={(v) => updateContact({ resumeLabel: v })}
                  />
                  <TextArea
                    label="Device names (one per row)"
                    value={content.contact.deviceNames.join('\n')}
                    onChange={(v) => updateContact({ deviceNames: linesToArray(v) })}
                  />

                  <p className="mb-2 mt-3 text-xs font-medium text-slate-400">Footer</p>
                  <TextField
                    label="Footer text"
                    value={content.footer}
                    onChange={(v) => updateContent(locale, (c) => ({ ...c, footer: v }))}
                  />
                </>
              )
            }}
          />
        </div>
      </details>
    </div>
  )
}
