import Hero from "@/components/roofing-showcase/Hero";
import BrickShowcase from "@/components/roofing-showcase/BrickShowcase";
import TileShowcase from "@/components/roofing-showcase/TileShowcase";
import { roofingSections } from "@/data/roofing-data";
import { RoofingSection } from "@/components/roofing-showcase/types";

// Define the desired order of your sections by their unique ID.
// You can reorder, repeat, or remove IDs from this list to change the page layout.
const orderedSectionIds = [
  "mixed-tiles-1",
  "mixed-tiles-2",
  "bumper-brick-1",
  "bumper-brick-2",
  "bumper-brick-3",
  "bumper-brick-4",
  "bumper-brick-5",
  "bumper-brick-6",
  "mixed-tiles-3",
  "mixed-tiles-4",
  "mixed-tiles-5",
  "mixed-tiles-6",
  "bumper-brick-7",
  "bumper-brick-8",
  "bumper-brick-9",
  "bumper-brick-10",
  "mixed-tiles-7",
  "mixed-tiles-8",
  "bumper-brick-11",
  "bumper-brick-12",
  "bumper-brick-13",
  "bumper-brick-14",
  "mixed-tiles-9",
  "bumper-brick-15",
  "bumper-brick-16",
  "bumper-brick-17",
  "bumper-brick-18",
];
// A helper function to find a section by its ID from the data file.
const getSectionById = (id: string): RoofingSection | undefined => {
  return roofingSections.find((section) => section.id === id);
};


export default function PageLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-16">
      <Hero />
      {/* Add mt-48 here to create space for the Hero component's overlapping card.
        This pushes the main content down by 12rem (192px).
      */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 md:py-8 mt-48">
        {orderedSectionIds.map((id, index) => {
          const section = getSectionById(id);

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
      {/* <Footer /> */}
    </div>
  );
}