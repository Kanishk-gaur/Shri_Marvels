import { Product } from "../types"

// FIX: Define a specific interface for the data instead of using 'any'.
interface SubCategoryData {
  id: string
  name: string
  count: number
  exampleImage: string
}

/**
 * Generates a categorized list of subcategories with product counts and an example image.
 */
export const generateCategories = (products: Product[]) => {
  // FIX: Use the new SubCategoryData interface instead of 'any'.
  const categoryMap: {
    marvel: Record<string, SubCategoryData>
    tiles: Record<string, SubCategoryData>
  } = {
    marvel: {},
    tiles: {},
  }

  // Group products by subcategory and count them
  products.forEach((product) => {
    const { category, subcategory, image } = product
    if (!categoryMap[category][subcategory]) {
      categoryMap[category][subcategory] = {
        id: subcategory.toLowerCase().replace(/ /g, "-"),
        name: subcategory,
        count: 0,
        // Use the first product's image as the example image
        exampleImage: image,
      }
    }
    categoryMap[category][subcategory].count++
  })

  // Convert the map to the final array structure
  return {
    marvel: Object.values(categoryMap.marvel),
    tiles: Object.values(categoryMap.tiles),
  }
}

/**
 * Generates a categorized list of unique product sizes.
 */
export const generateSizes = (products: Product[]) => {
  const sizeSets = {
    marvel: new Set<string>(),
    tiles: new Set<string>(),
  }

  // Use a Set to automatically handle uniqueness
  products.forEach((product) => {
    product.sizes.forEach((size) => {
      sizeSets[product.category].add(size)
    })
  })

  // A custom sort function for sizes like "12x24", "3x6", etc.
  const sortSizes = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10)

  return {
    marvel: Array.from(sizeSets.marvel).sort(sortSizes),
    tiles: Array.from(sizeSets.tiles).sort(sortSizes),
  }
}