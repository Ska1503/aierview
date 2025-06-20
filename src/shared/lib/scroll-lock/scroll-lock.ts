'use client'

const setScrollLock = (
  isLock: boolean,
  timeout: number = 0,
  toTop: boolean = false
) => {
  const bodyElement = document.body
  setTimeout(() => {
    if (isLock) {
      if (!bodyElement.style.cssText) {
        const { scrollY } = window
        bodyElement.style.cssText = `position: fixed; top: -${scrollY}px; width: 100%; height: auto;`
        document.documentElement.style.overflowY = 'scroll'
        sessionStorage.setItem('scrollY', scrollY.toString())
      } else if (bodyElement.style.cssText.includes('overflow') && !!timeout) {
        bodyElement.style.cssText = bodyElement.style.cssText.replace(
          /overflow: hidden; /,
          ''
        )
        const { scrollY } = window
        bodyElement.style.cssText = `position: fixed; top: -${scrollY}px; width: 100%; height: auto;`
        document.documentElement.style.overflowY = 'scroll'
        sessionStorage.setItem('scrollY', scrollY.toString())
      }
    } else if (bodyElement.style.cssText) {
      const scrollY = parseInt(sessionStorage.getItem('scrollY') || '0', 10)
      bodyElement.removeAttribute('style')
      document.documentElement.removeAttribute('style')
      sessionStorage.removeItem('scrollY')
      window.scrollTo({ top: toTop ? 0 : scrollY, behavior: 'instant' })
    }
  }, timeout)
}

export default setScrollLock
