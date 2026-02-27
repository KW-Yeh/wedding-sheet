import FormBuilder from '@/components/Form/FormBuilder'
import { formConfig } from '@/config/formConfig'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-rose-50 py-12 px-4">
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{formConfig.title}</h1>
          {formConfig.description && (
            <p className="text-gray-500">{formConfig.description}</p>
          )}
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <FormBuilder />
        </div>
      </div>
    </main>
  )
}
