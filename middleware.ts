import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { IS_DEV, routing } from '@/shared/config'
import { handleBasicAuth } from './basis-auth'

const I18NMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname
  if (IS_DEV) {
    const authResponse = handleBasicAuth(request)
    if (authResponse) return authResponse
  }

  if (url.includes('auth')) {
    const newUrl = new URL(request.url)
    newUrl.pathname = '/auth'
    return NextResponse.rewrite(newUrl)
  }

  return I18NMiddleware(request)
}
export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/((?!_next|_vercel|.\..).*)'
  ]
}
