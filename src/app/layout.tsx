import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Portfolio | Terminal',
  description: 'Modern terminal-themed portfolio website',
  keywords: ['portfolio', 'developer', 'terminal', 'web development'],
  authors: [{ name: 'Your Name' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono bg-terminal-bg text-terminal-secondary min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-terminal-bg via-gray-900 to-terminal-bg">
          {children}
        </div>
      </body>
    </html>
  )
}
