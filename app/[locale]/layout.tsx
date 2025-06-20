import { Metadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'
import { NavigationGuardProvider } from 'next-navigation-guard'
import { classname } from '@/app/config'
import { generateIcons } from '@/app/lib'
import { ContentProvider, I18nProvider, QueryProvider } from '@/app/providers'
import { ILayoutProps, IMetaParams } from '@/shared/model'

import '@/app/styles/main.scss'
import '@/app/styles'

export async function generateMetadata({
  params
}: IMetaParams): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const host = process.env.NEXT_PUBLIC_HOST || 'aierview.com'
  const baseUrl = `https://${host}`

  return {
    metadataBase: new URL(baseUrl),
    title: 'AIerview',
    description: 'AIerview',
    openGraph: {
      title: 'AIerview',
      description: 'AIerview',
      url: `${baseUrl}/${locale}`,
      type: 'website',
      images: '',
      siteName: 'aierview'
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`
      }
    },
    icons: generateIcons()
  }
}

export const viewport: Viewport = {
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
}

const RootLayout = async ({ children, params }: ILayoutProps) => {
  const { locale } = await params
  return (
    <html lang="en">
      <body className={classname}>
        <NavigationGuardProvider>
          <I18nProvider locale={locale}>
            <QueryProvider>
              <ContentProvider>{children}</ContentProvider>
            </QueryProvider>
          </I18nProvider>
        </NavigationGuardProvider>
      </body>
    </html>
  )
}

export default RootLayout
