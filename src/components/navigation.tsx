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

// Bronze color palette based on #F3C77B
const bronzeColors = {
  primary: "#F3C77B",      // Main bronze
  light: "#F8DAA3",        // Lighter bronze
  dark: "#D8B168",         // Darker bronze
  darker: "#B89655",       // Even darker for depth
  darkest: "#8C7542",      // Deep bronze
  bgGradient: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
};

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
                ? "bg-gradient-to-r from-[#D8B168]/30 via-[#F3C77B]/25 to-[#D8B168]/30 text-white shadow-lg border border-[#F3C77B]/40"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }
          `}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className={`relative z-10 flex items-center space-x-3 ${
              isActive ? "text-[#F3C77B]" : "group-hover:text-[#F3C77B]"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </div>

          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#F8DAA3] via-[#F3C77B] to-[#D8B168] rounded-t-full"
              layoutId="activeIndicator"
            />
          )}

          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F3C77B]/0 via-[#F3C77B]/5 to-[#F3C77B]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            ? "bg-gradient-to-r from-gray-900/95 via-[#1a1a1a]/90 to-gray-900/95 shadow-2xl border-b border-[#F3C77B]/20 shadow-[#F3C77B]/5"
            : "bg-gradient-to-r from-gray-900/90 via-[#1a1a1a]/85 to-gray-900/90"
        }`}
        style={{
          background: bronzeColors.bgGradient,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Background gradient elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3C77B]/5 via-transparent to-[#F3C77B]/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3C77B]/10 via-transparent to-transparent pointer-events-none" />

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
                    <span 
                      className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
                      style={{
                        background: `linear-gradient(135deg, ${bronzeColors.light} 0%, ${bronzeColors.primary} 50%, ${bronzeColors.dark} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AGRAWAL CERAMICS
                    </span>
                  </motion.div>

                  {/* Brand Subtitle - Minimal gap */}
                  <div className="mt-0">
                    <span className="text-xs sm:text-sm text-[#F3C77B]/90 font-medium tracking-wide leading-tight">
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
                            ? "bg-gradient-to-r from-[#B89655]/30 via-[#D8B168]/25 to-[#B89655]/30 text-white shadow-lg border border-[#F3C77B]/30"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }
                      `}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className={`relative z-10 flex items-center space-x-2 ${
                          isActive
                            ? "text-[#F3C77B]"
                            : "group-hover:text-[#F3C77B]"
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
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-[#F8DAA3] via-[#F3C77B] to-[#D8B168] rounded-t-full"
                          layoutId="desktopActiveIndicator"
                        />
                      )}

                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F3C77B]/0 via-[#F3C77B]/5 to-[#F3C77B]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-[#1a1a1a]/95 to-gray-900/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel - REDUCED WIDTH */}
            <motion.div
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs backdrop-blur-2xl shadow-2xl overflow-y-auto border-r border-[#F3C77B]/30"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #222222 50%, #1a1a1a 100%)',
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Header */}
              <div className="p-3 border-b border-[#F3C77B]/30 relative">
                <div className="flex items-center justify-between">
                  {/* Brand Name Block */}
                  <div className="flex flex-col items-start -space-y-0.5">
                    <h3 
                      className="text-sm font-bold leading-none"
                      style={{
                        background: `linear-gradient(135deg, ${bronzeColors.light} 0%, ${bronzeColors.primary} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AGRAWAL CERAMICS
                    </h3>
                    <span className="text-[8px] text-[#F3C77B]/70 font-medium leading-none">
                      Decorative Tiles & Marbles
                    </span>
                  </div>
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
                <div className="h-px bg-gradient-to-r from-transparent via-[#F3C77B]/50 to-transparent" />
              </div>

              {/* Mobile Contact Info */}
              <div className="p-3">
                <div 
                  className="rounded-lg p-3 border border-[#F3C77B]/30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(184, 150, 85, 0.2) 0%, rgba(140, 117, 66, 0.3) 100%)',
                  }}
                >
                  <div className="text-center space-y-2">
                    <div>
                      <p className="text-[10px] text-[#F3C77B]/80 mb-1">
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
                        className="w-full py-1.5 text-xs font-medium rounded transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${bronzeColors.darker} 0%, ${bronzeColors.dark} 100%)`,
                          color: 'white',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${bronzeColors.darkest} 0%, ${bronzeColors.darker} 100%)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(135deg, ${bronzeColors.darker} 0%, ${bronzeColors.dark} 100%)`;
                        }}
                      >
                        Call Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-1.5 text-xs font-medium rounded hover:bg-white/20 transition-all duration-300 border border-white/20"
                        style={{
                          background: 'rgba(243, 199, 123, 0.1)',
                          color: 'white',
                        }}
                      >
                        WhatsApp
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-[#F3C77B]/50 pt-2">
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