// src/components/catalog/CatalogGroup.tsx
import { CatalogItem } from "@/context/CatalogContext";
import { CatalogCard } from "./CatalogCard";

interface CatalogGroupProps {
  title: string;
  items: CatalogItem[];
  onRemove: (id: string) => void;
  onEdit: (item: CatalogItem) => void;
}

export function CatalogGroup({ title, items, onRemove, onEdit }: CatalogGroupProps) {
  return (
    <div className="mb-16 px-0 sm:px-0">
      <h2 className="text-xl sm:text-3xl font-bold text-zinc-800 mb-6 pb-2 border-b-2 border-zinc-300">
        {title}
      </h2>

      {/* MATCHING GALLERY GRID: 24 columns, gap-4, and dense flow */}
      <div className="grid grid-cols-24 gap-4 grid-flow-dense -mx-2 sm:mx-0">
        {items.map((item) => (
          <CatalogCard 
            key={item.id} 
            item={item} 
            onRemove={onRemove} 
            onEdit={onEdit} 
          />
        ))}
      </div>
    </div>
  );
}