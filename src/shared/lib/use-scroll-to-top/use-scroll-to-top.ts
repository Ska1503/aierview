import { ROUTES } from '@/shared/config'
import { useLocalePathname } from '@/shared/ui'

export const useScrollToTop = () => {
  const pathname = useLocalePathname()
  return (e: any) => {
    if (pathname === ROUTES.HOME) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
