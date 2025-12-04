"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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
    label: "Filter Products",
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
  const pathname = usePathname();

  const closeMobileMenu = () => setIsOpen(false);

  const renderNavItem = (item: NavItem) => {
    if (item.type === "filter") {
      return (
        <div key={item.key}> 
          <ProductFilter buttonText={item.label} />
        </div>
      );
    }

    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
        <motion.div
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
            ${
              isActive
                ? "bg-white/20 text-white"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }
          `}
          whileHover={{ x: 5 }}
        >
          <Icon className="w-5 h-5" />
          <span>{item.label}</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] bg-black/20 backdrop-blur-md border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Main wrapper maintains standard responsiveness */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo - INCREASED MARGINS: ml-8 sm:ml-16 lg:ml-24 */}
            <div className="flex items-center ml-8 sm:ml-16 lg:ml-24"> 
              <Link href="/">
                <motion.div
                  className="flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  
                  <div className="hidden sm:flex flex-col items-center justify-center ml-4 flex-shrink min-w-0">
                    <motion.span
                      className="text-2xl font-extrabold text-[#A0886A] uppercase tracking-wider" 
                      whileHover={{ color: "#c9a819ff" }}
                    >
                      AGRAWAL CERAMICS
                    </motion.span>
                    <span className="text-sm text-white/80 mt-1 text-center">
                      Decorative tiles & Marbles
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center">
              {/* Desktop Menu - INCREASED MARGINS: mr-8 sm:mr-16 lg:mr-24 */}
              <div className="hidden md:flex items-center space-x-4 mr-8 sm:mr-16 lg:mr-24">
                {navItems.map((item) => {
                  if (item.type === "filter") {
                    return (
                      <div key={item.key}>
                        <ProductFilter buttonText={item.label} />
                      </div>
                    );
                  }

                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/10"
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
              </div>

              {/* Mobile Menu Button - Removed redundant margin since the menu items now have an outer margin */}
              <button
                className="md:hidden text-white ml-4 mr-4" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={closeMobileMenu}
            />
            <motion.div
              // FIX: Changed right-0 to left-0 to align the reduced-width menu to the left
              className="fixed top-16 left-0 w-3/4 bg-black/90 backdrop-blur-md border-b border-white/10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => renderNavItem(item))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}