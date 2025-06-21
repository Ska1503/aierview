'use client'

import { useTranslations } from 'next-intl'
import { FC, useEffect } from 'react'
import logo from '@/public/assets/images/logo_icon.png'
import { useMenuStore } from '@/features/sidebar'
import { CustomImage, Icon, Typography, TypographyVariant } from '@/shared/ui'

const Header: FC = () => {
  const t = useTranslations('header')
  const toggleMenu = useMenuStore(state => state.toggleMenu)

  const getGreeting = () => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) return t('greeting.morning')
    if (hour >= 12 && hour < 17) return t('greeting.afternoon')
    if (hour >= 17 && hour < 22) return t('greeting.evening')
    return t('greeting.night')
  }

  useEffect(() => {
    if (!localStorage.getItem('open_menu')) {
      localStorage.setItem('open_menu', 'true')
    }
  }, [])

  return (
    <header className="after:bg-basic-200 relative mb-5.5 pb-5.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:content-['']">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Icon
            className="shrink-0"
            Tag="button"
            name="menu"
            onClick={toggleMenu}
          />
          <Typography
            variant={TypographyVariant.H3}
            className="text-basic-700 font-normal"
          >{`${getGreeting()}, Vlad 👋`}</Typography>
        </div>
        <CustomImage
          className="absolute right-1/2"
          src={logo}
          alt="logo"
          width={140}
          height={37}
        />
        <Icon className="w-9 shrink-0" name="exit_icon" Tag="button" />
      </div>
    </header>
  )
}

export default Header
