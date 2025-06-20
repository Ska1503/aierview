import { ResolvedMetadata } from 'next'
import { Locale } from 'next-intl'

const hasOwnProperty = (obj: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key)

const getPathnameFromMetadataState = (state: ResolvedMetadata): string => {
  if (typeof state !== 'object' || state === null) return ''

  const findMetadataState = (
    metadataState: ResolvedMetadata
  ): { urlPathname?: string } | undefined =>
    Object.getOwnPropertySymbols(metadataState)
      .map((symbol: any) => (metadataState as Record<any, any>)[symbol])
      .find(entry => entry && hasOwnProperty(entry, 'urlPathname'))

  const cleanUrlPathname = (url: string | undefined): string =>
    url?.replace(/\?.+/, '') ?? ''

  const metadataState = findMetadataState(state)
  return cleanUrlPathname(metadataState?.urlPathname)
}

export const getServerPathNames = (state: ResolvedMetadata, locale: Locale) => {
  const pathName = getPathnameFromMetadataState(state)
  const pathWithoutLocale =
    pathName
      ?.replace(new RegExp(`^/${locale}(?=/|$)`), '')
      ?.replace(/^\/validowl.com/, '') ?? ''

  const normalizedPathWithoutLocale =
    pathWithoutLocale === ''
      ? ''
      : pathWithoutLocale.startsWith('/')
        ? pathWithoutLocale
        : `/${pathWithoutLocale}`

  const urlWithLocale = `/${locale}${normalizedPathWithoutLocale}`
  return {
    pathName,
    urlWithLocale,
    normalizedPathWithoutLocale
  }
}
