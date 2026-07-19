import type { Project, ProjectCategory } from './types'

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Data & Systems',
  'AI & Interaction',
  'Creative Experiments',
]

export const projects: Project[] = [
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

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
