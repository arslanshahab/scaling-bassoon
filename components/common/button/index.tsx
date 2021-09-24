import styles from './Button.module.scss'

interface IButtonProps {
  size: string
  variant: string
  fullWidth?: boolean
  children: any
  className?: string
  onClick?: () => void
  type: 'button' | 'submit' | 'reset' | undefined
}

function Button({
  size,
  variant,
  fullWidth,
  onClick,
  className,
  children,
  type,
}: IButtonProps) {
  return (
    <button
      className={`${styles['theme-button']} ${styles[size]} ${
        styles[variant]
      } ${fullWidth && styles.block} ${styles[className!]}`}
      onClick={onClick}
      type={type || 'button'}>
      {children}
    </button>
  )
}

export default Button
