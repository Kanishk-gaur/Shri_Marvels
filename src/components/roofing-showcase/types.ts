export interface Product {
  name: string;
  image: string;
  size: string;
  weight: string;
  require: string;
  colour: string;
}

export interface Tile {
  image: string;
  label: string;
  size?: string;
  weight?: string;
  color?: string;
  coverage?: string;
}

export interface BrickShowcaseSection {
  type: "brick-showcase";
  product: Product;
  lifestyle: string;
}

export interface TilesOnlySection {
  type: "tiles-only";
  tiles: Tile[];
}

export interface HouseWithTilesSection {
  type: "house-with-tiles";
  house: string;
  tiles: Tile[];
}

export type RoofingSection = BrickShowcaseSection | TilesOnlySection | HouseWithTilesSection;