// Central place for all copy + contact info + asset paths.
// Update the values below to personalize the site — no component edits needed.

export const site = {
  brand: 'Signal Garden',
  brandZh: '微光訊號花園',

  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    greeting: "Hi, I'm",
    name: 'Huiyu',
    tagline: ['I explore the small signals', 'between people, data, and technology.'],
    taglineZh: [
      '我觀察那些容易被忽略的微小訊號，',
      '並用資料、設計與科技，',
      '將它們轉化為有意義的體驗。',
    ],
    ctaPrimary: 'Explore My Projects',
    ctaSecondary: 'Get to Know Me',
    sideNote: ['Every', 'micro-moment', 'leaves a signal.'],
    scrollHint: 'Scroll to explore',
    // Drop a real portrait at this path to replace the placeholder frame.
    portraitImage: '/images/profile.jpg',
  },

  about: {
    title: 'About Me',
    subtitle: 'I see the invisible, and make it meaningful.',
    columns: [
      {
        icon: 'Eye' as const,
        title: 'What I Notice',
        body: '我觀察人與系統之間\n微小的互動與變化，\n那些容易被忽略的細節。',
      },
      {
        icon: 'Brain' as const,
        title: 'How I Think',
        body: '我喜歡拆解問題、連結脈絡，\n用資料與邏輯找到背後的\n模式與意義。',
      },
      {
        icon: 'Sprout' as const,
        title: 'What I Build',
        body: '我透過程式、設計與創意，\n將想法實際落地，\n創造有價值的體驗與作品。',
      },
    ],
  },

  projects: {
    title: 'Projects',
    subtitle: 'Selected works',
    viewAll: 'View Project Details',
  },

  journey: {
    title: 'My Journey',
    subtitle: 'A path of curiosity and growth.',
  },

  contact: {
    title: "Let's Connect",
    subtitle: "I'd love to hear from you!",
    email: 'huiyu.work@gmail.com',
    github: 'github.com/Huiyu',
    githubUrl: 'https://github.com/Huiyu',
    linkedin: 'linkedin.com/in/huiyu',
    linkedinUrl: 'https://www.linkedin.com/in/huiyu',
    resumeLabel: 'Download Resume',
    // Drop the real PDF at public/resume/resume.pdf to make this link live.
    resumePath: '/resume/resume.pdf',
    devicePreviewImage: '/images/device-preview.png',
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Huiyu. All rights reserved.`,
  },
} as const
