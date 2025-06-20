import { parseJwt, setCookie } from '@/shared/lib'

const setAuthorizationCookie = (meta: { headers: Headers }, id?: number) => {
  const parsedToken = parseJwt(meta.headers.get('Authorization') || '')
  const maxAge = new Date(parsedToken.exp * 1000)
  setCookie('Authorization', meta.headers.get('Authorization') || '', {
    expires: maxAge
  })
}

export default setAuthorizationCookie
