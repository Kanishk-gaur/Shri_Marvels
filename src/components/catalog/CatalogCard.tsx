// src/components/catalog/CatalogCard.tsx
import Image from "next/image";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogItem } from "@/context/CatalogContext";
import { cn } from "@/lib/utils";
// Import the exact same mappings used in GalleryCard
import { subCategoryDisplayNames } from "@/data/utils";

interface CatalogCardProps {
  item: CatalogItem;
  onRemove: (id: string) => void;
  onEdit: (item: CatalogItem) => void;
}


// Replicated Aspect Ratio Map from GalleryCard for consistent rendering
const ASPECT_RATIO_MAP: Record<string, string> = {
  // 12x24 variations (2:1 ratio)
  "(POLISHED)12x24": "aspect-[2/1]",
  "12x24": "aspect-[2/1]",
  "(LUSTER)12x24": "aspect-[2/1]",
  "(SUGAR)12x24": "aspect-[2/1]",

  // 18x12 variations (3:2 ratio)
  "18x12/8x12": "aspect-[3/2]",
  "18x12 inch": "aspect-[3/2]",
  "300x200 mm (12x8 inch)": "aspect-[3/2]",

  // 12x18 variations (2:3 ratio)
  "12x18/12x8": "aspect-[2/3]",
  "12x18": "aspect-[2/3]",
  "12x18 mm": "aspect-[2/3]",
  "12x18 inches": "aspect-[2/3]",
  "12x18 in": "aspect-[2/3]",
  "200x300 mm (8x12 inch)": "aspect-[2/3]",

  // 400x600 (2:3 ratio)
  "400x600 mm (16x24 inch)": "aspect-[3/1.6]",

  // 300x600 variations (1:2 ratio)
  "(Sugar)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",

  "300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "Polishing Series 300x600 mm (12x24 inch)": "aspect-[5/2.5]",

  // Very narrow strips (1:10 to 1:24 ratio)
  "300x63 mm (12x2.5 inch)": "aspect-[4/1]",
  "12x2.5": "aspect-[6/1]",
  "48x600 mm (1.89x23.6 inch)": "aspect-[9/1]",
  "45x600 mm (1.77x23.6 inch)": "aspect-[9/1]",
  "40x600 mm (1.57x23.6 inch)": "aspect-[12/1]",
  "25x600 mm (0.98x23.6 inch)": "aspect-[12/1]",
  "20x600 mm (0.79x23.6 inch)": "aspect-[15/1]",
  "20x600": "aspect-[15/1]",
  "10x600 mm (0.39x23.6 inch)": "aspect-[20/1]",
  "10x600": "aspect-[15/1]",
  "20x1200 mm (0.79x47.2 inch)": "aspect-[12/1]",
  "12x600 mm (0.47x23.6 inch)": "aspect-[15/1]",
  "12x1200 mm (0.47x47.2 inch)": "aspect-[15/1]",
  "10x450 mm (0.39x17.7 inch)": "aspect-[15/1]",
  "24x4": "aspect-[5/1]",
  "24x2.5": "aspect-[8/1]",
  "24x2": "aspect-[10/1]",
  "24x1": "aspect-[15/1]",
  "24x3": "aspect-[8/1]",
  "2 Soot": "aspect-[15/1]",

  // 900x600 (3:2 ratio)
  "900x600 mm": "aspect-[3/2]",
  "900x600 mm (36x24 inch)": "aspect-[3/2]",

  // Mixed sizes
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2": "aspect-[4.5/3]",
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4": "aspect-[2/3]",

  // 24x24 and 600x600 (1:1 square)
  "24x24 inch": "aspect-square",
  "600x600 mm": "aspect-square",
  "600x600 mm (23.6x23.6 inch)": "aspect-square",
  "600x600 mm (24x24 inch)": "aspect-square",
  "2x2": "aspect-square",
  "6x6": "aspect-square",
  "4x4": "aspect-square",
  "8x12 inches": "aspect-square",

  // 600x900 (2:3 ratio)
  "600x900 mm": "aspect-[2/3]",
  "600x900 mm (24x36 inch)": "aspect-[2/3]",

  // 1200x600 (2:1 ratio)
  "1200x600 mm": "aspect-[2/1]",
  "1200x600 mm (48x24 inch)": "aspect-[2/1]",

  // 1200x1800 (2:3 ratio)
  "1200x1800 mm (48x72 inch)": "aspect-[2/3]",

  // 1200x1200 (1:1 square)
  "1200x1200 mm (48x48 inch)": "aspect-square",

  // 4x2 (2:1 ratio)
  "4x2 in": "aspect-[2/1]",
  "4x2": "aspect-[2/1]",

  // 2x4 (1:2 ratio)
  "2x4 in": "aspect-[1/2]",
  "2x4": "aspect-[1/2]",

  // 12x8 (3:2 ratio)
  "12x8 in": "aspect-[3/2]",
  "12x8": "aspect-[3/2]",
  "8x12 in": "aspect-[2/3]",
  "8x12": "aspect-[2/3]",

  // 6x36 variations (1:6 ratio)
  "(God)6x36": "aspect-[6/1]",
  "6x36 in (c)": "aspect-[6/1]",
  "6x36 ,9x36,12x36": "aspect-[3.8/1]",
  "6x36(w)": "aspect-[5/1]",
  "6x36": "aspect-[4.1/1]",
  "6x36 in": "aspect-[6/1]",
  "6x36 inch": "aspect-[6/1]",

  // 9x36 (1:4 ratio)
  "9x36": "aspect-[1/4]",

  // 8x6 (4:3 ratio)
  "8x6": "aspect-[4/6]",

  // 900x300 (3:1 ratio)
  "900x300 mm": "aspect-[3/1]",

  // 1200x300 (4:1 ratio)
  "1200x300 mm": "aspect-[4/1]",

  // 1000x300 (10:3 ratio)
  "1000x300 mm": "aspect-[10/3]",

  // 6x48 (1:8 ratio)
  "6x48": "aspect-[8/1]",

  // 4x48 (1:12 ratio)
  "4x48": "aspect-[11/1]",

  // 600x1200 (1:2 ratio)
  "600x1200 mm": "aspect-[1/2]",
  "600x1200 mm (24x48 inch)": "aspect-[1/2]",

  // 4x6 (2:3 ratio)
  "4x6": "aspect-[3/2]",

  // 3x2/24x18/2x2 (mixed, default 4:3)
  "3x2/24x18/2x2": "aspect-[4/3]",

  // 3x2 (3:2 ratio)
  "3x2": "aspect-[3/2]",

  // 6x8 (3:4 ratio)
  "6x8": "aspect-[3/4]",

  // 8x4 (2:1 ratio)
  "8x4": "aspect-[2/1]",

  // 6x3 (2:1 ratio)
  "6x3": "aspect-[2/1]",

  // 2x3 (2:3 ratio)
  "2x3": "aspect-[2/3]",

  "300X1200": "aspect-[5/5]",

  "600X1200": "aspect-[5/5]",

  // Default fallback
  default: "aspect-[4/3]",
};


// Replicated Column Span Map from GalleryCard
const COLUMN_SPAN_MAP: Record<string, string> = {
  // Large format tiles - 2 per row on laptop
  "600X1200": "col-span-12 md:col-span-8 lg:col-span-6",
  "300X1200": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x1200 mm (24x48 inch)": "col-span-12 md:col-span-8 lg:col-span-4",
  "1200x1800 mm (48x72 inch)": "col-span-12 md:col-span-12 lg:col-span-12",
  "900x600 mm (36x24 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "900x600 mm": "col-span-24 md:col-span-12 lg:col-span-8",
  "1200x600 mm (48x24 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "1200x600 mm": "col-span-24 md:col-span-12 lg:col-span-8",
  "600x900 mm (24x36 inch)": "col-span-12 md:col-span-6 lg:col-span-6",

  // Very narrow strips - Full width or 2 per row
  "300x63 mm (12x2.5 inch)": "col-span-24 md:col-span-12 lg:col-span-6",
  "48x600 mm (1.89x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "45x600 mm (1.77x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "40x600 mm (1.57x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "25x600 mm (0.98x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "20x600 mm (0.79x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x600 mm (0.39x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "20x1200 mm (0.79x47.2 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "12x600 mm (0.47x23.6 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "12x1200 mm (0.47x47.2 inch)": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x450 mm (0.39x17.7 inch)": "col-span-24 md:col-span-12 lg:col-span-8",

  // Medium tiles - 3 per row on laptop (4:3, 3:2, 2:3 ratios)
  // 12x18 group
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4":
    "col-span-12 md:col-span-8 lg:col-span-6",
  "12x18/12x8": "col-span-6 md:col-span-6 lg:col-span-3",
  "12x18": "col-span-12 md:col-span-8 lg:col-span-4",
  "12x18 mm": "col-span-6 md:col-span-6 lg:col-span-3",
  "12x18 inches": "col-span-8 md:col-span-6 lg:col-span-3",
  "12x18 in": "col-span-6 md:col-span-6 lg:col-span-3",
  "200x300 mm (8x12 inch)": "col-span-8 md:col-span-6 lg:col-span-4",
  "400x600 mm (16x24 inch)": "col-span-12 md:col-span-12 lg:col-span-8",
  "600x900 mm": "col-span-12 md:col-span-6 lg:col-span-4",

  // 12x24 group
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2":
    "col-span-24 md:col-span-12 lg:col-span-8",
  "(POLISHED)12x24": "col-span-8 md:col-span-8 lg:col-span-4",
  "12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "(LUSTER)12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "(SUGAR)12x24": "col-span-12 md:col-span-8 lg:col-span-4",
  "300x600 mm (11.8x23.6 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "Polishing Series 300x600 mm (12x24 inch)":
    "col-span-12 md:col-span-12 lg:col-span-6",
  "(Sugar)300x600 mm (11.8x23.6 inch)":
    "col-span-12 md:col-span-8 lg:col-span-6",
  "(GLUE)300x600 mm (11.8x23.6 inch)":
    "col-span-12 md:col-span-8 lg:col-span-6",

  // 18x12 group
  "18x12/8x12": "col-span-8 md:col-span-8 lg:col-span-4",
  "18x12": "col-span-8 md:col-span-8 lg:col-span-4",
  "18x12 inch": "col-span-12 md:col-span-8 lg:col-span-4",
  "300x200 mm (12x8 inch)": "col-span-12 md:col-span-8 lg:col-span-6",

  // Square tiles group - 4 per row on laptop
  "24x24 inch": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm (23.6x23.6 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "600x600 mm (24x24 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "2x2": "col-span-8 md:col-span-8 lg:col-span-4",
  "6x6": "col-span-12 md:col-span-8 lg:col-span-3",
  "4x4": "col-span-12 md:col-span-8 lg:col-span-6",
  "1200x1200 mm (48x48 inch)": "col-span-12 md:col-span-12 lg:col-span-6",

  // 6x36 narrow tiles - 2 per row on laptop
  "(God)6x36": "col-span-12 md:col-span-8 lg:col-span-8",
  "6x36 in (c)": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36 ,9x36,12x36": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36(w)": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36": "col-span-24 md:col-span-12 lg:col-span-12",
  "6x36 in": "col-span-24 md:col-span-12 lg:col-span-8",
  "6x36 inch": "col-span-12 md:col-span-12 lg:col-span-6",

  // Other specific groupings
  "8x12 in": "col-span-6 md:col-span-6 lg:col-span-3",
  "8x12": "col-span-6 md:col-span-6 lg:col-span-3",
  "8x12 inches": "col-span-12 md:col-span-8 lg:col-span-6",
  "12x8 in": "col-span-8 md:col-span-8 lg:col-span-4",
  "12x8": "col-span-12 md:col-span-8 lg:col-span-4",

  // Additional sizes from GRID_CLASSES
  "300x450 mm (11.8x17.7 inch)": "col-span-12 md:col-span-8 lg:col-span-6",
  "900x300 mm": "col-span-12 md:col-span-8 lg:col-span-4",
  "1200x300 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "1000x300 mm": "col-span-12 md:col-span-8 lg:col-span-6",
  "6x48": "col-span-24 md:col-span-12 lg:col-span-12",
  "4x48": "col-span-24 md:col-span-12 lg:col-span-12",
  "4x2": "col-span-6 md:col-span-6 lg:col-span-4",
  "600x1200 mm": "col-span-12 md:col-span-8 lg:col-span-4",
  "2x4": "col-span-12 md:col-span-8 lg:col-span-4",
  "4x6": "col-span-12 md:col-span-8 lg:col-span-6",
  "24x4": "col-span-24 md:col-span-12 lg:col-span-6",
  "24x2.5": "col-span-24 md:col-span-12 lg:col-span-6",
  "24x2": "col-span-24 md:col-span-12 lg:col-span-6",
  "12x2.5": "col-span-12 md:col-span-8 lg:col-span-6",
  "24x1": "col-span-24 md:col-span-12 lg:col-span-6",
  "2x3": "col-span-12 md:col-span-6 lg:col-span-4",
  "6x3": "col-span-12 md:col-span-8 lg:col-span-3",
  "8x4": "col-span-12 md:col-span-8 lg:col-span-2",
  "3x2/24x18/2x2": "col-span-8 md:col-span-8 lg:col-span-6",
  "3x2": "col-span-12 md:col-span-8 lg:col-span-6",
  "6x8": "col-span-12 md:col-span-6 lg:col-span-3",
  "24x3": "col-span-24 md:col-span-12 lg:col-span-6",
  "2 Soot": "col-span-24 md:col-span-12 lg:col-span-6",
  "8x6": "col-span-8 md:col-span-8 lg:col-span-4",
  "20x600": "col-span-24 md:col-span-12 lg:col-span-8",
  "10x600": "col-span-24 md:col-span-12 lg:col-span-8",
  "9x36": "col-span-12 md:col-span-8 lg:col-span-8",

  // Default for everything else
  default: "col-span-12 md:col-span-4 lg:col-span-3",
};

export function CatalogCard({ item, onRemove, onEdit }: CatalogCardProps) {
  const sizeString = item.sizes[0] || "1x1";
  
  // Apply special styling for "Step & Riser" subcategory
  const isStepAndRiser = item.subcategory === "Design Collection";
  const isroof = item.subcategory === "Roof Tile";

  // const isroof = item.subcategory === "Design Collection";
  
  // Determine aspect ratio class
  let aspectRatioClass;
  if (isStepAndRiser) {
    aspectRatioClass = "aspect-[5/2.3]"; // Specific for Step & Riser
  }else if(isroof){
    aspectRatioClass = "aspect-[5/3.6]"; 
  }
   else {
    aspectRatioClass = ASPECT_RATIO_MAP[sizeString] || ASPECT_RATIO_MAP.default;
  }
  
  // Determine column span class
  let columnSpanClass;
  if (isStepAndRiser) {
    columnSpanClass = "col-span-12 md:col-span-8 lg:col-span-4"; // Specific for Step & Riser
  } else if(isroof){
    columnSpanClass = "col-span-12 md:col-span-8 lg:col-span-6";
  }else {
    columnSpanClass = COLUMN_SPAN_MAP[sizeString] || COLUMN_SPAN_MAP.default;
  }

  return (
    <div className={cn("group relative flex flex-col bg-transparent", columnSpanClass)}>
      <div className="flex flex-col h-full bg-white overflow-hidden border border-zinc-200/80 transition-shadow duration-300 hover:shadow-lg">
        {/* Aspect Ratio Container matching Gallery style */}
        <div className={cn("relative w-full overflow-hidden bg-zinc-100", aspectRatioClass)}>
          
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

          <div className="relative w-full h-full">
            <Image 
              src={item.imageUrl} 
              alt={item.name} 
              fill 
              // Changed to object-contain to match Gallery behavior
              className="object-contain transition-transform duration-700 group-hover:scale-105" 
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

        {/* Bottom Bar matching GalleryCard layout */}
        <div className="flex items-center justify-between p-2 bg-transparent gap-2 min-h-[2.5rem] flex-shrink-0">
          <div className="flex-grow">
            <h3 className="text-zinc-900 font-semibold text-[10px] md:text-[12px] truncate">
              {item.name}
            </h3>
            {isStepAndRiser && (
              <p className="text-[9px] text-zinc-500 mt-0.5">Step & Riser</p>
            )}
          </div>
          <button 
            className="p-1 text-zinc-400 hover:text-zinc-800 transition-colors"
            onClick={() => onEdit(item)}
            title="Edit Selection"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}