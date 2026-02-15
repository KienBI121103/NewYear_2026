import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gieo Quẻ May Mắn Đầu Xuân 2026 🐴 Năm Bính Ngọ',
  description:
    'Gieo quẻ may mắn đầu xuân Bính Ngọ 2026 - Xem tử vi, lời chúc Tết và lời khuyên phong thủy cho 12 con giáp. Chúc Tết vui vẻ, an khang thịnh vượng!',
  keywords: [
    'gieo quẻ',
    'năm mới 2026',
    'Tết Bính Ngọ',
    'tử vi 2026',
    'lời chúc Tết',
    'may mắn đầu xuân',
    'con ngựa 2026',
    'phong thủy',
  ],
  authors: [{ name: 'Gieo Quẻ 2026' }],
  openGraph: {
    title: '🐴 Gieo Quẻ May Mắn Đầu Xuân Bính Ngọ 2026',
    description:
      'Xin một quẻ đầu năm, cầu bình an & may mắn! Xem tử vi 12 con giáp và nhận lời chúc Tết riêng dành cho bạn.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Gieo Quẻ May Mắn 2026',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gieo Quẻ May Mắn Đầu Xuân Bính Ngọ 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🐴 Gieo Quẻ May Mắn Đầu Xuân 2026',
    description: 'Xin quẻ đầu năm Bính Ngọ 2026 - Nhận lời chúc Tết & tử vi!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#B71C1C',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐴</text></svg>" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-tet-pattern antialiased safe-bottom">
        {children}
      </body>
    </html>
  );
}
