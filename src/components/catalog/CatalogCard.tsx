// src/components/catalog/CatalogCard.tsx
import Image from "next/image";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/context/CatalogContext";
import { getGridSpanClass } from "./utils";
import { cn } from "@/lib/utils";

interface CatalogCardProps {
  item: CatalogItem;
  onRemove: (id: string) => void;
  onEdit: (item: CatalogItem) => void;
}

export function CatalogCard({ item, onRemove, onEdit }: CatalogCardProps) {
  // Logic: Identify specific types based on subcategory string matches
  const isStepRiser = item.subcategory === "Step & Riser";
  const isDesignCollection = item.subcategory === "Design Collection";
  const isRoofTile = item.subcategory === "Roof Tile";

  /**
   * Determine the grid span based on the product type.
   * Parent container in CatalogGroup.tsx uses 'grid-cols-24'.
   */
  let gridSpanClass = getGridSpanClass(item.sizes[0]);

  // Priority logic for Step Riser types
  if (isStepRiser) {
    gridSpanClass = "col-span-24 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-35";
  } else if (isDesignCollection) {
    gridSpanClass = "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-10";
  } else if (isRoofTile) {
    gridSpanClass = "col-span-12 row-span-12 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-14";
  }

  return (
    <div 
      className={cn(
        // CHANGED: Removed bg-white, border, and shadow-sm to make the card transparent
        "group relative flex flex-col bg-transparent transition-all hover:shadow-xl",
        gridSpanClass
      )}
    >
      <div className="relative w-full flex-grow overflow-hidden bg-zinc-100 rounded-lg">
        <Image 
          src={item.imageUrl} 
          alt={item.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
        />
        
        {/* Remove Button Overlay */}
        <div className="absolute top-2 right-2 z-30">
          <Button 
            variant="destructive" 
            size="sm"
            className="h-8 w-8 p-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
            }}
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
      {/* CHANGED: Changed bg-white to bg-transparent and removed border-t */}
      <div className="p-2 flex items-center justify-between bg-transparent">
        <div className="truncate pr-2">
          <h3 className="text-[10px] md:text-[13px] font-bold text-zinc-800 truncate">
            {item.name}
          </h3>
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