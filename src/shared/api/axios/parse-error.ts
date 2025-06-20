import { AxiosError, AxiosRequestConfig } from 'axios'
import { errorsToString } from '@/shared/lib'

export interface IParsedErrorData {
  statusCode: number | undefined
  path: string
  requestMethod: string | undefined
  message: string
}

export interface IAxiosError {
  errors: {
    [key: string]: string[]
  }
}

export const parseError = (
  err: AxiosError,
  method?: AxiosRequestConfig['method'],
  url?: string
): {
  error: { status: number; data: any; parsedError: IParsedErrorData }
} => {
  const parsedError: IParsedErrorData = {
    requestMethod: method,
    path: url || '',
    statusCode: err.response?.status || err.status,
    message: errorsToString(err.response?.data || err.message, true)
  }
  console.log(parsedError)

  return {
    error: {
      status: err.response?.status || 500,
      data: err.response?.data || err.message,
      parsedError
    }
  }
}
