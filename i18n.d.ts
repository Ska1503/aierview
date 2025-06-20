import { routing } from '@/shared/config'
import messages from './messages/uk'

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
