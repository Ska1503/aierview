import classNames from 'classnames'
import { FC } from 'react'
import { ButtonVariant, IButtonProps } from './button.types'

const Button: FC<IButtonProps> = ({
  className,
  spanClassName,
  children,
  type = 'button',
  onClick,
  text,
  disabled = false,
  variant = ButtonVariant.PRIMARY,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={classNames(
        'group',
        variant,
        className,
        variant,
        'disabled:!cursor-not-allowed'
      )}
      type={type}
      onClick={onClick ?? onClick}
    >
      {children}
      <span
        className={classNames(
          'group-disabled:!cursor-not-allowed',
          spanClassName
        )}
      >
        {text}
      </span>
    </button>
  )
}

export default Button
