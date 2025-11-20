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
   "High Gloss Posters": "High Gloss Diamond Poster",
   "Kitchen Colorfull Poster": "High Gloss Kitchen Poster",
   "VITROSA GOD picture": "Vitrosa Picture",

   // Marvel
   "Steel Welcome": "Steel Welcome Accents",
   "Welcome": "Welcome Door Sills"

  // Add more mappings here for cleaner display names
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
  "High Gloss Plain & Glitter Poster": 1, // HIGH GLOSS GLITTER EMBOSS POSTER
  // "Wooden Emboss Poster": 2, // NO DIRECT MATCH - Skipping, but reserving priority 2 if a name is found.
  "Daimond Collection Posters": 3, // HIGH GLOSS DIAMOND POSTER
  "Kitchen Colorfull Poster": 4, // HIGH GLOSS KITCHEN POSTER
  "God GVT": 5, // GVT POSTER
  "Digital God Posters": 6, // DIGITAL POSTER (Assuming Digital God, could also be Digital Plain)
  "VITROSA GOD picture": 7, // VITROSA PICTURE
  "GOD picture": 8, // PLAIN PICTURE
  "Imported Pencil Border Tiles": 9, // IMPORTED BORDER
  "Golden & Silver Border Tiles": 10, // GOLDEN & SILVER BORDER
  "Digital Border Tiles": 11, // DIGITAL BORDER
  "GVT Wall & Floor Border Tiles": 12, // GVT BORDER
  "GOLDEN SILVER HIGHLIGHTER": 13, // GOLDEN & SILVER HIGHLIGHTER
  "GVT rangoli": 14, // GVT RANGOLI
  "Golden Rangoli Decorative Tiles": 15, // GOLDEN RANGOLI

  // --- Remaining items from the original priority list (16+) ---
  // Note: Priority 2 is unused. Start from 16 to keep the existing original items lower priority.
  // "Imported Border": 1,
  "Digital Gate Punch Picture Tiles": 17,
  "Digital Plain God Picture Tiles": 18, // Was originally priority 6
  "Digital Plain Poster Tiles": 19, // Was originally priority 7
  "Glitter Emboss": 20,
  "Golden Silver Highlighter Tiles": 21,
  "High Gloss 3D Emboss Poster Tiles": 22,
  "High Gloss Posters": 23,
  "High Gloss Posters 2x4": 24,
  "High Gloss Posters 4x2": 25,
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
        sizes: [], 
      }
    }
    categoryMap[category][subcategory].count++
    categoryMap[category][subcategory].sizes.push(...sizes)
  })

  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  const processCategory = (cat: Record<string, SubCategoryData>) => {
    const list = Object.values(cat).map((subcat) => ({
      ...subcat,
      sizes: Array.from(new Set(subcat.sizes)).sort(sortSizes),
    }));

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
    product.sizes.forEach((size) => {
      sizeSets[product.category].add(size)
    })
  })

  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  return {
    marvel: Array.from(sizeSets.marvel).sort(sortSizes),
    tiles: Array.from(sizeSets.tiles).sort(sortSizes),
  }
}