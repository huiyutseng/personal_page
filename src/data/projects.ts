import type { Locale } from '../i18n/types'
import type {
  LocalizedProject,
  Project,
  ProjectCategory,
  ProjectContent,
} from './types'

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Data & Systems',
  'AI & Interaction',
  'Creative Experiments',
]

type ProjectSeed = Omit<Project, 'content'> & ProjectContent

const projectSeeds: ProjectSeed[] = [
  {
    id: 'youtube-comment-sentiment',
    category: 'Data & Systems',
    name: 'YouTube Comment Sentiment Analysis',
    summary: 'Streamlit dashboard for tracking audience emotion and comment patterns.',
    tags: ['Streamlit', 'Python', 'NLP', 'Data Visualization'],
    image: '/images/life-insight-ai.png',
    github: 'https://github.com/huiyutseng/youtube_comment',
    demo: undefined,
    featured: true,
    detail: {
      problem:
        'Creators and teams often see comment volume, but not the emotional pattern behind it. The project asks how audience reaction changes across topics, timing, and engagement signals.',
      approach:
        'I built a Python pipeline and Streamlit interface to collect comments, classify sentiment, summarize keywords, and visualize changes in a way that is easy to scan.',
      result:
        'The dashboard turns raw comment threads into clearer feedback loops, helping users compare response quality and identify moments that deserve a closer read.',
    },
  },
  {
    id: 'risk-dashboard-concept',
    category: 'Data & Systems',
    name: 'Risk Signal Dashboard',
    summary: 'Dashboard concept for turning scattered risk indicators into a readable monitoring view.',
    tags: ['Dashboard', 'Risk Analysis', 'Systems Thinking'],
    image: '/images/data-systems-placeholder-1.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Risk signals often live across reports, spreadsheets, and operational notes, making it hard to see which changes deserve attention.',
      approach:
        'I structured the experience around signal priority, trend direction, and short explanatory notes so users can scan first and investigate second.',
      result:
        'The concept clarifies how a risk dashboard can support calmer decisions without overwhelming the user with every available metric.',
    },
  },
  {
    id: 'insurance-claims-map',
    category: 'Data & Systems',
    name: 'Insurance Claims Pattern Map',
    summary: 'Exploration of claim patterns across categories, timing, and customer context.',
    tags: ['Data Modeling', 'Insurance', 'Pattern Discovery'],
    image: '/images/data-systems-placeholder-2.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Claims data can reveal useful behavioral and operational patterns, but the first view is often too dense for quick interpretation.',
      approach:
        'I grouped signals by claim type, timing, and context, then designed a lightweight narrative around what changed and why it may matter.',
      result:
        'The project draft shows how analysis can move from raw records toward business questions that are easier to discuss.',
    },
  },
  {
    id: 'personal-data-lab',
    category: 'Data & Systems',
    name: 'Personal Data Lab',
    summary: 'A small analytics workspace for reflecting on habits, routines, and recurring signals.',
    tags: ['Personal Analytics', 'Visualization', 'Reflection'],
    image: '/images/data-systems-placeholder-3.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Personal tracking tools collect information, but they rarely help people form a gentle interpretation of their own patterns.',
      approach:
        'I explored how simple charts, labels, and weekly summaries could turn logs into observations instead of pressure.',
      result:
        'The concept frames data as a reflection tool, giving the user more agency over what to notice and what to ignore.',
    },
  },
  {
    id: 'study-resource-system',
    category: 'Data & Systems',
    name: 'Study Resource System',
    summary: 'A structured way to organize learning resources, notes, and project references.',
    tags: ['Information Architecture', 'Knowledge Base', 'Workflow'],
    image: '/images/data-systems-placeholder-4.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Learning materials often become scattered across tabs, documents, and folders, which makes review and reuse difficult.',
      approach:
        'I designed a simple structure for categorizing resources by topic, status, and project relevance.',
      result:
        'The system makes it easier to return to prior research and connect learning with future work.',
    },
  },
  {
    id: 'restaurant-micro-moment',
    category: 'AI & Interaction',
    name: 'Restaurant Micro-Moment Recommendation',
    summary: 'Context-aware recommendation concept shaped around user intent and timing.',
    tags: ['Context-aware Systems', 'Personalization', 'UX Research', 'Behavior Modeling'],
    image: '/images/micro-moment.png',
    github: 'https://github.com/huiyutseng/restaurant-micro-moment',
    demo: undefined,
    detail: {
      problem:
        'Restaurant choice is rarely only about food. Mood, distance, budget, weather, social context, and urgency all shape what feels like the right recommendation.',
      approach:
        'I mapped common dining micro-moments, translated them into recommendation signals, and explored how an interface could explain suggestions without feeling mechanical.',
      result:
        'The work frames recommendation as a human-context problem, connecting data signals with a more understandable and timely decision experience.',
    },
  },
  {
    id: 'ai-companion-interface',
    category: 'AI & Interaction',
    name: 'AI Companion Interface',
    summary: 'Interaction study for making AI responses feel clearer, calmer, and more context-aware.',
    tags: ['AI UX', 'Conversation Design', 'Prototype'],
    image: '/images/ai-interaction-placeholder-1.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'AI tools can be powerful but difficult to trust when the interface does not explain context, confidence, or next steps well.',
      approach:
        'I explored prompt states, response summaries, and action choices that help the user understand what the AI is doing.',
      result:
        'The prototype direction focuses on a more transparent AI workflow, where the user stays oriented instead of just receiving output.',
    },
  },
  {
    id: 'micro-moment-field-notes',
    category: 'AI & Interaction',
    name: 'Micro-Moment Field Notes',
    summary: 'A research format for capturing tiny behavioral moments before turning them into product signals.',
    tags: ['UX Research', 'Behavior', 'Field Notes'],
    image: '/images/ai-interaction-placeholder-2.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Small moments of hesitation, preference, and context are easy to lose when research is summarized too quickly.',
      approach:
        'I shaped a note-taking structure that captures trigger, emotion, constraint, and possible design opportunity.',
      result:
        'The format keeps qualitative observations useful for later product thinking and AI-assisted pattern discovery.',
    },
  },
  {
    id: 'recommendation-explainer',
    category: 'AI & Interaction',
    name: 'Recommendation Explainer',
    summary: 'A UI concept for showing why a recommendation appears without making the interface heavy.',
    tags: ['Explainable AI', 'Personalization', 'UI Design'],
    image: '/images/ai-interaction-placeholder-3.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Recommendations can feel random when users cannot see which signals influenced the result.',
      approach:
        'I tested lightweight explanation patterns such as short reason tags, confidence cues, and editable preference chips.',
      result:
        'The concept helps recommendations feel more understandable while keeping the main decision flow simple.',
    },
  },
  {
    id: 'context-aware-planner',
    category: 'AI & Interaction',
    name: 'Context-Aware Planner',
    summary: 'Planning prototype that adapts suggestions based on energy, time, and task type.',
    tags: ['Planning', 'Context-aware UX', 'AI Assistant'],
    image: '/images/ai-interaction-placeholder-4.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Task planners usually treat every item equally, even though people make plans based on energy, urgency, and available focus.',
      approach:
        'I sketched an assistant that weighs task context and offers different planning modes for deep work, errands, and recovery time.',
      result:
        'The prototype direction makes planning feel more humane by adapting structure to the user rather than forcing one rigid list.',
    },
  },
  {
    id: 'ai-3d-workflow',
    category: 'Creative Experiments',
    name: 'AI-Assisted 3D Workflow',
    summary: 'A creative production workflow combining Blender, ComfyUI, and generative AI.',
    tags: ['Blender', 'ComfyUI', 'Generative AI', 'Workflow Design'],
    image: '/images/ai-3d-workflow.png',
    github: 'https://github.com/huiyutseng/ai-3d-workflow',
    demo: undefined,
    detail: {
      problem:
        '3D production can be slow when visual exploration, asset iteration, and final rendering are treated as separate steps.',
      approach:
        'I experimented with a workflow that uses Blender for structure and ComfyUI for generative exploration, keeping the process flexible while preserving artistic control.',
      result:
        'The workflow reduces friction between ideation and production, making it easier to test visual directions before committing to detailed modeling.',
    },
  },
  {
    id: 'generative-poster-lab',
    category: 'Creative Experiments',
    name: 'Generative Poster Lab',
    summary: 'Visual experiment combining typography, procedural layouts, and AI-generated texture.',
    tags: ['Generative Design', 'Typography', 'Creative Coding'],
    image: '/images/creative-experiments-placeholder-1.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Creative tools often separate layout exploration from texture and atmosphere, slowing down early visual experiments.',
      approach:
        'I explored a poster workflow where grid rules and generative textures can be adjusted together.',
      result:
        'The experiment creates a faster path from mood to composition while keeping typography legible and intentional.',
    },
  },
  {
    id: 'ambient-portfolio-motion',
    category: 'Creative Experiments',
    name: 'Ambient Portfolio Motion',
    summary: 'Motion system using scroll, stars, and soft botanical details to create depth.',
    tags: ['Motion Design', 'Framer Motion', 'Interaction'],
    image: '/images/creative-experiments-placeholder-2.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Decorative motion can easily distract from portfolio content when scale, speed, and layering are not carefully controlled.',
      approach:
        'I designed subtle scroll-linked elements that support the atmosphere while staying behind the main text and cards.',
      result:
        'The motion language gives the page personality without making the content harder to read.',
    },
  },
  {
    id: 'digital-garden-study',
    category: 'Creative Experiments',
    name: 'Digital Garden Study',
    summary: 'A visual system for connecting notes, projects, and personal growth over time.',
    tags: ['Digital Garden', 'Visual System', 'Storytelling'],
    image: '/images/creative-experiments-placeholder-3.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'Personal websites can become static resumes, missing the evolving connections between interests and experiments.',
      approach:
        'I explored a garden-like metaphor that lets projects, notes, and milestones feel connected without becoming cluttered.',
      result:
        'The study points toward a portfolio that can grow naturally as new ideas and works are added.',
    },
  },
  {
    id: 'interactive-mood-scene',
    category: 'Creative Experiments',
    name: 'Interactive Mood Scene',
    summary: 'A small atmospheric scene that responds to scrolling and pointer movement.',
    tags: ['Interactive Scene', 'CSS Motion', 'Atmosphere'],
    image: '/images/creative-experiments-placeholder-4.png',
    github: undefined,
    demo: undefined,
    detail: {
      problem:
        'A personal page should feel memorable, but not at the cost of clarity or performance.',
      approach:
        'I tested lightweight interaction patterns using CSS and motion libraries instead of heavy visual assets.',
      result:
        'The scene adds a sense of presence while keeping the page accessible and fast to browse.',
    },
  },
]

const chineseContent: Record<string, ProjectContent> = {
  'youtube-comment-sentiment': {
    name: 'YouTube 留言情緒分析',
    summary: '追蹤觀眾情緒與留言模式的 Streamlit 儀表板。',
    detail: {
      problem: '創作者與團隊通常只看到留言數量，卻難以掌握背後的情緒模式。本專案探討觀眾反應如何隨主題、時間與互動訊號改變。',
      approach: '我建立 Python 資料流程與 Streamlit 介面，蒐集留言、分類情緒、整理關鍵字，並以容易掃讀的方式呈現變化。',
      result: '儀表板把原始留言轉化為清楚的回饋迴路，協助使用者比較回應品質，找出值得深入閱讀的時刻。',
    },
  },
  'risk-dashboard-concept': {
    name: '風險訊號儀表板',
    summary: '將分散的風險指標整理成可快速閱讀的監控介面。',
    detail: {
      problem: '風險訊號經常散落在報告、試算表與營運紀錄中，使團隊難以判斷哪些變化最值得注意。',
      approach: '我以訊號優先度、趨勢方向與簡短說明組織資訊，讓使用者先掃描，再深入調查。',
      result: '此概念呈現風險儀表板如何在不塞入所有指標的前提下，支持更冷靜且清楚的決策。',
    },
  },
  'insurance-claims-map': {
    name: '保險理賠模式地圖',
    summary: '探索理賠類型、時間與客戶情境之間的模式。',
    detail: {
      problem: '理賠資料能揭示重要的行為與營運模式，但第一層檢視通常過於密集，不利於快速理解。',
      approach: '我依理賠類型、時間與情境整理訊號，再以輕量敘事說明發生了什麼變化，以及可能的重要性。',
      result: '專案草案展示如何從原始紀錄走向更容易討論的商業問題。',
    },
  },
  'personal-data-lab': {
    name: '個人資料實驗室',
    summary: '用來反思習慣、日常與重複訊號的小型分析空間。',
    detail: {
      problem: '個人追蹤工具會蒐集大量資訊，卻很少協助人們溫和地理解自己的模式。',
      approach: '我探索如何用簡單圖表、標籤與每週摘要，把紀錄轉化為觀察，而不是壓力。',
      result: '此概念把資料定位為反思工具，讓使用者更有自主權決定該注意什麼、忽略什麼。',
    },
  },
  'study-resource-system': {
    name: '學習資源系統',
    summary: '以結構化方式整理學習資源、筆記與專案參考。',
    detail: {
      problem: '學習材料常散落在分頁、文件與資料夾中，使複習和再次利用變得困難。',
      approach: '我設計依主題、狀態與專案關聯分類資源的簡單架構。',
      result: '這套系統讓使用者更容易回到過往研究，並把學習內容連結到未來專案。',
    },
  },
  'restaurant-micro-moment': {
    name: '餐廳微時刻推薦',
    summary: '依使用者意圖與當下時機設計的情境感知推薦概念。',
    detail: {
      problem: '選餐廳很少只關乎食物；心情、距離、預算、天氣、同行對象與急迫性都會影響什麼才是合適的推薦。',
      approach: '我整理常見的用餐微時刻，轉化為推薦訊號，並探索介面如何在不顯得機械的情況下解釋建議。',
      result: '此專案把推薦重新定義為人類情境問題，讓資料訊號連結到更容易理解且及時的決策體驗。',
    },
  },
  'ai-companion-interface': {
    name: 'AI 夥伴介面',
    summary: '讓 AI 回應更清楚、平靜且理解情境的互動研究。',
    detail: {
      problem: '當介面沒有清楚說明情境、信心程度或下一步時，再強大的 AI 工具也很難被信任。',
      approach: '我探索提示狀態、回應摘要與行動選項，協助使用者理解 AI 正在做什麼。',
      result: '原型方向聚焦透明的 AI 工作流程，讓使用者保持方向感，而不只是被動接收輸出。',
    },
  },
  'micro-moment-field-notes': {
    name: '微時刻田野筆記',
    summary: '在轉化為產品訊號前，捕捉細微行為時刻的研究格式。',
    detail: {
      problem: '當研究過早被濃縮時，猶豫、偏好與情境等細微時刻很容易消失。',
      approach: '我設計一套筆記結構，記錄觸發點、情緒、限制與可能的設計機會。',
      result: '此格式保留質性觀察的價值，方便後續產品思考與 AI 輔助模式辨識。',
    },
  },
  'recommendation-explainer': {
    name: '推薦原因解釋器',
    summary: '在不增加介面負擔的前提下，說明推薦出現原因的 UI 概念。',
    detail: {
      problem: '當使用者看不到哪些訊號影響結果時，推薦容易顯得隨機。',
      approach: '我測試簡短原因標籤、信心提示與可編輯偏好籤等輕量解釋模式。',
      result: '此概念讓推薦更容易理解，同時維持主要決策流程的簡潔。',
    },
  },
  'context-aware-planner': {
    name: '情境感知規劃器',
    summary: '依精力、時間與任務類型調整建議的規劃原型。',
    detail: {
      problem: '一般任務規劃器把每件事視為同等重要，卻忽略人們會依精力、急迫性與專注時間安排工作。',
      approach: '我構想一個衡量任務情境的助手，為深度工作、雜務與恢復時間提供不同規劃模式。',
      result: '原型讓規劃更貼近人性，由工具配合使用者，而不是迫使所有人套用同一份清單。',
    },
  },
  'ai-3d-workflow': {
    name: 'AI 輔助 3D 工作流程',
    summary: '結合 Blender、ComfyUI 與生成式 AI 的創意製作流程。',
    detail: {
      problem: '當視覺探索、資產迭代與最終渲染被拆成彼此獨立的步驟時，3D 製作會變得緩慢。',
      approach: '我以 Blender 建立結構、ComfyUI 進行生成探索，在保留藝術控制的同時維持流程彈性。',
      result: '此流程降低構想到製作之間的摩擦，讓創作者在投入細部建模前快速測試視覺方向。',
    },
  },
  'generative-poster-lab': {
    name: '生成式海報實驗室',
    summary: '結合字體、程序化版面與 AI 生成材質的視覺實驗。',
    detail: {
      problem: '創意工具常把版面探索與材質氛圍分開，拖慢早期視覺實驗。',
      approach: '我探索一套能同時調整網格規則與生成材質的海報流程。',
      result: '此實驗縮短從情緒到構圖的距離，同時維持字體可讀性與設計意圖。',
    },
  },
  'ambient-portfolio-motion': {
    name: '作品集環境動態',
    summary: '以捲動、星光與柔和植物細節創造深度的動態系統。',
    detail: {
      problem: '若比例、速度與圖層控制不當，裝飾性動畫很容易搶走作品集內容的注意力。',
      approach: '我設計低調的捲動連動元素，讓氛圍存在於主要文字與卡片後方。',
      result: '這套動態語言為頁面建立個性，同時不降低內容可讀性。',
    },
  },
  'digital-garden-study': {
    name: '數位花園研究',
    summary: '連結筆記、專案與個人成長歷程的視覺系統。',
    detail: {
      problem: '個人網站容易變成靜態履歷，忽略興趣與實驗之間持續演化的連結。',
      approach: '我探索花園式隱喻，讓專案、筆記與里程碑彼此連結又不顯雜亂。',
      result: '此研究指向一種能隨新想法與作品自然成長的個人作品集。',
    },
  },
  'interactive-mood-scene': {
    name: '互動氛圍場景',
    summary: '會回應捲動與游標移動的小型氛圍場景。',
    detail: {
      problem: '個人頁面需要令人記住，但不應以清晰度或效能為代價。',
      approach: '我使用 CSS 與動態函式庫測試輕量互動模式，避免依賴沉重視覺資產。',
      result: '此場景增加網站的存在感，同時維持可及性與快速瀏覽。',
    },
  },
}

export const categoryLabels: Record<Locale, Record<ProjectCategory, string>> = {
  'zh-TW': {
    'Data & Systems': '資料與系統',
    'AI & Interaction': 'AI 與互動',
    'Creative Experiments': '創意實驗',
  },
  en: {
    'Data & Systems': 'Data & Systems',
    'AI & Interaction': 'AI & Interaction',
    'Creative Experiments': 'Creative Experiments',
  },
}

const chineseTagLabels: Record<string, string> = {
  Streamlit: 'Streamlit',
  Python: 'Python',
  NLP: 'NLP',
  'Data Visualization': '資料視覺化',
  Dashboard: '儀表板',
  'Risk Analysis': '風險分析',
  'Systems Thinking': '系統思考',
  'Data Modeling': '資料建模',
  Insurance: '保險',
  'Pattern Discovery': '模式探索',
  'Personal Analytics': '個人分析',
  Visualization: '視覺化',
  Reflection: '反思',
  'Information Architecture': '資訊架構',
  'Knowledge Base': '知識庫',
  Workflow: '工作流程',
  'Context-aware Systems': '情境感知系統',
  Personalization: '個人化',
  'UX Research': '使用者研究',
  'Behavior Modeling': '行為建模',
  'AI UX': 'AI 使用者體驗',
  'Conversation Design': '對話設計',
  Prototype: '原型',
  Behavior: '行為',
  'Field Notes': '田野筆記',
  'Explainable AI': '可解釋 AI',
  'UI Design': '介面設計',
  Planning: '規劃',
  'Context-aware UX': '情境感知體驗',
  'AI Assistant': 'AI 助理',
  Blender: 'Blender',
  ComfyUI: 'ComfyUI',
  'Generative AI': '生成式 AI',
  'Workflow Design': '工作流程設計',
  'Generative Design': '生成式設計',
  Typography: '字體設計',
  'Creative Coding': '創意程式設計',
  'Motion Design': '動態設計',
  'Framer Motion': 'Framer Motion',
  Interaction: '互動',
  'Digital Garden': '數位花園',
  'Visual System': '視覺系統',
  Storytelling: '敘事設計',
  'Interactive Scene': '互動場景',
  'CSS Motion': 'CSS 動態',
  Atmosphere: '氛圍',
}

export const projects: Project[] = projectSeeds.map((seed) => {
  const { name, summary, detail, ...metadata } = seed
  return {
    ...metadata,
    content: {
      'zh-TW': chineseContent[seed.id],
      en: { name, summary, detail },
    },
  }
})

export function localizeProject(project: Project, locale: Locale): LocalizedProject {
  const { content, ...metadata } = project
  return {
    ...metadata,
    tags:
      locale === 'zh-TW'
        ? project.tags.map((tag) => chineseTagLabels[tag] ?? tag)
        : project.tags,
    ...content[locale],
    categoryLabel: categoryLabels[locale][project.category],
  }
}

export function getLocalizedProjects(locale: Locale) {
  return projects.map((project) => localizeProject(project, locale))
}

export const featuredProject = projects.find((project) => project.featured) ?? projects[0]
