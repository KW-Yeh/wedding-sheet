import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          rel="preload"
          href="/fonts/JasonHandwriting2-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/JasonHandwriting3-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${shadowsIntoLight.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
