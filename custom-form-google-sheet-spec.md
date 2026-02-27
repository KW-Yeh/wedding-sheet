# 客製化表單 × Google Sheets 整合專案規格書

> **技術棧**：Next.js 14 (App Router) + React + TailwindCSS + Google Sheets API v4

---

## 一、專案概覽

| 項目 | 說明 |
|------|------|
| 目標 | 建立可客製化的網頁表單，填寫後自動寫入 Google Sheets |
| 前端 | Next.js 14 App Router + React + TailwindCSS |
| 後端 | Next.js API Routes（Serverless Functions） |
| 資料儲存 | Google Sheets（透過 Google Sheets API v4） |
| 認證方式 | Google Service Account（後端專用，無需使用者登入） |

---

## 二、目錄結構

```
project-root/
├── app/
│   ├── layout.tsx              # 全域 Layout
│   ├── page.tsx                # 表單首頁
│   ├── success/
│   │   └── page.tsx            # 送出成功頁面
│   └── api/
│       └── submit/
│           └── route.ts        # 接收表單 → 寫入 Google Sheets
├── components/
│   ├── Form/
│   │   ├── FormField.tsx       # 單一欄位元件（支援多種 type）
│   │   ├── FormBuilder.tsx     # 組合所有欄位的表單容器
│   │   └── SubmitButton.tsx    # 送出按鈕（含 loading 狀態）
│   └── ui/
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Textarea.tsx
│       ├── Checkbox.tsx
│       └── RadioGroup.tsx
├── config/
│   └── formConfig.ts           # 表單欄位設定檔（核心客製化檔案）
├── lib/
│   ├── googleSheets.ts         # Google Sheets API 封裝
│   └── validation.ts           # 表單驗證邏輯（Zod）
├── types/
│   └── form.ts                 # TypeScript 型別定義
├── .env.local                  # 環境變數（不進 Git）
├── .env.example                # 環境變數範本
└── tailwind.config.ts
```

---

## 三、核心設計：`formConfig.ts`

這是整個專案最重要的客製化入口，**只需修改此檔案就能更換表單內容**。

```typescript
// config/formConfig.ts

import { FormConfig } from '@/types/form'

export const formConfig: FormConfig = {
  title: '婚禮出席確認',
  description: '請填寫以下資料，讓我們為您做好準備 🎊',
  sheetName: 'Sheet1',           // Google Sheet 的分頁名稱
  successMessage: '感謝您的回覆！期待與您共同慶祝這份喜悅 🥂',
  fields: [
    // 1. 姓名
    {
      id: 'name',
      label: '姓名',
      type: 'text',
      placeholder: '請輸入您的姓名',
      required: true,
      validation: { minLength: 2, maxLength: 50 },
    },

    // 2. 關係
    {
      id: 'relation',
      label: '關係',
      type: 'radio',
      required: true,
      options: [
        { label: '男方親友', value: 'groom_family' },
        { label: '女方親友', value: 'bride_family' },
        { label: '男方朋友／同事', value: 'groom_friend' },
        { label: '女方朋友／同事', value: 'bride_friend' },
      ],
    },

    // 3. 是否攜伴（條件觸發：選「是」顯示攜伴數量欄）
    {
      id: 'hasPlusOne',
      label: '是否攜伴',
      type: 'radio',
      required: true,
      options: [
        { label: '是', value: 'yes' },
        { label: '否', value: 'no' },
      ],
    },
    {
      id: 'plusOneCount',
      label: '出席人數（含本人）',
      type: 'number',
      placeholder: '請輸入總出席人數（含您自己）',
      helperText: '人數請包含您自己，例如您 + 1 位同伴請填 2',
      required: true,                   // 後端依 hasPlusOne === 'yes' 條件驗證
      conditionalOn: {                  // 僅當此條件成立時顯示
        fieldId: 'hasPlusOne',
        value: 'yes',
      },
      validation: { min: 2, max: 10 },
    },

    // 4. 交通方式
    {
      id: 'transportation',
      label: '交通方式',
      type: 'radio',
      required: true,
      options: [
        { label: '高鐵需接駁', value: 'hsr_shuttle' },
        { label: '自行前往', value: 'self' },
      ],
    },

    // 5. 葷素
    {
      id: 'mealType',
      label: '飲食偏好',
      type: 'radio',
      required: true,
      options: [
        { label: '葷食', value: 'meat' },
        { label: '素食', value: 'vegetarian' },
      ],
    },

    // 6. 是否需要小孩座椅（條件觸發：選「是」顯示數量欄）
    {
      id: 'needsHighchair',
      label: '是否需要小孩座椅',
      type: 'radio',
      required: true,
      options: [
        { label: '是', value: 'yes' },
        { label: '否', value: 'no' },
      ],
    },
    {
      id: 'highchairCount',
      label: '需要座椅數量',
      type: 'number',
      placeholder: '請輸入所需座椅數量',
      required: true,                   // 後端依 needsHighchair === 'yes' 條件驗證
      conditionalOn: {
        fieldId: 'needsHighchair',
        value: 'yes',
      },
      validation: { min: 1, max: 10 },
    },

    // 7. 祝福 / 備註
    {
      id: 'message',
      label: '給予祝福 / 其餘備註',
      type: 'textarea',
      placeholder: '留下您對新人的祝福，或是其他想告知我們的事...',
      required: false,
      rows: 4,
    },
  ],
}
```

### 支援的欄位 type

| type | 元件 | 說明 |
|------|------|------|
| `text` | Input | 單行文字 |
| `email` | Input | Email 格式驗證 |
| `tel` | Input | 電話號碼 |
| `number` | Input | 數字 |
| `textarea` | Textarea | 多行文字 |
| `select` | Select | 下拉選單 |
| `radio` | RadioGroup | 單選 |
| `checkbox` | Checkbox | 勾選（通常用於同意條款） |
| `date` | Input[date] | 日期選擇 |

### 條件顯示欄位（`conditionalOn`）

本表單有兩組條件欄位，使用 `conditionalOn` 屬性設定：

| 觸發欄位 | 觸發值 | 顯示的子欄位 |
|----------|--------|------------|
| `hasPlusOne` | `'yes'` | `plusOneCount`（出席人數） |
| `needsHighchair` | `'yes'` | `highchairCount`（座椅數量） |

**前端邏輯**：`FormBuilder` 在 render 每個欄位前，先檢查是否有 `conditionalOn`；若有，則只在對應父欄位值符合時才顯示該欄位，並在父欄位值改變為不符合時自動清除該子欄位的值，避免髒資料送出。

**後端邏輯**：`conditionalOn` 欄位的 required 驗證改為條件式——僅當父欄位值符合時才強制驗證。

---

## 四、TypeScript 型別定義

```typescript
// types/form.ts

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
  pattern?: string  // regex pattern
}

// 條件顯示設定：當 fieldId 的值等於 value 時，才顯示此欄位
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
  options?: FieldOption[]      // for select, radio
  rows?: number                // for textarea
  validation?: FieldValidation
  helperText?: string          // 欄位說明文字
  conditionalOn?: ConditionalOn // 條件顯示設定
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
```

---

## 五、Google Sheets API 整合

### 5.1 建立 Service Account（一次性設定）

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案（或選用現有專案）
3. 啟用 **Google Sheets API**
4. 建立 **Service Account**：
   - IAM & Admin → Service Accounts → Create
   - 下載 JSON 金鑰檔
5. 開啟目標 Google Sheet，將 Service Account 的 email 加入**編輯者**權限

### 5.2 環境變數設定

```bash
# .env.local

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

### 5.3 Google Sheets 封裝函式

```typescript
// lib/googleSheets.ts

import { google } from 'googleapis'

function getGoogleAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function appendToSheet(
  sheetName: string,
  values: (string | number | boolean)[][]
) {
  const auth = getGoogleAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values },
  })

  return response.data
}

// 初始化 Sheet 標題列（第一次使用時呼叫）
export async function initSheetHeaders(
  sheetName: string,
  headers: string[]
) {
  const auth = getGoogleAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [headers] },
  })
}
```

---

## 六、API Route

```typescript
// app/api/submit/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { appendToSheet } from '@/lib/googleSheets'
import { formConfig } from '@/config/formConfig'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. 依照 formConfig 動態建立 Zod schema 驗證
    //    條件欄位（conditionalOn）：只在父欄位值符合時才強制驗證
    const schemaShape: Record<string, z.ZodTypeAny> = {}
    for (const field of formConfig.fields) {
      let schema: z.ZodTypeAny = field.type === 'number' ? z.coerce.number() : z.string()

      if (field.conditionalOn) {
        // 條件欄位：僅當父欄位符合時才 required
        const { fieldId, value: triggerValue } = field.conditionalOn
        const parentValue = body[fieldId]
        const isActive = parentValue === triggerValue

        if (isActive && field.required) {
          schema = field.type === 'number'
            ? (schema as z.ZodNumber).min(field.validation?.min ?? 1, `${field.label}為必填`)
            : (schema as z.ZodString).min(1, `${field.label}為必填`)
        } else {
          schema = schema.optional()
        }
      } else if (field.required) {
        schema = field.type === 'number'
          ? (schema as z.ZodNumber).min(field.validation?.min ?? 0, `${field.label}為必填`)
          : (schema as z.ZodString).min(1, `${field.label}為必填`)
      } else {
        schema = schema.optional()
      }

      schemaShape[field.id] = schema
    }

    const result = z.object(schemaShape).safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: '資料驗證失敗', details: result.error.flatten() },
        { status: 400 }
      )
    }

    // 2. 整理要寫入的資料（依欄位順序排列，條件未觸發的欄位寫入空字串）
    const timestamp = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
    const row = [
      timestamp,
      ...formConfig.fields.map(f => {
        // 條件欄位：父欄位未觸發時寫入 '-'（方便 Sheet 閱讀）
        if (f.conditionalOn) {
          const { fieldId, value: triggerValue } = f.conditionalOn
          if (result.data[fieldId] !== triggerValue) return '-'
        }
        const val = result.data[f.id]
        return val === undefined || val === null ? '' : String(val)
      }),
    ]

    // 3. 寫入 Google Sheets
    await appendToSheet(formConfig.sheetName, [row])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json({ error: '伺服器錯誤，請稍後再試' }, { status: 500 })
  }
}
```

---

## 七、前端表單邏輯

```typescript
// components/Form/FormBuilder.tsx（核心邏輯）

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { formConfig } from '@/config/formConfig'
import FormField from './FormField'
import SubmitButton from './SubmitButton'

export default function FormBuilder() {
  const router = useRouter()
  const [values, setValues] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (id: string, value: any) => {
    setValues(prev => {
      const next = { ...prev, [id]: value }

      // 當父欄位改變時，清除所有依賴它的子欄位值，避免髒資料
      formConfig.fields.forEach(f => {
        if (f.conditionalOn?.fieldId === id && f.conditionalOn.value !== value) {
          delete next[f.id]
        }
      })

      return next
    })
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }))
  }

  // 判斷欄位是否應顯示
  const isFieldVisible = (field: typeof formConfig.fields[0]) => {
    if (!field.conditionalOn) return true
    return values[field.conditionalOn.fieldId] === field.conditionalOn.value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 前端驗證：只驗證當前可見欄位
    const newErrors: Record<string, string> = {}
    for (const field of formConfig.fields) {
      if (!isFieldVisible(field)) continue
      if (field.required && (values[field.id] === undefined || values[field.id] === '')) {
        newErrors[field.id] = `${field.label}為必填`
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error('Submit failed')
      router.push('/success')
    } catch {
      alert('送出失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formConfig.fields.map(field => {
        if (!isFieldVisible(field)) return null
        return (
          <FormField
            key={field.id}
            field={field}
            value={values[field.id]}
            error={errors[field.id]}
            onChange={(val) => handleChange(field.id, val)}
          />
        )
      })}
      <SubmitButton isLoading={isSubmitting} />
    </form>
  )
}
```

---

## 八、Google Sheets 欄位對應

Sheet 第一列為**標題列**，對應 `formConfig.fields` 的順序：

| 欄 | 欄位 ID | 標題 |
|----|---------|------|
| A | _(自動)_ | 送出時間 |
| B | `name` | 姓名 |
| C | `relation` | 關係 |
| D | `hasPlusOne` | 是否攜伴 |
| E | `plusOneCount` | 出席人數（含本人）|
| F | `transportation` | 交通方式 |
| G | `mealType` | 飲食偏好 |
| H | `needsHighchair` | 是否需要小孩座椅 |
| I | `highchairCount` | 需要座椅數量 |
| J | `message` | 給予祝福／備註 |

**條件欄位寫入規則**：
- `plusOneCount`：當 `hasPlusOne = no` 時，該欄寫入 `'-'`
- `highchairCount`：當 `needsHighchair = no` 時，該欄寫入 `'-'`

> **初始化標題列**：首次部署後，手動在 Sheet 第一列填入以上標題，或透過 `initSheetHeaders()` 自動建立。

---

## 九、安裝與環境設定步驟

```bash
# 1. 建立專案
npx create-next-app@latest my-form --typescript --tailwind --app

# 2. 安裝相依套件
npm install googleapis zod

# 3. 設定環境變數
cp .env.example .env.local
# 填入 GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SPREADSHEET_ID

# 4. 本地開發
npm run dev

# 5. 部署（建議 Vercel）
# 在 Vercel Dashboard 設定環境變數後 push 即自動部署
```

---

## 十、部署注意事項

### Vercel 環境變數設定
- `GOOGLE_PRIVATE_KEY` 在 Vercel 中直接貼上完整內容（包含換行），**不需要**手動加 `\n`
- 程式碼中記得做 `.replace(/\\n/g, '\n')` 轉換

### Google Sheets 權限確認
- Service Account email 必須有目標 Sheet 的**編輯者**權限
- Spreadsheet ID 從 Sheet URL 取得：`https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

### Rate Limit
- Google Sheets API 免費版：100 req/100 sec per user
- 高流量表單建議加入 Queue 或 Redis 緩衝

---

## 十一、可擴充方向

| 功能 | 實作方式 |
|------|---------|
| 多表單支援 | 建立多個 `formConfig`，用 URL 參數切換 |
| 管理後台 | 讀取 Sheet 資料顯示為表格（`sheets.values.get`）|
| Email 通知 | 整合 Resend 或 SendGrid，送出後寄確認信 |
| 防垃圾表單 | 加入 Cloudflare Turnstile 或 Google reCAPTCHA |
| 上傳檔案 | 整合 Cloudinary 或 Vercel Blob，儲存 URL 到 Sheet |
| 草稿儲存 | localStorage 存暫時資料，重新整理不遺失 |

---

*最後更新：2026-02-27（v2：更新為婚禮出席確認表單欄位）*
