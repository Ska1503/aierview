'use client'

import { useEffect, useRef, useState } from 'react'

const useVisibleTooltip = (isDisplay: boolean = false) => {
  const [visible, setVisible] = useState<boolean>(isDisplay)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const onChangeTooltip = () => setVisible(prevVisible => !prevVisible)

  return { visible, wrapperRef, onChangeTooltip }
}

export default useVisibleTooltip
