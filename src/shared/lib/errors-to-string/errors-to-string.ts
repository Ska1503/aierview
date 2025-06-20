import { IParsedErrorData } from '@/shared/api/axios/parse-error'

interface IAxiosError {
  errors: {
    [key: string]: string[]
  }
}

interface IApiError {
  status: number
  data:
    | string
    | {
        errors: {
          [key: string]: string[]
        }
      }
  parsedError: IParsedErrorData
}

const generateErrorArray = (errors: unknown[]): string[] => {
  return errors.map(error => {
    if (typeof error === 'string') return error

    if (Array.isArray(error)) return arrayToString(error)
    if (typeof error === 'object' && error !== null)
      return Object.keys(error)
        .map(key => `${key}: ${(error as Record<string, string>)[key]}`)
        .join(', ')
    return 'Unknown error'
  })
}

const arrayToString = (errors: unknown[]): string => {
  return !Array.isArray(errors)
    ? arrayToString(Object.keys(errors))
    : generateErrorArray(errors).join(', ')
}

const extractErrorsRecursively = (errors: any, parentKey = ''): string[] => {
  const result: string[] = []

  Object.keys(errors).forEach(key => {
    const value = errors[key]
    const fullKey = parentKey ? `${parentKey}.${key}` : key

    if (typeof value === 'string') {
      result.push(value)
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      result.push(...extractErrorsRecursively(value, fullKey))
    } else if (Array.isArray(value)) {
      result.push(arrayToString(value))
    }
  })

  return result
}

const errorsToString = (errors: unknown, isFromAxios?: boolean): string => {
  if (errors instanceof Error) {
    return errors.message
  }

  if (Array.isArray(errors)) {
    return arrayToString(errors)
  }

  if (typeof errors === 'string') {
    return errors
  }

  if (typeof errors === 'object' && (errors as { message: string }).message) {
    return (errors as { message: string }).message
  }

  if (typeof errors === 'object' && (errors as { error: string }).error) {
    return (errors as { error: string }).error
  }

  if (typeof errors === 'object' && isFromAxios) {
    return extractErrorsRecursively((errors as IAxiosError).errors).join(', ')
  }

  if ((errors as IApiError)?.data) {
    const { data } = errors as IApiError

    if (typeof data === 'string') return data
    if (Array.isArray(data.errors)) return arrayToString(data.errors)
    if (typeof data === 'object')
      return Object.keys(data.errors)
        .map(key => `${key}: ${arrayToString(data.errors[key])}`)
        .join(', ')
  }

  return 'Unknown error'
}

export default errorsToString
