import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'LearnAI - AI 智慧學習平台',
  description: '以 AI 驅動的全方位學習平台，對話學習、智能體建立、AI 圖像生成，開啟你的智慧學習之旅。',
  keywords: ['AI 學習', '人工智能', '智能體', 'AI 圖像生成', '教育科技'],
  openGraph: {
    title: 'LearnAI - AI 智慧學習平台',
    description: '以 AI 驅動的全方位學習平台，開啟你的智慧學習之旅。',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#4B6BFB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={`${inter.variable} ${notoSansTC.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
