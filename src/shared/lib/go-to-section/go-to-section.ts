'use client'

import { MouseEvent } from 'react'

const TABLET_WIDTH = 768
const DESKTOP_WIDTH = 1200

const goToSection = (
  e: MouseEvent | null,
  sectionId?: string,
  isFooter?: boolean
) => {
  if (e) e.preventDefault()
  const target = e
    ? (e?.currentTarget as HTMLAnchorElement)
    : document.querySelector(`[href="${sectionId}"]`)

  const href = target ? target.getAttribute('href') : sectionId
  if (!href) return

  const element = document.querySelector(href)
  if (!element) return

  const offsetElement = element?.querySelector('[data-offset]')
  let offsetTop = Number(offsetElement?.getAttribute('data-offset') || 0)

  if (window.innerWidth < DESKTOP_WIDTH && offsetTop) {
    offsetTop /= 3
  }

  if (window.innerWidth < TABLET_WIDTH && offsetTop) {
    offsetTop = 0
  }

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - 130 - offsetTop,
    behavior: 'smooth'
  })
  if (!isFooter) {
    document.querySelectorAll('[data-link]').forEach((el: any) => {
      el.classList.remove('activeClass')
    })
    target?.classList?.add('activeClass')
  }
}

export default goToSection
