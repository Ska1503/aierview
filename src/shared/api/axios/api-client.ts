import { AxiosInstanceOptions } from '@/shared/api'
import { getCookie } from '@/shared/lib'
import { createAxiosInstance } from './axios-instance'

export const APIClient = (options?: Partial<AxiosInstanceOptions>) => {
  return createAxiosInstance({
    authToken: getCookie('Authorization') || '',
    ...options
  })
}
