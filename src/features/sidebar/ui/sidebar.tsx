'use client'

import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { useMenuStore } from '@/features/sidebar'
import { Head } from './head'
import { Links } from './links'

const Sidebar: FC = () => {
  const isOpen = useMenuStore(state => state.isOpen)

  return (
    <aside
      className={twMerge(
        'transition-all duration-300',
        isOpen ? 'w-70' : 'w-25 overflow-hidden'
      )}
    >
      <Head isOpen={isOpen} />
      <Links isOpen={isOpen} />
    </aside>
  )
}

export default Sidebar
