import { NextRequest } from 'next/server'

const DEVELOPMENT_USER = 'user'
const DEVELOPMENT_PASSWORD = 'password'
const AUTH_REALM = 'Development Access'

export function handleBasicAuth(request: NextRequest): Response | null {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'WWW-Authenticate': `Basic realm='${AUTH_REALM}'`
      }
    })
  }

  const encodedCredentials = authHeader.replace('Basic ', '')
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString()
  const [username, password] = decodedCredentials.split(':')

  if (username !== DEVELOPMENT_USER || password !== DEVELOPMENT_PASSWORD) {
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
      headers: {
        'WWW-Authenticate': `Basic realm='${AUTH_REALM}'`
      }
    })
  }

  return null
}
