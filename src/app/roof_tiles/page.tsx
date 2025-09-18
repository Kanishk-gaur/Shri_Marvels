import Hero from "@/components/roofing-showcase/Hero";
import BrickShowcase from "@/components/roofing-showcase/BrickShowcase";
import TileShowcase from "@/components/roofing-showcase/TileShowcase"; // New import
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
            ) : section.type === "tile-showcase" ? (
              <TileShowcase section={section} sectionIndex={sectionIndex} />
            ) : null}
          </div>
        ))}
      </main>
    </div>
  );
}