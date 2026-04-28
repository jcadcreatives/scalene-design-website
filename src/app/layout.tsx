import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Scalene Design — Amazon Graphics Agency',
  description: 'Premium Amazon product graphics — main images, listing imagery, and A+ content.',
  icons: {
    icon: '/logo.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
