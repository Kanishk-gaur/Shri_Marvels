/**
 * Defines the structure for a single product object.
 */
export interface Product {
  id: number
  name: string
  category: "marvel" | "tiles"
  subcategory: string
   sizes: string[]
  material: string
  image: string
  images: string[]
  rating: number
  dimensions: {
    length: number
    width: number
    unit: string
  }
}