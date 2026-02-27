import { NextRequest, NextResponse } from 'next/server'
import { appendToSheet } from '@/lib/googleSheets'
import { buildZodSchema } from '@/lib/validation'
import { formConfig } from '@/config/formConfig'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 依照 formConfig 動態建立 Zod schema 並驗證
    const schema = buildZodSchema(formConfig.fields, body)
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: '資料驗證失敗', details: result.error.flatten() },
        { status: 400 }
      )
    }

    // 整理要寫入的資料（依欄位順序排列）
    const timestamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    const row = [
      timestamp,
      ...formConfig.fields.map(f => {
        // 條件欄位：父欄位未觸發時寫入 '-'
        if (f.conditionalOn) {
          const { fieldId, value: triggerValue } = f.conditionalOn
          if (result.data[fieldId] !== triggerValue) return '-'
        }
        const val = result.data[f.id]
        if (val === undefined || val === null) return ''
        // 有 options 的欄位（radio/select）用 label 取代 value
        const label = f.options?.find(o => o.value === String(val))?.label
        return label ?? String(val)
      }),
    ]

    await appendToSheet(formConfig.sheetName, [row])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: '伺服器錯誤，請稍後再試' }, { status: 500 })
  }
}
