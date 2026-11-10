import type { NextConfig } from "next";

// Site 100 % statique : aucun serveur, hebergeable gratuitement partout.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
