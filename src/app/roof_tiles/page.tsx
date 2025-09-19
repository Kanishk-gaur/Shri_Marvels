import Hero from "@/components/roofing-showcase/Hero";
import BrickShowcase from "@/components/roofing-showcase/BrickShowcase";
import TileShowcase from "@/components/roofing-showcase/TileShowcase";
import { roofingSections } from "@/data/roofing-data";
import { RoofingSection } from "@/components/roofing-showcase/types";

// Define the desired order of your sections by their unique ID.
// You can reorder, repeat, or remove IDs from this list to change the page layout.
const orderedSectionIds = [
  "orange-clay-tiles",
  "red-roof-tiles",
  "bumper-brick",
  "brown-roof-tiles",
  "mixed-tiles-1",
  "bumper-brick", 
  "placeholder-premium-clay",
];

// A helper function to find a section by its ID from the data file.
const getSectionById = (id: string): RoofingSection | undefined => {
  return roofingSections.find((section) => section.id === id);
};

export default function RoofingShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-16">
      <Hero />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {orderedSectionIds.map((id, index) => {
          const section = getSectionById(id);

          // If a section with the given ID isn't found, we'll render nothing.
          if (!section) {
            console.warn(`Section with ID "${id}" not found.`);
            return null;
          }

          return (
            <div key={`${id}-${index}`} className="mb-8">
              {section.type === "brick-showcase" ? (
                <BrickShowcase section={section} />
              ) : section.type === "tile-showcase" ? (
                <TileShowcase section={section} sectionIndex={index} />
              ) : null}
            </div>
          );
        })}
      </main>
      {/* Note: The Footer component was missing from the original page code. You might want to add it back. */}
      {/* <Footer /> */}
    </div>
  );
}
