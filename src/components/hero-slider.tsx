"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- Type Definitions ---
interface Slide {
  imageSrc: string;
  title: string;
  subtitle: string;
  href: string;
}

interface ProgressBarProps {
  index: number;
  duration: number;
  isPaused: boolean;
}

interface NavigationDotsProps {
  slides: Slide[];
  currentIndex: number;
  setIndex: (index: number) => void;
}
// --- END Type Definitions ---

// --- Constants ---
const SLIDE_DURATION = 3000; // 4 seconds
const PROGRESS_BAR_BASE_CLASS = "h-1 bg-[#C6AD8F]/30 z-20";
const DOT_BASE_CLASS = "h-2 rounded-full transition-all duration-300 cursor-pointer";

// Slide Data (Explicitly typed)
const slides: Slide[] = [
  {
    imageSrc: "/images/home/home_5.png",
    title: "DIVINE COLLECTION TILES",
    subtitle: "BRING HOME THE DIVINITY",
    href: "/gallery",
  },
 {
    imageSrc: "/images/home/roof4.png",
    // --- UPDATED TITLE AND SUBTITLE BELOW ---
    title: "ROOF AND EXTERIOR TILES", 
    subtitle: "DURABLE, PROTECTIVE & DECORATIVE",
    // The href remains the same as it links to 'digital-gate-god-picture'
    href: "/roof_tiles", 
  },
{
    imageSrc: "/images/home/home6.png",
    // --- UPDATED TITLE AND SUBTITLE BELOW ---
    title: "RANGOLI DECORATIVE TILES", 
    subtitle: "PERMANENT FESTIVE BEAUTY",
    // The href remains the same as it links to 'digital-glossy-poster'
    href: "/gallery", 
  },
  {
    imageSrc: "/images/home/step.png",
    // --- UPDATED TITLE AND SUBTITLE BELOW ---
    title: "STAIR STEP AND RISER TILES", 
    subtitle: "DURABLE TREADS AND VERTICAL FINISHES",
    // The href remains the same
    href: "/step_riser", 
},
];

// --- Sub-Components ---

/**
 * Renders the auto-running progress bar for the current slide.
 */
// Fixed implicit 'any' types with ProgressBarProps
const ProgressBar = ({ index, duration, isPaused }: ProgressBarProps) => (
  <div className={`absolute top-0 left-0 w-full ${PROGRESS_BAR_BASE_CLASS}`}>
    {/* Key ensures a new progress bar starts when index changes */}
    <motion.div
      key={index} 
      className="h-1 bg-gradient-to-r from-[#F3C77B] to-[#B79962]"
      initial={{ width: "0%" }}
      animate={{ width: isPaused ? "var(--progress-width)" : "100%" }} // Stop animation if paused
      transition={{ 
        duration: duration / 1000, 
        ease: "linear",
        // Only run transition if not paused
        times: isPaused ? [0] : undefined,
      }}
      // Fixed Error 2353 by casting style to React.CSSProperties
      style={{ "--progress-width": isPaused ? "100%" : "0%" } as React.CSSProperties}
    />
  </div>
);

/**
 * Renders the clickable navigation dots.
 */
// Fixed implicit 'any' types with NavigationDotsProps and map function parameters
const NavigationDots = ({ slides, currentIndex, setIndex }: NavigationDotsProps) => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
    {slides.map((_, i) => (
      <button
        key={i}
        onClick={() => setIndex(i)}
        aria-label={`Go to slide ${i + 1}`}
        className={`${DOT_BASE_CLASS} ${
          i === currentIndex
            ? "w-6 bg-[#F3C77B]"
            : "w-2 bg-[#E7DFC9]/70 hover:bg-[#F3C77B]"
        }`}
      />
    ))}
  </div>
);

// Framer Motion variant for image transition
const imageVariants = {
  // New slide starts off-screen right and slightly zoomed in
  initial: { opacity: 0, x: 100, scale: 1.05 }, 
  // Slide animates to center position and normal scale
  animate: { opacity: 1, x: 0, scale: 1 },   
  // Old slide exits off-screen left and maintains scale
  exit: { opacity: 0, x: -100, scale: 1.05 }, 
};

// --- Main Component ---
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Fixed Error 2322 by explicitly typing useRef
  const timerRef = useRef<NodeJS.Timeout | number | null>(null); 

  // Auto-slide effect (Enhanced with pause/resume logic)
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (!isPaused) {
      // Use window.setInterval for clearer type definition in browser context
      timerRef.current = window.setInterval(
        () => setIndex((prev) => (prev + 1) % slides.length),
        SLIDE_DURATION
      );
    }
    
    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, index]); // Re-run effect when pause state or index changes

  const slide = useMemo(() => slides[index], [index]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section 
      className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-tr from-[#EFE2C8] via-[#E9D8C0] to-[#E7DFC9]"
      onMouseEnter={handleMouseEnter} // PAUSE on hover
      onMouseLeave={handleMouseLeave} // RESUME on exit
    >
      
      {/* 1. Progress Bar (Receives isPaused state) */}
      <ProgressBar index={index} duration={SLIDE_DURATION} isPaused={isPaused} />

      {/* 2. Background Image & Overlay (with enhanced transition: slide + zoom) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index} // Key change triggers the AnimatePresence exit/enter
          className="absolute inset-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }} // Smooth 1-second transition
        >
          <Image
            src={slide.imageSrc}
            alt={slide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center"
          />
          {/* Subtle Right-to-Left Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 3. Text Content (Staggered animation) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-end p-6 md:p-16 text-right">
        <div className="max-w-xl text-white drop-shadow-lg">
          {/* Title */}
          <motion.h1
            key={slide.title + "h1"}
            className="text-4xl md:text-7xl font-black uppercase mb-3 text-[#F3C77B] leading-tight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {slide.title}
          </motion.h1>
          {/* Subtitle */}
          <motion.p
            key={slide.subtitle + "p"}
            className="text-xl md:text-3xl font-semibold uppercase mb-8 text-[#FFF3D9]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
          >
            {slide.subtitle}
          </motion.p>
          {/* Button */}
          <motion.div
            key={slide.href + "btn"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={slide.href} passHref>
              <Button
                size="lg"
                className="
                  bg-gradient-to-r from-[#F3C77B] to-[#B79962] 
                  text-[#5C4421] font-extrabold text-lg 
                  shadow-xl hover:shadow-2xl 
                  transition-all duration-300
                  border-2 border-[#FFF3D9] hover:border-[#F3C77B]
                  hover:scale-[1.03]
                "
              >
                Explore Collection ✨
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 4. Navigation Dots */}
      <NavigationDots slides={slides} currentIndex={index} setIndex={setIndex} />

      {/* 5. Warning Banner */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#C44536] to-[#8B2F2F] text-white text-sm font-medium text-center py-2 z-30 shadow-inner">
        ⚠️ **Fraud Alert:** We do not request advance payments. Please don’t fall victim to fraud!
      </div>
    </section>
  );
}