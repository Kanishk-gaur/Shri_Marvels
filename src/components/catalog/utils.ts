// src/components/catalog/utils.ts

export const sizeDisplayNames: Record<string, string> = { 
  "600x900 mm (24x36 inch)": "2x3",
  "900x600 mm (36x24 inch)": "3x2",
  "200x300 mm (8x12 inch)": "8x12,12x18",
  "300x200 mm (12x8 inch)": "12x8,18x12",
  "600x1200 mm": "2x4",
  "200x300 mm": "8x12,12x18",
  "300x200 mm": "12x8,18x12",
  "600x600 mm (23.6x23.6 inch)": "2x2",
  "600x600 mm": "2x2",
  "600x900 mm": "2x3",
  "900x600 mm": "3x2",
  "1200x600 mm": "4x2",
  "600x1200 mm (24x48 inch)": "2x4",
  "1200x600 mm (48x24 inch)": "4x2",
  "1200x1200 mm (48x48 inch)": "4x4",
  "18x12 inch": "18x12, 3x2, 4x2",
  "24x24 inch": "2x2",
  "8x6": "6x8",
  "8x12 in": "8x12",
  "12x18 inches": "12x18",
  "12x8 in": "12x8",
  "8x12": "8x12, 6x6, 12x18",
  "8x12 inches": "2x2",
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
  "300x63 mm (12x2.5 inch)": "12x2.5",
  "4x48": "48x4",
  "6x48": "48x6",
  "300x600 mm (11.8x23.6 inch)": "24x12",
  "300x450 mm (11.8x17.7 inch)": "18x12",
  "(Sugar)300x600 mm (11.8x23.6 inch)": "(Sugar)24x12",
  "(GLUE)300x600 mm (11.8x23.6 inch)": "(GLUE)24x12",
  "Polishing Series 300x600 mm (12x24 inch)": "Polishing Series 24x12",
  "4x6": "6x4",
  "400x600 mm (16x24 inch)": "6x4",
  "600x600 mm (24x24 inch)": "2x2",
  "6x36(w)": "6x36 ,9x36,12x36",
  "(God)6x36": "(God)6x36 ,9x36 ,12x36",
  "6x36 in (c)": "6x36",
  "6x36 in": "2 Soot",
  "6x36": "6x36 ,9x36,12x36",
};

export const getSizeDisplayName = (rawSize: string): string => sizeDisplayNames[rawSize] || rawSize;

export const getGridSpanClass = (sizeString: string) => {
  switch (sizeString) {
    case "8x12, 12x18, 18x24, 2x2, 2x3, 2x4" : return  "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-37"; 
    case "(POLISHED)12x24": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-11";
    case "18x12/8x12": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
    case "12x18/12x8": return "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
    case "400x600 mm (16x24 inch)": return "col-span-12 row-span-8 md:col-span-3 md:row-span-6 lg:col-span-8 lg:row-span-18";
    case "(LUSTER)12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "(SUGAR)12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "(Sugar)300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "(GLUE)300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "300x63 mm (12x2.5 inch)": return "col-span-24 row-span-26 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-8";
    case "Polishing Series 300x600 mm (12x24 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "600x1200 mm (24x48 inch)": return "col-span-12 row-span-25 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-32";
    case "300x600 mm (11.8x23.6 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-14";
    case "300x450 mm (11.8x17.7 inch)": return "col-span-12 row-span-10 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-16";
    case "48x600 mm (1.89x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "45x600 mm (1.77x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "40x600 mm (1.57x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "25x600 mm (0.98x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-6";
    case "20x600 mm (0.79x23.6 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "10x600 mm (0.39x23.6 inch)": return "col-span-24 row-span-4 md:col-span-2 md:row-span-12 lg:col-span-8 lg:row-span-4";
    case "900x600 mm": return "col-span-24 row-span-18 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-23";
    case "900x600 mm (36x24 inch)": return "col-span-24 row-span-18 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-23";
    case "24x24 inch": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x600 mm": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x600 mm (23.6x23.6 inch)": return "col-span-12 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "600x900 mm": return "col-span-12 row-span-20 md:col-span-8 md:row-span-12 lg:col-span-4 lg:row-span-25";
    case "600x900 mm (24x36 inch)": return "col-span-12 row-span-19 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-36";
    case "1200x600 mm": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-18";
    case "1200x600 mm (48x24 inch)": return "col-span-12 row-span-8 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-18";
    case "20x1200 mm (0.79x47.2 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-7";
    case "12x600 mm (0.47x23.6 inch)": return "col-span-24 row-span-4 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-4";
    case "12x1200 mm (0.47x47.2 inch)": return "col-span-24 row-span-5 md:col-span-8 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "10x450 mm (0.39x17.7 inch)": return "col-span-24 row-span-5 md:col-span-2 md:row-span-12 lg:col-span-8 lg:row-span-5";
    case "1200x1800 mm (48x72 inch)": return "col-span-12 row-span-11 md:col-span-8 md:row-span-12 lg:col-span-12 lg:row-span-34";
    case "600x600 mm (24x24 inch)": return "col-span-12 row-span-13 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "1200x1200 mm (48x48 inch)": return "col-span-12 row-span-13 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-25";
    case "4x2 in": return "col-span-24 row-span-14 md:col-span-8 md:row-span-12 lg:col-span-6 lg:row-span-15";
    case "2x4 in": return "col-span-12 row-span-8 md:col-span-13 md:row-span-10 lg:col-span-6 lg:row-span-15";
    case "12x8 in": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-12";
    case "(God)6x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-12";
    case "6x36 in (c)": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-10";
    case "6x36 ,9x36,12x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-15";
    case "6x36(w)": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-11";
    case "9x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-8 lg:row-span-10";
    case "6x36": return "col-span-12 row-span-8 md:col-span-4 md:row-span-10 lg:col-span-12 lg:row-span-14";
    case "6x36 in": return "col-span-12 row-span-6 md:col-span-8 md:row-span-6 lg:col-span-8 lg:row-span-7";
    case "18x12 inch": return "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-12";
    case "12x18 mm": return "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
    case "12x18 inches": return "col-span-8 row-span-14 md:col-span-4 md:row-span-15 lg:col-span-3 lg:row-span-20";
    case "12x18 in": return "col-span-6 row-span-11 md:col-span-4 md:row-span-13 lg:col-span-3 lg:row-span-20";
    case "8x12 in": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-19";
    case "12x18": return "col-span-12 row-span-10 md:col-span-4 md:row-9 lg:col-span-4 lg:row-span-13";
    case "8x6": return "col-span-4 row-span-7 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "20x600": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-6";
    case "10x600": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-8 lg:row-span-5";
    case "900x300 mm": return "col-span-12 row-span-9 md:col-span-6 md:row-span-9 lg:col-span-4 lg:row-span-12";
    case "1200x300 mm": return "col-span-12 row-span-10 md:col-span-6 md:row-span-9 lg:col-span-6 lg:row-span-12";
    case "1000x300 mm": return "col-span-12 row-span-9 md:col-span-6 md:row-span-8 lg:col-span-6 lg:row-span-17";
    case "6x48": return "col-span-12 row-span-4 md:col-span-6 md:row-span-6 lg:col-span-12 lg:row-span-7";
    case "4x48": return "col-span-12 row-span-4 md:col-span-8 md:row-span-5 lg:col-span-12 lg:row-span-6";
    case "4x2": return "col-span-6 row-span-13 md:col-span-4 md:row-span-20 lg:col-span-4 lg:row-span-33";
    case "600x1200 mm": return "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
    case "2x4": return "col-span-12 row-span-25 md:col-span-6 md:row-span-28 lg:col-span-4 lg:row-span-33";
    case "4x6": return "col-span-12 row-span-10 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "4x4": return "col-span-12 row-span-15 md:col-span-6 md:row-span-16 lg:col-span-6 lg:row-span-26";
    case "12x24": return "col-span-12 row-span-9 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-11";
    case "24x4": return "col-span-24 row-span-5 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-6";
    case "24x2.5": return "col-span-24 row-span-5 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-5";
    case "24x2": return "col-span-24 row-span-5 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-5";
    case "12x2.5": return "col-span-12 row-span-6 md:col-span-6 md:row-span-6 lg:col-span-6 lg:row-span-8";
    case "24x1": return "col-span-24 row-span-4 md:col-span-6 md:row-span-5 lg:col-span-6 lg:row-span-4";
    case "6x6": return "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
    case "8x12 inches": return "col-span-12 row-span-14 md:col-span-4 md:row-span-11 lg:col-span-6 lg:row-span-24";
    case "8x12": return "col-span-6 row-span-11 md:col-span-4 md:row-span-16 lg:col-span-3 lg:row-span-20";
    case "12x8": return "col-span-12 row-span-11 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-13";
    case "18x12": return "col-span-8 row-span-8 md:col-span-6 md:row-span-12 lg:col-span-4 lg:row-span-14";
    case "2x2": return "col-span-8 row-span-11 md:col-span-4 md:row-span-12 lg:col-span-4 lg:row-span-18";
    case "200x300 mm (8x12 inch)": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "2x3": return "col-span-6 row-span-10 md:col-span-4 md:row-span-16 lg:col-span-4 lg:row-span-25";
    case "6x3": return "col-span-12 row-span-10 md:col-span-4 md:row-span-10 lg:col-span-3 lg:row-span-12";
    case "8x4": return "col-span-12 row-span-10 md:col-span-3 md:row-span-10 lg:col-span-2 lg:row-span-12";
    case "300x200 mm (12x8 inch)": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "3x2": return "col-span-8 row-span-7 md:col-span-6 md:row-span-12 lg:col-span-6 lg:row-span-17";
    case "6x8": return "col-span-12 row-span-10 md:col-span-4 md:row-span-12 lg:col-span-3 lg:row-span-16";
    case "24x3": return "col-span-12 row-span-4 md:col-span-6 md:row-span-4 lg:col-span-6 lg:row-span-6";
    default: return "col-span-12 row-span-9 md:col-span-4 md:row-span-11 lg:col-span-3 lg:row-span-16";
  }
};