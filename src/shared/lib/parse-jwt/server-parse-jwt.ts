export const serverParseJwt = (
  token: string
): {
  exp: number
  [key: string]: any
} => {
  try {
    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '')
    }

    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const decoded = Buffer.from(base64, 'base64').toString('utf-8')

    return JSON.parse(decoded)
  } catch (e) {
    console.error('Failed to parse JWT', e)
    return { exp: 0 }
  }
}
