// src/app/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";
// START: New imports for Catalog feature
import { CatalogProvider } from "@/context/CatalogContext";
// END: New imports for Catalog feature

const inter = Inter({ subsets: ["latin"] });

// Organization Schema JSON-LD Data for Search Engine Optimization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shri Marvels", // Updated to brand name
  alternateName: "Agrawal Ceramics",
  url: "https://shrimarvels.com", // Replace with your actual live domain
  logo: "https://shrimarvels.com/logo.png", // Must be an absolute URL for Google indexing
  description:
    "Premium decorative tiles, marbles, and ceramics for your home. High-quality materials with exquisite designs for modern interiors.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7091833184",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  sameAs: [
    "https://wa.me/917091833184",
    "https://www.facebook.com/AgrawalCeramics",
    "https://www.instagram.com/AgrawalCeramics",
    "https://twitter.com/AgrawalCeramics",
    "https://www.linkedin.com/company/AgrawalCeramics",
  ],
};

export const metadata: Metadata = {
  title: "Shri Marvels | Premium Tiles, Marble & Roofing Solutions",
  description:
    "Discover luxury flooring and roofing solutions at Shri Marvels (Agrawal Ceramics). Premium quality tiles, marble, and granite.",
  keywords: [
    "Shri Marvels",
    "Agrawal Ceramics",
    "Agrawal Cermaics",
    "ceramic tiles",
    "decorative tiles",
    "marbles",
    "wall tiles",
    "floor tiles",
    "bathroom tiles",
    "kitchen tiles",
    "home decor",
    "premium tiles",
    "natural stone",
    "roofing solutions",
  ],
  authors: [{ name: "Shri Marvels" }],

  // ADDED COMPLETE ICONS CONFIGURATION FOR SEARCH ENGINES & PWA
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        rel: "apple-touch-icon",
      },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "Shri Marvels | Decorative Tiles & Marbles",
    description:
      "Premium decorative tiles, marbles, and ceramics for your home.",
    url: "https://shrimarvels.com",
    type: "website",
    locale: "en_US",
    siteName: "Shri Marvels",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shri Marvels | Decorative Tiles & Marbles",
    description:
      "Premium decorative tiles, marbles, and ceramics for your home.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* NEW: Organization Schema Markup to link logo and contact info */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* START: Wrap the application with the CatalogProvider */}
        <CatalogProvider>
          <Suspense
            fallback={
              <div className="h-16 w-full bg-white shadow-md flex items-center px-4 font-medium text-zinc-600">
                Loading Navigation...
              </div>
            }
          >
            <Navigation />
            <main className="min-h-screen">{children}</main>
          </Suspense>
        </CatalogProvider>
        {/* END: CatalogProvider Wrap */}
        <Footer />
      </body>
    </html>
  );
}
