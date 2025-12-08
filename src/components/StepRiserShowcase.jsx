// components/StepRiserShowcase.jsx - Updated transparency levels

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Footprints,
  Ruler,
  Palette,
  ShieldCheck,
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

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
    src: "/images/step/14.png",
    alt: "Modern staircase with integrated step and riser tiles",
    title: "Contemporary Design",
    description: "Modern geometric patterns with seamless integration",
    features: ["Anti-slip surface", "Weather resistant", "UV protected"],
    class: "col-start-1 col-span-2 row-span-3",
    mobileClass: "col-span-3 row-span-2",
  },
  {
    src: "/images/step/41.png",
    alt: "Close-up of textured step tile with anti-slip features",
    title: "Refined Details",
    description: "Precision-engineered texture for maximum safety",
    features: ["3D texture", "Easy cleaning", "High durability"],
    class: "col-start-3 col-span-1 row-span-2",
    mobileClass: "col-span-3 row-span-1",
  },
  {
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
        {/* Subtle Background Elements */}
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
              <span 
                className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
                style={{ color: bronzeColors.darker }}
              >
                Premium Collection
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 px-2">
              Integrated{" "}
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${bronzeColors.darker} 0%, ${bronzeColors.primary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Step & Riser
              </span>{" "}
              Solutions
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Where <span className="font-semibold" style={{ color: bronzeColors.darker }}>safety meets sophistication</span>. 
              Engineered for perfect transitions.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-20">
            {/* Mobile: Vertical Stack of Images */}
            <div className="block md:hidden space-y-8">
              {stepRiserImages.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.title}
                      </h3>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedMobile === index ? 'rotate-90' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {expandedMobile === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-600 mb-3">
                            {item.description}
                          </p>
                          <ul className="space-y-2">
                            {item.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                <div 
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: bronzeColors.primary }}
                                />
                                {feature}
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

            {/* Desktop: Asymmetrical Grid */}
            <motion.div
              className="hidden md:block h-[500px] lg:h-[600px] xl:h-[700px] w-full mb-20"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-4 lg:gap-6 h-full">
                {stepRiserImages.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className={`relative rounded-xl overflow-hidden shadow-lg group ${item.class}`}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Desktop Hover Overlay - UPDATED TRANSPARENCY */}
                      <AnimatePresence>
                        {hoveredImage === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                          >
                            {/* 90% transparent background overlay */}
                            <div className="absolute inset-0 bg-black/10"></div>
                            
                            {/* Content container */}
                            <div className="relative h-full p-6 flex flex-col justify-end">
                              <div className="relative">
                                {/* Feature box - 30% transparent (less transparent than background) */}
                                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-br from-white/30 via-white/20 to-white/30 backdrop-blur-sm rounded-2xl border border-white/30"></div>
                                
                                <div className="relative space-y-3 z-10">
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="p-2 rounded-lg backdrop-blur-md border border-white/40"
                                      style={{ 
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                      }}
                                    >
                                      {index === 0 ? 
                                        <CheckCircle className="w-5 h-5" style={{ color: bronzeColors.darker }} /> : 
                                       index === 1 ? 
                                        <TrendingUp className="w-5 h-5" style={{ color: bronzeColors.darker }} /> : 
                                        <Star className="w-5 h-5" style={{ color: bronzeColors.darker }} />
                                      }
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 drop-shadow-md">
                                      {item.title}
                                    </h3>
                                  </div>
                                  
                                  <p className="text-sm text-gray-800 font-medium drop-shadow-sm">
                                    {item.description}
                                  </p>
                                  
                                  <ul className="space-y-2 mt-3">
                                    {item.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-900 font-medium drop-shadow-sm">
                                        <div 
                                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                                          style={{ 
                                            backgroundColor: bronzeColors.primary,
                                            boxShadow: `0 0 6px ${bronzeColors.primary}`
                                          }}
                                        />
                                        <span>{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Fallback Title - Only shows when NOT hovering */}
                      <AnimatePresence>
                        {hoveredImage !== index && (
                          <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-4 left-4 right-4"
                          >
                            <div 
                              className="px-4 py-2 rounded-lg backdrop-blur-md border border-white/30"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                              }}
                            >
                              <span className="text-sm font-semibold text-gray-900 drop-shadow-md">
                                {item.title}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Section */}
            <div className="relative -mt-4 md:-mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-gray-200 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg overflow-hidden"
              >
                <div className="pt-8 md:pt-12 px-4 sm:px-6 md:px-8">
                  <div className="text-center mb-8 md:mb-12">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      <span style={{ color: bronzeColors.darker }}>Key</span> Features
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                      Discover why our integrated step and riser solutions stand out from the rest
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {stepRiserHighlights.map((highlight, index) => (
                      <div 
                        key={index}
                        className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md group/feature"
                        style={{ 
                          minHeight: '140px',
                          display: 'flex',
                          flexDirection: 'column',
                          // Feature box - less transparent (20% transparent = 80% opaque)
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div 
                              className="p-3 sm:p-4 rounded-lg flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-300 mt-1"
                              style={{ 
                                backgroundColor: bronzeColors.light + '20',
                                boxShadow: '0 4px 12px rgba(184, 150, 85, 0.1)'
                              }}
                            >
                              <div style={{ color: bronzeColors.darker }}>
                                {highlight.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl mb-1 sm:mb-2 leading-tight">
                                {highlight.title}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {highlight.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 sm:pt-8 px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                    <div className="w-full lg:w-auto">
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                        {[
                          { label: "Free Consultation", value: "✓" },
                          { label: "Custom Designs", value: "✓" },
                          { label: "Fast Installation", value: "48h" },
                          { label: "Samples", value: "Free" },
                        ].map((item, index) => (
                          <div 
                            key={index} 
                            className="text-center group/info p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            style={{ 
                              // Info boxes - 90% transparent (10% opaque)
                              background: 'rgba(249, 250, 251, 0.1)',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <div 
                              className="text-xl md:text-2xl font-bold mb-1 group-hover/info:scale-110 transition-transform duration-300"
                              style={{ color: bronzeColors.darker }}
                            >
                              {item.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 group-hover/info:text-gray-800 transition-colors duration-300">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full lg:w-auto"
                    >
                      <Link
                        href="/step_riser"
                        className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl w-full lg:w-auto relative overflow-hidden"
                        style={{ 
                          backgroundColor: bronzeColors.darker,
                          background: `linear-gradient(135deg, ${bronzeColors.darker} 0%, ${bronzeColors.dark} 100%)`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <span className="text-base sm:text-lg md:text-xl tracking-wide relative z-10 drop-shadow-lg">
                          Explore Collection
                        </span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-2 sm:ml-3 relative z-10"
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}