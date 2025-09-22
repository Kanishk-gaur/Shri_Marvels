import React from 'react';

// --- SVG Icons (with TypeScript types) ---

const WaterResistantIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
    <path d="M8 20v0" />
    <path d="M12 20v0" />
    <path d="M16 20v0" />
  </svg>
);

const DurabilityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18" />
    <path d="M5 21V7l4-4h6l4 4v14" />
    <path d="M12 21v-4" />
    <path d="M12 11V3" />
    <path d="M12 17H5" />
    <path d="M12 17h7" />
    <path d="M5 11h14" />
  </svg>
);

const ExteriorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12h18" />
    <path d="M4 17.5A7.5 7.5 0 0 1 12 10a7.5 7.5 0 0 1 8 7.5" />
    <path d="M6 15A3.5 3.5 0 0 1 12 11.5a3.5 3.5 0 0 1 6 3.5" />
  </svg>
);

const ThermalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 12a4 4 0 0 0-4-4" />
    <path d="M12 8V4" />
    <path d="M12 16v4" />
    <path d="M16 12h4" />
    <path d="M8 12H4" />
    <path d="M15 15l3.5 3.5" />
    <path d="M5.5 5.5 9 9" />
    <path d="M4 20h12" />
    <path d="M17 20h2" />
    <path d="M19 16h2" />
    <path d="M17 16v-4" />
  </svg>
);

// --- Background Roof Outline SVG ---

const RoofOutline = () => (
  <svg
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full max-w-5xl h-auto text-gray-700/50 z-0"
    viewBox="0 0 800 400"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 380 L800 380 L800 280 L0 280 Z" stroke="currentColor" strokeWidth="2" />
    <path d="M400 280 L400 380" stroke="currentColor" strokeWidth="2" />
    <path d="M100 280 L250 130 L550 130 L700 280" stroke="currentColor" strokeWidth="2" />
    <path d="M250 130 L400 30" stroke="currentColor" strokeWidth="2" />
    <path d="M420 45 L550 130" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// --- Main Hero Component ---

export default function Hero() {
  const features = [
    {
      icon: WaterResistantIcon,
      title: "Water-resistant Material.",
      description: "Terracotta products are resistant to waterlogging, heavy rainfall, and moisture, preventing damage and ensuring longevity."
    },
    {
      icon: DurabilityIcon,
      title: "Durability",
      description: "Terracotta is durable and resists weather, staining, and corrosion."
    },
    {
      icon: ExteriorIcon,
      title: "Breath-taking Exterior",
      description: "Terracotta products offer an awe-inspiring exterior, combining natural beauty with durable and sustainable solutions."
    },
    {
      icon: ThermalIcon,
      title: "Thermal Regulation.",
      description: "Terracotta's thermal mass provides efficient temperature control, reducing energy costs and creating a comfortable living or working environment."
    }
  ];

  return (
    <section className="relative bg-[#333333] w-full pb-48 pt-24">
      {/* Background container for the main title and outline */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <RoofOutline />
        <h1 className="text-7xl md:text-8xl font-bold text-white z-10">
          Roofing
        </h1>
      </div>

      {/* Overlapping Features Card */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-20">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-gray-500 mb-4" />
                <h3 className="font-bold text-lg text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}