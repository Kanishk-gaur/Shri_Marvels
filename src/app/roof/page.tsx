"use client"

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Cover Page Hero Section */}
      <section
        style={{ background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)" }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8"
      >
        {/* Red Abstract Shape - positioned behind */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
            borderRadius: "50%",
            opacity: 0.15,
            transform: "translate(0, -50%)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            {/* Main Heading with Tagline */}
            <div className="flex flex-col gap-4">
              <h1
                style={{
                  fontSize: "clamp(32px, 8vw, 64px)",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  color: "#1a1a1a",
                  letterSpacing: "-1px",
                }}
              >
                FULL BODY
                <br />
                STEP & RISER
              </h1>

              {/* Tagline */}
              <div
                style={{
                  fontSize: "14px",
                  letterSpacing: "2px",
                  color: "#666",
                  textTransform: "uppercase",
                  fontWeight: "500",
                }}
              >
                Elegantly Fresh Designs
              </div>
            </div>

            {/* Subheading */}
            <p
              style={{
                fontSize: "18px",
                color: "#444",
                lineHeight: "1.6",
                maxWidth: "400px",
              }}
            >
              MAKE YOUR DREAM HOME
            </p>

            {/* Product Update Badge */}
            <div
              style={{
                display: "inline-block",
                background: "#1a1a1a",
                color: "white",
                padding: "10px 20px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1px",
                width: "fit-content",
              }}
            >
              PRODUCT UPDATE 2023
            </div>
          </div>

          {/* Right Visual - Textured Block and Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            {/* Textured Grey Block */}
            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "200px",
                background: "repeating-linear-gradient(45deg, #d0d0d0 0px, #d0d0d0 10px, #c0c0c0 10px, #c0c0c0 20px)",
                top: "10%",
                left: "0%",
                zIndex: 5,
              }}
            />

            {/* Stair Image Placeholder */}
            <div
              style={{
                width: "280px",
                height: "320px",
                background: "linear-gradient(135deg, #888 0%, #666 100%)",
                borderRadius: "8px",
                position: "relative",
                zIndex: 8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src="/ceramic-stairs-gray-tiles-modern-interior.jpg"
                alt="KP Ceramic Steps and Risers"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Grid */}
      <section style={{ background: "#ffffff" }} className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* HL-JET GREY */}
          <ProductShowcase
            title="HL-JET GREY"
            sizes="300X1200 / 200X1200MM"
            finish="MATT FINISH"
            color="#888888"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={false}
          />

          {/* HL-CREAM */}
          <ProductShowcase
            title="HL-CREAM"
            sizes="300X1200 / 200X1200MM"
            finish="MATT FINISH"
            color="#e8dcc8"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={true}
          />

          {/* HL-CHOCO */}
          <ProductShowcase
            title="HL-CHOCO"
            sizes="300X1200 / 200X1200MM"
            finish="MATT FINISH"
            color="#6b4423"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={false}
          />

          {/* HL-BROWN */}
          <ProductShowcase
            title="HL-BROWN"
            sizes="600X1200 / 300X1200MM"
            finish="MATT FINISH"
            color="#8b6f47"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={true}
          />

          {/* HL-NATURAL */}
          <ProductShowcase
            title="HL-NATURAL"
            sizes="300X1200 / 200X1200MM"
            finish="MATT FINISH"
            color="#c9b8a3"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={false}
          />

          {/* HL-BEIGE */}
          <ProductShowcase
            title="HL-BEIGE"
            sizes="300X1200 / 200X1200MM"
            finish="MATT FINISH"
            color="#d4c4b0"
            image="/ceramic-stairs-gray-tiles-modern-interior.jpg"
            isReversed={true}
          />
        </div>
      </section>

      {/* Product Details Section */}
      <section style={{ background: "#f9f9f9" }} className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "16px",
            }}
          >
            Product Specifications
          </h2>

          <div className="overflow-x-auto">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ background: "#1a1a1a", color: "white" }}>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>SIZE</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>PRODUCT NAME</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>COVERAGE</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>PACKING</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>WEIGHT</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px" }}>300 X 1200</td>
                  <td style={{ padding: "12px" }}>ONE STEP BOX</td>
                  <td style={{ padding: "12px" }}>11.61 SQFT</td>
                  <td style={{ padding: "12px" }}>3 PCS.</td>
                  <td style={{ padding: "12px" }}>25.5 KG</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px" }}>200 X 1200</td>
                  <td style={{ padding: "12px" }}>ONE RISER BOX</td>
                  <td style={{ padding: "12px" }}>7.74 SQFT</td>
                  <td style={{ padding: "12px" }}>3 PCS.</td>
                  <td style={{ padding: "12px" }}>16.5 KG</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px" }}>600 X 1200</td>
                  <td style={{ padding: "12px" }}>ONE STEP BOX</td>
                  <td style={{ padding: "12px" }}>23.23 SQFT</td>
                  <td style={{ padding: "12px" }}>3 PCS.</td>
                  <td style={{ padding: "12px" }}>60 KG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1a1a1a", color: "white" }} className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#ccc", marginBottom: "16px" }}>
              MAKE YOUR DREAM HOME
            </p>
            <p style={{ fontSize: "12px", color: "#888" }}>
              Elegantly fresh designs in ceramic steps and risers for modern homes.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "12px", textTransform: "uppercase" }}>
              Contact Us
            </h3>
            <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#ccc" }}>
              <p>C/o. Shital Pottary, 8-A N.H.</p>
              <p>Nr. Sartanpar Road, At. Makansar,</p>
              <p>Morbi (Guj.) INDIA-363 642.</p>
              <p style={{ marginTop: "12px" }}>
                <strong>Email:</strong> kpceramics5678@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +91-078200 02222
              </p>
              <p>+91-84900 05678 / +91-98258 72208</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #333",
            marginTop: "24px",
            paddingTop: "16px",
            textAlign: "center",
            fontSize: "12px",
            color: "#888",
          }}
        >
          © 2023 All rights reserved. | Elegantly Fresh Designs
        </div>
      </footer>
    </div>
  )
}

function ProductShowcase({
  title,
  sizes,
  finish,
  color,
  image,
  isReversed,
}: {
  title: string
  sizes: string
  finish: string
  color: string
  image: string
  isReversed: boolean
}) {
  const contentOrder = isReversed ? "order-2 md:order-2" : "order-2 md:order-1"
  const imageOrder = isReversed ? "order-1 md:order-1" : "order-1 md:order-2"

  const tileSizes = sizes.split(" / ").map((s) => s.trim())

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-32">
      {/* Image Section */}
      <div className={imageOrder}>
        <div
          style={{
            width: "100%",
            height: "400px",
            background: "linear-gradient(135deg, #999 0%, #777 100%)",
            borderRadius: "12px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`${title} installed in stairs`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className={contentOrder}>
        {/* Product Title */}
        <h2
          style={{
            fontSize: "clamp(24px, 5vw, 42px)",
            fontWeight: "700",
            lineHeight: "1.2",
            color: "#1a1a1a",
            marginBottom: "8px",
          }}
        >
          {title}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontSize: "14px",
            letterSpacing: "1px",
            color: "#666",
            textTransform: "uppercase",
            fontWeight: "500",
            marginBottom: "16px",
          }}
        >
          MAKE YOUR DREAM HOME
        </p>

        {/* Size and Finish */}
        <div style={{ marginBottom: "20px" }}>
          <p
            style={{
              fontSize: "13px",
              color: "#777",
              marginBottom: "8px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            <strong>Sizes:</strong> {sizes}
          </p>
          <p
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#d32f2f",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {finish}
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Tile Samples
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {tileSizes.map((size, idx) => {
              const [width] = size.split("X").map((s) => Number.parseInt(s))
              const baseWidth = 200
              const scaledWidth = (width / 300) * baseWidth

              return (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: `${scaledWidth}px`,
                      height: "60px",
                      background: color,
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1), inset 0 0 15px rgba(0,0,0,0.05)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                  <div>
                    <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>Step</p>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a1a", margin: "0" }}>{size}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Specifications Table */}
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Packing Details
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "12px" }}>
            <div>
              <p style={{ color: "#666", marginBottom: "4px" }}>Size</p>
              <p style={{ fontWeight: "600", color: "#1a1a1a" }}>{sizes.split(" / ")[0]}</p>
            </div>
            <div>
              <p style={{ color: "#666", marginBottom: "4px" }}>Product</p>
              <p style={{ fontWeight: "600", color: "#1a1a1a" }}>ONE STEP BOX</p>
            </div>
            <div>
              <p style={{ color: "#666", marginBottom: "4px" }}>Coverage</p>
              <p style={{ fontWeight: "600", color: "#1a1a1a" }}>11.61 SQFT</p>
            </div>
            <div>
              <p style={{ color: "#666", marginBottom: "4px" }}>Weight</p>
              <p style={{ fontWeight: "600", color: "#1a1a1a" }}>25.5 KG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
