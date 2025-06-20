import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_PUBLIC_ANALYZE === 'true'
})

const withNextIntl = createNextIntlPlugin('./src/shared/config/i18n.ts')

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/app/styles/']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.aierview.com'
      }
    ],
    deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 3840]
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false
                      }
                    }
                  },
                  'removeXMLNS'
                ]
              }
            }
          }
        ]
      }
    )
    return config
  }
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
