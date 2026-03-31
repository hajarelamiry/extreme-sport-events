import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";
import Providers from './providers'

export const metadata: Metadata = {
    icons: { icon: "/favicon.svg" },
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}