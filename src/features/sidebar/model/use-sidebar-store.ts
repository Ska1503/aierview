'use client'

import { create } from 'zustand'
import { SidebarStore } from './sidebar.types'

export const useMenuStore = create<SidebarStore>(set => ({
  isOpen: true,
  toggleMenu: () =>
    set(state => {
      const newValue = !state.isOpen
      return { isOpen: newValue }
    }),
  setOpen: value => {
    set({ isOpen: value })
  }
}))
