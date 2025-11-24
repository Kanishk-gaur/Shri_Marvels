import Image from "next/image";
import { BrickShowcaseSection } from "./types";

interface BrickShowcaseProps {
  section: BrickShowcaseSection;
}

export default function BrickShowcase({ section }: BrickShowcaseProps) {
  return (
    // Adjusted padding for different screen sizes
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
      {/* CHANGE 1: Removed `items-center`. 
        This allows the child elements to stretch to the same height on large screens (the default behavior for flexbox).
      */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Product specifications card - full width on small, fixed width on large */}
        <div className="w-full lg:w-80 lg:flex-shrink-0">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{section.product.name}</h3>

            {/* Product image */}
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

            {/* Specifications */}
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
          </div>
        </div>

        {/* Lifestyle image - takes remaining space on large screens */}
        <div className="flex-1 w-full">
          {/* CHANGE 2: Added `h-full` to the image's direct wrapper.
            This makes the wrapper expand to fill the vertical space provided by the parent flex container.
          */}
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg h-full">
            <Image
              src={section.lifestyle || "/placeholder.svg"}
              alt={`${section.product.name} lifestyle application`}
              // Adjusted height for different screen sizes - lg:h-full now works correctly
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