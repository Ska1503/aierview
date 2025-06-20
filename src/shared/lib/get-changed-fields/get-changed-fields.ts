type ObjectWithLabel = { label: string }

export const getChangedFields = <T extends Record<string, any>>(
  current: Partial<T>,
  initial: Partial<T>
): Partial<T> => {
  const changed: Partial<T> = {}

  ;(Object.keys(current) as (keyof T)[]).forEach(key => {
    const currentValue = current[key]
    const initialValue = initial[key]

    if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
      const isObjectWithLabel = (arr: any[]): arr is ObjectWithLabel[] =>
        arr.every(v => typeof v?.label === 'string')

      if (isObjectWithLabel(currentValue) && isObjectWithLabel(initialValue)) {
        const currentLabels = currentValue
          .map((v: ObjectWithLabel) => v.label)
          .sort()
          .join(',')
        const initialLabels = initialValue
          .map((v: ObjectWithLabel) => v.label)
          .sort()
          .join(',')

        if (currentLabels !== initialLabels) {
          changed[key] = currentValue
        }
        return
      }
    }

    if (
      JSON.stringify(currentValue ?? null) !==
      JSON.stringify(initialValue ?? null)
    ) {
      changed[key] = currentValue
    }
  })

  return changed
}
