import { ComponentPropsWithoutRef } from 'react'

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  alt: string
  src?: string
  isPreview?: boolean
  title?: string
  className?: string
}
