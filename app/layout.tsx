import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond, Oswald } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})
const oswald = Oswald({
  variable: '--font-bold',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blueismstudio.com'),
  title: {
    default: 'Blueism Studio — Form Follows Feeling',
    template: '%s | Blueism Studio'
  },
  description: 'A multidisciplinary design studio from Casablanca. We build spaces, products, and digital systems that feel. Specializing in 3D Design, Interior Architecture, Product Design, Software & UI/UX.',
  keywords: ['Blueism Studio', 'Design Studio Casablanca', 'Interior Architecture Morocco', '3D Design Casablanca', 'UI/UX Design Morocco', 'Minimalist Design Studio', 'Product Design Morocco', 'Generative Software Layouts'],
  authors: [{ name: 'Blueism Studio', url: 'https://blueismstudio.com' }],
  creator: 'Blueism Studio',
  publisher: 'Blueism Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blueismstudio.com',
    title: 'Blueism Studio — Multidisciplinary Design Studio',
    description: 'Casablanca-based multidisciplinary design studio spanning Interior Architecture, 3D Design, Product Design, Software & UI/UX.',
    siteName: 'Blueism Studio',
    images: [
      {
        url: '/favicon-512.png',
        width: 512,
        height: 512,
        alt: 'Blueism Studio brand mark',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blueism Studio — Form Follows Feeling',
    description: 'Casablanca-based multidisciplinary design studio spanning Interior Architecture, 3D Design, Product Design, Software & UI/UX.',
    images: ['/favicon-512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/favicon-180.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFEEC' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Rich structured data for Google first page visibility (LocalBusiness & Organization schemas)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://blueismstudio.com/#organization',
        'name': 'Blueism Studio',
        'url': 'https://blueismstudio.com',
        'logo': 'https://blueismstudio.com/favicon-512.png',
        'sameAs': [
          'https://instagram.com/blueismstudio',
          'https://behance.net/blueismstudio'
        ]
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://blueismstudio.com/#localbusiness',
        'name': 'Blueism Studio',
        'image': 'https://blueismstudio.com/favicon-512.png',
        'url': 'https://blueismstudio.com',
        'telephone': '',
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '',
          'addressLocality': 'Casablanca',
          'addressRegion': 'Grand Casablanca',
          'postalCode': '',
          'addressCountry': 'MA'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 33.5731,
          'longitude': -7.5898
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ],
          'opens': '09:00',
          'closes': '18:00'
        }
      }
    ]
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${oswald.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* Injecting JSON-LD for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
