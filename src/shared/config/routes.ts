import { defineRouting } from 'next-intl/routing'
import { locales } from '../model/i18n.types'

const PROFILE_ROUTE = '/profile/:slug'

export const ROUTES = {
  HOME: '/'
} as const

export const defaultLocale = 'en'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always',
  alternateLinks: true
})
