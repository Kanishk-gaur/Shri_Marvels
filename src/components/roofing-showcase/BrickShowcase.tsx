import { BrickShowcaseSection } from "./types";

interface BrickShowcaseProps {
  section: BrickShowcaseSection;
}

export default function BrickShowcase({ section }: BrickShowcaseProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-8">
        {/* Product specifications card */}
        <div className="flex-shrink-0 w-80">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{section.product.name}</h3>

            {/* Product image */}
            <div className="mb-6 flex justify-center">
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-md">
                <img
                  src={section.product.image || "/placeholder.svg"}
                  alt={section.product.name}
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

        {/* Lifestyle image */}
        <div className="flex-1">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <img
              src={section.lifestyle || "/placeholder.svg"}
              alt={`${section.product.name} lifestyle application`}
              className="w-full h-96 object-cover"
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