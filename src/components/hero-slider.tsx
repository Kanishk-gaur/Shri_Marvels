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
}

interface NavigationDotsProps {
  slides: Slide[];
  currentIndex: number;
  setIndex: (index: number) => void;
}
// --- END Type Definitions ---

// --- Constants ---
const SLIDE_DURATION = 3000;
const PROGRESS_BAR_BASE_CLASS = "h-1 bg-[#C6AD8F]/30 z-20";
const DOT_BASE_CLASS =
  "h-2 rounded-full transition-all duration-300 cursor-pointer";

// Slide Data (Explicitly typed)
const slides: Slide[] = [
  {
    imageSrc: "/images/home/home2.jpeg",
    title: "Divine Tiles",
    subtitle: "EMANATE SERENITY & BLESSINGS",
    href: "/gallery",
  },
  {
    imageSrc: "/images/home/home_5.png",
    title: "Highlither Tiles",
    subtitle: "BRING HOME THE DIVINITY",
    href: "/gallery",
  },
  {
    imageSrc: "/images/home/roof5.jpeg",
    title: "ROOF AND EXTERIOR TILES",
    subtitle: "DURABLE, PROTECTIVE & DECORATIVE",
    href: "/roof_tiles",
  },
  {
    imageSrc: "/images/home/home6.png",
    title: "RANGOLI DECORATIVE TILES",
    subtitle: "PERMANENT FESTIVE BEAUTY",
    href: "/gallery",
  },
  {
    imageSrc: "/images/home/step.png",
    title: "STAIR STEP AND RISER TILES",
    subtitle: "DURABLE TREADS AND VERTICAL FINISHES",
    href: "/step_riser",
  },
];

// --- Sub-Components ---

const ProgressBar = ({ index, duration }: ProgressBarProps) => (
  <div className={`absolute top-0 left-0 w-full ${PROGRESS_BAR_BASE_CLASS}`}>
    <motion.div
      key={index}
      className="h-1 bg-gradient-to-r from-[#F3C77B] to-[#B79962]"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{
        duration: duration / 1000,
        ease: "linear",
      }}
    />
  </div>
);

const NavigationDots = ({
  slides,
  currentIndex,
  setIndex,
}: NavigationDotsProps) => (
  <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
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

const imageVariants = {
  initial: { opacity: 0, x: 100, scale: 1.05 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 1.05 },
};

// --- Main Component ---
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  // Auto-slide effect
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      SLIDE_DURATION
    );

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [index]);

  const slide = useMemo(() => slides[index], [index]);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] w-full overflow-hidden bg-gradient-to-tr from-[#EFE2C8] via-[#E9D8C0] to-[#E7DFC9]">
      {/* 1. Progress Bar */}
      <ProgressBar index={index} duration={SLIDE_DURATION} />

      {/* 2. Background Image & Overlay */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 md:from-black/50 md:via-black/25 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* 3. Text Content - Responsive for 1024x600 screens */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-4 sm:pb-6 md:pb-12 lg:pb-20 items-start lg:items-end p-4 sm:p-6 md:p-8 lg:p-16 text-left lg:text-right">
        <div className="max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] md:max-w-sm lg:max-w-xl text-white drop-shadow-lg">
          {/* Title - Responsive sizing */}
          <motion.h1
            key={slide.title + "h1"}
            className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-5xl xl:text-6xl font-bold md:font-extrabold lg:font-black uppercase mb-1 sm:mb-2 md:mb-3 text-[#F3C77B] leading-tight sm:leading-snug lg:leading-tight"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            {slide.title}
          </motion.h1>
          {/* Subtitle - Responsive sizing */}
          <motion.p
            key={slide.subtitle + "p"}
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-2xl font-medium md:font-semibold uppercase mb-2 sm:mb-4 md:mb-6 lg:mb-8 text-[#FFF3D9] leading-relaxed"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            {slide.subtitle}
          </motion.p>
          {/* Button - Responsive sizing */}
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
                  text-[#5C4421] font-bold lg:font-extrabold 
                  text-xs sm:text-sm md:text-base 
                  px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-4 lg:px-8 lg:py-6
                  shadow-md sm:shadow-lg lg:shadow-xl hover:shadow-2xl 
                  transition-all duration-300
                  border border-[#FFF3D9] hover:border-[#F3C77B]
                  hover:scale-[1.02] sm:hover:scale-[1.03]
                "
              >
                Explore Collection ✨
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 4. Navigation Dots */}
      <NavigationDots
        slides={slides}
        currentIndex={index}
        setIndex={setIndex}
      />
    </section>
  );
}
