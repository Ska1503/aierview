import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'
import { APP_CONFIG } from '@/shared/config'
import { getCookie } from '@/shared/lib'
import {
  AxiosInstanceOptions,
  TransformedResponse
} from './axios-instance.types'
import { parseError } from './parse-error'

export const createBaseAxiosInstance = ({
  authToken,
  baseURL = APP_CONFIG.API_URL,
  version = 'v1',
  isDirectUrl = false
}: AxiosInstanceOptions): AxiosInstance => {
  const fullBaseURL = isDirectUrl ? '' : `${baseURL}/${version}`
  const instance = axios.create({
    baseURL: fullBaseURL,
    ...(isDirectUrl
      ? {}
      : {
          headers: {
            'Content-Type': 'application/json'
          }
        })
  })

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (!isDirectUrl) {
        const token = authToken || getCookie('Authorization')
        config.headers.set('Authorization', token)
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const originalRequest = error.config

      return Promise.reject(
        parseError(error, originalRequest?.method, originalRequest?.url)
      )
    }
  )

  return instance
}
export const createAxiosInstance = (options: AxiosInstanceOptions) => {
  const baseInstance = createBaseAxiosInstance(options)

  const request = async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    configOrData?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<TransformedResponse<T>> => {
    const response =
      method === 'get' || method === 'delete'
        ? await baseInstance[method]<T>(url, configOrData)
        : await baseInstance[method]<T>(url, configOrData, config)

    return {
      data: response.data,
      meta: {
        headers: response.headers
      }
    }
  }

  return {
    get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
      request<T>('get', url, config),

    post: <T, K>(url: string, data?: K, config?: AxiosRequestConfig<any>) =>
      request<T>('post', url, data, config),

    put: <T, K>(url: string, data?: K, config?: AxiosRequestConfig<any>) =>
      request<T>('put', url, data, config),

    delete: <T>(url: string, config?: AxiosRequestConfig<any>) =>
      request<T>('delete', url, config)
  }
}
