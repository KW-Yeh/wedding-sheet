import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export default function Textarea({ error, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-rose-400 resize-none ${
        error
          ? 'border-red-400 bg-red-50 focus:ring-red-300'
          : 'border-gray-300 bg-white focus:border-rose-400'
      } ${className}`}
    />
  )
}
