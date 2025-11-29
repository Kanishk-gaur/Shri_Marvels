// components/StepRiserShowcase.jsx - Three-Image Asymmetrical Layout

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Footprints,
  Ruler,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

// Data specific to this section - NOW THREE IMAGES
const stepRiserImages = [
  {
    src: "/images/step/14.png", // A more encompassing shot
    alt: "Full view of a modern staircase with integrated step and riser tiles",
    title: "Contemporary Staircase Design",
    // This will be the larger, main image
    class: "col-start-1 col-span-2 row-span-3", // Spans 2 columns and 3 rows
  },
  {
    src: "/images/step/41.png", // A detail or close-up shot
    alt: "Close-up of a textured step tile with anti-slip features",
    title: "Refined Surface Details",
    // This is the top-right image
    class: "col-start-3 col-span-1 row-span-2", // Spans 1 column and 2 rows (Top two rows of the third column)
  },
  {
    src: "/images/step/69.png", // Placeholder for the new bottom-right image
    alt: "View of installed step risers in a coordinating color",
    title: "Perfectly Coordinated",
    // NEW IMAGE: This fills the empty bottom-right cell
    class: "col-start-3 col-span-1 row-span-1", // Spans 1 column and 1 row (Bottom row of the third column)
  },
];

const stepRiserHighlights = [
  {
    icon: <Footprints className="w-5 h-5 text-blue-700" />,
    title: "Certified Safety",
  },
  {
    icon: <Ruler className="w-5 h-5 text-blue-700" />,
    title: "Dimensional Precision",
  },
  {
    icon: <Palette className="w-5 h-5 text-blue-700" />,
    title: "Design Harmony",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-700" />,
    title: "Lifetime Resilience",
  },
];

export function StepRiserShowcase() {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
          Integrated <span className="text-blue-700">Step & Riser</span> Solutions
        </h2>
        <p className="mt-4 text-xl text-slate-600 font-light max-w-3xl mx-auto">
          Elevate every transition. Engineered for safety, defined by precision, and perfected for any design aesthetic.
        </p>
      </motion.div>

      {/* Main Content Grid: Images on Left, Highlights/CTA on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Left Column: Asymmetrical Three Images */}
        <motion.div
          // Height modified in previous step
          className="col-span-1 lg:col-span-2 h-[300px] md:h-[450px] lg:h-[550px]" 
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ASYMMETRICAL 3x3 GRID LAYOUT */}
          <div className="grid grid-cols-3 grid-rows-3 gap-4 h-full"> 
            
            {/* Map through all three images */}
            {stepRiserImages.map((item, index) => (
              <motion.div
                key={item.title}
                className={`relative rounded-xl overflow-hidden shadow-xl group ${item.class}`}
                variants={itemVariants}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* 🛑 MODIFIED THIS LINE: Added 'hidden md:block' to hide the title on mobile */}
                <div className="hidden md:block absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
                  {/* Text size reduction (from previous step) is kept for consistency on md+ screens */}
                  <span className="text-xs md:text-sm font-semibold text-slate-800">{item.title}</span>
                </div>
              </motion.div>
            ))}
            
            {/* The empty/spacer div is REMOVED */}
          </div>
        </motion.div>

        {/* Right Column: Key Highlights & CTA */}
        <motion.div
          className="col-span-1 flex flex-col justify-between p-6 bg-slate-50 border border-blue-100 rounded-xl shadow-2xl h-full"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            <h3 className="text-3xl font-extrabold text-slate-900 border-b pb-4 border-blue-200">
              The Professional Advantage
            </h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6"> 
              {stepRiserHighlights.map((highlight, index) => (
                <div key={index} className="flex flex-col gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-blue-100/50">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 bg-blue-200 p-2 rounded-full"> 
                        {highlight.icon}
                    </div>
                    <span className="font-bold text-slate-900 text-base"> 
                      {highlight.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/step_riser"
            className="mt-8 block w-full text-center bg-blue-800 text-white font-bold tracking-wider px-10 py-4 rounded-full hover:bg-blue-900 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/50"
          >
            Explore the Collection →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}