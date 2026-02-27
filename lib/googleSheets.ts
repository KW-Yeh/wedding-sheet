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
