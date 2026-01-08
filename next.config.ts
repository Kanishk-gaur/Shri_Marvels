import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 outputFileTracingExcludes: {
    '*': [
      '**/src/data/products.ts',
      '**/node_modules/@swc/core-linux-x64-gnu',
      '**/node_modules/@swc/core-linux-x64-musl'
    ],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;