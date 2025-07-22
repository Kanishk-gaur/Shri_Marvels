"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Brush,
  LandmarkIcon as Landscape,
  Image,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import { allProducts } from "@/data/products";
import { GalleryCard } from "@/components/gallery-card"; // Import GalleryCard

const features = [
  {
    icon: Camera,
    title: "Stunning Visuals",
    description: "High-quality images showcasing our designs",
  },
  {
    icon: Brush,
    title: "Creative Designs",
    description: "Unique and innovative tile arrangements",
  },
  {
    icon: Landscape,
    title: "Inspiring Spaces",
    description: "See how our tiles transform interiors",
  },
  {
    icon: Image,
    title: "Curated Collections",
    description: "Explore our hand-picked tile selections",
  },
];

export default function HomePage() {
  const featuredItems = allProducts.slice(0, 8); // Get the first 8 items from all products

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-8 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Inspiring
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 text-center max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Explore our gallery of exquisite natural marble and designer tile
          installations
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mb-16 text-center max-w-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover stunning designs and find inspiration for your next project
        </motion.p>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/marvel">
              <div className="rounded-2xl shadow-xl bg-gradient-to-r from-red-500 to-pink-600 p-8 m-4 text-center cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Marble Gallery
                  </h2>
                  <p className="text-red-100 mb-4">
                    Explore our premium marble designs
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/tiles">
              <div className="rounded-2xl shadow-xl bg-gradient-to-r from-sky-400 to-indigo-900 p-8 m-4 text-center cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <LayoutGrid className="w-16 h-16 mx-auto mb-4 text-white" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Tile Gallery
                  </h2>
                  <p className="text-sky-100 mb-4">
                    Discover our contemporary tile designs
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* CTA Button - This will now be the "Explore Full Gallery" button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Link href="/gallery">
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-full text-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Explore Our Gallery
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We&apos;re committed to providing the highest quality visuals and
            exceptional inspiration for your projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Gallery Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Gallery Items
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            A glimpse into our diverse collection of stunning marvels and tiles.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((product, index) => (
            <GalleryCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Explore the Full Gallery
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover a wide range of designs and find the perfect inspiration
            for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gallery">
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Gallery
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                className="border-2 border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
