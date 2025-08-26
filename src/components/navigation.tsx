// src/components/navigation.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, Info, Mail, LayoutGrid } from "lucide-react";
import { ProductFilter } from "./product-filter";

// Updated nav items, removing Privacy and FAQ
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/gallery", label: "Gallery", icon: LayoutGrid },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavFilterSelect = (mainCategory: 'marvel' | 'tiles', subcategory: string, size: string) => {
    router.push(`/gallery?category=${mainCategory}&subcategory=${subcategory}&size=${size}`);
    setIsOpen(false); // Close mobile menu on selection
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Discover
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Render Home, About, Contact */}
              {navItems.slice(0, 3).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Product Filter in Navbar */}
              <div className="pl-4">
                <ProductFilter
                  mainCategory="all"
                  selectedFilter={null}
                  onFilterSelect={handleNavFilterSelect}
                  buttonText="Products"
                />
              </div>

              {/* Render Gallery Link */}
              {(() => {
                  const galleryItem = navItems[3];
                  const Icon = galleryItem.icon;
                  const isActive = pathname === galleryItem.href;
                  return (
                      <Link key={galleryItem.href} href={galleryItem.href}>
                          <motion.div
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                                  isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          >
                              <Icon className="w-4 h-4" />
                              <span>{galleryItem.label}</span>
                          </motion.div>
                      </Link>
                  );
              })()}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <motion.div
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
                
                <div className="px-4 pt-4 border-t border-white/10">
                    <ProductFilter
                        mainCategory="all"
                        selectedFilter={null}
                        onFilterSelect={handleNavFilterSelect}
                        buttonText="Filter Products"
                    />
                </div>

                {(() => {
                  const galleryItem = navItems[3];
                  const Icon = galleryItem.icon;
                  const isActive = pathname === galleryItem.href;
                  return (
                    <Link key={galleryItem.href} href={galleryItem.href} onClick={() => setIsOpen(false)}>
                      <motion.div
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{galleryItem.label}</span>
                      </motion.div>
                    </Link>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}