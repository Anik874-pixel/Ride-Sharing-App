
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import Header from '@/components/shared/Header'
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        
        <AuthProvider>
        <ThemeProvider >
          <Header />
          {children}
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}