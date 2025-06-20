'use client'

import classNames from 'classnames'
import { FC } from 'react'
import { ITypographyProps, TypographyVariant } from './typography.types'

const Typography: FC<ITypographyProps> = ({
  Tag = 'p',
  variant = TypographyVariant.CALLOUT_1,
  children,
  className
}) => {
  const textClasses: Record<string, string> = {
    [TypographyVariant.LARGE_TITLE]: 'text-large-title',
    [TypographyVariant.H1]: 'text-h1',
    [TypographyVariant.H2]: 'text-h2',
    [TypographyVariant.H3]: 'text-h3',
    [TypographyVariant.H4]: 'text-h4',
    [TypographyVariant.CALLOUT_1]: 'text-callout-1',
    [TypographyVariant.CALLOUT_2]: 'text-callout-2',
    [TypographyVariant.BODY_1]: 'text-body-1',
    [TypographyVariant.BODY_2]: 'text-body-2'
  }

  return (
    <Tag className={classNames(textClasses[variant], className)}>
      {children}
    </Tag>
  )
}

export default Typography
