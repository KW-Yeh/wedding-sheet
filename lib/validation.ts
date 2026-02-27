import { z } from 'zod'
import { FormField } from '@/types/form'

export function buildZodSchema(
  fields: FormField[],
  body: Record<string, unknown>
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const schemaShape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    let schema: z.ZodTypeAny =
      field.type === 'number' ? z.coerce.number() : z.string()

    if (field.conditionalOn) {
      const { fieldId, value: triggerValue } = field.conditionalOn
      const parentValue = body[fieldId]
      const isActive = parentValue === triggerValue

      if (isActive && field.required) {
        schema =
          field.type === 'number'
            ? (schema as z.ZodNumber).min(
                field.validation?.min ?? 1,
                `${field.label}為必填`
              )
            : (schema as z.ZodString).min(1, `${field.label}為必填`)
      } else {
        schema = schema.optional()
      }
    } else if (field.required) {
      schema =
        field.type === 'number'
          ? (schema as z.ZodNumber).min(
              field.validation?.min ?? 0,
              `${field.label}為必填`
            )
          : (schema as z.ZodString).min(1, `${field.label}為必填`)
    } else {
      schema = schema.optional()
    }

    schemaShape[field.id] = schema
  }

  return z.object(schemaShape)
}
