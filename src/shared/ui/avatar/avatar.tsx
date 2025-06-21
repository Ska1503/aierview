'use client'

import { FC, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import placeholder from '@/public/assets/images/avatar_placeholder.png'
import { CustomImage } from '@/shared/ui'
import { AvatarProps } from './avatar.types'

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  title,
  className,
  children,
  isPreview = false
}) => {
  const currentSrc = useMemo(() => {
    if (src) {
      if (isPreview) return src
    }
    return placeholder
  }, [src, isPreview])

  return (
    <div
      className={twMerge(
        'relative flex-shrink-0 overflow-hidden rounded-full',
        className
      )}
    >
      <CustomImage
        src={currentSrc}
        alt={alt}
        title={title}
        fill
        sizes="100vw"
        className="object-cover"
        priority
        unoptimized
      />
      {children}
    </div>
  )
}

export default Avatar
