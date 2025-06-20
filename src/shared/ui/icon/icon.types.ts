import { ComponentProps, FC, SVGProps } from 'react'
import { IconName } from '@/shared/model'

type SVGIcon = SVGProps<SVGSVGElement>

export type SVGComponent = FC<SVGIcon>

export interface IIconProps extends ComponentProps<'svg'> {
  name: IconName
  folder?: string
  onClick?: () => void
  svgClass?: string
  Tag?: 'div' | 'span' | 'button'
  ariaLabel?: string
}
