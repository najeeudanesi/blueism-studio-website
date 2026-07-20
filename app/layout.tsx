import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito_Sans, Anton, Archivo, Cormorant_Garamond } from 'next/font/google'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

const nunito = Nunito_Sans({
  variable: '--font-nunito',
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  subsets: ['latin'],
})
const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
})
const archivo = Archivo({
  variable: '--font-archivo',
  weight: ['800', '900'],
  subsets: ['latin'],
})
const cormorant = Cormorant_Garamond({
  variable: '--font-serif-italic',
  weight: ['500', '600'],
  style: ['italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blueismstudio.com'),
  title: {
    default: 'Blueism — Creative Design Studio',
    template: '%s | Blueism',
  },
  description:
    'Blueism is a creative design studio dedicated to building distinctive and meaningful brand identities. Branding, Design, 3D & Software — from idea to identity, from screen to space.',
  keywords: [
    'Blueism',
    'Creative Design Studio',
    'Branding Morocco',
    'Graphic Design Rabat',
    '3D Design',
    'Software Design',
    'Brand Identity Studio',
  ],
  authors: [{ name: 'Blueism', url: 'https://blueismstudio.com' }],
  creator: 'Blueism',
  publisher: 'Blueism',
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
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blueismstudio.com',
    title: 'Blueism — Creative Design Studio',
    description:
      'Designing businesses from the ground up. From idea to identity, from screen to space.',
    siteName: 'Blueism',
    images: [{ url: '/favicon-512.png', width: 512, height: 512, alt: 'Blueism brand mark' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blueism — Creative Design Studio',
    description:
      'Designing businesses from the ground up. From idea to identity, from screen to space.',
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
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#2B32E5' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://blueismstudio.com/#organization',
        name: 'Blueism',
        url: 'https://blueismstudio.com',
        logo: 'https://blueismstudio.com/favicon-512.png',
        email: 'Info@blueism-studio.com',
        telephone: '+212123456789',
        sameAs: ['https://instagram.com/blueismstudio', 'https://x.com/blueismstudio'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://blueismstudio.com/#localbusiness',
        name: 'Blueism',
        image: 'https://blueismstudio.com/favicon-512.png',
        url: 'https://blueismstudio.com',
        telephone: '+212123456789',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Agdal, Hay Riad',
          addressLocality: 'Rabat',
          addressCountry: 'MA',
        },
      },
    ],
  }

  return (
    <html lang="en" className={`${nunito.variable} ${anton.variable} ${archivo.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
