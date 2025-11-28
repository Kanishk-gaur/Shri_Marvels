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
    title: "Elegant Roof Tile Design",
    imageSrc: "/images/home/roof2.jpeg",
    href: "/roof_tiles",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Modern Roofing Solutions",
    imageSrc: "/images/home/roof1.jpg",
    href: "/roof_tiles",
    colSpan: "col-span-1",
  },
  {
    title: "Durable Roof Tiles",
    imageSrc: "/images/home/roof3.jpg",
    href: "/roof_tiles",
    colSpan: "col-span-1",
  },
  {
    title: "Luxury Roof Tile Collection",
    imageSrc: "/images/home/roof4.png",
    href: "/roof_tiles",
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
      {/* --- Quick Navigation Carousels --- */}

      <section className="bg-gradient-to-br from-slate-50 to-white py-28 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content - Appears first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-8 order-2 lg:order-1"
            >
              {/* Enhanced badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">
                  Our Legacy
                </span>
              </div>

              {/* Enhanced heading */}
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Crafting Spaces of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                    Distinction
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
              </div>

              {/* Enhanced content with icons */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    For over{" "}
                    <span className="font-semibold text-emerald-700">
                      three decades
                    </span>
                    , we have been the premier source for the world's most
                    exquisite tiles, marbles, and roofing solutions.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    Our commitment is to the fusion of{" "}
                    <span className="font-semibold text-slate-900">
                      unparalleled quality
                    </span>
                    ,{" "}
                    <span className="font-semibold text-slate-900">
                      timeless design
                    </span>
                    , and{" "}
                    <span className="font-semibold text-slate-900">
                      sustainable sourcing
                    </span>
                    .
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    We partner with architects, designers, and homeowners to
                    transform visions into enduring realities, ensuring every
                    project reflects perfection.
                  </p>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">5000+</div>
                  <div className="text-sm text-slate-600">Projects</div>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">94%</div>
                  <div className="text-sm text-slate-600">Satisfaction</div>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">5+</div>
                  <div className="text-sm text-slate-600">States</div>
                </div>
              </div>
            </motion.div>

            {/* Image - Appears second on mobile with reduced size */}
            <motion.div
              className="relative group order-1 lg:order-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/images/home/logo.jpeg"
                  alt="Architect reviewing tile samples"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Floating stats badge */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg"></div>
              </div>

              {/* Decorative element - hidden on mobile */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-2xl -z-10 rotate-12 opacity-20 hidden lg:block"></div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-20">
        {/* Tile Collections - Keep original height */}
        <CategoryCarousel
          title="Tile Collections"
          subtitle="Explore our curated selections of ceramic and porcelain tiles."
          categories={categories.tiles}
          categoryType="tiles"
          imageAspectRatio="aspect-[16/11]" // Original aspect ratio
        />

        {/* Marble Varieties - Reduced height */}
        <CategoryCarousel
          title="Marble Varieties"
          subtitle="Discover the unparalleled beauty of natural stone from the world's finest quarries."
          categories={categories.marvel}
          categoryType="marvel"
          imageAspectRatio="aspect-[16/3]" // Shorter height (16:8 instead of 16:10)
        />
      </section>

      {/* === PILLAR 1: THE WORLD OF DECORATIVE TILES === */}
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
              The Canvas of Creativity
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Our decorative tiles are crafted to be the centerpiece of your
              design, offering a stunning blend of artistry, and lasting
              performance.
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
                src="/images/home/home_tile3.png"
                alt="Modern interior with stylish decorative tiles"
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
                Artistry in Every Piece
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Decorative tiles are the soul of bespoke interiors. From bold,
                graphic patterns that make a statement to subtle, intricate
                designs that add a touch of elegance, our collection is curated
                to bring every unique vision to life. Discover the perfect
                harmony of imaginative design and exceptional craftsmanship.
              </p>
              <Link
                href="/tiles"
                className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Decorative Tiles →
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

      {/* === PILLAR 2: THE WORLD OF DECORATIVE MARVELS === */}
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
              The Beauty of Decorative Marvels
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Each piece of our decorative marvels is a story told by the earth,
              bringing unparalleled elegance and a sense of natural wonder into
              your home.
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
                src="/images/home/home_marble.jpg"
                alt="Luxurious decorative marvel bathroom"
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
                An Ode to Timeless Beauty
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                To choose a decorative marvel is to choose a piece of history.
                Its unique, organic patterns ensure that no two installations
                are ever the same, creating a truly one-of-a-kind environment.
                As a symbol of luxury and sophistication, it not only enhances
                your daily life but also adds significant, lasting value to your
                property.
              </p>
              <Link
                href="/marble"
                className="inline-block bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Discover Decorative Marvels →
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
              See how our elegant roof tiles have been used to create
              breathtaking rooftops, and get inspired for your next project.
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
              artistic flair of decorative tiles or the timeless elegance of our
              decorative marvels, our collections are ready to bring your vision
              to life.
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
