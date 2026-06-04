import type { Metadata, Viewport } from 'next'
import { Anton, Archivo } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-var-anton',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-var-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Panini WC 2026 — Meu Álbum',
  description: 'Checklist digital do álbum Panini FIFA World Cup 2026',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#091f12',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body className="min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  )
}
