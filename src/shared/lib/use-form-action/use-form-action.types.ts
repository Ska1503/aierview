import { ChangeEvent, FormEvent, HTMLInputTypeAttribute } from 'react'
import { ZodSchema } from 'zod'

export type FormErrors<T> = Partial<Record<keyof T | 'form', string>>
export type ValidateOnOption = 'onChange' | 'onBlur' | 'submit'

export type RegisterOptions = {
  required?: boolean
  type?: HTMLInputTypeAttribute
}

export type RegisterReturn<T> =
  | {
      type: 'checkbox'
      name: keyof T
      checked: boolean
      onChange: (e: ChangeEvent<HTMLInputElement>) => void
      onBlur: () => void
      required: boolean
    }
  | {
      type?: string
      name: keyof T
      value: string | number | readonly string[]
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
      onBlur: () => void
      required: boolean
    }

export type UseFormActionParams<T> = {
  schema: ZodSchema<T>
  initialValues?: Partial<T>
  validateOn?: ValidateOnOption
  resetAfterSubmit?: boolean
}

export type UseFormActionReturn<T> = {
  values: Partial<T>
  errors: FormErrors<T>
  handleChange: (name: keyof T, value: any) => void
  handleBlur: (name: keyof T) => void
  handleSubmit: (
    onSubmit?: (values: T) => Promise<void> | void
  ) => (e?: FormEvent) => Promise<void>
  register: (name: keyof T, options?: RegisterOptions) => RegisterReturn<T>
  getValue: <K extends keyof T>(key: K) => T[K] | undefined
  setValue: <K extends keyof T>(
    key: K,
    value: T[K],
    options?: { shouldValidate?: boolean }
  ) => void
  setError: (field: keyof T | 'form', errorMessage: string | undefined) => void
  reset: (fullReset?: boolean) => void
  resetTouchedFields: () => void
  isDirty: boolean
  isValid: boolean
  isDisabled: boolean
}

export interface FormFieldValidationResult<T> {
  success: boolean
  data?: T
}
