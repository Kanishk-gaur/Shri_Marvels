"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Imported SlidersHorizontal for the filter icon
import { Menu, X, Home, Info, Mail, LayoutGrid, Layers3, SlidersHorizontal, LucideIcon } from "lucide-react"; 
// Import ProductFilter
import { ProductFilter } from "@/components/product-filter";

// 1. Define the TypeScript types for your navigation items
// Standard Link Item
type NavLinkItem = {
  href: string; // Must have href
  label: string;
  icon: LucideIcon;
  type?: 'link'; // Optional discriminator
};

// Filter Placeholder Item
type FilterItem = {
  type: 'filter'; // Must have type 'filter'
  label: string;
  icon: LucideIcon;
  key: string; // Used for unique key prop
};

// Union Type: A nav item is either a standard link or a filter placeholder
type NavItem = NavLinkItem | FilterItem;


// Updated nav items: ProductFilter is now a conceptual item in the list
// We use the new NavItem type for the array
const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home, type: 'link' },
  // Placeholder item for ProductFilter
  { type: "filter", label: "Filter Products", icon: SlidersHorizontal, key: "product_filter" }, 
  { href: "/gallery", label: "Gallery", icon: LayoutGrid, type: 'link' },
  { href: "/roof_tiles", label: "Roofing", icon: Home, type: 'link' },
  { href: "/step_riser", label: "Step/Riser", icon: Layers3, type: 'link' },
  { href: "/contact", label: "Contact", icon: Mail, type: 'link' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsOpen(false);

  // Function to render a single nav item or the ProductFilter
  // We use the NavItem type for the item parameter: (item: NavItem)
  const renderNavItem = (item: NavItem) => {
    // Check for the filter item type
    if (item.type === "filter") {
      // TypeScript knows this is a FilterItem, so it has 'key'
      return (
        // The ProductFilter component itself handles its own button/link-like appearance
        // On mobile, clicking the filter button should close the menu
        <div key={item.key} onClick={closeMobileMenu}>
          <ProductFilter buttonText={item.label} />
        </div>
      );
    }

    // TypeScript knows this is a NavLinkItem, so it has 'href'
    // Render a standard Link item
    const Icon = item.icon;
    const isActive = pathname === item.href;
    
    return (
      // 2. The type is now correct because we only pass items with 'href' to Link
      <Link key={item.href} href={item.href} onClick={closeMobileMenu}> 
        <motion.div
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
            ${isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}
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
              {navItems.map((item) => {
                // If the item is the filter, render the ProductFilter component 
                if (item.type === "filter") {
                  return (
                    <div key={item.key}>
                      <ProductFilter buttonText={item.label} />
                    </div>
                  );
                }

                // Otherwise, render a standard desktop link
                // TypeScript now knows 'item' has 'href' and 'icon' here.
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
            <div className="fixed inset-0 bg-black/50" onClick={closeMobileMenu} />
            <motion.div
              className="fixed top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile menu items using the renderNavItem function */}
                {navItems.map((item) => renderNavItem(item))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}