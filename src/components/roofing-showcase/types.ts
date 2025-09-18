export interface Tile {
  image?: string;
  label: string;
  size?: string;
  weight?: string;
  color?: string;
  coverage?: string;
}

export interface Brick {
  name: string;
  image: string;
  size: string;
  weight: string;
  require: string;
  colour: string;
}

export interface BrickShowcaseSection {
  type: "brick-showcase";
  product: Brick;
  lifestyle: string;
}

export interface TileShowcaseSection {
  type: "tile-showcase";
  house: string; // House image is now required
  tiles: Tile[];
}

export type RoofingSection = BrickShowcaseSection | TileShowcaseSection;