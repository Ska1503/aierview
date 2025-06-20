'use client'

import { useEffect } from 'react'

export const useBeforeUnloadAlert = (shouldWarn: boolean) => {
  useEffect(() => {
    if (shouldWarn) {
      const handleOnBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault()
        e.returnValue = ''
      }
      window.addEventListener('beforeunload', handleOnBeforeUnload, {
        capture: true
      })

      return () => {
        window.removeEventListener('beforeunload', handleOnBeforeUnload, {
          capture: true
        })
      }
    }
  }, [shouldWarn])
}
