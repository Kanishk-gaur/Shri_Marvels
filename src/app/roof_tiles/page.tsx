
import Hero from "@/components/roofing-showcase/Hero";
import BrickShowcase from "@/components/roofing-showcase/BrickShowcase";
import TilesOnlyShowcase from "@/components/roofing-showcase/TilesOnlyShowcase";
import HouseWithTilesShowcase from "@/components/roofing-showcase/HouseWithTilesShowcase";
import Footer from "@/components/roofing-showcase/Footer";
import { roofingSections } from "@/data/roofing-data";

export default function RoofingShowcase() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 pt-16">      
      <Hero />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {roofingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {section.type === "brick-showcase" ? (
              <BrickShowcase section={section} />
            ) : section.type === "tiles-only" ? (
              <TilesOnlyShowcase section={section} />
            ) : section.type === "house-with-tiles" ? (
              <HouseWithTilesShowcase section={section} sectionIndex={sectionIndex} />
            ) : null}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}