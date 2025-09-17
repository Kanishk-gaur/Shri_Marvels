interface Product {
  name: string;
  image: string;
  size: string;
  weight: string;
  require: string;
  colour: string;
}

interface Tile {
  image: string;
  label: string;
  size?: string;
  weight?: string;
  color?: string;
  coverage?: string;
}

interface BrickShowcaseSection {
  type: "brick-showcase";
  product: Product;
  lifestyle: string;
}

interface TilesOnlySection {
  type: "tiles-only";
  tiles: Tile[];
}

interface HouseWithTilesSection {
  type: "house-with-tiles";
  house: string;
  tiles: Tile[];
}

type RoofingSection = BrickShowcaseSection | TilesOnlySection | HouseWithTilesSection;

export default function RoofingShowcase() {
  const roofingSections: RoofingSection[] = [
    {
      type: "brick-showcase",
      product: {
        name: "Bumper",
        image: "/terracotta-brick-sample.jpg",
        size: "5 x 2.5 inch",
        weight: "200 Gms.",
        require: "800 Pcs to Cover 100 Sq. Ft.",
        colour: "Natural Terracotta",
      },
      lifestyle: "/modern-interior-with-brick-wall.jpg",
    },
    // Top tile showcase row
    {
      type: "tiles-only",
      tiles: [
        {
          image: "/orange-clay-roof-tile.jpg",
          label: "Clay Tile",
          size: "420 x 330mm",
          weight: "2.8kg",
          color: "Terracotta Orange",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/red-terracotta-roof-tile.jpg",
          label: "Terracotta",
          size: "400 x 240mm",
          weight: "2.2kg",
          color: "Natural Red",
          coverage: "12.8 tiles/m²",
        },
        {
          image: "/brown-concrete-roof-tile.jpg",
          label: "Concrete",
          size: "420 x 330mm",
          weight: "4.2kg",
          color: "Chocolate Brown",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/dark-slate-roof-tile.jpg",
          label: "Slate",
          size: "600 x 300mm",
          weight: "3.5kg",
          color: "Welsh Grey",
          coverage: "8.2 tiles/m²",
        },
      ],
    },
    // House sections with tiles
    {
      type: "house-with-tiles",
      house: "/modern-single-story-house-with-orange-clay-tile-ro.jpg",
      tiles: [
        {
          image: "/orange-clay-roof-tile-sample.jpg",
          label: "Orange Clay",
          size: "420 x 330mm",
          weight: "2.8kg",
          color: "Sunset Orange",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/red-clay-roof-tile-sample.jpg",
          label: "Red Clay",
          size: "420 x 330mm",
          weight: "2.9kg",
          color: "Rustic Red",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/terracotta-roof-tile-sample.jpg",
          label: "Terracotta",
          size: "400 x 240mm",
          weight: "2.2kg",
          color: "Mediterranean",
          coverage: "12.8 tiles/m²",
        },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/contemporary-white-house-with-red-tile-roof.jpg",
      tiles: [
        {
          image: "/bright-red-roof-tile.jpg",
          label: "Bright Red",
          size: "420 x 330mm",
          weight: "2.7kg",
          color: "Cardinal Red",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/burgundy-roof-tile.jpg",
          label: "Burgundy",
          size: "420 x 330mm",
          weight: "2.8kg",
          color: "Wine Red",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/dark-red-roof-tile.jpg",
          label: "Dark Red",
          size: "420 x 330mm",
          weight: "2.9kg",
          color: "Mahogany Red",
          coverage: "10.5 tiles/m²",
        },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/traditional-house-with-brown-roof-tiles.jpg",
      tiles: [
        {
          image: "/brown-concrete-tile.jpg",
          label: "Brown",
          size: "420 x 330mm",
          weight: "4.1kg",
          color: "Chestnut Brown",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/chocolate-brown-tile.jpg",
          label: "Chocolate",
          size: "420 x 330mm",
          weight: "4.2kg",
          color: "Dark Chocolate",
          coverage: "10.5 tiles/m²",
        },
        {
          image: "/dark-brown-tile.jpg",
          label: "Dark Brown",
          size: "420 x 330mm",
          weight: "4.3kg",
          color: "Espresso Brown",
          coverage: "10.5 tiles/m²",
        },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Orange" },
        { image: "/placeholder.svg?height=80&width=80", label: "Coral" },
        { image: "/placeholder.svg?height=80&width=80", label: "Salmon" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Premium Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Rustic Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Antique Red" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Bright Orange" },
        { image: "/placeholder.svg?height=80&width=80", label: "Burnt Orange" },
        { image: "/placeholder.svg?height=80&width=80", label: "Deep Orange" },
      ],
    },
    // Three tiles section
    {
      type: "tiles-only",
      tiles: [
        { image: "/placeholder.svg?height=120&width=160", label: "Premium Clay" },
        { image: "/placeholder.svg?height=120&width=160", label: "Rustic Terra" },
        { image: "/placeholder.svg?height=120&width=160", label: "Classic Red" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Villa Terra" },
        { image: "/placeholder.svg?height=80&width=80", label: "Mediterranean" },
        { image: "/placeholder.svg?height=80&width=80", label: "Spanish" },
        { image: "/placeholder.svg?height=80&width=80", label: "Tuscan" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Family Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Classic" },
        { image: "/placeholder.svg?height=80&width=80", label: "Traditional" },
        { image: "/placeholder.svg?height=80&width=80", label: "Heritage" },
      ],
    },
    // Colorful tiles section
    {
      type: "tiles-only",
      tiles: [
        { image: "/placeholder.svg?height=120&width=160", label: "Green" },
        { image: "/placeholder.svg?height=120&width=160", label: "Blue" },
        { image: "/placeholder.svg?height=120&width=160", label: "Yellow" },
        { image: "/placeholder.svg?height=120&width=160", label: "Purple" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Natural Wood" },
        { image: "/placeholder.svg?height=80&width=80", label: "Cedar Shake" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Cottage Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Country" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Dark Slate" },
        { image: "/placeholder.svg?height=80&width=80", label: "Grey Slate" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Luxury Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Premium Orange" },
        { image: "/placeholder.svg?height=80&width=80", label: "Elite Terra" },
      ],
    },
    // Final tiles section
    {
      type: "tiles-only",
      tiles: [
        { image: "/placeholder.svg?height=120&width=160", label: "Premium Red" },
        { image: "/placeholder.svg?height=120&width=160", label: "Luxury Orange" },
        { image: "/placeholder.svg?height=120&width=160", label: "Elite Brown" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Designer Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Executive" },
        { image: "/placeholder.svg?height=80&width=80", label: "Signature" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Modern Red" },
        { image: "/placeholder.svg?height=80&width=80", label: "Contemporary" },
      ],
    },
    {
      type: "house-with-tiles",
      house: "/placeholder.svg?height=300&width=500",
      tiles: [
        { image: "/placeholder.svg?height=80&width=80", label: "Classic Orange" },
        { image: "/placeholder.svg?height=80&width=80", label: "Traditional" },
        { image: "/placeholder.svg?height=80&width=80", label: "Heritage" },
      ],
    },
    // More sections continue...
    {
      type: "tiles-only",
      tiles: [
        { image: "/placeholder.svg?height=120&width=160", label: "Artisan Red" },
        { image: "/placeholder.svg?height=120&width=160", label: "Handcrafted" },
        { image: "/placeholder.svg?height=120&width=160", label: "Custom Orange" },
        { image: "/placeholder.svg?height=120&width=160", label: "Bespoke" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <div>
                {/* <h1 className="text-xl font-bold tracking-tight">PREMIUM ROOFING</h1> */}
                <p className="text-xs text-slate-300">Professional Tile Solutions</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-slate-700"
              >
                Products
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-slate-700"
              >
                Gallery
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-slate-700"
              >
                Specifications
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-slate-700"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance">Premium Roofing Solutions</h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-pretty">
            Discover our comprehensive collection of high-quality roof tiles with detailed specifications for every
            architectural style
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {roofingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            {section.type === "brick-showcase" ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-8">
                  {/* Product specifications card */}
                  <div className="flex-shrink-0 w-80">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{section.product.name}</h3>

                      {/* Product image */}
                      <div className="mb-6 flex justify-center">
                        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 shadow-md">
                          <img
                            src={section.product.image || "/placeholder.svg"}
                            alt={section.product.name}
                            className="w-48 h-32 object-cover"
                          />
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <span className="text-lg font-semibold text-gray-700">Size : </span>
                          <span className="text-lg text-gray-900 font-medium">{section.product.size}</span>
                        </div>

                        <div className="text-center">
                          <span className="text-lg font-semibold text-gray-700">Weight : </span>
                          <span className="text-lg text-gray-900 font-medium">{section.product.weight}</span>
                        </div>

                        <div className="text-center">
                          <span className="text-lg font-semibold text-gray-700">Require : </span>
                          <span className="text-lg text-gray-900 font-medium">{section.product.require}</span>
                        </div>

                        <div className="text-center">
                          <span className="text-lg font-semibold text-gray-700">Colour : </span>
                          <span className="text-lg text-gray-900 font-medium">{section.product.colour}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lifestyle image */}
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                      <img
                        src={section.lifestyle || "/placeholder.svg"}
                        alt={`${section.product.name} lifestyle application`}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <span className="text-sm font-semibold text-gray-800">Interior Application</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : section.type === "tiles-only" ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex justify-center gap-8 flex-wrap">
                  {section.tiles.map((tile, tileIndex) => (
                    <div key={tileIndex} className="text-center max-w-[220px] group">
                      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 mb-4 group-hover:border-orange-400 transition-all duration-300 group-hover:shadow-lg">
                        <img
                          src={tile.image || "/placeholder.svg"}
                          alt={tile.label}
                          className="w-48 h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {tile.label}
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Size:</span>
                            <span className="text-gray-600">{tile.size || "420 x 330mm"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Weight:</span>
                            <span className="text-gray-600">{tile.weight || "2.8kg"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Color:</span>
                            <span className="text-gray-600">{tile.color || "Natural"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold text-gray-700">Coverage:</span>
                            <span className="text-gray-600">{tile.coverage || "10.5 tiles/m²"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : section.type === "house-with-tiles" ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-10">
                  {/* House image */}
                  <div className="flex-shrink-0">
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-md">
                      <img
                        src={section.house || "/placeholder.svg"}
                        alt={`House example ${sectionIndex}`}
                        className="w-[420px] h-[280px] object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-semibold text-gray-800">Style #{sectionIndex + 1}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tile options */}
                  <div className="flex flex-col gap-4 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Available Tile Options</h3>
                    {section.tiles.map((tile, tileIndex) => (
                      <div
                        key={tileIndex}
                        className="flex items-center gap-5 p-4 border border-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-200 transition-all duration-300 group"
                      >
                        <div className="relative overflow-hidden rounded-lg border border-gray-200 group-hover:border-orange-300 transition-colors">
                          <img
                            src={tile.image || "/placeholder.svg"}
                            alt={tile.label}
                            className="w-24 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                            {tile.label}
                          </h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-700">Size:</span>
                              <span className="text-sm text-gray-600 font-mono">{tile.size || "420 x 330mm"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-700">Weight:</span>
                              <span className="text-sm text-gray-600 font-mono">{tile.weight || "2.8kg"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-700">Color:</span>
                              <span className="text-sm text-gray-600">{tile.color || "Natural"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-700">Coverage:</span>
                              <span className="text-sm text-gray-600 font-mono">
                                {tile.coverage || "10.5 tiles/m²"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </main>

    </div>
  )
}