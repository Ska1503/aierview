import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { NAV_SIDEBAR } from '@/features/sidebar'
import { Typography, TypographyVariant } from '@/shared/ui'
import { ActiveLink } from './active-link'

const Links: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const t = useTranslations('sidebar')

  const renderTypography = (text: string, showText: boolean) => (
    <Typography
      variant={TypographyVariant.H3}
      className={twMerge(
        'text-basic-white absolute top-0 left-0 text-[12px] opacity-60 transition-opacity duration-300',
        showText ? 'opacity-100' : 'opacity-0'
      )}
    >
      {text}
    </Typography>
  )

  return (
    <nav>
      <div
        className={twMerge(
          'relative mb-6.75 h-7 transition',
          isOpen ? 'ml-5' : 'ml-7.75'
        )}
      >
        {renderTypography(t('mainMenu').toUpperCase(), isOpen)}
        {renderTypography(t('menu').toUpperCase(), !isOpen)}
      </div>
      <ul
        className={twMerge(
          'flex flex-col gap-3.5 transition',
          isOpen ? 'pl-5' : 'pl-2'
        )}
      >
        {NAV_SIDEBAR.map(item => (
          <li key={`nav-link-${item.id}`}>
            <ActiveLink {...item} isOpen={isOpen} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Links
