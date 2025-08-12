"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Gem,
  ShieldCheck,
  Layers3,
  Palette,
  Leaf,
  Droplets,
  TrendingUp,
  Award,
} from "lucide-react";
import { categories } from "@/data";
import { HeroSlider } from "@/components/hero-slider";
import { CategoryCarousel } from "@/components/category-carousel";
import Image from "next/image";

// --- Data for Balanced Sections (with new premium color palette) ---

const tileAttributes = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />,
    title: "Exceptional Durability",
    desc: "Engineered to withstand high traffic, scratches, and stains, ensuring a pristine look for years.",
  },
  {
    icon: <Droplets className="w-8 h-8 text-emerald-700" />,
    title: "Low Maintenance",
    desc: "Non-porous surfaces make cleaning effortless, offering a practical solution for modern living.",
  },
  {
    icon: <Palette className="w-8 h-8 text-emerald-700" />,
    title: "Design Versatility",
    desc: "With endless colors, patterns, and finishes, tiles provide limitless creative possibilities for any style.",
  },
  {
    icon: <Leaf className="w-8 h-8 text-emerald-700" />,
    title: "Hygienic & Eco-Friendly",
    desc: "Resistant to allergens and bacteria, and crafted using sustainable manufacturing processes.",
  },
];

const marbleAttributes = [
  {
    icon: <Gem className="w-8 h-8 text-emerald-700" />,
    title: "Natural Masterpiece",
    desc: "Each slab is unique, with distinct veining and character sculpted by nature over millennia.",
  },
  {
    icon: <Layers3 className="w-8 h-8 text-emerald-700" />,
    title: "Timeless Elegance",
    desc: "A symbol of luxury and sophistication that transcends trends and adds classic beauty.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-emerald-700" />,
    title: "Increases Property Value",
    desc: "A premium feature that is highly sought after, making it a sound investment for your home.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-emerald-700" />,
    title: "Luminous Quality",
    desc: "Its inherent translucence interacts with light to create a unique and captivating glow.",
  },
];

const inspirationLooks = [
  {
    title: "Marble Statement Kitchen",
    imageSrc: "/images/home/home_1.png",
    href: "/gallery?category=marvel",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Modern Tile Bathroom",
    imageSrc: "/images/home/bathroom.png",
    href: "/gallery?category=tiles",
    colSpan: "col-span-1",
  },
  {
    title: "Tile Living Area",
    imageSrc: "/images/home/living.jpg",
    href: "/gallery?category=tiles",
    colSpan: "col-span-1",
  },
  {
    title: "Luxury Marble Foyer",
    imageSrc: "/images/home/luxury.jpg",
    href: "/gallery?category=marvel",
    colSpan: "col-span-1 md:col-span-2",
  },
];

// --- MAIN HOME PAGE COMPONENT ---
export default function HomePage() {
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <HeroSlider />

      {/* --- Quick Navigation Carousels --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-20">
        <CategoryCarousel
          title="Tile Collections"
          subtitle="Explore our curated selections of ceramic and porcelain tiles."
          categories={categories.tiles}
          categoryType="tiles"
        />
        <CategoryCarousel
          title="Marble Varieties"
          subtitle="Discover the unparalleled beauty of natural stone from the world's finest quarries."
          categories={categories.marvel}
          categoryType="marvel"
        />
      </section>

      {/* === PILLAR 1: THE WORLD OF TILES === */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              The Art of Versatility
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Precision-engineered for modern life, our tile collections offer a
              canvas for limitless creativity and lasting performance.
            </p>
          </motion.div>

          {/* Main Content: Image + Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/home/tile_1.jpg"
                alt="Modern interior with stylish tiles"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Design Without Limits
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Tiles are the cornerstone of contemporary design. From
                minimalist large-formats that expand a space, to intricate
                mosaics that create stunning focal points, our collection is
                curated to bring any vision to life. Experience the perfect
                fusion of cutting-edge technology and aesthetic excellence.
              </p>
              <Link
                href="/gallery?category=tiles"
                className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Tile Collections →
              </Link>
            </motion.div>
          </div>

          {/* Attribute Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {tileAttributes.map((attr) => (
              <motion.div
                key={attr.title}
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  {attr.icon}
                  <h4 className="font-bold text-slate-800 text-lg">
                    {attr.title}
                  </h4>
                </div>
                <p className="text-slate-600 text-sm mt-3">{attr.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === PILLAR 2: THE WORLD OF MARBLE === */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-emerald-100/20 blur-[150px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              The Legacy of Stone
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Each piece of marble tells a story millions of years in the
              making, bringing unparalleled elegance and a connection to the
              earth into your space.
            </p>
          </motion.div>

          {/* Main Content: Text + Image (Reversed Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="relative aspect-video rounded-2xl overflow-hidden shadow-xl md:order-last"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/home/marbel_1.jpg"
                alt="Luxurious marble bathroom"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                An Investment in Beauty
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To choose marble is to choose enduring art. Its unique, organic
                patterns ensure no two installations are alike, creating a truly
                bespoke environment. As a hallmark of luxury, it not only
                enriches your daily life but also adds significant, lasting
                value to your property.
              </p>
              <Link
                href="/gallery?category=marvel"
                className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Discover Premium Marbles →
              </Link>
            </motion.div>
          </div>

          {/* Attribute Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {marbleAttributes.map((attr) => (
              <motion.div
                key={attr.title}
                className="bg-slate-50 p-6 rounded-lg shadow-sm"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  {attr.icon}
                  <h4 className="font-bold text-slate-800 text-lg">
                    {attr.title}
                  </h4>
                </div>
                <p className="text-slate-600 text-sm mt-3">{attr.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Inspiration Gallery (Unified) --- */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Your Vision, Realized
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              See how our tiles and marbles have been used to create
              breathtaking spaces, and get inspired for your next project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inspirationLooks.map((look) => (
              <motion.div
                key={look.title}
                className={`${look.colSpan} relative rounded-2xl overflow-hidden group h-80`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={look.imageSrc}
                  alt={look.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white text-2xl font-bold">
                    {look.title}
                  </h3>
                  <Link href={look.href}>
                    <span className="text-emerald-300 font-semibold mt-2 inline-block hover:underline">
                      Explore →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final Call to Action --- */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <Award className="w-16 h-16 mx-auto mb-4 text-white/80" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create a Timeless Space?
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10">
              Your design journey starts here. Whether you&apos;re drawn to the
              modern versatility of tiles or the timeless elegance of marble,
              our collections are ready to bring your vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-emerald-800 font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Speak with a Consultant
              </Link>
              <Link
                href="/gallery"
                className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-emerald-800 transition-all duration-300 transform hover:scale-105"
              >
                Browse All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
