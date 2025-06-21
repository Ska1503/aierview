import { defineRouting } from 'next-intl/routing'
import { locales } from '@/shared/model'

const INTERVIEW = '/interview'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  AI_ENGINEER: `${INTERVIEW}/ai-engineer`,
  AI_HR: `${INTERVIEW}/ai-hr`,
  INTERVIEWER: INTERVIEW,
  ANALYZER_RESUME: '/analyzer-resume',
  SETTINGS: '/settings'
} as const

export const defaultLocale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
  alternateLinks: true
})
