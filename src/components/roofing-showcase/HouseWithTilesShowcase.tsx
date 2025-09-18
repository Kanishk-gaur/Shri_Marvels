import { HouseWithTilesSection } from "./types";

interface HouseWithTilesShowcaseProps {
  section: HouseWithTilesSection;
  sectionIndex: number;
}

export default function HouseWithTilesShowcase({ section, sectionIndex }: HouseWithTilesShowcaseProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-10">
        {/* House image */}
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <img
              src={section.house || "/placeholder.svg"}
              alt={`House example ${sectionIndex}`}
              className="w-[420px] h-[280px] object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-semibold text-gray-800">Style #{sectionIndex + 1}</span>
            </div>
          </div>
        </div>

        {/* Tile options */}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Available Tile Options</h3>
          {section.tiles.map((tile, tileIndex) => (
            <div
              key={tileIndex}
              className="flex items-center gap-5 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-200 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-orange-300 transition-colors">
                <img
                  src={tile.image || "/placeholder.svg"}
                  alt={tile.label}
                  className="w-24 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                  {tile.label}
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
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
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}