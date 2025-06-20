import { createNavigation } from 'next-intl/navigation'
import { routing } from '@/shared/config'

export const {
  Link: LocaleLink,
  redirect: localeRedirect,
  usePathname: useLocalePathname,
  useRouter: useLocaleRouter,
  getPathname: getLocalePathname,
  permanentRedirect: localePermanentRedirect
} = createNavigation(routing)
