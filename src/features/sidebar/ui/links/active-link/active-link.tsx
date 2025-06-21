'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Icon,
  LocaleLink,
  Typography,
  TypographyVariant,
  useLocalePathname
} from '@/shared/ui'
import { ActiveLinkProps } from './active-link.types'

const ActiveLink: FC<ActiveLinkProps> = ({ icon, link, name, isOpen }) => {
  const t = useTranslations('sidebar.links')
  const pathname = useLocalePathname()

  const isActive = link === pathname

  return (
    <div
      className={twMerge(
        'relative',
        isActive && 'bg-basic-white rounded-l-[30px]'
      )}
    >
      {isActive && (
        <>
          <Icon name="border_top" className="absolute -top-6 right-0" />
          <Icon name="border_bottom" className="absolute right-0 -bottom-6" />
        </>
      )}
      <LocaleLink
        href={link}
        title={t(name)}
        className={twMerge(
          'group flex items-center gap-4.5 p-3 transition',
          isActive
            ? 'text-primary'
            : 'text-basic-white rounded-l-[30px] hover:opacity-90',
          !isOpen && 'justify-center p-2'
        )}
      >
        <Icon
          name={icon}
          className="shrink-0"
          svgClass={twMerge(
            'w-5 h-5 transition',
            isActive ? 'fill-primary' : 'group-hover:opacity-80'
          )}
        />
        <Typography
          variant={TypographyVariant.CALLOUT_1}
          Tag="span"
          className={twMerge(
            'ml-2 whitespace-nowrap transition',
            isActive ? 'text-primary' : 'group-hover:opacity-60',
            isOpen ? 'block' : 'hidden'
          )}
        >
          {t(name)}
        </Typography>
      </LocaleLink>
    </div>
  )
}

export default ActiveLink
