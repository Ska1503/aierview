import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/*?*'
    }
    // sitemap:
    //   "https://validowl-api-production-sitemap-storage.s3.us-east-1.amazonaws.com/sitemap.xml"
  }
}
