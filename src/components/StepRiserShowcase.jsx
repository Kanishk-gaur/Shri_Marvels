"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Footprints,
  Ruler,
  Palette,
  ShieldCheck,
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ListPlus,
  ListMinus,
} from "lucide-react";
import Image from "next/image";
import { useCatalog } from "@/context/CatalogContext";
import { Button } from "./ui/button";
import { SizeSelectionDialog } from "./size-selection-dialog";

// Bronze color palette
const bronzeColors = {
  primary: "#F3C77B",      // Main bronze
  light: "#F8DAA3",        // Lighter bronze
  dark: "#D8B168",         // Darker bronze
  darker: "#B89655",       // Even darker for depth
  darkest: "#8C7542",      // Deep bronze
};

// Data for desktop and mobile
const stepRiserImages = [
  {
    id: "step-riser-1",
    src: "/images/step/14.png",
    alt: "Modern staircase with integrated step and riser tiles",
    title: "Contemporary Design",
    description: "Modern geometric patterns with seamless integration",
    features: ["Anti-slip surface", "Weather resistant", "UV protected"],
    class: "col-start-1 col-span-2 row-span-3",
    mobileClass: "col-span-3 row-span-2",
  },
  {
    id: "step-riser-2",
    src: "/images/step/41.png",
    alt: "Close-up of textured step tile with anti-slip features",
    title: "Refined Details",
    description: "Precision-engineered texture for maximum safety",
    features: ["3D texture", "Easy cleaning", "High durability"],
    class: "col-start-3 col-span-1 row-span-2",
    mobileClass: "col-span-3 row-span-1",
  },
  {
    id: "step-riser-3",
    src: "/images/step/69.png",
    alt: "Installed step risers in coordinating color",
    title: "Perfect Coordination",
    description: "Color-matched risers for harmonious design",
    features: ["Color match", "Easy installation", "Long-lasting"],
    class: "col-start-3 col-span-1 row-span-1",
    mobileClass: "col-span-3 row-span-1",
  },
];

const stepRiserHighlights = [
  {
    icon: <Footprints className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Certified Safety",
    description: "ISO certified anti-slip technology",
  },
  {
    icon: <Ruler className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Dimensional Precision",
    description: "±0.5mm tolerance for perfect fit",
  },
  {
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Design Harmony",
    description: "200+ color & pattern options",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Lifetime Resilience",
    description: "25-year warranty on products",
  },
];

export function StepRiserShowcase() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // State to track item for the dialog
  
  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } = useCatalog();

  const handleCatalogToggle = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    if (isItemInCatalog(item.id)) {
      removeItemFromCatalog(item.id);
    } else {
      setActiveItem(item); // Open the quantity selection dialog
    }
  };

  const handleConfirm = (selectedSizes, quantity) => {
    if (activeItem) {
      addItemToCatalog({
        id: activeItem.id,
        name: activeItem.title,
        imageUrl: activeItem.src,
        category: "Step & Riser",
        sizes: ["Standard"],
        selectedSizes: selectedSizes,
        quantity: quantity
      });
      setActiveItem(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    },
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="hidden md:block absolute top-10 left-10 w-64 h-64 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: bronzeColors.primary }} />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider" style={{ color: bronzeColors.darker }}>
                Premium Collection
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 px-2">
              Integrated{" "}
              <span style={{ background: `linear-gradient(135deg, ${bronzeColors.darker} 0%, ${bronzeColors.primary} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Step & Riser
              </span>{" "}
              Solutions
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Where <span className="font-semibold" style={{ color: bronzeColors.darker }}>safety meets sophistication</span>. Engineered for perfect transitions.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-20">
            {/* Mobile View */}
            <div className="block md:hidden space-y-8">
              {stepRiserImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="100vw" />
                    <Button
                        variant={isItemInCatalog(item.id) ? "destructive" : "secondary"}
                        size="icon"
                        className="absolute top-2 right-2 h-10 w-10 rounded-full z-20 shadow-md"
                        onClick={(e) => handleCatalogToggle(e, item)}
                    >
                        {isItemInCatalog(item.id) ? <ListMinus className="h-5 w-5" /> : <ListPlus className="h-5 w-5" />}
                    </Button>
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedMobile === index ? 'rotate-90' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {expandedMobile === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          <ul className="space-y-2">
                            {item.features.map((f, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: bronzeColors.primary }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop View */}
            <motion.div className="hidden md:block h-[500px] lg:h-[600px] xl:h-[700px] w-full mb-20" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <div className="grid grid-cols-3 grid-rows-3 gap-4 lg:gap-6 h-full">
                {stepRiserImages.map((item, index) => (
                  <motion.div key={item.id} className={`relative rounded-xl overflow-hidden shadow-lg group ${item.class}`} variants={itemVariants} onMouseEnter={() => setHoveredImage(index)} onMouseLeave={() => setHoveredImage(null)} whileHover={{ scale: 1.02 }}>
                    <div className="relative w-full h-full">
                      <Image src={item.src} alt={item.alt} fill className="object-cover transition-all duration-500 group-hover:scale-105" sizes="(max-width: 1200px) 50vw, 33vw" />
                      <Button
                        variant={isItemInCatalog(item.id) ? "destructive" : "secondary"}
                        size="icon"
                        className="absolute top-4 right-4 h-10 w-10 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                        onClick={(e) => handleCatalogToggle(e, item)}
                      >
                        {isItemInCatalog(item.id) ? <ListMinus className="h-5 w-5" /> : <ListPlus className="h-5 w-5" />}
                      </Button>
                      <AnimatePresence>
                        {hoveredImage === index && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 bg-black/10">
                            <div className="relative h-full p-6 flex flex-col justify-end">
                              <div className="relative p-6 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 z-10">
                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 drop-shadow-md mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-800 font-medium mb-3">{item.description}</p>
                                <ul className="space-y-2">
                                  {item.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: bronzeColors.primary, boxShadow: `0 0 6px ${bronzeColors.primary}` }} />
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12 md:mt-24">
            {stepRiserHighlights.map((highlight, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:rotate-6 bg-white shadow-md border border-gray-100" style={{ color: bronzeColors.darker }}>
                  {highlight.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{highlight.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-light">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up for size and quantity selection */}
      {activeItem && (
        <SizeSelectionDialog
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          subcategory={activeItem.title}
          availableSizes={["Standard"]}
          onConfirm={handleConfirm}
          mainCategory="tiles"
        />
      )}
    </div>
  );
}