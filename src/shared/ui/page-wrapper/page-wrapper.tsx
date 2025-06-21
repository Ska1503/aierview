import React, { FC } from 'react'
import { PageWrapperProps } from './page-wrapper.types'

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="bg-basic-white min-h-[calc(100vh-40px)] w-full rounded-4xl px-11.25 py-6">
      {children}
    </div>
  )
}

export default PageWrapper
