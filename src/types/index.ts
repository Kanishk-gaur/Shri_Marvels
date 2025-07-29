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
  finish: string
  thickness: string
  image: string
  images: string[]
  description: string
  features: string[]
  rating: number
  reviews: number
  dimensions: {
    length: number
    width: number
    unit: string
  }
}