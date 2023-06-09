import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/tw'
import { Metadata } from 'next'
import { ThemeProvider } from '../components/ui/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Cruise Sealing',
    template: `%s - Cruise Sealing`,
  },
  description: 'Find your next cruise sealing',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1 flex flex-col">{children}</main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
