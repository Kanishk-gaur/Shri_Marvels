// src/app/layout.tsx

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agrawal Ceramics | Decorative Tiles & Marbles",
  description: "Premium decorative tiles, marbles, and ceramics for your home. High-quality materials with exquisite designs for modern interiors.",
  keywords: ["ceramic tiles", "decorative tiles", "marbles", "wall tiles", "floor tiles", "bathroom tiles", "kitchen tiles", "home decor"],
  authors: [{ name: "Agrawal Ceramics" }],
  
  // 👇 ADDED COMPLETE ICONS CONFIGURATION
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico', // Standard Favicon
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png', // Apple Touch Icon
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/android-chrome-192x192.png', // Android/PWA icon
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/android-chrome-512x512.png', // Android/PWA icon
    },
  ],
  manifest: '/site.webmanifest', // Linking the Web App Manifest
  // 👆 END OF ICONS CONFIGURATION
  
  openGraph: {
    title: "Agrawal Ceramics | Decorative Tiles & Marbles",
    description: "Premium decorative tiles, marbles, and ceramics for your home.",
    type: "website",
    locale: "en_US",
    siteName: "Agrawal Ceramics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agrawal Ceramics | Decorative Tiles & Marbles",
    description: "Premium decorative tiles, marbles, and ceramics for your home.",
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div className="h-16 w-full bg-white shadow-md flex items-center px-4">Loading Navigation...</div>}>
          <Navigation />
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}