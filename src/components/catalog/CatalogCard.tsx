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
  const gridSpanClass = getGridSpanClass(item.sizes[0]);

  return (
    <div 
      className={cn(
        // Reverting the full cart color: removing border and shadow to match original transparency
        "group relative flex flex-col bg-transparent transition-all hover:shadow-xl",
        gridSpanClass
      )}
    >
      {/* Image Container: Reverted to bg-zinc-100 as before */}
      <div className="relative w-full flex-grow overflow-hidden bg-zinc-100 rounded-lg">
        
        {/* Top-right Trash Button Overlay */}
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

        {/* Image Display using object-cover to match previous catalog behavior */}
        <div className="relative w-full h-full">
          <Image 
            src={item.imageUrl} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
          />
        </div>

        {/* Selected Sizes Overlay */}
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

      {/* Bottom Bar: Reverted to transparent background and original padding */}
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