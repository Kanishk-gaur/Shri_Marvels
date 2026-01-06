"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Layers,
  ShieldCheck,
  ListPlus,
  ListMinus,
} from "lucide-react";
import Image from "next/image";
import { useCatalog } from "@/context/CatalogContext";
import { Button } from "@/components/ui/button";
import { SizeSelectionDialog } from "@/components/size-selection-dialog";

// Type definitions
interface TextureItem {
  code: string;
  image: string;
}

interface TileVariation {
  imageUrl: string;
  width: number;
  height: number;
}

interface ProductData {
  title: string;
  image: string;
  sizesArray: string[];
}

interface ProductShowcaseProps {
  title: string;
  sizes: string;
  finish: string;
  image: string;
  isReversed: boolean;
  onAdd: () => void;
  tiles?: TileVariation[];
}

// Data for the Texture/Design Collection Grid
const textureCollection: TextureItem[] = [
  { code: "01", image: "/images/step_riser_tiles/01.png" },
  { code: "02", image: "/images/step_riser_tiles/02.png" },
  { code: "04", image: "/images/step_riser_tiles/04.png" },
  { code: "06", image: "/images/step_riser_tiles/06.png" },
  { code: "08", image: "/images/step_riser_tiles/08.png" },
  { code: "09", image: "/images/step_riser_tiles/09.png" },
  { code: "12", image: "/images/step_riser_tiles/12.png" },
  { code: "16", image: "/images/step_riser_tiles/16.png" },
  { code: "29", image: "/images/step_riser_tiles/29.png" },
  { code: "32", image: "/images/step_riser_tiles/32.png" },
  { code: "34", image: "/images/step_riser_tiles/34.png" },
  { code: "37", image: "/images/step_riser_tiles/37.png" },
  { code: "38", image: "/images/step_riser_tiles/38.png" },
  { code: "39", image: "/images/step_riser_tiles/39.png" },
  { code: "40", image: "/images/step_riser_tiles/40.png" },
  { code: "41", image: "/images/step_riser_tiles/41.png" },
  { code: "42", image: "/images/step_riser_tiles/42.png" },
  { code: "43", image: "/images/step_riser_tiles/43.png" },
  { code: "44", image: "/images/step_riser_tiles/44.png" },
  { code: "45", image: "/images/step_riser_tiles/45.png" },
  { code: "DC-901", image: "/images/step_riser_tiles/DC-901.png" },
  { code: "DC-902", image: "/images/step_riser_tiles/DC-902.png" },
  { code: "DC-903", image: "/images/step_riser_tiles/DC-903.png" },
  { code: "DC-904", image: "/images/step_riser_tiles/DC-904.png" },
  { code: "DC-905", image: "/images/step_riser_tiles/DC-905.png" },
  { code: "DC-908", image: "/images/step_riser_tiles/DC-908.png" },
  { code: "DC-911", image: "/images/step_riser_tiles/DC-911.png" },
  { code: "DC-913", image: "/images/step_riser_tiles/DC-913.png" },
  { code: "DC-914", image: "/images/step_riser_tiles/DC-914.png" },
  { code: "DC-917", image: "/images/step_riser_tiles/DC-917.png" },
  { code: "DC-918", image: "/images/step_riser_tiles/DC-918.png" },
  { code: "DC-919", image: "/images/step_riser_tiles/DC-919.png" },
  { code: "DC-920", image: "/images/step_riser_tiles/DC-920.png" },
  { code: "DC-921", image: "/images/step_riser_tiles/DC-921.png" },
  { code: "DC-924", image: "/images/step_riser_tiles/DC-924.png" },
  { code: "DC-928", image: "/images/step_riser_tiles/DC-928.png" },
  { code: "501", image: "/images/step_riser_tiles/501.png" },
  { code: "509", image: "/images/step_riser_tiles/509.png" },
  { code: "559", image: "/images/step_riser_tiles/559.png" },
  { code: "560", image: "/images/step_riser_tiles/560.png" },
  { code: "562", image: "/images/step_riser_tiles/562.png" },
  { code: "568", image: "/images/step_riser_tiles/568.png" },
  { code: "570", image: "/images/step_riser_tiles/570.png" },
  { code: "571", image: "/images/step_riser_tiles/571.png" },
  { code: "572", image: "/images/step_riser_tiles/572.png" },
  { code: "573", image: "/images/step_riser_tiles/573.png" },
  { code: "574", image: "/images/step_riser_tiles/574.png" },
  { code: "577", image: "/images/step_riser_tiles/577.png" },
  { code: "701", image: "/images/step_riser_tiles/701.png" },
  { code: "702", image: "/images/step_riser_tiles/702.png" },
  { code: "703", image: "/images/step_riser_tiles/703.png" },
  { code: "704", image: "/images/step_riser_tiles/704.png" },
  { code: "706", image: "/images/step_riser_tiles/706.png" },
  { code: "707", image: "/images/step_riser_tiles/707.png" },
  { code: "708", image: "/images/step_riser_tiles/708.png" },
  { code: "709", image: "/images/step_riser_tiles/709.png" },
  { code: "711", image: "/images/step_riser_tiles/711.png" },
  { code: "712", image: "/images/step_riser_tiles/712.png" },
  { code: "714", image: "/images/step_riser_tiles/714.png" },
  { code: "715", image: "/images/step_riser_tiles/715.png" },
  { code: "716", image: "/images/step_riser_tiles/716.png" },
  { code: "717", image: "/images/step_riser_tiles/717.png" },
  { code: "718", image: "/images/step_riser_tiles/718.png" },
  { code: "720", image: "/images/step_riser_tiles/720.png" },
  { code: "101", image: "/images/step_riser_tiles/101.png" },
  { code: "104", image: "/images/step_riser_tiles/104.png" },
  { code: "105", image: "/images/step_riser_tiles/105.png" },
  { code: "108", image: "/images/step_riser_tiles/108.png" },
  { code: "109", image: "/images/step_riser_tiles/109.png" },
  { code: "110", image: "/images/step_riser_tiles/110.png" },
  { code: "111", image: "/images/step_riser_tiles/111.png" },
  { code: "151", image: "/images/step_riser_tiles/151.png" },
  { code: "152", image: "/images/step_riser_tiles/152.png" },
  { code: "154", image: "/images/step_riser_tiles/154.png" },
  { code: "157", image: "/images/step_riser_tiles/157.png" },
  { code: "158", image: "/images/step_riser_tiles/158.png" },
  { code: "159", image: "/images/step_riser_tiles/159.png" },
  { code: "160", image: "/images/step_riser_tiles/160.png" },
  { code: "168", image: "/images/step_riser_tiles/168.png" },
  { code: "169", image: "/images/step_riser_tiles/169.png" },
  { code: "170", image: "/images/step_riser_tiles/170.png" },
  { code: "173", image: "/images/step_riser_tiles/173.png" },
  { code: "174", image: "/images/step_riser_tiles/174.png" },
  { code: "175", image: "/images/step_riser_tiles/175.png" },
  { code: "201", image: "/images/step_riser_tiles/201.png" },
  { code: "202", image: "/images/step_riser_tiles/202.png" },
  { code: "204", image: "/images/step_riser_tiles/204.png" },
  { code: "205", image: "/images/step_riser_tiles/205.png" },
  { code: "206", image: "/images/step_riser_tiles/206.png" },
  { code: "1001", image: "/images/step_riser_tiles/1001.png" },
  { code: "1002", image: "/images/step_riser_tiles/1002.png" },
  { code: "1003", image: "/images/step_riser_tiles/1003.png" },
  { code: "1004", image: "/images/step_riser_tiles/1004.png" },
  { code: "1005", image: "/images/step_riser_tiles/1005.png" },
  { code: "301", image: "/images/step_riser_tiles/301.png" },
  { code: "302", image: "/images/step_riser_tiles/302.png" },
  { code: "306", image: "/images/step_riser_tiles/306.png" },
  { code: "307", image: "/images/step_riser_tiles/307.png" },
];

export default function StepRiserPage() {
  const [activeProduct, setActiveProduct] = useState<ProductData | null>(null);
  const { addItemToCatalog, isItemInCatalog, removeItemFromCatalog } =
    useCatalog();

  const handleConfirm = (
    selectedSizes: string[],
    configs: Record<string, number> // Renamed to configs for clarity
  ) => {
    if (activeProduct) {
      addItemToCatalog({
        // Generate a unique ID string
        id: activeProduct.title.replace(/\s+/g, "-").toLowerCase(),
        name: activeProduct.title,
        imageUrl: activeProduct.image,
        // Ensure category matches "marvel" | "tiles" if strict,
        // otherwise use the top-level category
        category: "tiles",
        // Add the missing required subcategory property
        subcategory: "Step & Riser",
        sizes: activeProduct.sizesArray || [],
        selectedSizes: selectedSizes,
        sizeConfigs: configs,
        // Calculate total quantity from configs to match the updateItemSizes logic
        quantity: Object.values(configs).reduce((a, b) => a + b, 0),
      });
      setActiveProduct(null);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans selection:bg-black selection:text-white">
      {/* HERO SECTION */}
      <section className="relative w-full pt-28 pb-12 md:pt-36 md:pb-20 px-4 md:px-8 bg-neutral-50/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-200 to-transparent opacity-40 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                <span className="text-xs font-semibold tracking-wide text-neutral-600 uppercase">
                  2025 Collection Available
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-neutral-900 leading-[0.95]">
                STEP{" "}
                <span className="font-serif italic font-light text-neutral-400">
                  &
                </span>
                <br />
                RISER
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 border-l-2 border-neutral-900 pl-6 mt-2">
                <p className="text-lg md:text-xl text-neutral-600 max-w-md leading-relaxed">
                  Elevate your staircase with our premium ceramic solutions.
                  <span className="font-semibold text-neutral-900">
                    {" "}
                    Anti-skid technology
                  </span>{" "}
                  meets architectural aesthetics.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-5 relative h-[450px] md:h-[550px] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-stone-200 rounded-3xl -z-10" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                  <Image
                    src="/images/step/kp1.png"
                    alt="KP Ceramic Steps"
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neutral-200"
          >
            {[
              { icon: Layers, label: "Full Body", sub: "Consistent Color" },
              {
                icon: ShieldCheck,
                label: "High Durability",
                sub: "Scratch Resistant",
              },
              { icon: CheckCircle2, label: "Anti-Skid", sub: "Safety First" },
              { icon: Layers, label: "Perfect Edge", sub: "Seamless Joint" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 group cursor-default"
              >
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-neutral-900 text-sm">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE GRID */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <ProductShowcase
            title="FULL BODY SANDY BLACK"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/1.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY BLACK",
                image: "/images/step/1.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/3.png", width: 300, height: 100 },
              { imageUrl: "/images/step/2.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY CHOCO"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/4.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY CHOCO",
                image: "/images/step/4.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/6.png", width: 300, height: 100 },
              { imageUrl: "/images/step/5.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY NERO"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/7.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY NERO",
                image: "/images/step/7.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/9.png", width: 300, height: 100 },
              { imageUrl: "/images/step/8.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY COPPER"
            sizes="600X1200 / 300X1200MM"
            finish="3 FT"
            image="/images/step/11.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY COPPER",
                image: "/images/step/11.png",
                sizesArray: ["600X1200", "300X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/13.png", width: 300, height: 100 },
              { imageUrl: "/images/step/12.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY KOTA"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/14.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY KOTA",
                image: "/images/step/14.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/16.png", width: 300, height: 100 },
              { imageUrl: "/images/step/15.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY VERDE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/17.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY VERDE",
                image: "/images/step/17.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/19.png", width: 300, height: 100 },
              { imageUrl: "/images/step/18.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY ROMAN"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/20.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY ROMAN",
                image: "/images/step/20.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/26.png", width: 300, height: 100 },
              { imageUrl: "/images/step/32.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY MOCHA"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/21.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY MOCHA",
                image: "/images/step/21.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/27.png", width: 300, height: 100 },
              { imageUrl: "/images/step/33.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY DOVE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/22.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY DOVE",
                image: "/images/step/22.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/28.png", width: 300, height: 100 },
              { imageUrl: "/images/step/34.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY CREMA"
            sizes="600X1200 / 300X1200MM"
            finish="3 FT"
            image="/images/step/23.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY CREMA",
                image: "/images/step/23.png",
                sizesArray: ["600X1200", "300X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/29.png", width: 300, height: 100 },
              { imageUrl: "/images/step/35.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY BEIGE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/24.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY BEIGE",
                image: "/images/step/24.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/30.png", width: 300, height: 100 },
              { imageUrl: "/images/step/36.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY SANDY WHITE"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT"
            image="/images/step/25.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY SANDY WHITE",
                image: "/images/step/25.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/31.png", width: 300, height: 100 },
              { imageUrl: "/images/step/37.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-JET BLACK SP"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            image="/images/step/38.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-JET BLACK SP",
                image: "/images/step/38.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/44.png", width: 300, height: 100 },
              { imageUrl: "/images/step/50.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-WHITE"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            image="/images/step/39.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-WHITE",
                image: "/images/step/39.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/45.png", width: 300, height: 100 },
              { imageUrl: "/images/step/51.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-CHOCO"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            image="/images/step/40.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-CHOCO",
                image: "/images/step/40.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/46.png", width: 300, height: 100 },
              { imageUrl: "/images/step/52.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-NERO"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            image="/images/step/41.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-NERO",
                image: "/images/step/41.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/47.png", width: 300, height: 100 },
              { imageUrl: "/images/step/53.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-PEACH"
            sizes="600X1200 / 300X1200MM"
            finish="4 FT"
            image="/images/step/42.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-PEACH",
                image: "/images/step/42.png",
                sizesArray: ["600X1200", "300X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/48.png", width: 300, height: 100 },
              { imageUrl: "/images/step/54.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="FULL BODY HL-RIVER"
            sizes="300X1200 / 200X1200MM"
            finish="4 FT"
            image="/images/step/43.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "FULL BODY HL-RIVER",
                image: "/images/step/43.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/49.png", width: 300, height: 100 },
              { imageUrl: "/images/step/55.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 901"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/56.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 901",
                image: "/images/step/56.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/78.png", width: 300, height: 100 },
              { imageUrl: "/images/step/100.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 902"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/57.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 902",
                image: "/images/step/57.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/79.png", width: 300, height: 100 },
              { imageUrl: "/images/step/101.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 903"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/58.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 903",
                image: "/images/step/58.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/80.png", width: 300, height: 100 },
              { imageUrl: "/images/step/102.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 904"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/59.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 904",
                image: "/images/step/59.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/81.png", width: 300, height: 100 },
              { imageUrl: "/images/step/103.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 905"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/60.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 905",
                image: "/images/step/60.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/82.png", width: 300, height: 100 },
              { imageUrl: "/images/step/104.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 923"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/61.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 923",
                image: "/images/step/61.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/83.png", width: 300, height: 100 },
              { imageUrl: "/images/step/105.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 924"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/62.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 924",
                image: "/images/step/62.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/84.png", width: 300, height: 100 },
              { imageUrl: "/images/step/106.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 906"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/63.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 906",
                image: "/images/step/63.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/85.png", width: 300, height: 100 },
              { imageUrl: "/images/step/107.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 907"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/64.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 907",
                image: "/images/step/64.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/86.png", width: 300, height: 100 },
              { imageUrl: "/images/step/108.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 908"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/65.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 908",
                image: "/images/step/65.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/87.png", width: 300, height: 100 },
              { imageUrl: "/images/step/109.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 909"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/66.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 909",
                image: "/images/step/66.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/88.png", width: 300, height: 100 },
              { imageUrl: "/images/step/110.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 910"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/67.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 910",
                image: "/images/step/67.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/89.png", width: 300, height: 100 },
              { imageUrl: "/images/step/111.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 911"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/68.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 911",
                image: "/images/step/68.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/90.png", width: 300, height: 100 },
              { imageUrl: "/images/step/112.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 912"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/69.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 912",
                image: "/images/step/69.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/91.png", width: 300, height: 100 },
              { imageUrl: "/images/step/113.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 913"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/70.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 913",
                image: "/images/step/70.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/92.png", width: 300, height: 100 },
              { imageUrl: "/images/step/114.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 914"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/71.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 914",
                image: "/images/step/71.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/93.png", width: 300, height: 100 },
              { imageUrl: "/images/step/115.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 915"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/72.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 915",
                image: "/images/step/72.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/94.png", width: 300, height: 100 },
              { imageUrl: "/images/step/116.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 916"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/73.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 916",
                image: "/images/step/73.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/95.png", width: 300, height: 100 },
              { imageUrl: "/images/step/117.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 917"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/74.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 917",
                image: "/images/step/74.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/96.png", width: 300, height: 100 },
              { imageUrl: "/images/step/118.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 919"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/75.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 919",
                image: "/images/step/75.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/97.png", width: 300, height: 100 },
              { imageUrl: "/images/step/119.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 921"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/76.png"
            isReversed={false}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 921",
                image: "/images/step/76.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/98.png", width: 300, height: 100 },
              { imageUrl: "/images/step/120.png", width: 280, height: 80 },
            ]}
          />
          <ProductShowcase
            title="GVT 922"
            sizes="300X1200 / 200X1200MM"
            finish="3 FT / 4 FT"
            image="/images/step/77.png"
            isReversed={true}
            onAdd={() =>
              setActiveProduct({
                title: "GVT 922",
                image: "/images/step/77.png",
                sizesArray: ["300X1200", "200X1200MM"],
              })
            }
            tiles={[
              { imageUrl: "/images/step/99.png", width: 300, height: 100 },
              { imageUrl: "/images/step/121.png", width: 280, height: 80 },
            ]}
          />
        </div>
      </section>

      {/* TEXTURE GALLERY */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Design Collection
            </h2>
            <p className="text-neutral-500 tracking-widest text-sm uppercase">
              Premium Textures & Finishes
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {textureCollection.map((item) => {
              const productId = `design-${item.code.toLowerCase()}`;
              const isInCatalog = isItemInCatalog(productId);

              return (
                <motion.div key={item.code} className="group relative">
                  <div className="relative w-full aspect-[5/2] rounded-lg overflow-hidden border border-neutral-200 group-hover:shadow-md transition-all">
                    <Image
                      src={item.image}
                      alt={item.code}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    <div className="absolute top-2 right-2 z-20">
                      {/* Removed opacity-0 and group-hover:opacity-100 to make it always visible */}
                      <Button
                        size="icon"
                        variant={isInCatalog ? "destructive" : "secondary"}
                        className={`h-9 w-9 rounded-full shadow-lg border-none transition-colors ${
                          !isInCatalog
                            ? "bg-white text-neutral-900 hover:bg-gray-100"
                            : "bg-red-500 text-white"
                        }`}
                        onClick={() =>
                          isInCatalog
                            ? removeItemFromCatalog(productId)
                            : setActiveProduct({
                                title: `Design ${item.code}`,
                                image: item.image,
                                sizesArray: ["300X1200", "200X1200MM"],
                              })
                        }
                      >
                        {isInCatalog ? (
                          <ListMinus className="w-4.5 h-4.5" />
                        ) : (
                          <ListPlus className="w-4.5 h-4.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm font-semibold text-neutral-700">
                      {item.code}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIALOG FOR QUANTITY */}
      {activeProduct && (
        <SizeSelectionDialog
          isOpen={!!activeProduct}
          onClose={() => setActiveProduct(null)}
          subcategory={activeProduct.title}
          availableSizes={activeProduct.sizesArray}
          onConfirm={handleConfirm}
          mainCategory="tiles"
        />
      )}
    </div>
  );
}

function ProductShowcase({
  title,
  sizes,
  finish,
  image,
  isReversed,
  onAdd,
  tiles = [],
}: ProductShowcaseProps) {
  const { isItemInCatalog, removeItemFromCatalog } = useCatalog();
  const productId = title.replace(/\s+/g, "-").toLowerCase();
  const isInCatalog = isItemInCatalog(productId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-20 md:mb-32"
    >
      <div className={isReversed ? "order-1 md:order-2" : "order-1"}>
        <div className="relative w-full h-[610px] rounded-2xl overflow-hidden shadow-2xl group">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
        </div>
      </div>
      <div
        className={
          isReversed
            ? "order-2 md:order-1 flex flex-col justify-center"
            : "order-2 flex flex-col justify-center"
        }
      >
        <div className="w-12 h-1 bg-neutral-900 mb-6"></div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 leading-[1.1] mb-4">
          {title}
        </h2>
        <p className="text-sm tracking-[2px] text-neutral-500 uppercase font-semibold mb-6">
          Architectural Series
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-md uppercase tracking-wide">
            {sizes}
          </span>
          <span className="px-3 py-1 bg-neutral-900 text-white text-xs font-medium rounded-md uppercase tracking-wide">
            {finish}
          </span>
        </div>

        <div className="mb-8">
          <Button
            onClick={() =>
              isInCatalog ? removeItemFromCatalog(productId) : onAdd()
            }
            variant={isInCatalog ? "destructive" : "default"}
            className="bg-neutral-900 text-white hover:bg-neutral-800 h-12 px-8 rounded-full transition-all shadow-lg"
          >
            {isInCatalog ? (
              <>
                <ListMinus className="w-4 h-4 mr-2" /> Remove from Catalog
              </>
            ) : (
              <>
                <ListPlus className="w-4 h-4 mr-2" /> Add to Catalog
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-bold text-neutral-900 uppercase tracking-wide border-b border-neutral-200 pb-2 mb-4">
            Visual Reference
          </p>
          <div className="flex flex-col gap-6 items-start">
            {tiles.map((tile, idx) => (
              <div key={idx} className="group flex flex-col items-start">
                <div
                  style={{
                    width: `${tile.width}px`,
                    height: `${tile.height}px`,
                  }}
                  className="rounded-lg shadow-md overflow-hidden border border-neutral-200 relative"
                >
                  <Image
                    src={tile.imageUrl}
                    alt="variation"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="300px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
