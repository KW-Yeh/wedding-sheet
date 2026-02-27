export type FieldType =
  | 'text' | 'email' | 'tel' | 'number'
  | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date'

export interface FieldOption {
  label: string
  value: string
}

export interface FieldValidation {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
}

export interface ConditionalOn {
  fieldId: string
  value: string
}

export interface FormField {
  id: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: FieldOption[]
  rows?: number
  validation?: FieldValidation
  helperText?: string
  conditionalOn?: ConditionalOn
}

export interface FormConfig {
  title: string
  description?: string
  sheetName: string
  successMessage?: string
  fields: FormField[]
}

export interface FormSubmission {
  timestamp: string
  [key: string]: string | boolean | number
}
