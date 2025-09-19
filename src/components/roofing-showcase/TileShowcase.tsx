"use client";

import { TileShowcaseSection } from "./types";
import { motion } from "framer-motion";

interface TileShowcaseProps {
  section: TileShowcaseSection;
  sectionIndex: number;
}

export default function TileShowcase({ section, sectionIndex }: TileShowcaseProps) {
  const { house, tiles } = section;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-10">
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <img
              src={house}
              alt={`House example ${sectionIndex}`}
              className="w-[500px] h-[320px] object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-semibold text-gray-800">Style #{sectionIndex + 1}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Available Tile Options</h3>
          {tiles.map((tile, tileIndex) => (
            <div
              key={tileIndex}
              className="flex items-center gap-5 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-200 transition-all duration-300 group"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-orange-300 transition-colors"
                whileHover={{ scale: 1.05, rotateY: 15 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={tile.image || "/placeholder.svg"}
                  alt={tile.label}
                  className="w-34 h-24 object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {tile.label}
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
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