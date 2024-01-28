// layout.js - This is the root layout file for the whole app.
// Any styling included in this file will apply to ALL app components.

import 'server-only'

// Font import
import { Inter } from 'next/font/google'

// Import global CSS file
import './globals.css'

// Import components
import HeaderTitle from './components/header-title'
import HeaderSignInAndCart from './components/header-signin-cart'
import Navbar from './components/navbar'
import Providers from './components/providers'

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
      <body className={inter.className}>
        <HeaderTitle />
        <HeaderSignInAndCart />
        <nav>
          <Navbar />
        </nav>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}