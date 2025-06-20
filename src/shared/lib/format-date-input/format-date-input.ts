import { ZodIssueCode } from 'zod'
import { REGEX } from '@/shared/config'
import { T_Message } from '@/shared/model'

interface ValidateDatesProps {
  start_date: string
  end_date?: string
  is_current?: boolean
  ctx: any
  incorrectMessage?: T_Message<'form.errorsMessages'>
}

export const validateDates = ({
  start_date,
  end_date,
  is_current,
  ctx,
  incorrectMessage
}: ValidateDatesProps) => {
  const [sm, sy] = start_date?.split('/').map(Number) || []
  const currentYear = new Date().getFullYear()

  if (!sm || !sy || sm < 1 || sm > 12) {
    ctx.addIssue({
      path: ['start_date'],
      code: ZodIssueCode.custom,
      message: incorrectMessage
    })
    return
  }

  if (sy > currentYear || sy < 1900) {
    ctx.addIssue({
      path: ['start_date'],
      code: ZodIssueCode.custom,
      message: sy < 1900 ? 'incorrectDate' : 'yearMustBeCurrentOrPast'
    })
  }

  if (!is_current) {
    if (!end_date) {
      ctx.addIssue({
        path: ['end_date'],
        code: ZodIssueCode.custom,
        message: 'required'
      })
      return
    }

    if (!REGEX.CORRECT_DATE.test(end_date)) {
      ctx.addIssue({
        path: ['end_date'],
        code: ZodIssueCode.custom,
        message: incorrectMessage
      })
      return
    }

    const [em, ey] = end_date.split('/').map(Number)

    if (!em || !ey || em < 1 || em > 12) {
      ctx.addIssue({
        path: ['end_date'],
        code: ZodIssueCode.custom,
        message: incorrectMessage
      })
      return
    }

    if (ey > currentYear || ey < 1900) {
      ctx.addIssue({
        path: ['end_date'],
        code: ZodIssueCode.custom,
        message: ey < 1900 ? 'incorrectDate' : 'yearMustBeCurrentOrPast'
      })
    }

    const start = new Date(sy, sm - 1)
    const end = new Date(ey, em - 1)

    if (start > end) {
      ctx.addIssue({
        path: ['end_date'],
        code: ZodIssueCode.custom,
        message: 'dateMustBe'
      })
    }
  }
}
