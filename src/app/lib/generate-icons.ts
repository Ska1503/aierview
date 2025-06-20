import {
  Icon,
  Icons,
  IconURL
} from 'next/dist/lib/metadata/types/metadata-types'

export const generateIcons = ():
  | IconURL
  | Icon[]
  | Icons
  | null
  | undefined => [
  {
    rel: 'icon',
    url: '/assets/favicons/favicon.ico'
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    sizes: 'any',
    url: '/assets/favicons/favicon.svg'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    url: '/assets/favicons/android-chrome-192x192.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    url: '/assets/favicons/favicon-96x96.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    url: '/assets/favicons/favicon-32x32.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    url: '/assets/favicons/favicon-16x16.png'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    sizes: '32x32',
    url: '/assets/favicons/favicon-32x32.png'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    sizes: '16x16',
    url: '/assets/favicons/favicon-16x16.png'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    sizes: '180x180',
    url: '/assets/favicons/apple-touch-icon.png'
  },
  {
    rel: 'manifest',
    url: '/assets/favicons/site.webmanifest'
  }
]
