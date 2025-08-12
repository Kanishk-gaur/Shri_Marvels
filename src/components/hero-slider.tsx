"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const slides = [
  {
    imageSrc: "/images/home/home_3.jpg",
    title: "DIVINE COLLECTION TILES",
    subtitle: "BRING HOME THE DIVINITY",
    href: "/gallery?subcategory=plain-god-picture",
  },
  {
    imageSrc: "/images/home/home_2.png",
    title: "DIGITAL GATE TILES",
    subtitle: "AUSPICIOUS ENTRANCES",
    href: "/gallery?subcategory=digital-gate-god-picture",
  },
  {
    imageSrc: "/images/home/home_1.png",
    title: "GLOSSY POSTER TILES",
    subtitle: "A STYLE STATEMENT FOR YOUR WALLS",
    href: "/gallery?subcategory=digital-glossy-poster",
  },
];

const SLIDE_DURATION = 5000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-tr from-[#EFE2C8] via-[#E9D8C0] to-[#E7DFC9]">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 w-full bg-[#C6AD8F]/30 z-20">
        <motion.div
          key={index}
          className="h-1 bg-gradient-to-r from-[#B79962] to-[#F3C77B]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      </div>

      {/* Background Image */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#84632e]/70 via-[#B79962]/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-end p-6 md:p-16 text-right">
        <div className="max-w-lg text-white drop-shadow-xl">
          <motion.h1
            key={slide.title}
            className="text-3xl md:text-6xl font-extrabold uppercase mb-2 text-[#F3C77B]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {slide.title}
          </motion.h1>
          <motion.p
            key={slide.subtitle}
            className="text-lg md:text-2xl font-medium uppercase mb-6 text-[#FFF3D9]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            key={slide.href}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href={slide.href}>
              <Button
                size="lg"
                variant="outline"
                className="bg-gradient-to-r from-[#F3C77B]/90 to-[#B79962]/90 text-[#5C4421] font-bold border-none hover:from-[#B79962] hover:to-[#F3C77B]"
              >
                Know More
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-6 bg-[#F3C77B]"
                : "w-2 bg-[#E7DFC9]/70 hover:bg-[#F3C77B]"
            }`}
          />
        ))}
      </div>

      {/* Warning */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#C44536] to-[#8B2F2F] text-white text-xs text-center py-1 z-30">
        We do not request advance payments. Please don’t fall victim to fraud!
      </div>
    </section>
  );
}
