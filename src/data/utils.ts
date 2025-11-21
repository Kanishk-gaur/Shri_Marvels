import { Product } from "../types"

interface SubCategoryData {
  id: string
  name: string // This now holds the user-friendly display name
  count: number
  exampleImage: string
  sizes: string[] 
}

// --- 1. NEW: MAP THE INTERNAL SUBCATEGORY NAME TO ITS DISPLAY NAME ---
// All user-facing headings/labels should be taken from the mapped value.
const subCategoryDisplayNames: Record<string, string> = {
  // Tiles
  
   "Border Tiles": "Imported Border",
   "Digital Border Tiles": "Digital Border",
   "Glitter Emboss": "High Gloss Glitter Emboss Poster",
   "God GVT": "GVT Poster",
   "GOD picture": "Plain Picture",
   "Golden & Silver Border Tiles": "Golden & Silver Border",
   "Golden Rangoli Decorative Tiles": "Golden Rangoli",
   "GOLDEN SILVER HIGHLIGHTER": "Golden & Silver Highlighter",
   "GVT rangoli": "GVT Rangoli",
   "GVT Wall & Floor Border Tiles": "GVT Border",
   "High Gloss 3D Emboss Poster Tiles": "Wooden Emboss Poster",
   "High Gloss Posters": "High Gloss Diamond Poster", // MATCHES High Gloss Posters (used for Diamond in product data)
   "Kitchen Colorfull Poster": "High Gloss Kitchen Poster",
   "VITROSA GOD picture": "Vitrosa Picture",

   // Marvel
   "Steel Welcome": "Steel Welcome Accents",
   "Welcome": "Welcome Door Sills"

  // Add more mappings here for cleaner display names
}

// --- NEW: MAP THE INTERNAL SIZE NAME TO ITS DISPLAY NAME ---
// All user-facing size labels should be taken from the mapped value.
const sizeDisplayNames: Record<string, string> = {
  "600x900 mm (24x36 inch)": "2x3/12x8/12x18/18x24/2x2",
  "900x600 mm (36x24 inch)": "3x2/18x12/24x16/30x20/36x24",
  "200x300 mm (8x12 inch)": "8x12/18x12",
  "300x200 mm (12x8 inch)": "12x8/18x12",
  "600x1200 mm": "2x4",
  
  // New entries for high gloss diamond
  "200x300 mm": "8x12/12x18",
  "300x200 mm": "12x8/18x12",
  "600x600 mm (23.6x23.6 inch)": "2x2",
  "600x600 mm": "2x2",
  "600x900 mm": "2x3",
  "900x600 mm": "3x2",
  "1200x600 mm": "4x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",
  
  // New entry
  "18x12 inch": "3x2/4x2",
  
  // New entry for GVT posters
  "24x24 inch": "2x2",
  
  // New entries for inch sizes
  "8x6": "6x8",
  "8x12 in": "8x12",
  "12x18 inches": "12x18",
  "12x8 in": "12x8",
  
  // New entries for 8x12
  "8x12": "8x12/6x6/12x18",
  "8x12 inches": "2x2",
  
  // New entries for millimeter sizes
  "10x600 mm (0.39x23.6 inch)": "10x600",
  "10x450 mm (0.39x17.7 inch)": "10x450",
  "12x600 mm (0.47x23.6 inch)": "12x600",
  "12x1200 mm (0.47x47.2 inch)": "12x1200",
  "20x600 mm (0.79x23.6 inch)": "20x600",
  "20x1200 mm (0.79x47.2 inch)": "20x1200",
  "25x600 mm (0.98x23.6 inch)": "25x600",
  "40x600 mm (1.57x23.6 inch)": "40x600",
  "45x600 mm (1.77x23.6 inch)": "45x600",
  "48x600 mm (1.89x23.6 inch)": "48x600",
  
  // New entries
  "4x48": "48x4",
  "6x48": "48x6",
  
  // New entries for specific products
  "300x600 mm (11.8x23.6 inch)": "24x12",
  "300x450 mm (11.8x17.7 inch)": "18x12",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "(Sugar)24x12",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "(GLUE)24x12",
  "Polishing Series 300x600 mm (12x24 inch)": "Polishing Series 24x12",
  
  // New entries
  "4x6": "6x4",
  "400x600 mm (16x24 inch)": "6x4",
  "600x600 mm (24x24 inch)": "2x2",
  "1200x1200 mm (48x48 inch)": "4x4",
}

const customCategoryImages: Record<string, string> = {
  // Keys must remain the original subcategory name to correctly link to product data.
  "Border Tiles": "/images/border.png",
  "Digital Border Tiles": "/images/home/Digital_Border.png",
  "Imported Pencil Border Tiles": "/images/your-uploaded-pencil-border.jpg",
  "GVT Wall & Floor Border Tiles": "/images/your-uploaded-gvt-border.jpg",
  "Golden & Silver Border Tiles": "/images/your-uploaded-gold-silver.jpg",
  
  "Digital God Posters": "/images/home/digital_god.png",
  "Digital Plain Poster Tiles": "/images/your-uploaded-plain-poster.jpg",
  "Digital Gate Punch Picture Tiles": "/images/home/gate_punch.png",
  "Kitchen Colorfull Poster": "/images/your-uploaded-kitchen.jpg",
  "Daimond Collection Posters": "/images/Daimond.png",
  
  "High Gloss Posters": "/images/your-uploaded-high-gloss.jpg",
  "High Gloss Posters 2x4": "/images/your-uploaded-hg-2x4.jpg",
  "High Gloss Posters 4x2": "/images/your-uploaded-hg-4x2.jpg",
  "High Gloss 3D Emboss Poster Tiles": "/images/your-uploaded-3d-emboss.jpg",
  "High Gloss Plain & Glitter Poster": "/images/your-uploaded-glitter.jpg",
  "Glitter Emboss": "/images/your-uploaded-glitter-emboss.jpg",

  "God GVT": "/images/your-uploaded-god-gvt.jpg",
  "GOD picture": "/images/your-uploaded-god-pic.jpg",
  "VITROSA GOD picture": "/images/your-uploaded-vitrosa.jpg",
  "Rangoli": "/images/your-uploaded-rangoli.jpg",
  "GVT rangoli": "/images/your-uploaded-gvt-rangoli.png",
  "Golden Rangoli Decorative Tiles": "/images/your-uploaded-gold-rangoli.jpg",
  
  "GOLDEN SILVER HIGHLIGHTER": "/images/your-uploaded-highlighter.jpg",
  "Golden Silver Highlighter Tiles": "/images/your-uploaded-highlighter-tiles.jpg",
  "Steel Welcome": "/images/your-uploaded-steel-welcome.jpg",
  "Welcome": "/images/your-uploaded-welcome.jpg",
  "Step & Riser Tiles": "/images/your-uploaded-step-riser.jpg",
};

// --- 2. PRIORITY ORDER REMAINS KEYED BY ORIGINAL NAME ---
const priorityOrder: Record<string, number> = {
  // --- Mapped from Image (1-15) ---
  "Glitter Emboss": 1,
  "High Gloss 3D Emboss Poster Tiles": 2, 
  // "Wooden Emboss Poster": 2, // NO DIRECT MATCH - Skipping, but reserving priority 2 if a name is found.
  "High Gloss Posters": 3, // CORRECTED: Now targets the actual "High Gloss Posters" subcategory (e.g. Diamond posters)
  "Kitchen Colorfull Poster": 4, 
  "God GVT": 5, 
  "Digital Posters": 6, // CORRECTED: Now targets the actual "Digital Posters" subcategory (e.g. God Posters)
  "VITROSA GOD picture": 7, 
  "GOD picture": 8, 
  "Border Tiles": 9, 
  "Golden & Silver Border Tiles": 10, 
  "Digital Border Tiles": 11, 
  "GVT Wall & Floor Border Tiles": 12, 
  "GOLDEN SILVER HIGHLIGHTER": 13, 
  "GVT rangoli": 14, 
  "Golden Rangoli Decorative Tiles": 15, 

  // --- Remaining items from the original priority list (16+) ---
  // Note: Priority 2 is unused. Start from 16 to keep the existing original items lower priority.
  // "Imported Border": 1,
  "Digital Gate Punch Picture Tiles": 17,
  "Digital Plain God Picture Tiles": 18, 
  "Digital Plain Poster Tiles": 19, 
  
  "Golden Silver Highlighter Tiles": 21,
  // "High Gloss Posters": 23, // Removed as it was re-mapped to position 3

  "Rangoli": 26,
  "Steel Welcome": 27,
  "Step & Riser Tiles": 28,
  "Welcome": 29,
};

export const generateCategories = (products: Product[]) => {
  const categoryMap: {
    marvel: Record<string, SubCategoryData>
    tiles: Record<string, SubCategoryData>
  } = {
    marvel: {},
    tiles: {},
  }

  products.forEach((product) => {
    const { category, subcategory, image, sizes } = product
    if (!categoryMap[category][subcategory]) {
      
      // Look up the display name, default to original if no mapping exists
      const displayName = subCategoryDisplayNames[subcategory] || subcategory;
      
      categoryMap[category][subcategory] = {
        // ID remains the original subcategory name (converted to slug)
        id: subcategory.toLowerCase().replace(/ /g, "-"),
        name: displayName, // USE THE DISPLAY NAME for display in components
        count: 0,
        // Use custom image (keyed by original name) if available, otherwise use the product's image
        exampleImage: customCategoryImages[subcategory] || image, 
        // Sizes are temporarily stored as original names here, mapped later
        sizes: [], 
      }
    }
    categoryMap[category][subcategory].count++
    // Store original size names for correct numeric sorting
    categoryMap[category][subcategory].sizes.push(...sizes)
  })

  // This sorting function relies on the original numeric/simple size string
  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  const processCategory = (cat: Record<string, SubCategoryData>) => {
    const list = Object.values(cat).map((subcat) => {
        
      // 1. Get unique sizes and sort them using the original size names
      const uniqueSortedSizes = Array.from(new Set(subcat.sizes)).sort(sortSizes);
      
      // 2. Map the sorted original size names to their display names
      const displayedSizes = uniqueSortedSizes.map(size => sizeDisplayNames[size] || size);
        
      return ({
        ...subcat,
        sizes: displayedSizes, // Use the new display names for display
      });
    });

    // Sort based on the priority order, which still uses the original subcategory names as keys
    return list.sort((a, b) => {
      // Find the original name by matching either the display name or the ID slug, 
      // then use that to look up the priority.
      const originalNameA = Object.keys(priorityOrder).find(key => subCategoryDisplayNames[key] === a.name || key.toLowerCase().replace(/ /g, "-") === a.id);
      const originalNameB = Object.keys(priorityOrder).find(key => subCategoryDisplayNames[key] === b.name || key.toLowerCase().replace(/ /g, "-") === b.id);
      
      const priorityA = (originalNameA && priorityOrder[originalNameA]) || 999; 
      const priorityB = (originalNameB && priorityOrder[originalNameB]) || 999;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB; 
      }
      return a.name.localeCompare(b.name);
    });
  }

  return {
    marvel: processCategory(categoryMap.marvel),
    tiles: processCategory(categoryMap.tiles),
  }
}

/**
 * Generates a categorized list of all unique product sizes for an entire category.
 */
export const generateSizes = (products: Product[]) => {
  const sizeSets = {
    marvel: new Set<string>(),
    tiles: new Set<string>(),
  }

  products.forEach((product) => {
    // Collect the *original* size names
    product.sizes.forEach((size) => {
      sizeSets[product.category].add(size)
    })
  })

  // This sorting function relies on the original numeric/simple size string
  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  const processSizes = (sizeSet: Set<string>): string[] => {
    // 1. Convert set to array and sort using original size names
    const uniqueSortedSizes = Array.from(sizeSet).sort(sortSizes);
    
    // 2. Map the sorted original size names to their display names
    return uniqueSortedSizes.map(size => sizeDisplayNames[size] || size);
  }

  return {
    marvel: processSizes(sizeSets.marvel),
    tiles: processSizes(sizeSets.tiles),
  }
}