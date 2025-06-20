import en from '../../../messages/en'

type Messages = typeof en

declare global {
  interface IntlMessages extends Messages {}
}

export const locales = ['en'] as const

type ValueAtPath<T, Path> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? ValueAtPath<T[Key], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never

type AllPaths<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${Prefix}${K}` | AllPaths<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`
    }[keyof T & string]
  : never

export type T_Message<Path extends AllPaths<IntlMessages>> = AllPaths<
  ValueAtPath<IntlMessages, Path>
>
