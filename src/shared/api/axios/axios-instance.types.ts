import { AxiosResponse } from 'axios'
import { IParsedErrorData } from './parse-error'

export interface AxiosInstanceOptions {
  authToken: string
  baseURL?: string
  version?: string
  isDirectUrl?: boolean
}

export interface TransformedResponse<T> {
  data: T
  meta: {
    headers: AxiosResponse['headers']
  }
}

export interface IAxiosError {
  error: {
    status: number
    data: {
      errors: Record<any, string | string[]>
    }
    parsedError: IParsedErrorData
  }
}
