'use client'

import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'

import { MODAL_ANIMATION_DELAY } from '@/shared/config'
import { useScrollLock } from '@/shared/lib'

import { Portal } from '@/shared/ui'
import { IModalProps } from './modal.types'

const Modal: FC<IModalProps> = ({ onClose, children, className, isOpen }) => {
  const { lock, unlock } = useScrollLock({
    autoLock: false
  })

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen && !isMounted) {
      setIsMounted(true)
      lock()
    } else if (!isOpen && isMounted) {
      unlock()
      setTimeout(() => {
        setIsMounted(false)
      }, MODAL_ANIMATION_DELAY)
    }
  }, [isOpen, isMounted])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose && onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <Portal>
      {isOpen && (
        <div
          className="pointer-events-auto fixed inset-0 z-[1000] opacity-100"
          id="scrollable"
        >
          <div
            className="bg-overlay-primary flex h-full w-full cursor-pointer touch-none items-center justify-center overflow-y-auto bg-[rgba(0,0,0,0.50)] p-[10px_15px] transition-all"
            onClick={onClose}
          >
            <div
              className={classNames(
                'tablet:max-w-[644px] relative h-fit w-full max-w-[345px] cursor-default transition-all',
                className
              )}
              onClick={e => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </Portal>
  )
}

export default Modal
