import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'src/data/products.ts', // Explicitly exclude this from function tracing
    ],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;