import type { Locale } from '../i18n/types'
import type { JourneyMilestone, LocalizedJourneyMilestone } from './types'

export const journey: JourneyMilestone[] = [
  {
    id: 'risk-management',
    icon: 'ShieldCheck',
    title: { 'zh-TW': '風險管理', en: 'Risk Management' },
    description: {
      'zh-TW': '建立結構化思考、不確定性分析與決策品質的基礎。',
      en: 'Built a foundation in structured thinking, uncertainty, and decision quality.',
    },
  },
  {
    id: 'fintech-insurance',
    icon: 'Landmark',
    title: { 'zh-TW': '金融科技與保險', en: 'FinTech & Insurance' },
    description: {
      'zh-TW': '探索金融服務如何在信任、法規與數位體驗之間取得平衡。',
      en: 'Explored how financial services balance trust, regulation, and digital experience.',
    },
  },
  {
    id: 'exchange-mannheim',
    icon: 'Globe2',
    title: { 'zh-TW': '曼海姆交換學習', en: 'Exchange in Mannheim' },
    description: {
      'zh-TW': '透過海外學習與跨文化合作，拓展對世界與問題的理解。',
      en: 'Expanded my perspective through international study and cross-cultural collaboration.',
    },
  },
  {
    id: 'data-mis-nccu',
    icon: 'GraduationCap',
    title: { 'zh-TW': '政大資料與資管', en: 'Data & MIS @ NCCU' },
    description: {
      'zh-TW': '將商業問題與資料、資訊系統及產品實作連結起來。',
      en: 'Connected business questions with data, systems, and product implementation.',
    },
  },
  {
    id: 'ai-human-behavior',
    icon: 'BrainCircuit',
    title: { 'zh-TW': 'AI 與人類行為', en: 'AI & Human Behavior' },
    description: {
      'zh-TW': '現階段專注運用 AI 理解行為，創造更具適應性的體驗。',
      en: 'Now focused on using AI to understand behavior and create more adaptive experiences.',
    },
  },
]

export function localizeJourney(
  milestone: JourneyMilestone,
  locale: Locale,
): LocalizedJourneyMilestone {
  return {
    id: milestone.id,
    icon: milestone.icon,
    title: milestone.title[locale],
    description: milestone.description[locale],
  }
}
