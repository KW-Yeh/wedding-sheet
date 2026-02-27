import type { Metadata } from "next";
import { Shadows_Into_Light } from "next/font/google";
import "./globals.css";

const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shadows",
});

export const metadata: Metadata = {
  title: "婚禮出席確認",
  description: "請填寫以下資料，讓我們為您做好準備",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${shadowsIntoLight.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
