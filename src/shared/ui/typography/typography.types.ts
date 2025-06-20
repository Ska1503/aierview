import { PropsWithChildren } from 'react'

export const TypographyVariant = {
  LARGE_TITLE: 'large-title',
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  CALLOUT_1: 'callout_1',
  BODY_1: 'body_1',
  CALLOUT_2: 'callout_2',
  BODY_2: 'body_2'
} as const

export type TextTags =
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'strong'
  | 'em'
  | 'small'
  | 's'
  | 'cite'
  | 'q'
  | 'dfn'
  | 'abbr'
  | 'time'
  | 'code'
  | 'var'
  | 'samp'
  | 'kbd'
  | 'sub'
  | 'sup'
  | 'i'
  | 'b'
  | 'u'
  | 'mark'
  | 'ruby'
  | 'rt'
  | 'rp'
  | 'bdi'
  | 'bdo'
  | 'wbr'
  | 'address'

export interface ITypographyProps extends PropsWithChildren {
  variant?: (typeof TypographyVariant)[keyof typeof TypographyVariant]
  className?: string
  Tag?: 'div' | TextTags
}
