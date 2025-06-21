'use client'

import { useTranslations } from 'next-intl'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar, Typography, TypographyVariant } from '@/shared/ui'

const Head: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const t = useTranslations('meta')
  return (
    <div
      className={twMerge(
        'flex items-center gap-2 py-7.5 pr-12.5 pl-6 transition'
      )}
    >
      <div className="bg-basic-white flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-full border-2">
        <Avatar
          alt={t('avatarAlt')}
          className="border-basic-black h-11 w-11 border-3"
        />
      </div>
      <div
        className={twMerge(
          'origin-left text-nowrap transition',
          isOpen
            ? 'ml-2 scale-100 opacity-100'
            : 'pointer-events-none ml-0 scale-95 opacity-0'
        )}
      >
        <Typography
          variant={TypographyVariant.H4}
          className="text-basic-white mb-0.75 max-w-48"
        >
          Vlad
        </Typography>
        <Typography
          variant={TypographyVariant.BODY_2}
          className="text-basic-white opacity-60"
        >
          Frontend Developer
        </Typography>
      </div>
    </div>
  )
}

export default Head
