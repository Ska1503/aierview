export interface ICDNImageConfig {
  width: number
  height: number
  fit: 'fit' | 'fill' | 'inside' | 'outside' | 'cover' | 'contain' | 'fillmax'
}

export const getEncodedImageLink = (
  url: string,
  config?: Partial<ICDNImageConfig>
): string | null => {
  if (!url) return null

  const [, , bucketDomain, ...keyParts] = url.split('/')
  const bucket = bucketDomain.split('.')[0]
  const key = keyParts.join('/')

  const data: Record<string, any> = { bucket, key }
  if (config) {
    data.edits = {
      resize: config
    }
  }

  return `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${btoa(JSON.stringify(data))}`
}
