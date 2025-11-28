import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react" // <-- ADDED: Import Suspense from react

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "3D Animated Landing Page",
  description: "Modern landing page with 3D animations and interactive elements",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
          SOLUTION: Wrap all components using dynamic client hooks (Navigation)
          and the child pages ({children}) in a Suspense boundary.
          This tells Next.js to skip pre-rendering those parts on the server
          until the client takes over.
        */}
        <Suspense fallback={<div className="h-16 w-full bg-white shadow-md flex items-center px-4">Loading Navigation...</div>}>
          <Navigation />
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  )
}