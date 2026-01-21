// src/components/catalog/GridDimensions.ts

/**
 * EXACT Aspect Ratio Map from GalleryCard.tsx
 * Maps product sizes to their specific CSS aspect ratio classes.
 */
const ASPECT_RATIO_MAP: Record<string, string> = {
  "(POLISHED)12x24": "aspect-[2/1]",
  "12x24": "aspect-[2/1]",
  "(LUSTER)12x24": "aspect-[2/1]",
  "(SUGAR)12x24": "aspect-[2/1]",

  // 18x12 variations (3:2 ratio)
  "18x12/8x12": "aspect-[3/2]",
  "18x12 inch": "aspect-[3/2]",
  "300x200 mm (12x8 inch)": "aspect-[3/2]",

  // 12x18 variations (2:3 ratio)
  "12x18/12x8": "aspect-[2/3]",
  "12x18": "aspect-[2/3]",
  "12x18 mm": "aspect-[2/3]",
  "12x18 inches": "aspect-[2/3]",
  "12x18 in": "aspect-[2/3]",
  "200x300 mm (8x12 inch)": "aspect-[2/3]",

  // 400x600 (2:3 ratio)
  "400x600 mm (16x24 inch)": "aspect-[3/1.6]",

  // 300x600 variations (1:2 ratio)
  "(Sugar)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",

  "300x600 mm (11.8x23.6 inch)": "aspect-[5/2.5]",
  "Polishing Series 300x600 mm (12x24 inch)": "aspect-[5/2.5]",

  // Very narrow strips (1:10 to 1:24 ratio)
  "300x63 mm (12x2.5 inch)": "aspect-[4/1]",
  "12x2.5": "aspect-[6/1]",
  "48x600 mm (1.89x23.6 inch)": "aspect-[9/1]",
  "45x600 mm (1.77x23.6 inch)": "aspect-[9/1]",
  "40x600 mm (1.57x23.6 inch)": "aspect-[12/1]",
  "25x600 mm (0.98x23.6 inch)": "aspect-[12/1]",
  "20x600 mm (0.79x23.6 inch)": "aspect-[15/1]",
  "20x600": "aspect-[15/1]",
  "10x600 mm (0.39x23.6 inch)": "aspect-[20/1]",
  "10x600": "aspect-[15/1]",
  "20x1200 mm (0.79x47.2 inch)": "aspect-[12/1]",
  "12x600 mm (0.47x23.6 inch)": "aspect-[15/1]",
  "12x1200 mm (0.47x47.2 inch)": "aspect-[15/1]",
  "10x450 mm (0.39x17.7 inch)": "aspect-[15/1]",
  "24x4": "aspect-[5/1]",
  "24x2.5": "aspect-[8/1]",
  "24x2": "aspect-[10/1]",
  "24x1": "aspect-[15/1]",
  "24x3": "aspect-[8/1]",
  "2 Soot": "aspect-[15/1]",

  // 900x600 (3:2 ratio)
  "900x600 mm": "aspect-[3/2]",
  "900x600 mm (36x24 inch)": "aspect-[3/2]",

  // Mixed sizes
  "12x8, 18x12, 24x18, 2x2, 3x2, 4x2": "aspect-[4.5/3]",
  "8x12, 12x18, 18x24, 2x2, 2x3, 2x4": "aspect-[2/3]",

  // 24x24 and 600x600 (1:1 square)
  "24x24 inch": "aspect-square",
  "600x600 mm": "aspect-square",
  "600x600 mm (23.6x23.6 inch)": "aspect-square",
  "600x600 mm (24x24 inch)": "aspect-square",
  "2x2": "aspect-square",
  "6x6": "aspect-square",
  "4x4": "aspect-square",
  "8x12 inches": "aspect-square",

  // 600x900 (2:3 ratio)
  "600x900 mm": "aspect-[2/3]",
  "600x900 mm (24x36 inch)": "aspect-[2/3]",

  // 1200x600 (2:1 ratio)
  "1200x600 mm": "aspect-[2/1]",
  "1200x600 mm (48x24 inch)": "aspect-[2/1]",

  // 1200x1800 (2:3 ratio)
  "1200x1800 mm (48x72 inch)": "aspect-[2/3]",

  // 1200x1200 (1:1 square)
  "1200x1200 mm (48x48 inch)": "aspect-square",

  // 4x2 (2:1 ratio)
  "4x2 in": "aspect-[2/1]",
  "4x2": "aspect-[2/1]",

  // 2x4 (1:2 ratio)
  "2x4 in": "aspect-[1/2]",
  "2x4": "aspect-[1/2]",

  // 12x8 (3:2 ratio)
  "12x8 in": "aspect-[3/2]",
  "12x8": "aspect-[3/2]",
  "8x12 in": "aspect-[2/3]",
  "8x12": "aspect-[2/3]",

  // 6x36 variations (1:6 ratio)
  "(God)6x36": "aspect-[6/1]",
  "6x36 in (c)": "aspect-[6/1]",
  "6x36 ,9x36,12x36": "aspect-[3.8/1]",
  "6x36(w)": "aspect-[5/1]",
  "6x36": "aspect-[4.1/1]",
  "6x36 in": "aspect-[6/1]",
  "6x36 inch": "aspect-[6/1]",

  // 9x36 (1:4 ratio)
  "9x36": "aspect-[1/4]",

  // 8x6 (4:3 ratio)
  "8x6": "aspect-[4/6]",

  // 900x300 (3:1 ratio)
  "900x300 mm": "aspect-[3/1]",

  // 1200x300 (4:1 ratio)
  "1200x300 mm": "aspect-[4/1]",

  // 1000x300 (10:3 ratio)
  "1000x300 mm": "aspect-[10/3]",

  // 6x48 (1:8 ratio)
  "6x48": "aspect-[8/1]",

  // 4x48 (1:12 ratio)
  "4x48": "aspect-[11/1]",

  // 600x1200 (1:2 ratio)
  "600x1200 mm": "aspect-[1/2]",
  "600x1200 mm (24x48 inch)": "aspect-[1/2]",

  // 4x6 (2:3 ratio)
  "4x6": "aspect-[3/2]",

  // 3x2/24x18/2x2 (mixed, default 4:3)
  "3x2/24x18/2x2": "aspect-[4/3]",

  // 3x2 (3:2 ratio)
  "3x2": "aspect-[3/2]",

  // 6x8 (3:4 ratio)
  "6x8": "aspect-[3/4]",

  // 8x4 (2:1 ratio)
  "8x4": "aspect-[2/1]",

  // 6x3 (2:1 ratio)
  "6x3": "aspect-[2/1]",

  // 2x3 (2:3 ratio)
  "2x3": "aspect-[2/3]",

  // Default fallback
  default: "aspect-[4/3]",
};

/**
 * Mirror the COLUMN_SPAN_MAP (md/Tablet layout) for 24-column grid
 */
const COLUMN_SPAN_MD: Record<string, number> = {
  "600x1200 mm (24x48 inch)": 8,
  "1200x1800 mm (48x72 inch)": 12,
  "900x600 mm (36x24 inch)": 12,
  "900x600 mm": 12,
  "1200x600 mm (48x24 inch)": 12,
  "1200x600 mm": 12,
  "600x900 mm (24x36 inch)": 6,
  "300x63 mm (12x2.5 inch)": 12,
  "48x600 mm (1.89x23.6 inch)": 12,
  "45x600 mm (1.77x23.6 inch)": 12,
  "40x600 mm (1.57x23.6 inch)": 12,
  "25x600 mm (0.98x23.6 inch)": 12,
  "20x600 mm (0.79x23.6 inch)": 12,
  "10x600 mm (0.39x23.6 inch)": 12,
  "20x1200 mm (0.79x47.2 inch)": 12,
  "12x600 mm (0.47x23.6 inch)": 12,
  "12x1200 mm (0.47x47.2 inch)": 12,
  "10x450 mm (0.39x17.7 inch)": 12,
  "12x18/12x8": 6,
  "12x18 mm": 6,
  "12x18 inches": 6,
  "12x18 in": 6,
  "600x900 mm": 6,
  "24x24 inch": 8,
  "600x600 mm": 8,
  "600x600 mm (23.6x23.6 inch)": 8,
  "600x600 mm (24x24 inch)": 8,
  "2x2": 8,
  "6x6": 8,
  "4x4": 8,
  "1200x1200 mm (48x48 inch)": 12,
  "(God)6x36": 8,
  "6x36 in (c)": 12,
  "6x36 ,9x36,12x36": 12,
  "6x36(w)": 12,
  "6x36": 12,
  "6x36 in": 12,
  "6x36 inch": 12,
  "8x12 in": 6,
  "8x12": 6,
  "12x8 in": 8,
  "12x8": 8,
  "300x450 mm (11.8x17.7 inch)": 8,
  "900x300 mm": 8,
  "1200x300 mm": 8,
  "1000x300 mm": 8,
  "6x48": 12,
  "4x48": 12,
  "4x2": 6,
  "600x1200 mm": 8,
  "2x4": 8,
  "4x6": 8,
  "24x4": 12,
  "24x2.5": 12,
  "24x2": 12,
  "12x2.5": 8,
  "24x1": 12,
  "2x3": 6,
  "6x3": 8,
  "8x4": 8,
  "3x2/24x18/2x2": 8,
  "3x2": 8,
  "6x8": 6,
  "24x3": 12,
  "2 Soot": 12,
  "8x6": 8,
  "20x600": 12,
  "10x600": 12,
  "9x36": 8,
  default: 8,
};

const getMultiplierFromAspect = (aspect: string): number => {
  if (aspect === "aspect-square") return 1;
  const match = aspect.match(/aspect-\[(\d+\.?\d*)\/(\d+\.?\d*)\]/);
  if (match) return parseFloat(match[2]) / parseFloat(match[1]); 
  return 0.75; 
};

export function getGridDimensions(sizeString: string, subcategory?: string) {
  const colUnit = 7.5;
  const rowUnit = 2.0;

  if (subcategory === "Step & Riser") {
    const colSpan = 24;
    const rowSpan = 100;
    return { width: colSpan * colUnit - 2, height: rowSpan * rowUnit, colSpan };
  }
  
  if (subcategory === "Design Collection") {
    const colSpan = 12;
    const rowSpan = 18;
    return { width: colSpan * colUnit - 2, height: rowSpan * rowUnit, colSpan };
  }

  // --- 2. GALLERY-SYNC LOGIC FOR ALL OTHER SIZES ---
  const colSpan = COLUMN_SPAN_MD[sizeString] || COLUMN_SPAN_MD.default;
  const aspectClass = ASPECT_RATIO_MAP[sizeString] || ASPECT_RATIO_MAP.default;
  const ratioMultiplier = getMultiplierFromAspect(aspectClass);

  const width = (colSpan * colUnit) - 2;
  const height = width * ratioMultiplier;

  return { width, height, colSpan };
}