interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange: (checked: boolean) => void
  error?: string
}

export default function Checkbox({ id, label, checked, onChange, error }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition ${
        error ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-rose-300'
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked ?? false}
        onChange={e => onChange(e.target.checked)}
        className="h-4 w-4 accent-rose-500"
      />
      <span>{label}</span>
    </label>
  )
}
