import { RoofingSection } from "@/components/roofing-showcase/types";

export const roofingSections: RoofingSection[] = [
  {
    type: "brick-showcase",
    product: {
      name: "Bumper",
      image: "/terracotta-brick-sample.jpg",
      size: "5 x 2.5 inch",
      weight: "200 Gms.",
      require: "800 Pcs to Cover 100 Sq. Ft.",
      colour: "Natural Terracotta",
    },
    lifestyle: "/modern-interior-with-brick-wall.jpg",
  },
  // Top tile showcase row
  {
    type: "tiles-only",
    tiles: [
      {
        image: "/orange-clay-roof-tile.jpg",
        label: "Clay Tile",
        size: "420 x 330mm",
        weight: "2.8kg",
        color: "Terracotta Orange",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/red-terracotta-roof-tile.jpg",
        label: "Terracotta",
        size: "400 x 240mm",
        weight: "2.2kg",
        color: "Natural Red",
        coverage: "12.8 tiles/m²",
      },
      {
        image: "/brown-concrete-roof-tile.jpg",
        label: "Concrete",
        size: "420 x 330mm",
        weight: "4.2kg",
        color: "Chocolate Brown",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/dark-slate-roof-tile.jpg",
        label: "Slate",
        size: "600 x 300mm",
        weight: "3.5kg",
        color: "Welsh Grey",
        coverage: "8.2 tiles/m²",
      },
    ],
  },
  // House sections with tiles
  {
    type: "house-with-tiles",
    house: "/modern-single-story-house-with-orange-clay-tile-ro.jpg",
    tiles: [
      {
        image: "/orange-clay-roof-tile-sample.jpg",
        label: "Orange Clay",
        size: "420 x 330mm",
        weight: "2.8kg",
        color: "Sunset Orange",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/red-clay-roof-tile-sample.jpg",
        label: "Red Clay",
        size: "420 x 330mm",
        weight: "2.9kg",
        color: "Rustic Red",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/terracotta-roof-tile-sample.jpg",
        label: "Terracotta",
        size: "400 x 240mm",
        weight: "2.2kg",
        color: "Mediterranean",
        coverage: "12.8 tiles/m²",
      },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/contemporary-white-house-with-red-tile-roof.jpg",
    tiles: [
      {
        image: "/bright-red-roof-tile.jpg",
        label: "Bright Red",
        size: "420 x 330mm",
        weight: "2.7kg",
        color: "Cardinal Red",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/burgundy-roof-tile.jpg",
        label: "Burgundy",
        size: "420 x 330mm",
        weight: "2.8kg",
        color: "Wine Red",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/dark-red-roof-tile.jpg",
        label: "Dark Red",
        size: "420 x 330mm",
        weight: "2.9kg",
        color: "Mahogany Red",
        coverage: "10.5 tiles/m²",
      },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/traditional-house-with-brown-roof-tiles.jpg",
    tiles: [
      {
        image: "/brown-concrete-tile.jpg",
        label: "Brown",
        size: "420 x 330mm",
        weight: "4.1kg",
        color: "Chestnut Brown",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/chocolate-brown-tile.jpg",
        label: "Chocolate",
        size: "420 x 330mm",
        weight: "4.2kg",
        color: "Dark Chocolate",
        coverage: "10.5 tiles/m²",
      },
      {
        image: "/dark-brown-tile.jpg",
        label: "Dark Brown",
        size: "420 x 330mm",
        weight: "4.3kg",
        color: "Espresso Brown",
        coverage: "10.5 tiles/m²",
      },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Orange" },
      { image: "/placeholder.svg?height=80&width=80", label: "Coral" },
      { image: "/placeholder.svg?height=80&width=80", label: "Salmon" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Premium Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Rustic Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Antique Red" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Bright Orange" },
      { image: "/placeholder.svg?height=80&width=80", label: "Burnt Orange" },
      { image: "/placeholder.svg?height=80&width=80", label: "Deep Orange" },
    ],
  },
  // Three tiles section
  {
    type: "tiles-only",
    tiles: [
      { image: "/placeholder.svg?height=120&width=160", label: "Premium Clay" },
      { image: "/placeholder.svg?height=120&width=160", label: "Rustic Terra" },
      { image: "/placeholder.svg?height=120&width=160", label: "Classic Red" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Villa Terra" },
      { image: "/placeholder.svg?height=80&width=80", label: "Mediterranean" },
      { image: "/placeholder.svg?height=80&width=80", label: "Spanish" },
      { image: "/placeholder.svg?height=80&width=80", label: "Tuscan" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Family Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Classic" },
      { image: "/placeholder.svg?height=80&width=80", label: "Traditional" },
      { image: "/placeholder.svg?height=80&width=80", label: "Heritage" },
    ],
  },
  // Colorful tiles section
  {
    type: "tiles-only",
    tiles: [
      { image: "/placeholder.svg?height=120&width=160", label: "Green" },
      { image: "/placeholder.svg?height=120&width=160", label: "Blue" },
      { image: "/placeholder.svg?height=120&width=160", label: "Yellow" },
      { image: "/placeholder.svg?height=120&width=160", label: "Purple" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Natural Wood" },
      { image: "/placeholder.svg?height=80&width=80", label: "Cedar Shake" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Cottage Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Country" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Dark Slate" },
      { image: "/placeholder.svg?height=80&width=80", label: "Grey Slate" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Luxury Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Premium Orange" },
      { image: "/placeholder.svg?height=80&width=80", label: "Elite Terra" },
    ],
  },
  // Final tiles section
  {
    type: "tiles-only",
    tiles: [
      { image: "/placeholder.svg?height=120&width=160", label: "Premium Red" },
      { image: "/placeholder.svg?height=120&width=160", label: "Luxury Orange" },
      { image: "/placeholder.svg?height=120&width=160", label: "Elite Brown" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Designer Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Executive" },
      { image: "/placeholder.svg?height=80&width=80", label: "Signature" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Modern Red" },
      { image: "/placeholder.svg?height=80&width=80", label: "Contemporary" },
    ],
  },
  {
    type: "house-with-tiles",
    house: "/placeholder.svg?height=300&width=500",
    tiles: [
      { image: "/placeholder.svg?height=80&width=80", label: "Classic Orange" },
      { image: "/placeholder.svg?height=80&width=80", label: "Traditional" },
      { image: "/placeholder.svg?height=80&width=80", label: "Heritage" },
    ],
  },
  // More sections continue...
  {
    type: "tiles-only",
    tiles: [
      { image: "/placeholder.svg?height=120&width=160", label: "Artisan Red" },
      { image: "/placeholder.svg?height=120&width=160", label: "Handcrafted" },
      { image: "/placeholder.svg?height=120&width=160", label: "Custom Orange" },
      { image: "/placeholder.svg?height=120&width=160", label: "Bespoke" },
    ],
  },
]