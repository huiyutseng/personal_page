// Central place for all copy, contact info, and asset paths.
// Update values here to personalize the site without editing components.

export const site = {
  brand: 'Huiyu Tseng',
  brandZh: '曾慧瑜',

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
    tagline: ['I connect human behavior, data, and technology', 'to design clearer digital experiences.'],
    taglineZh: [
      '我關注人們在日常選擇裡留下的小訊號，',
      '用資料分析與互動設計，把模糊的感受整理成可行的洞察。',
    ],
    ctaPrimary: 'Explore My Projects',
    ctaSecondary: 'Get to Know Me',
    sideNote: ['Every', 'micro-moment', 'leaves a signal.'],
    scrollHint: 'Scroll to explore',
    portraitImage: '/images/profile.jpg',
  },

  about: {
    title: 'About Me',
    subtitle: 'I see the invisible, and make it meaningful.',
    columns: [
      {
        icon: 'Eye' as const,
        title: 'What I Notice',
        body: 'I notice the quiet context behind decisions: timing, emotion, constraints, and the small behaviors people rarely explain out loud.',
      },
      {
        icon: 'Brain' as const,
        title: 'How I Think',
        body: 'I move between systems thinking and storytelling. I like turning messy observations into patterns, hypotheses, and product directions.',
      },
      {
        icon: 'Sprout' as const,
        title: 'What I Build',
        body: 'I build data products, AI-assisted workflows, and interactive prototypes that make information easier to feel, compare, and act on.',
      },
    ],
  },

  projects: {
    title: 'Projects',
    subtitle: 'Selected works across data, AI, and creative systems.',
    viewAll: 'View Project Details',
  },

  journey: {
    title: 'My Journey',
    subtitle: 'A path of finance, systems, data, and curiosity.',
  },

  contact: {
    title: "Let's Connect",
    subtitle: 'Open to collaboration, internships, and thoughtful product conversations.',
    email: 'huiyu.work@gmail.com',
    github: 'github.com/huiyutseng',
    githubUrl: 'https://github.com/huiyutseng',
    linkedin: 'linkedin.com/in/huiyu',
    linkedinUrl: 'https://www.linkedin.com/in/huiyu',
    resumeLabel: 'Download Resume',
    resumePath: '/resume/resume.pdf',
    devicePreviewImage: '/images/device-preview.png',
  },
} as const
