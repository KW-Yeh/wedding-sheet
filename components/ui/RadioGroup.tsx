import { FieldOption } from '@/types/form'

interface RadioGroupProps {
  name: string
  options: FieldOption[]
  value?: string
  onChange: (value: string) => void
  error?: string
}

export default function RadioGroup({ name, options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(opt => (
        <label
          key={opt.value}
          className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition ${
            value === opt.value
              ? 'border-rose-400 bg-rose-50 text-rose-700 font-medium'
              : error
              ? 'border-red-300 hover:border-red-400'
              : 'border-gray-300 text-gray-800 hover:border-rose-300'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-rose-500"
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}
