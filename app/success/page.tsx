import Link from 'next/link'
import { formConfig } from '@/config/formConfig'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center space-y-6">
        <div className="text-5xl">🥂</div>
        <h1 className="text-2xl font-bold text-gray-800">送出成功！</h1>
        <p className="text-gray-600 leading-relaxed">
          {formConfig.successMessage ?? '感謝您的回覆！'}
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-rose-300 px-6 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50"
        >
          返回首頁
        </Link>
      </div>
    </main>
  )
}
