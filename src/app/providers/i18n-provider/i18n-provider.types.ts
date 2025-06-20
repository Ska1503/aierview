import { Locale } from 'next-intl'
import { PropsWithChildren } from 'react'

export interface II18nProviderProps extends PropsWithChildren {
  locale: Locale
}
