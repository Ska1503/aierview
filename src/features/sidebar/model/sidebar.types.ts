import { IconName, RouteValue, T_Message } from '@/shared/model'

export interface LinkType {
  icon: IconName
  link: RouteValue
  name: T_Message<'sidebar.links'>
}

export interface SidebarLinks extends LinkType {
  id: number
}

export interface SidebarStore {
  isOpen: boolean
  toggleMenu: () => void
  setOpen: (value: boolean) => void
}
