'use client'

import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/shared/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      window.IntersectionObserver = class {
        observe() {}
        unobserve() {}
        disconnect() {}
      } as any;
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-maps-api-key" content={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
