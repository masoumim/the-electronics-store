// layout.js - This is the root layout file for the whole app.
// Any styling included in this file will apply to ALL app components.

import 'server-only'

import '@/app/globals.css'

// Font import
import { Inter } from 'next/font/google'

// Import components
import HeaderInteractive from './components/header-interactive'
import Navbar from './components/navbar'
import Providers from './components/providers'
import Footer from './components/footer'

// Font
const inter = Inter({ subsets: ['latin'] })

// Metadata
export const metadata = {
  title: 'The Electronics Store',
  description: 'Great deals on gadgets, games and more',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <HeaderInteractive />
        <nav>
          <Navbar />
        </nav>
        <div style={{ maxWidth: '1200px', width: '100%' }} className="mx-auto bg-slate-50 flex-grow mt-5 pt-5 pb-10">
          <Providers>
            {children}
          </Providers>
        </div>
        <Footer />
      </body>
    </html>
  )
}