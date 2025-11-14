import { Product } from "../types"

interface SubCategoryData {
  id: string
  name: string
  count: number
  exampleImage: string
  sizes: string[] 
}

const customCategoryImages: Record<string, string> = {
  // Tiles / Border Categories
  "Border Tiles": "/images/your-uploaded-border-tile.jpg",
  "Digital Border Tiles": "/images/your-uploaded-digital-border.jpg",
  "Imported Pencil Border Tiles": "/images/your-uploaded-pencil-border.jpg",
  "GVT Wall & Floor Border Tiles": "/images/your-uploaded-gvt-border.jpg",
  "Golden & Silver Border Tiles": "/images/your-uploaded-gold-silver.jpg",
  
  // Posters & Wall Tiles
  "Digital God Posters": "/images/your-uploaded-god-poster.jpg",
  "Digital Plain Poster Tiles": "/images/your-uploaded-plain-poster.jpg",
  "Digital Gate Punch Picture Tiles": "/images/your-uploaded-gate-punch.jpg",
  "Kitchen Colorfull Poster": "/images/your-uploaded-kitchen.jpg",
  "Daimond Collection Posters": "/images/your-uploaded-diamond.jpg",
  
  // High Gloss
  "High Gloss Posters": "/images/your-uploaded-high-gloss.jpg",
  "High Gloss Posters 2x4": "/images/your-uploaded-hg-2x4.jpg",
  "High Gloss Posters 4x2": "/images/your-uploaded-hg-4x2.jpg",
  "High Gloss 3D Emboss Poster Tiles": "/images/your-uploaded-3d-emboss.jpg",
  "High Gloss Plain & Glitter Poster": "/images/your-uploaded-glitter.jpg",
  "Glitter Emboss": "/images/your-uploaded-glitter-emboss.jpg",

  // Marvel / GVT / Rangoli
  "God GVT": "/images/your-uploaded-god-gvt.jpg",
  "GOD picture": "/images/your-uploaded-god-pic.jpg",
  "VITROSA GOD picture": "/images/your-uploaded-vitrosa.jpg",
  "Rangoli": "/images/your-uploaded-rangoli.jpg",
  "GVT rangoli": "/images/your-uploaded-gvt-rangoli.png",
  "Golden Rangoli Decorative Tiles": "/images/your-uploaded-gold-rangoli.jpg",
  
  // Highlighters & Welcome
  "GOLDEN SILVER HIGHLIGHTER": "/images/your-uploaded-highlighter.jpg",
  "Golden Silver Highlighter Tiles": "/images/your-uploaded-highlighter-tiles.jpg",
  "Steel Welcome": "/images/your-uploaded-steel-welcome.jpg",
  "Welcome": "/images/your-uploaded-welcome.jpg",
  "Step & Riser Tiles": "/images/your-uploaded-step-riser.jpg",
  
  // Add any others here exactly as they appear in your data
};

// --- 2. DEFINE YOUR PRIORITY ORDER HERE ---
const priorityOrder: Record<string, number> = {
  "Border Tiles": 1,
  "Daimond Collection Posters": 2,
  "Digital Border Tiles": 3,
  "Digital Gate Punch Picture Tiles": 4,
  "Digital God Posters": 5,
  "Digital Plain God Picture Tiles": 6,
  "Digital Plain Poster Tiles": 7,
  "Glitter Emboss": 8,
  "God GVT": 9,
  "GOD picture": 10,
  "Golden & Silver Border Tiles": 11,
  "Golden Rangoli Decorative Tiles": 12,
  "GOLDEN SILVER HIGHLIGHTER": 13,
  "Golden Silver Highlighter Tiles": 14,
  "GVT rangoli": 15,
  "GVT Wall & Floor Border Tiles": 16,
  "High Gloss 3D Emboss Poster Tiles": 17,
  "High Gloss Plain & Glitter Poster": 18,
  "High Gloss Posters": 19,
  "High Gloss Posters 2x4": 20,
  "High Gloss Posters 4x2": 21,
  "Imported Pencil Border Tiles": 22,
  "Kitchen Colorfull Poster": 23,
  "Rangoli": 24,
  "Steel Welcome": 25,
  "Step & Riser Tiles": 26,
  "VITROSA GOD picture": 27,
  "Welcome": 28,
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
      
      // CHECK: Do we have a custom image for this subcategory?
      const customImage = customCategoryImages[subcategory];
      
      categoryMap[category][subcategory] = {
        id: subcategory.toLowerCase().replace(/ /g, "-"),
        name: subcategory,
        count: 0,
        // Use custom image if available, otherwise use the product's image
        exampleImage: customImage || image, 
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

    // Sort based on the priority order
    return list.sort((a, b) => {
      const priorityA = priorityOrder[a.name] || 999; 
      const priorityB = priorityOrder[b.name] || 999;

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