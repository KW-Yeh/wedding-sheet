import { SelectHTMLAttributes } from 'react'
import { FieldOption } from '@/types/form'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: FieldOption[]
  error?: string
}

export default function Select({ options, error, className = '', ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-rose-400 bg-white ${
        error
          ? 'border-red-400 bg-red-50 focus:ring-red-300'
          : 'border-gray-300 focus:border-rose-400'
      } ${className}`}
    >
      <option value="">請選擇...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
