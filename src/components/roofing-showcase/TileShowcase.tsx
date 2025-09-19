"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { TileShowcaseSection } from "./types";

// Animation variants for Framer Motion
const animationVariants = {
  fromLeft: {
    initial: { opacity: 0, x: -100 },
    inView: { opacity: 1, x: 0 },
  },
  fromRight: {
    initial: { opacity: 0, x: 100 },
    inView: { opacity: 1, x: 0 },
  },
};

interface HouseWithTilesShowcaseProps {
  section: TileShowcaseSection;
  sectionIndex: number;
}

const HouseWithTilesShowcase: React.FC<HouseWithTilesShowcaseProps> = ({
  section,
  sectionIndex,
}) => {
  const isReversed = sectionIndex % 2 !== 0;

  // Determine animation direction based on whether the layout is reversed
  const imageAnimation = isReversed ? animationVariants.fromRight : animationVariants.fromLeft;
  const tilesAnimation = isReversed ? animationVariants.fromLeft : animationVariants.fromRight;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-lg bg-white shadow-lg lg:flex-row ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Animated House Image */}
      <motion.div
        className="w-full lg:w-3/5"
        initial="initial"
        whileInView="inView"
        viewport={{ once: true, amount: 0.25 }}
        variants={imageAnimation}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src={section.house}
          alt="House with tiles"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Animated Tile Details */}
      <motion.div
        className="w-full p-6 lg:w-2/5"
        initial="initial"
        whileInView="inView"
        viewport={{ once: true, amount: 0.25 }}
        variants={tilesAnimation}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Available Tiles</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {section.tiles.map((tile, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 overflow-hidden rounded-md border">
                <Image
                  src={tile.image}
                  alt={tile.label}
                  width={120}
                  height={120}
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{tile.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HouseWithTilesShowcase;