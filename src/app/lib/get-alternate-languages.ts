import { Locale } from 'next-intl'
import { locales } from '@/shared/model'

export const createAlternateLanguages = (
  pathWithoutLocale: string
): Record<string, string> =>
  locales.reduce(
    (acc, locale: Locale) => {
      acc[locale] = `/${locale}${pathWithoutLocale}`
      return acc
    },
    {} as Record<string, string>
  )
