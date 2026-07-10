import { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label: string }

export default function Select({ label, className = '', children, ...props }: Props) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-soil-muted">{label}</span>
      <select
        className={`w-full rounded-lg border border-line bg-card px-3 py-2 text-soil outline-none transition-colors duration-200 focus:border-brand focus:ring-1 focus:ring-brand ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
