"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, CheckCircle2, Layers, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans selection:bg-black selection:text-white">
      {/* =========================================
          HERO SECTION: Architectural & Premium
      ========================================= */}
      <section className="relative w-full pt-28 pb-12 md:pt-36 md:pb-20 px-4 md:px-8 bg-neutral-50/50 overflow-hidden">
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-200 to-transparent opacity-40 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-stone-200 to-transparent opacity-40 blur-3xl" />
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Typography & Call to Action (Span 7 cols) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col gap-6 z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 bg-white/50 backdrop-blur-sm w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">2025 Collection Available</span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-neutral-900 leading-[0.95]">
                STEP <span className="font-serif italic font-light text-neutral-400">&</span><br />
                RISER
              </h1>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-l-2 border-neutral-900 pl-6 mt-2">
                <p className="text-lg md:text-xl text-neutral-600 max-w-md leading-relaxed">
                  Elevate your staircase with our premium ceramic solutions. 
                  <span className="font-semibold text-neutral-900"> Anti-skid technology</span> meets architectural aesthetics.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button className="group px-8 py-4 bg-neutral-900 text-white rounded-full font-medium transition-all hover:bg-neutral-800 hover:scale-105 flex items-center gap-3 shadow-xl shadow-neutral-900/20">
                  View Collection
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
               
              </div>
            </motion.div>

            {/* RIGHT: Visual Showcase (Span 5 cols) */}
            <div className="lg:col-span-5 relative h-[450px] md:h-[550px] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full"
              >
                {/* Back Card */}
                <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-stone-200 rounded-3xl -z-10" />
                
                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-stone-900/20 group">
                   <img
                    src="/images/step/kp1.png"
                    alt="KP Ceramic Steps and Risers"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Floating Detail Card */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20"
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Featured</p>
                        <p className="text-neutral-900 font-bold text-lg">Sandy Black Series</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Finish</p>
                        <p className="text-neutral-900 font-medium">Matte 3FT</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Bottom Feature Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neutral-200"
          >
            {[
              { icon: Layers, label: "Full Body", sub: "Consistent Color" },
              { icon: ShieldCheck, label: "High Durability", sub: "Scratch Resistant" },
              { icon: CheckCircle2, label: "Anti-Skid", sub: "Safety First" },
              { icon: Layers, label: "Perfect Edge", sub: "Seamless Joint" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 group cursor-default">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">{item.label}</p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================
          PRODUCT SHOWCASE GRID (Existing Logic)
      ========================================= */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
           {/* HL-JET GREY */}
           <ProductShowcase
            title="FULL BODY SANDY BLACK"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#888888"
            image="/images/step/1.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/3.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/2.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CREAM */}
          <ProductShowcase
            title="FULL BODY SANDY CHOCO"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#e8dcc8"
            image="/images/step/4.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/6.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/5.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CHOCO */}
          <ProductShowcase
            title="FULL BODY SANDY NERO"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#6b4423"
            image="/images/step/7.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/9.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/8.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-BROWN */}
          <ProductShowcase
            title="FULL BODY SANDY COPPER"
            sizes="600X1200 / 300X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/11.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/13.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/12.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-NATURAL */}
          <ProductShowcase
            title="FULL BODY SANDY KOTA"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/14.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/16.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/15.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-BEIGE */}
          <ProductShowcase
            title="FULL BODY SANDY VERDE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/17.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/19.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/18.png",
                width: 280,
                height: 80,
              },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY ROMAN"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#888888"
            image="/images/step/20.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/26.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/32.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CREAM */}
          <ProductShowcase
            title="FULL BODY SANDY MOCHA"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#e8dcc8"
            image="/images/step/21.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/27.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/33.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CHOCO */}
          <ProductShowcase
            title="FULL BODY SANDY DOVE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#6b4423"
            image="/images/step/22.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/28.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/34.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-BROWN */}
          <ProductShowcase
            title="FULL BODY SANDY CREMA"
            sizes="600X1200 / 300X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/23.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/29.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/35.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-NATURAL */}
          <ProductShowcase
            title="FULL BODY SANDY BEIGE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/24.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/30.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/36.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-BEIGE */}
          <ProductShowcase
            title="FULL BODY SANDY WHITE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            color="#8b6f47"
            image="/images/step/25.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/31.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/37.png",
                width: 280,
                height: 80,
              },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-JET BLACK SP"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            color="#888888"
            image="/images/step/38.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/44.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/50.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          <ProductShowcase
            title="FULL BODY HL-WHITE"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            color="#888888"
            image="/images/step/39.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/45.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/51.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CREAM */}
          <ProductShowcase
            title="FULL BODY HL-CHOCO"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            color="#e8dcc8"
            image="/images/step/40.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/46.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/52.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-CHOCO */}
          <ProductShowcase
            title="FULL BODY HL-NERO"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            color="#6b4423"
            image="/images/step/41.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/47.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/53.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-BROWN */}
          <ProductShowcase
            title="FULL BODY HL-PEACH"
            sizes="600X1200 / 300X1200MM"
            finish="4 FT"
            color="#8b6f47"
            image="/images/step/42.png"
            isReversed={false}
            tiles={[
              {
                imageUrl: "/images/step/48.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/54.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          {/* HL-NATURAL */}
          <ProductShowcase
            title="FULL BODY HL-RIVER"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            color="#8b6f47"
            image="/images/step/43.png"
            isReversed={true}
            tiles={[
              {
                imageUrl: "/images/step/49.png",
                width: 300,
                height: 100,
              },
              {
                imageUrl: "/images/step/55.png",
                width: 280,
                height: 80,
              },
            ]}
          />

          <ProductShowcase
            title="GVT 901"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/56.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/78.png", width: 300, height: 100 },
              { imageUrl: "/images/step/100.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 902"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/57.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/79.png", width: 300, height: 100 },
              { imageUrl: "/images/step/101.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 903"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/58.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/80.png", width: 300, height: 100 },
              { imageUrl: "/images/step/102.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 904"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/59.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/81.png", width: 300, height: 100 },
              { imageUrl: "/images/step/103.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 905"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/60.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/82.png", width: 300, height: 100 },
              { imageUrl: "/images/step/104.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 923"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/61.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/83.png", width: 300, height: 100 },
              { imageUrl: "/images/step/105.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 924"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/62.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/84.png", width: 300, height: 100 },
              { imageUrl: "/images/step/106.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 906"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/63.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/85.png", width: 300, height: 100 },
              { imageUrl: "/images/step/107.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 907"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/64.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/86.png", width: 300, height: 100 },
              { imageUrl: "/images/step/108.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 908"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/65.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/87.png", width: 300, height: 100 },
              { imageUrl: "/images/step/109.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 909"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/66.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/88.png", width: 300, height: 100 },
              { imageUrl: "/images/step/110.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 910"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/67.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/89.png", width: 300, height: 100 },
              { imageUrl: "/images/step/111.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 911"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/68.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/90.png", width: 300, height: 100 },
              { imageUrl: "/images/step/112.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 912"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/69.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/91.png", width: 300, height: 100 },
              { imageUrl: "/images/step/113.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 913"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/70.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/92.png", width: 300, height: 100 },
              { imageUrl: "/images/step/114.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 914"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/71.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/93.png", width: 300, height: 100 },
              { imageUrl: "/images/step/115.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 915"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/72.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/94.png", width: 300, height: 100 },
              { imageUrl: "/images/step/116.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 916"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/73.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/95.png", width: 300, height: 100 },
              { imageUrl: "/images/step/117.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 917"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/74.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/96.png", width: 300, height: 100 },
              { imageUrl: "/images/step/118.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 919"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/75.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/97.png", width: 300, height: 100 },
              { imageUrl: "/images/step/119.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 921"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/76.png"
            isReversed={false}
            tiles={[
              { imageUrl: "/images/step/98.png", width: 300, height: 100 },
              { imageUrl: "/images/step/120.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 922"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            color="#8b6f47"
            image="/images/step/77.png"
            isReversed={true}
            tiles={[
              { imageUrl: "/images/step/99.png", width: 300, height: 100 },
              { imageUrl: "/images/step/121.png", width: 280, height: 80 },
            ]}
          />
        </div>
      </section>

      {/* Product Details Section */}
      <section
        style={{ background: "#f9f9f9" }}
        className="py-16 md:py-24 px-4 md:px-8"
      >
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

          <div className="overflow-x-auto rounded-lg shadow-sm border border-neutral-200">
            <table className="w-full border-collapse text-sm bg-white">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-semibold tracking-wide">SIZE</th>
                  <th className="p-4 text-left font-semibold tracking-wide">PRODUCT NAME</th>
                  <th className="p-4 text-left font-semibold tracking-wide">COVERAGE</th>
                  <th className="p-4 text-left font-semibold tracking-wide">PACKING</th>
                  <th className="p-4 text-left font-semibold tracking-wide">WEIGHT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-700">300 X 1200</td>
                  <td className="p-4 text-neutral-600">ONE STEP BOX</td>
                  <td className="p-4 text-neutral-600">11.61 SQFT</td>
                  <td className="p-4 text-neutral-600">3 PCS.</td>
                  <td className="p-4 text-neutral-600">25.5 KG</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-700">200 X 1200</td>
                  <td className="p-4 text-neutral-600">ONE RISER BOX</td>
                  <td className="p-4 text-neutral-600">7.74 SQFT</td>
                  <td className="p-4 text-neutral-600">3 PCS.</td>
                  <td className="p-4 text-neutral-600">16.5 KG</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 font-medium text-neutral-700">600 X 1200</td>
                  <td className="p-4 text-neutral-600">ONE STEP BOX</td>
                  <td className="p-4 text-neutral-600">23.23 SQFT</td>
                  <td className="p-4 text-neutral-600">3 PCS.</td>
                  <td className="p-4 text-neutral-600">60 KG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductShowcase({
  title,
  sizes,
  finish,
  color,
  image,
  isReversed,
  tiles = [],
}: {
  title: string;
  sizes: string;
  finish: string;
  color: string;
  image: string;
  isReversed: boolean;
  tiles?: Array<{ imageUrl: string; width: number; height: number }>;
}) {
  const contentOrder = isReversed ? "order-2 md:order-2" : "order-2 md:order-1";
  const imageOrder = isReversed ? "order-1 md:order-1" : "order-1 md:order-2";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 md:mb-32"
    >
      {/* Image Section */}
      <div className={imageOrder}>
        <div className="relative w-full h-[610px] rounded-2xl overflow-hidden shadow-2xl group">
          {/* Decorative Border Frame */}
          <div className="absolute inset-0 border-2 border-white/20 z-10 pointer-events-none rounded-2xl"></div>
          
          <img
            src={image || "/placeholder.svg"}
            alt={`${title} installed in stairs`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className={`${contentOrder} flex flex-col justify-center`}>
        <div className="w-12 h-1 bg-neutral-900 mb-6"></div>
        
        {/* Product Title */}
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: "800",
            lineHeight: "1.1",
            color: "#1a1a1a",
            marginBottom: "12px",
            letterSpacing: "-0.5px"
          }}
        >
          {title}
        </h2>

        {/* Tagline */}
        <p className="text-sm tracking-[2px] text-neutral-500 uppercase font-semibold mb-6">
          Architectural Series
        </p>

        {/* Size and Finish Badges */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-md uppercase tracking-wide">
            {sizes}
          </span>
          <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-md uppercase tracking-wide">
            {finish}
          </span>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-200 pb-2 mb-4">
            Visual Reference
          </p>
          
          <div className="flex flex-col gap-6 items-start">
            {tiles.map((tile, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-start"
              >
                <div
                  style={{
                    width: `${tile.width}px`,
                    height: `${tile.height}px`,
                  }}
                  className="rounded-lg shadow-md overflow-hidden border border-neutral-200 relative"
                >
                   <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${tile.imageUrl})` }}
                   />
                </div>
                <p className="mt-2 text-xs text-neutral-400 font-medium">Size: {tile.width}px</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Specs Box */}
        <div className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-100">
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-neutral-400 mb-1">Coverage Area</p>
              <p className="font-bold text-neutral-900">11.61 SQFT</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">Box Weight</p>
              <p className="font-bold text-neutral-900">25.5 KG</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}