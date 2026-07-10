import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline'
}

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
    'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100'
  const styles =
    variant === 'primary'
      ? 'bg-brand text-paper hover:bg-brand-light'
      : 'border border-line text-soil hover:border-brand hover:text-brand'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}
