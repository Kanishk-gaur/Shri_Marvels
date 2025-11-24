"use client";

import { TileShowcaseSection } from "./types";
import { motion } from "framer-motion";
import Image from "next/image";

interface TileShowcaseProps {
  section: TileShowcaseSection;
  sectionIndex: number;
}

export default function TileShowcase({ section, sectionIndex }: TileShowcaseProps) {
  const { house, tiles } = section;

  return (
    // Adjusted padding for different screen sizes
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
      {/* Flex container becomes column on mobile/tablet and row on large screens */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* House Image Container - full width on small screens, 60% on large */}
        <div className="w-full lg:w-[60%]">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md h-[250px] sm:h-[350px] lg:h-[400px]">
            <Image
              src={house}
              alt={`House example ${sectionIndex}`}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 z-10">
              <span className="text-sm font-semibold text-gray-800">Style #{sectionIndex + 1}</span>
            </div>
          </div>
        </div>
        {/* Available Tile Options - full width on small screens, 40% on large */}
        <div className="flex flex-col gap-4 w-full lg:w-[40%]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Available Tile Options</h3>
          {tiles.map((tile, tileIndex) => (
            <div
              key={tileIndex}
              // Flex container for tiles becomes column on small screens, row on medium+
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-200 transition-all duration-300 group"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-orange-300 transition-colors flex-shrink-0 w-36 h-26"
                whileHover={{ scale: 1.05, rotateY: 15 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={tile.image || "/placeholder.svg"}
                  alt={tile.label}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="flex-1 w-full">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors text-center sm:text-left">
                  {tile.label}
                </h4>
                {/* Tile details grid becomes 1 column on small screens, 2 on medium+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Size:</span>
                    <span className="text-sm text-gray-600 font-mono">{tile.size || "420 x 330mm"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Weight:</span>
                    <span className="text-sm text-gray-600 font-mono">{tile.weight || "2.8kg"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Color:</span>
                    <span className="text-sm text-gray-600">{tile.color || "Natural"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Coverage:</span>
                    <span className="text-sm text-gray-600 font-mono">
                      {tile.coverage || "10.5 tiles/m²"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}