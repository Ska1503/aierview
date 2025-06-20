import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

import customImageLoader from './custom-image-loader'

const CustomImage: FC<ImageProps> = ({ src, ...props }) => {
  const isExternal = typeof src === 'string' && src.includes('http')
  const loader = isExternal ? customImageLoader : undefined

  return <Image src={src} {...props} loader={loader} title={props.title} />
}

export default CustomImage
