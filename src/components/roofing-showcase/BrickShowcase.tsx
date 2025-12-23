"use client";

import Image from "next/image";
import { BrickShowcaseSection } from "./types";
import { useCatalog } from "@/context/CatalogContext";
import { Button } from "../ui/button";
import { ListPlus, ListMinus } from "lucide-react";

interface BrickShowcaseProps {
  section: BrickShowcaseSection;
}

export default function BrickShowcase({ section }: BrickShowcaseProps) {
  const { isItemInCatalog, addItemToCatalog, removeItemFromCatalog } = useCatalog();
  
  const itemId = section.id;
  const isInCatalog = isItemInCatalog(itemId);

  const handleToggle = () => {
    if (isInCatalog) {
      removeItemFromCatalog(itemId);
    } else {
      // Mapping BrickShowcase data to CatalogItem interface
      addItemToCatalog({
        id: itemId,
        name: section.product.name,
        imageUrl: section.product.image,
        category: "Roof Tiles",
        sizes: [section.product.size],
        selectedSizes: [section.product.size]
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{section.product.name}</h3>

            <div className="mb-6 flex justify-center">
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-md w-48 h-48">
                <Image
                  src={section.product.image || "/placeholder.svg"}
                  alt={section.product.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-700">Size : </span>
                <span className="text-lg text-gray-900 font-medium">{section.product.size}</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-700">Weight : </span>
                <span className="text-lg text-gray-900 font-medium">{section.product.weight}</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-700">Require : </span>
                <span className="text-lg text-gray-900 font-medium">{section.product.require}</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-700">Colour : </span>
                <span className="text-lg text-gray-900 font-medium">{section.product.colour}</span>
              </div>
            </div>

            {/* Catalog Toggle Button */}
            <Button 
              onClick={handleToggle}
              variant={isInCatalog ? "destructive" : "default"}
              className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white"
            >
              {isInCatalog ? (
                <><ListMinus className="mr-2 h-4 w-4" /> Remove from Catalog</>
              ) : (
                <><ListPlus className="mr-2 h-4 w-4" /> Add to Catalog</>
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg h-full">
            <Image
              src={section.lifestyle || "/placeholder.svg"}
              alt={`${section.product.name} lifestyle application`}
              fill
              className="w-full h-[250px] sm:h-[400px] lg:h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-sm font-semibold text-gray-800">Interior Application</span>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}