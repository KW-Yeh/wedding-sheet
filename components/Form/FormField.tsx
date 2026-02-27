import { FormField as FormFieldType } from '@/types/form'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import RadioGroup from '@/components/ui/RadioGroup'
import Checkbox from '@/components/ui/Checkbox'

interface FormFieldProps {
  field: FormFieldType
  value: unknown
  error?: string
  onChange: (value: unknown) => void
}

export default function FormField({ field, value, error, onChange }: FormFieldProps) {
  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            value={(value as string) ?? ''}
            onChange={e => onChange(e.target.value)}
            error={error}
          />
        )

      case 'select':
        return (
          <Select
            id={field.id}
            options={field.options ?? []}
            value={(value as string) ?? ''}
            onChange={e => onChange(e.target.value)}
            error={error}
          />
        )

      case 'radio':
        return (
          <RadioGroup
            name={field.id}
            options={field.options ?? []}
            value={value as string | undefined}
            onChange={onChange}
            error={error}
          />
        )

      case 'checkbox':
        return (
          <Checkbox
            id={field.id}
            label={field.label}
            checked={value as boolean | undefined}
            onChange={onChange}
            error={error}
          />
        )

      default:
        return (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={(value as string | number) ?? ''}
            onChange={e => onChange(e.target.value)}
            error={error}
            min={field.validation?.min}
            max={field.validation?.max}
            minLength={field.validation?.minLength}
            maxLength={field.validation?.maxLength}
          />
        )
    }
  }

  return (
    <div className="space-y-1.5">
      {field.type !== 'checkbox' && (
        <label htmlFor={field.id} className="block text-base font-medium text-gray-700">
          {field.label}
          {field.required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}
      {renderInput()}
      {field.helperText && !error && (
        <p className="text-sm text-gray-500">{field.helperText}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
