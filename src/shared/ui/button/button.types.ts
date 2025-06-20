import { ButtonHTMLAttributes, ReactNode } from 'react'

export const ButtonVariant = {
  PRIMARY: 'primary',
  GHOST: 'ghost'
} as const

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  text?: string | ReactNode
  variant?: (typeof ButtonVariant)[keyof typeof ButtonVariant]
  children?: ReactNode
  spanClassName?: string
}
