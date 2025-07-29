import { Product } from "../types"

// FIX: Define a specific interface for the data instead of using 'any'.
// This now includes the 'sizes' property.
interface SubCategoryData {
  id: string
  name: string
  count: number
  exampleImage: string
  sizes: string[] // Each subcategory will have its own list of sizes
}

/**
 * Generates a categorized list of subcategories with product counts, an example image,
 * and a specific list of available sizes for each subcategory.
 */
export const generateCategories = (products: Product[]) => {
  const categoryMap: {
    marvel: Record<string, SubCategoryData>
    tiles: Record<string, SubCategoryData>
  } = {
    marvel: {},
    tiles: {},
  }

  // Group products by subcategory and collect their sizes
  products.forEach((product) => {
    const { category, subcategory, image, sizes } = product
    if (!categoryMap[category][subcategory]) {
      categoryMap[category][subcategory] = {
        id: subcategory.toLowerCase().replace(/ /g, "-"),
        name: subcategory,
        count: 0,
        exampleImage: image,
        sizes: [], // Initialize with an empty array
      }
    }
    categoryMap[category][subcategory].count++
    // Add all sizes from the current product to the subcategory's list
    categoryMap[category][subcategory].sizes.push(...sizes)
  })

  // A custom sort function for sizes like "12x24", "3x6", etc.
  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  // Process the final map to have unique, sorted sizes for each subcategory
  const processCategory = (cat: Record<string, SubCategoryData>) => {
    return Object.values(cat).map((subcat) => ({
      ...subcat,
      // Use a Set to get unique sizes, then convert back to an array and sort
      sizes: Array.from(new Set(subcat.sizes)).sort(sortSizes),
    }))
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