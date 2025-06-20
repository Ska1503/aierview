'use server'

import { cookies } from 'next/headers'
import { createAxiosInstance } from './axios-instance'

export const APIServer = async () => {
  const cookiesData = await cookies()
  const authToken = cookiesData.get('Authorization')?.value || ''
  return createAxiosInstance({
    authToken: authToken
  })
}
