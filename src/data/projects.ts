import type { Project, ProjectCategory } from './types'

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Data & Systems',
  'AI & Interaction',
  'Creative Experiments',
]

// Card + detail images live under /public/images/ — drop a real file at the
// path below and it will replace the gradient placeholder automatically.
export const projects: Project[] = [
  {
    id: 'life-insight-ai',
    category: 'Data & Systems',
    name: 'youtube comment sentimental analysis',
    summary: 'Emotion Tracking · Streamlit · Data Visualization',
    tags: ['Streamlit', 'Python', 'Data Visualization', 'Emotion AI'],
    image: '/images/life-insight-ai.png',
    github: 'https://github.com/huiyutseng/youtube_comment',
    demo: undefined,
    featured: true,
    detail: {
      problem:
        '人的情緒波動往往被記錄卻沒有被理解，缺乏一個個人化且直觀的工具。',
      approach:
        '結合情緒分析與視覺化技術，讓使用者能更輕鬆地理解並反思自己的狀態。',
      result:
        '使用者建立了每日的情緒模式，並在日常生活中做出更好的選擇與調整。',
    },
  },
  {
    id: 'restaurant-micro-moment',
    category: 'AI & Interaction',
    name: 'Restaurant Micro-moment Recommendation',
    summary: 'Context-aware Systems · Personalization · User Behavior',
    tags: ['Context-aware System', 'Personalization', 'User Behavior'],
    image: '/images/micro-moment.png',
    github: 'https://github.com/huiyutseng/restaurant-micro-moment',
    demo: undefined,
    detail: {
      problem:
        '使用者在不同情境下對餐廳的需求差異很大，傳統推薦系統難以捕捉當下的微小訊號。',
      approach:
        '設計情境感知的推薦邏輯，結合時間、天氣與過往行為，動態調整推薦權重。',
      result:
        '推薦結果更貼近使用者當下情境，點擊與採用率相較靜態推薦有明顯提升。',
    },
  },
  {
    id: 'ai-3d-workflow',
    category: 'Creative Experiments',
    name: 'AI-assisted 3D Workflow',
    summary: 'Blender · ComfyUI · Generative AI',
    tags: ['Blender', 'ComfyUI', 'Generative AI'],
    image: '/images/ai-3d-workflow.png',
    github: 'https://github.com/huiyutseng/ai-3d-workflow',
    demo: undefined,
    detail: {
      problem: '傳統 3D 場景製作耗時，難以快速嘗試不同的氛圍與美術風格。',
      approach:
        '結合 Blender 建模流程與 ComfyUI 生成式管線，讓風格探索與細節生成並行進行。',
      result: '大幅縮短概念驗證的時間，能在同一天內產出多組風格化的場景提案。',
    },
  },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
