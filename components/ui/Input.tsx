import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string }

export default function Input({ label, className = '', ...props }: Props) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-soil-muted">{label}</span>
      <input
        className={`w-full rounded-lg border border-line bg-card px-3 py-2 text-soil outline-none transition-colors duration-200 focus:border-brand focus:ring-1 focus:ring-brand ${className}`}
        {...props}
      />
    </label>
  )
}