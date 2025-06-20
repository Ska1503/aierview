'use client'

import { useEffect, useState } from 'react'

export const useUnsavedDataWatcher = (isDirty: boolean) => {
  const [isUnsavedData, setIsUnsavedData] = useState(false)

  useEffect(() => {
    setIsUnsavedData(isDirty)
  }, [isDirty])

  return isUnsavedData
}
