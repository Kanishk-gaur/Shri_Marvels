import Image from "next/image";
import { Trash2, Edit2, HardHat, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/context/CatalogContext";
import { getGridSpanClass } from "./utils";

interface CatalogCardProps {
  item: CatalogItem;
  onRemove: (id: string) => void;
  onEdit: (item: CatalogItem) => void;
}

export function CatalogCard({ item, onRemove, onEdit }: CatalogCardProps) {
  const gridSpanClass = getGridSpanClass(item.sizes[0]);
  
  // Category-specific logic
  const isRoofTile = item.category === "roof_tiles";
  const isStepRiser = item.category === "step_riser";

  return (
    <div 
      className={`group relative flex flex-col bg-white border border-zinc-200/80 shadow-sm transition-all hover:shadow-xl ${gridSpanClass}`}
    >
      <div className="relative w-full flex-grow overflow-hidden bg-zinc-100">
        <Image 
          src={item.imageUrl} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Category Badge */}
        {(isRoofTile || isStepRiser) && (
          <div className="absolute top-2 left-2 z-30">
            <span className={`flex items-center gap-1 text-[9px] uppercase font-black px-2 py-1 rounded-sm shadow-sm ${
              isRoofTile ? "bg-orange-600 text-white" : "bg-blue-600 text-white"
            }`}>
              {isRoofTile ? <HardHat size={10} /> : <Layers size={10} />}
              {isRoofTile ? "Roof Tile" : "Step Riser"}
            </span>
          </div>
        )}

        {/* Remove Button Overlay */}
        <div className="absolute top-2 right-2 z-30">
          <Button 
            variant="destructive" 
            size="sm"
            className="h-8 w-8 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Order Selection Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 backdrop-blur translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
           <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter mb-2">Selected Sizes:</p>
           <div className="space-y-1 max-h-[150px] overflow-y-auto custom-scrollbar">
            {item.selectedSizes.map((s: string) => (
              <div key={s} className="flex justify-between items-center text-[11px] bg-white/10 px-2 py-1.5 border border-white/10 rounded text-white">
                <span className="font-medium">{s}</span>
                <span className="font-black">{item.sizeConfigs?.[s] || 1} Pcs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Title & Edit Section */}
      <div className="p-2 flex items-center justify-between bg-white border-t border-zinc-100">
        <div className="truncate pr-2">
          <h3 className="text-[10px] md:text-[13px] font-bold text-zinc-800 truncate">
            {item.name}
          </h3>
          <p className="text-[8px] text-zinc-400 uppercase tracking-widest leading-none">
            {item.subcategory}
          </p>
        </div>
        <button 
          className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors"
          onClick={() => onEdit(item)}
          title="Edit Selection"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}