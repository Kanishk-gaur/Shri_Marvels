// components/StepRiserShowcase.jsx - Lightest Gray Background

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
    <div className="relative overflow-hidden bg-slate-50"> {/* Lightest gray background */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        {/* Subtle Background Elements */}
        <div className="hidden md:block absolute top-10 left-10 w-64 h-64 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="hidden md:block absolute bottom-10 right-10 w-80 h-80 bg-slate-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        <div className="relative z-10 space-y-12 md:space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-700 uppercase tracking-wider">
                Premium Collection
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight px-2">
              Integrated{" "}
              <span className="text-emerald-700">
                Step & Riser
              </span>{" "}
              Solutions
            </h2>
            
            <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Where <span className="font-semibold text-emerald-700">safety meets sophistication</span>. 
              Engineered for perfect transitions.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Mobile: Vertical Stack of Images */}
            <div className="block md:hidden space-y-4">
              {stepRiserImages.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  onClick={() => setExpandedMobile(expandedMobile === index ? null : index)}
                >
                  {/* Clean Image - No overlays on mobile */}
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  
                  {/* Simple Title Below Image */}
                  <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 text-lg">
                        {item.title}
                      </h3>
                      <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${expandedMobile === index ? 'rotate-90' : ''}`} />
                    </div>
                    
                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedMobile === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-3"
                        >
                          <p className="text-slate-600 mb-3">
                            {item.description}
                          </p>
                          <ul className="space-y-2">
                            {item.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
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
              className="hidden md:block h-[500px] lg:h-[600px] xl:h-[700px] w-full"
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
                      
                      {/* Desktop Hover Overlay */}
                      <AnimatePresence>
                        {hoveredImage === index && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-white/95 p-6 flex flex-col justify-end"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                  {index === 0 ? <CheckCircle className="w-5 h-5 text-emerald-700" /> : 
                                   index === 1 ? <TrendingUp className="w-5 h-5 text-emerald-700" /> : 
                                   <Star className="w-5 h-5 text-emerald-700" />}
                                </div>
                                <h3 className="text-lg lg:text-xl font-bold text-slate-900">
                                  {item.title}
                                </h3>
                              </div>
                              
                              <p className="text-sm text-slate-600">
                                {item.description}
                              </p>
                              
                              <ul className="space-y-2 mt-3">
                                {item.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Fallback Title */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                          <span className="text-sm font-semibold text-slate-800">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Section - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg overflow-hidden"
            >
              <div className="p-4 sm:p-6 md:p-8">
                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                  {stepRiserHighlights.map((highlight, index) => (
                    <div 
                      key={index}
                      className="p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors duration-300"
                    >
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-2 sm:p-3 bg-emerald-50 rounded-lg flex-shrink-0">
                            <div className="text-emerald-700">
                              {highlight.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base md:text-lg">
                              {highlight.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                              {highlight.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-slate-200 pt-6 sm:pt-8">
                  {/* Additional Info - Hidden on mobile, visible on sm+ */}
                  <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                    {[
                      { label: "Free Consultation", value: "✓" },
                      { label: "Custom Designs", value: "✓" },
                      { label: "Fast Installation", value: "48h" },
                      { label: "Samples", value: "Free" },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl font-bold text-emerald-700 mb-1">
                          {item.value}
                        </div>
                        <div className="text-xs text-slate-600">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href="/step_riser"
                      className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-emerald-700 text-white font-semibold rounded-full hover:bg-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                      <span className="text-base sm:text-lg tracking-wide">
                        Explore Collection
                      </span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-2 sm:ml-3"
                      >
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Mobile Additional Info */}
                  <div className="sm:hidden grid grid-cols-4 gap-2 w-full mt-4">
                    {[
                      { label: "Free", value: "✓", full: "Consult" },
                      { label: "Custom", value: "✓", full: "Designs" },
                      { label: "Fast", value: "48h", full: "Install" },
                      { label: "Free", value: "✓", full: "Samples" },
                    ].map((item, index) => (
                      <div key={index} className="text-center p-2 bg-slate-100 rounded-lg">
                        <div className="text-lg font-bold text-emerald-700">
                          {item.value}
                        </div>
                        <div className="text-xs text-slate-600">
                          <span className="hidden">{item.label}</span>
                          <span>{item.full}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}