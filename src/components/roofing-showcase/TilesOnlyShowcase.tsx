import { TilesOnlySection } from "./types";

interface TilesOnlyShowcaseProps {
  section: TilesOnlySection;
}

export default function TilesOnlyShowcase({ section }: TilesOnlyShowcaseProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex justify-center gap-8 flex-wrap">
        {section.tiles.map((tile, tileIndex) => (
          <div key={tileIndex} className="text-center max-w-[220px] group">
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 mb-4 group-hover:border-orange-400 transition-all duration-300 group-hover:shadow-lg">
              <img
                src={tile.image || "/placeholder.svg"}
                alt={tile.label}
                className="w-48 h-36 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {tile.label}
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">Size:</span>
                  <span className="text-gray-600">{tile.size || "420 x 330mm"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">Weight:</span>
                  <span className="text-gray-600">{tile.weight || "2.8kg"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">Color:</span>
                  <span className="text-gray-600">{tile.color || "Natural"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">Coverage:</span>
                  <span className="text-gray-600">{tile.coverage || "10.5 tiles/m²"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}