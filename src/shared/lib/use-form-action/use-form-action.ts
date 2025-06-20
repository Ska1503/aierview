'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ZodObject, ZodRawShape, ZodSchema } from 'zod'
import { getChangedFields } from '@/shared/lib'
import {
  FormErrors,
  FormFieldValidationResult,
  RegisterOptions,
  RegisterReturn,
  UseFormActionParams,
  UseFormActionReturn
} from './use-form-action.types'

const INPUT_TYPE_CHECKBOX = 'checkbox'
const FORM_LEVEL_ERROR = 'form'

export const useFormAction = <T extends Record<string, any>>({
  schema,
  initialValues = {},
  validateOn = 'submit',
  resetAfterSubmit = false
}: UseFormActionParams<T>): UseFormActionReturn<T> => {
  const [values, setValues] = useState<Partial<T>>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set())

  useEffect(() => {
    const changed = getChangedFields(initialValues, values)
    if (Object.keys(changed).length > 0) {
      setValues(initialValues)
    }
  }, [initialValues])

  const getRequiredFields = (schema: ZodSchema<T>): (keyof T)[] => {
    if ('shape' in schema && schema instanceof ZodObject) {
      return Object.entries(schema.shape as ZodRawShape)
        .filter(([, fieldSchema]) => !fieldSchema.isOptional())
        .map(([key]) => key as keyof T)
    }
    return []
  }

  const requiredFields = getRequiredFields(schema)

  const setError = (
    field: keyof T | typeof FORM_LEVEL_ERROR,
    errorMessage: string | undefined
  ) =>
    setErrors(prev => {
      const updated = { ...prev }
      if (errorMessage) updated[field] = errorMessage
      else delete updated[field]
      return updated
    })

  const getFieldError = (name: keyof T, value: any): string | undefined => {
    const result = schema.safeParse({ ...values, [name]: value })
    return result.success
      ? undefined
      : result.error.flatten().fieldErrors[name]?.[0]
  }

  const validateField = (name: keyof T, value: any): void => {
    const fieldError = getFieldError(name, value)
    setError(name, fieldError)
  }

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))

    if (value === null || value === undefined) {
      setTouchedFields(prev => {
        const updated = new Set(prev)
        updated.delete(name)
        return updated
      })
    } else {
      setTouchedFields(prev => new Set(prev).add(name))
    }

    if (validateOn === 'onChange') validateField(name, value)
    else setError(name, undefined)
  }

  const handleBlur = (name: keyof T) => {
    if (validateOn === 'onBlur') validateField(name, values[name])
  }

  const getProcessedFieldErrors = (
    validationResult: ReturnType<typeof schema.safeParse>
  ): FormErrors<T> => {
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten()
        .fieldErrors as Record<string, string[] | undefined>
      return Object.entries(fieldErrors).reduce((acc, [key, messages]) => {
        if (messages && messages.length > 0) {
          acc[key as keyof T] = messages[0]
        }
        return acc
      }, {} as FormErrors<T>)
    }
    return {}
  }

  const validateForm = (): FormFieldValidationResult<T> => {
    const validationResult = schema.safeParse(values)
    const processedErrors = getProcessedFieldErrors(validationResult)
    setErrors(processedErrors)
    return validationResult.success
      ? { success: true, data: validationResult.data }
      : { success: false }
  }

  const resetTouchedFields = () => setTouchedFields(new Set())

  const reset = (fullRest: boolean = false) => {
    setValues(prevValues => {
      const updatedValues = { ...prevValues }

      Object.keys(initialValues).forEach(key => {
        const initialValueKey = key as keyof T
        const prevValue = prevValues[initialValueKey]
        const initialValue = initialValues[initialValueKey]
        if (Array.isArray(prevValue) || typeof prevValue === 'object') {
          updatedValues[initialValueKey] = fullRest ? initialValue : prevValue
        } else {
          updatedValues[initialValueKey] = initialValue
        }
      })

      return updatedValues
    })

    setErrors({})
    resetTouchedFields()
  }

  const handleSubmit =
    (onSubmit?: (values: T) => Promise<void> | void) =>
    async (e?: FormEvent) => {
      e?.preventDefault()
      const validation = validateForm()
      if (!validation.success) return
      if (onSubmit) await onSubmit(validation.data as T)
      if (resetAfterSubmit) reset()
    }

  const register = (
    name: keyof T,
    options?: RegisterOptions
  ): RegisterReturn<T> => {
    const inputType = options?.type ?? 'text'
    const inputValue = values[name]
    const commonProps = {
      name,
      onBlur: () => handleBlur(name),
      required: options?.required ?? requiredFields.includes(name)
    }
    if (inputType === INPUT_TYPE_CHECKBOX) {
      return {
        type: INPUT_TYPE_CHECKBOX,
        ...commonProps,
        checked: Boolean(inputValue),
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          handleChange(name, e.target.checked)
      }
    }
    return {
      type: inputType,
      ...commonProps,
      value: inputValue ?? '',
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(name, e.target.value)
    }
  }

  const isDirty = touchedFields.size > 0
  const isValid = schema.safeParse(values).success
  const isDisabled =
    requiredFields.some(field => !values[field]) || !isDirty || !isValid
  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    register,
    setValue: (key, value) => handleChange(key, value),
    getValue: (key: keyof T) => values[key],
    setError,
    reset,
    resetTouchedFields,
    isDirty,
    isValid,
    isDisabled
  }
}
