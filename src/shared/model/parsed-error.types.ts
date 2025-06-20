import { IParsedErrorData } from '@/shared/api/axios/parse-error'

export type TParsedError = Omit<IParsedErrorData, 'path' | 'message'> & {
  message: Record<any, string | string[]> | string
}
