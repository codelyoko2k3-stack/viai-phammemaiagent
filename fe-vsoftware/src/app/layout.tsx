import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-NQRC98T7KK'

const manrope = Manrope({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'ViAI'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F2D6E',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'ViAI — Phần mềm theo yêu cầu cho SMEs', template: `%s | ${siteName}` },
  description: 'ViAI xây dựng phần mềm quản lý theo yêu cầu cho doanh nghiệp vừa và nhỏ: spa, nhà hàng, phòng khám, bán lẻ, logistics. AI Agent tự động hóa vận hành.',
  openGraph: {
    siteName,
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: '/logo-ngang.png', width: 1280, height: 906, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@viai_vn',
    images: ['/logo-ngang.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={manrope.variable}>
      <body className={`${manrope.className} bg-white text-vs-dark antialiased overflow-x-hidden`}>
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
