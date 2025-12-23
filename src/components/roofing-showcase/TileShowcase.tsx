"use client";

import { TileShowcaseSection } from "./types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCatalog } from "@/context/CatalogContext";
import { Button } from "../ui/button";
import { ListPlus, ListMinus } from "lucide-react";

interface TileShowcaseProps {
  section: TileShowcaseSection;
  sectionIndex: number;
}

export default function TileShowcase({ section, sectionIndex }: TileShowcaseProps) {
  const { house, tiles } = section;
  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } = useCatalog();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
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

        <div className="flex-1 flex flex-col gap-4 w-full lg:w-[40%]">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Available Tile Options</h3>
          {tiles.map((tile, tileIndex) => {
            const tileId = `${section.id}-tile-${tileIndex}`;
            const isInCatalog = isItemInCatalog(tileId);

            const handleToggle = (e: React.MouseEvent) => {
              e.preventDefault();
              if (isInCatalog) {
                removeItemFromCatalog(tileId);
              } else {
                addItemToCatalog({
                  id: tileId,
                  name: tile.label || "Unnamed Tile",
                  imageUrl: tile.image || "/placeholder.svg",
                  category: "Roof Tiles",
                  sizes: [tile.size || "Standard"],
                  selectedSizes: [tile.size || "Standard"]
                });
              }
            };

            return (
              <div
                key={tileIndex}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-200 transition-all duration-300 group relative"
              >
                <motion.div
                  className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-orange-300 transition-colors flex-shrink-0 w-36 h-26"
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={tile.image || "/placeholder.svg"}
                    alt={tile.label || "Tile Image"}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="flex-1 w-full">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors text-center sm:text-left">
                    {tile.label}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Size:</span>
                      <span className="text-sm text-gray-600 font-mono">{tile.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Weight:</span>
                      <span className="text-sm text-gray-600 font-mono">{tile.weight}</span>
                    </div>
                  </div>
                </div>

                {/* Updated Button: Always visible */}
                <Button
                  size="icon"
                  variant={isInCatalog ? "destructive" : "outline"}
                  className="sm:absolute sm:top-2 sm:right-2 h-8 w-8 rounded-full transition-all opacity-100 shadow-sm"
                  onClick={handleToggle}
                >
                  {isInCatalog ? <ListMinus className="h-4 w-4" /> : <ListPlus className="h-4 w-4" />}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}