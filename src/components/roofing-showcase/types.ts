export interface Tile {
  image: string;
  label: string;
  size?: string;
  weight?: string;
  color?: string;
  coverage?: string;
}

export interface Product {
  name: string;
  image: string;
  size: string;
  weight: string;
  require: string;
  colour: string;
}

export interface BrickShowcaseSection {
  id: string;
  type: "brick-showcase";
  product: Product;
  lifestyle: string;
}

export interface TileShowcaseSection {
  id: string;
  type: "tile-showcase";
  house: string;
  tiles: Tile[];
}

export type RoofingSection = BrickShowcaseSection | TileShowcaseSection;
