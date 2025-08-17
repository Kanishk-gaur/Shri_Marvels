"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link" // Import Link

interface GridItem {
  id: number
  category: string
  size: string
  title: string
  image: string
  href: string // Add href for navigation
}

interface ImageGridProps {
  items: GridItem[]
}

export function ImageGrid({ items }: ImageGridProps) {
  // Explicitly type your variants
  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Start visible to avoid flash
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: { // Define the exit animation
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    }
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-10 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {items.map((item) => (
          // Use Link for accessibility and navigation
          <Link href={item.href} key={item.id} passHref legacyBehavior>
            <motion.a // motion.a for the anchor tag
              className="group cursor-pointer block" // Add 'block'
              variants={itemVariants}
              exit="exit" // Apply exit animation
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              layout // Helps animate layout changes smoothly
            >
              <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm capitalize">{item.category}</span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">{item.size}</span>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                />
              </div>
            </motion.a>
          </Link>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}