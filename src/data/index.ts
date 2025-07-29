import { Product } from "../types"
import { allProducts as rawProducts } from "./products"
import { generateCategories, generateSizes } from "./utils"

// Export the single source of truth
export const allProducts: Product[] = rawProducts

// Generate and export the derived data
export const categories = generateCategories(rawProducts)
export const sizes = generateSizes(rawProducts)

// Also export the type for convenience, so you can import it from './data'
export * from "../types"