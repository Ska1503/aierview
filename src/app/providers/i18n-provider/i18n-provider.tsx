import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { FC } from 'react'
import { routing } from '@/shared/config'
import { II18nProviderProps } from './i18n-provider.types'

const I18nProvider: FC<II18nProviderProps> = async ({ locale, children }) => {
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}

export default I18nProvider
