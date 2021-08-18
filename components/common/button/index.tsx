import styles from './Button.module.scss'

interface IButtonProps {
  size: string
  variant: string
  fullWidth?: boolean
  children: any
  className?: string
  onClick?: () => void
}

function Button({
  size,
  variant,
  fullWidth,
  onClick,
  className,
  children,
}: IButtonProps) {
  return (
    <button
      className={`${styles['theme-button']} ${styles[size]} ${
        styles[variant]
      } ${fullWidth && styles.block} ${styles[className!]}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
