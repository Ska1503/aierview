import { Locale } from 'next-intl'
import { PropsWithChildren } from 'react'

export interface Params {
  locale: Locale
}

export interface IMetaResponse {
  page: number
  per_page: number
  total_pages: number
}

export interface IMetaRequest {
  page: number
  per_page?: number
}

export interface ILocaleParams {
  locale: Locale
}

export interface IMetaParams {
  params: Promise<ILocaleParams>
}

export interface IPagePropsParams extends Partial<ILocaleParams> {
  slug: string
}

export interface IPageProps {
  params: Promise<IPagePropsParams>
}

export interface ILayoutProps extends PropsWithChildren<IMetaParams> {}
