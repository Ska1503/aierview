import { FC, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { IIconProps, SVGComponent } from './icon.types'

const Icon: FC<IIconProps> = ({
  name,
  Tag = 'div',
  folder = '',
  className,
  svgClass,
  onClick,
  ariaLabel = '',
  type,
  ...props
}) => {
  let Svg: SVGComponent | null = null
  try {
    Svg = require(
      `@/public/assets/icons/${folder ? `${folder}/` : ''}${name}.svg`
    ).default
  } catch (error) {
    console.warn(`Icon ${name} not found`)
  }

  const svgClasses = twMerge('max-h-full max-w-full h-auto', svgClass)

  return (
    <Tag
      type={type as any}
      onClick={onClick}
      className={twMerge('inline-block select-none', className)}
      aria-label={ariaLabel}
    >
      {Svg ? (
        <Svg {...props} className={svgClasses} />
      ) : (
        <div className="size-6 animate-pulse bg-gray-200" />
      )}
    </Tag>
  )
}

export default memo(Icon)
