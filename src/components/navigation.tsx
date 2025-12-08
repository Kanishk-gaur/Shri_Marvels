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
};

// 👉 HOW TO ADJUST TRANSPARENCY YOURSELF:
// Change these numbers (0 to 1) to control transparency:
// 0 = completely transparent, 1 = completely opaque

const TRANSPARENCY = {
  navbar: 0.65,           // Main navigation bar (was 0.85)
  navItem: 0.35,          // Navigation items (was 0.4-0.8)
  navItemActive: 0.5,     // Active navigation items (was 0.75-0.8)
  menuButton: 0.45,       // Menu button (was 0.6)
  mobileMenu: 0.75,       // Mobile menu panel (was 0.85)
  mobileCard: 0.4,        // Mobile contact card (was 0.6)
  overlay: 0.7,           // Backdrop overlay (was 0.95)
  border: 0.08,           // Border opacity (was 0.1)
};

// Pure transparent black color scheme with adjustable transparency
const transparentBlackColors = {
  // Main navigation
  navbar: `rgba(0, 0, 0, ${TRANSPARENCY.navbar})`,
  
  // Navigation items
  navItem: `rgba(0, 0, 0, ${TRANSPARENCY.navItem})`,
  navItemActive: `rgba(0, 0, 0, ${TRANSPARENCY.navItemActive})`,
  
  // Mobile menu
  mobileMenu: `rgba(0, 0, 0, ${TRANSPARENCY.mobileMenu})`,
  mobileCard: `rgba(0, 0, 0, ${TRANSPARENCY.mobileCard})`,
  
  // Buttons and overlays
  menuButton: `rgba(0, 0, 0, ${TRANSPARENCY.menuButton})`,
  overlay: `rgba(0, 0, 0, ${TRANSPARENCY.overlay})`,
  
  // Borders
  glassBorder: `rgba(255, 255, 255, ${TRANSPARENCY.border})`,
  
  // Other transparencies (for hover effects)
  hover10: `rgba(0, 0, 0, ${TRANSPARENCY.navItem + 0.1})`,
  hover20: `rgba(0, 0, 0, ${TRANSPARENCY.navItem + 0.2})`,
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
          className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
            isActive
              ? "text-white"
              : "text-white/90 hover:text-white"
          }`}
          style={{
            backgroundColor: isActive 
              ? transparentBlackColors.navItemActive 
              : transparentBlackColors.navItem,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${transparentBlackColors.glassBorder}`,
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = transparentBlackColors.hover10;
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive) {
              e.currentTarget.style.backgroundColor = transparentBlackColors.navItem;
            }
          }}
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
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled
            ? "shadow-2xl border-b border-white/5 shadow-black/30"
            : ""
        }`}
        style={{
          backgroundColor: transparentBlackColors.navbar,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Subtle texture overlay - only white dots on black */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 w-full">
            {/* Brand Name - FIXED: Center aligned text */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="group">
                <div className="flex flex-col items-center text-center">
                  {/* Brand Main Title - Centered */}
                  <div className="flex items-center justify-center">
                    <motion.span 
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight whitespace-nowrap leading-none"
                      style={{
                        background: `linear-gradient(135deg, ${bronzeColors.light} 0%, ${bronzeColors.primary} 50%, ${bronzeColors.dark} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AGRAWAL CERAMICS
                    </motion.span>
                  </div>

                  {/* Brand Subtitle - Centered below main title */}
                  <div className="mt-0.5 leading-none w-full">
                    <span className="text-[10px] xs:text-xs sm:text-sm text-[#F3C77B]/95 font-medium tracking-wide whitespace-nowrap block text-center">
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
                      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }`}
                      style={{
                        backgroundColor: isActive 
                          ? transparentBlackColors.navItemActive 
                          : transparentBlackColors.navItem,
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${transparentBlackColors.glassBorder}`,
                      }}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = transparentBlackColors.hover10;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = transparentBlackColors.navItem;
                        }
                      }}
                    >
                      <div
                        className={`relative z-10 flex items-center space-x-2 ${
                          isActive
                            ? "text-[#F3C77B]"
                            : "group-hover:text-[#F3C77B]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm whitespace-nowrap">
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
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative p-2.5 rounded-xl text-white/90 hover:text-white transition-all duration-300"
              style={{
                backgroundColor: transparentBlackColors.menuButton,
                backdropFilter: 'blur(12px)',
                border: `1px solid ${transparentBlackColors.glassBorder}`,
              }}
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
              className="fixed inset-0"
              style={{
                backgroundColor: transparentBlackColors.overlay,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel - REDUCED WIDTH */}
            <motion.div
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs shadow-2xl overflow-y-auto"
              style={{
                backgroundColor: transparentBlackColors.mobileMenu,
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                borderRight: `1px solid ${transparentBlackColors.glassBorder}`,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile Header - Centered text */}
              <div 
                className="p-3 relative"
                style={{
                  borderBottom: `1px solid ${transparentBlackColors.glassBorder}`,
                }}
              >
                <div className="flex flex-col items-center justify-center text-center w-full">
                  {/* Brand Name Block - Centered */}
                  <div className="flex flex-col items-center w-full">
                    <h3 
                      className="text-sm font-bold whitespace-nowrap"
                      style={{
                        background: `linear-gradient(135deg, ${bronzeColors.light} 0%, ${bronzeColors.primary} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      AGRAWAL CERAMICS
                    </h3>
                    <span className="text-[8px] text-[#F3C77B]/80 font-medium whitespace-nowrap mt-0.5 text-center">
                      Decorative Tiles & Marbles
                    </span>
                  </div>
                  {/* Close Button - Positioned at top right */}
                  <motion.button
                    onClick={closeMobileMenu}
                    className="absolute top-2 right-2 p-1.5 rounded-lg text-white/80 hover:text-white transition-all duration-300"
                    style={{
                      backgroundColor: transparentBlackColors.menuButton,
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${transparentBlackColors.glassBorder}`,
                    }}
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
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Mobile Contact Info */}
              <div className="p-3">
                <div 
                  className="rounded-lg p-3"
                  style={{
                    backgroundColor: transparentBlackColors.mobileCard,
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${transparentBlackColors.glassBorder}`,
                  }}
                >
                  <div className="text-center space-y-2">
                    <div>
                      <p className="text-[10px] text-[#F3C77B]/90 mb-1">
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
                          backgroundColor: `rgba(0, 0, 0, ${TRANSPARENCY.navItemActive + 0.1})`,
                          border: `1px solid ${transparentBlackColors.glassBorder}`,
                          color: 'white',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(0, 0, 0, ${TRANSPARENCY.navItemActive + 0.2})`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(0, 0, 0, ${TRANSPARENCY.navItemActive + 0.1})`;
                        }}
                      >
                        Call Now
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-1.5 text-xs font-medium rounded transition-all duration-300"
                        style={{
                          backgroundColor: transparentBlackColors.mobileCard,
                          backdropFilter: 'blur(12px)',
                          border: `1px solid ${transparentBlackColors.glassBorder}`,
                          color: 'white',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `rgba(0, 0, 0, ${TRANSPARENCY.mobileCard + 0.1})`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = transparentBlackColors.mobileCard;
                        }}
                      >
                        WhatsApp
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-white/40 pt-2">
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