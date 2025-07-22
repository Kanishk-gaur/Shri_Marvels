"use client"

import { motion } from "framer-motion"
import { Award, Camera, Palette, Globe } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Photography Excellence",
    description:
      "Professional photography showcasing the natural beauty and intricate details of premium stone and tile designs.",
  },
  {
    icon: Palette,
    title: "Design Inspiration",
    description:
      "Curated collections that inspire architects, designers, and homeowners to create extraordinary spaces.",
  },
  {
    icon: Globe,
    title: "Global Collection",
    description:
      "Featuring materials from renowned quarries and manufacturers worldwide, bringing you the finest selections.",
  },
  {
    icon: Award,
    title: "Quality Curation",
    description:
      "Every piece in our gallery is carefully selected for its exceptional beauty, craftsmanship, and design potential.",
  },
]

const stats = [
  { number: "500+", label: "Premium Materials" },
  { number: "50+", label: "Countries Sourced" },
  { number: "1000+", label: "Design Projects" },
  { number: "15+", label: "Years Experience" },
]

const team = [
  {
    name: "Alessandro Romano",
    role: "Creative Director & Photographer",
    image: "/placeholder.svg?height=300&width=300",
    description: "Award-winning photographer specializing in architectural materials",
  },
  {
    name: "Maria Santos",
    role: "Design Curator",
    image: "/placeholder.svg?height=300&width=300",
    description: "Interior design expert with focus on natural stone applications",
  },
  {
    name: "James Mitchell",
    role: "Material Specialist",
    image: "/placeholder.svg?height=300&width=300",
    description: "Geological expert with deep knowledge of stone properties",
  },
  {
    name: "Sophie Chen",
    role: "Gallery Manager",
    image: "/placeholder.svg?height=300&width=300",
    description: "Ensures our collection represents the finest materials available",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Gallery</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
          We showcase the world&apos;s most beautiful natural stone and designer tiles through stunning photography and immersive 3D experiences, inspiring your next design project.

          </motion.p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6">
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-8 h-full">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded by a team of passionate photographers and design enthusiasts, our gallery was created to
                showcase the extraordinary beauty found in natural stone and contemporary tile designs.
              </p>
              <p>
                We believe that every surface tells a story. Through high-resolution photography and innovative 3D
                visualization, we capture the unique character, texture, and beauty of each material, helping designers
                and homeowners envision their perfect space.
              </p>
              <p>
              Our collection spans from ancient marble quarries in Carrara to modern ceramic studios in Japan, bringing together the world&apos;s finest materials in one comprehensive visual library.

              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 p-8 backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
                <div className="text-white text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <div className="text-lg font-semibold">Visual Excellence</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Creative Team</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our passionate team of photographers, designers, and material experts work together to bring you the most
            comprehensive and beautiful gallery of premium materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 h-full">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-lg">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-300 text-xs">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
