import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import AuditModal from '@/components/AuditModal'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.scalenedesign.com'),
  title: 'Scalene Design — Amazon Listing Images & A+ Content Agency',
  description:
    'Amazon creative studio: main images, listing images, Premium A+, Brand Story and Storefronts that win the click and close the sale. 130+ brands. Get a free listing audit.',
  alternates: { canonical: '/' },
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Scalene Design',
    title: 'Scalene Design — Amazon Listing Images & A+ Content Agency',
    description: 'Main images, listing images, Premium A+, Brand Story and Storefronts that sell. Get a free listing audit.',
    images: ['/video/reel-poster-v17.jpg'],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Scalene Design',
              url: 'https://www.scalenedesign.com',
              logo: 'https://www.scalenedesign.com/logo.png',
              description:
                'Amazon creative studio: main images, listing images, Premium A+ content, Brand Story and Storefront design.',
              areaServed: ['US', 'GB', 'EU', 'AU'],
              address: { '@type': 'PostalAddress', addressCountry: 'PH' },
              sameAs: ['https://www.upwork.com/freelancers/~01ce3588a9e625d9cd'],
            }),
          }}
        />
        {children}
        <AuditModal />
      </body>
    </html>
  )
}
