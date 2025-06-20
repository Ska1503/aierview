'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import {
  IUseScrollLockOptions,
  IUseScrollLockReturn
} from './use-scroll-lock.types'

const IS_SERVER = typeof window === 'undefined'

const useScrollLock = (
  options: IUseScrollLockOptions = {}
): IUseScrollLockReturn => {
  const { autoLock = true } = options
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const scrollPosition = useRef<number>(0)

  const lock = (): void => {
    const body = document.body

    scrollPosition.current = window.scrollY

    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition.current}px`
    body.style.width = '100%'
    body.style.overflowY = 'scroll'

    setIsLocked(true)
  }

  const unlock = (): void => {
    const body = document.body

    body.style.position = ''
    body.style.top = ''
    body.style.width = ''
    body.style.overflowY = ''

    window.scrollTo(0, scrollPosition.current)
    setIsLocked(false)
  }

  useLayoutEffect(() => {
    if (IS_SERVER) return

    if (autoLock) lock()

    return () => {
      unlock()
    }
  }, [autoLock])

  return { isLocked, lock, unlock }
}

export default useScrollLock
