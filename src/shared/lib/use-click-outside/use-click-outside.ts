'use client'

import { MutableRefObject, useEffect } from 'react'

export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: any) => void,
  secondRef?: MutableRefObject<any>,
  thirdRef?: MutableRefObject<any>
) => {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          secondRef?.current?.contains(event.target) ||
          thirdRef?.current?.contains(event.target)
        ) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, secondRef, thirdRef, handler]
  )
}
