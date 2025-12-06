"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Mail,
  LayoutGrid,
  Layers3,
  SlidersHorizontal,
  LucideIcon,
} from "lucide-react";
import { ProductFilter } from "@/components/product-filter";

type NavLinkItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  type?: "link";
};

type FilterItem = {
  type: "filter";
  label: string;
  icon: LucideIcon;
  key: string;
};

type NavItem = NavLinkItem | FilterItem;

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home, type: "link" },
  {
    type: "filter",
    label: "Filter",
    icon: SlidersHorizontal,
    key: "product_filter",
  },
  { href: "/gallery", label: "Gallery", icon: LayoutGrid, type: "link" },
  { href: "/roof_tiles", label: "Roofing", icon: Home, type: "link" },
  { href: "/step_riser", label: "Step/Riser", icon: Layers3, type: "link" },
  { href: "/contact", label: "Contact", icon: Mail, type: "link" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsOpen(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle zoom responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderNavItem = (item: NavItem) => {
    if (item.type === "filter") {
      return (
        <div key={item.key} className="w-full">
          <ProductFilter buttonText={item.label} />
        </div>
      );
    }

    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
        <motion.div
          className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
            ${
              isActive
                ? "bg-gradient-to-r from-emerald-700/20 to-emerald-600/20 text-white shadow-lg"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }
          `}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className={`relative z-10 flex items-center space-x-3 ${
              isActive ? "text-emerald-300" : "group-hover:text-emerald-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </div>

          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-t-full"
              layoutId="activeIndicator"
            />
          )}

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/0 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[60] backdrop-blur-xl transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-black/90 via-black/85 to-black/90 shadow-2xl border-b border-white/10"
            : "bg-gradient-to-r from-black/80 via-black/75 to-black/80"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Background gradient elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/5 via-transparent to-emerald-900/5 pointer-events-none" />

        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 w-full">
            {/* Brand Name - Minimal gap */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="group">
                <div className="flex flex-col items-center text-center">
                  {/* Brand Main Title */}
                  <motion.div whileHover={{ x: 5 }}>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-300 bg-clip-text text-transparent tracking-tight">
                      AGRAWAL CERAMICS
                    </span>
                  </motion.div>

                  {/* Brand Subtitle - Minimal gap */}
                  <div className="mt-0">
                    <span className="text-xs sm:text-sm text-emerald-100/80 font-medium tracking-wide leading-tight">
                      Decorative Tiles & Marbles
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                if (item.type === "filter") {
                  return (
                    <div key={item.key} className="px-2">
                      <ProductFilter buttonText={item.label} />
                    </div>
                  );
                }

                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 group
                        ${
                          isActive
                            ? "bg-gradient-to-r from-emerald-700/30 to-emerald-600/30 text-white shadow-lg"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }
                      `}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`relative z-10 flex items-center space-x-2 ${
                          isActive
                            ? "text-emerald-300"
                            : "group-hover:text-emerald-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">
                          {item.label}
                        </span>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-t-full"
                          layoutId="desktopActiveIndicator"
                        />
                      )}

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/0 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-black/90 via-black/95 to-black/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel - REDUCED WIDTH */}
            <motion.div
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gradient-to-b from-black/95 via-black/90 to-black/95 backdrop-blur-2xl shadow-2xl overflow-y-auto border-r border-white/10"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Header - ABSOLUTE POSITIONING */}
             // Mobile Header - ABSOLUTE POSITIONING
<div className="p-3 border-b border-white/10 relative">
  <div className="flex items-center justify-between">
    {/* 👇 MODIFIED BRAND NAME BLOCK START 👇 */}
    <div className="flex flex-col items-start -space-y-0.5"> {/* Use flex-col and negative space-y */}
      <h3 className="text-sm font-bold bg-gradient-to-r from-emerald-300 to-emerald-200 bg-clip-text text-transparent leading-none"> {/* Add leading-none to reduce h3 line height */}
        AGRAWAL CERAMICS
      </h3>
      <span className="text-[8px] text-emerald-100/60 font-medium leading-none"> {/* Add leading-none */}
        Decorative Tiles & Marbles
      </span>
    </div>
    {/* 👆 MODIFIED BRAND NAME BLOCK END 👆 */}
    <motion.button
      onClick={closeMobileMenu}
      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 ml-2 flex-shrink-0"
      aria-label="Close menu"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <X className="w-4 h-4" />
    </motion.button>
  </div>
</div>
              {/* Mobile Menu Items */}
              <div className="p-3 space-y-1">
                {navItems.map((item) => renderNavItem(item))}
              </div>

              {/* Decorative Separator */}
              <div className="px-3 py-2">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              </div>

              {/* Mobile Contact Info */}
              <div className="p-3">
                <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg p-3 border border-emerald-500/20">
                  <div className="text-center space-y-2">
                    <div>
                      <p className="text-[10px] text-emerald-100/70 mb-1">
                        Need assistance?
                      </p>
                      <p className="text-sm font-bold text-white">
                        +91 98765 43210
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-1.5 text-xs bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium rounded hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
                      >
                        Call Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-1.5 text-xs bg-white/10 text-white font-medium rounded hover:bg-white/20 transition-all duration-300 border border-white/20"
                      >
                        WhatsApp
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-emerald-100/50 pt-2">
                      © {new Date().getFullYear()} Agrawal Ceramics
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}