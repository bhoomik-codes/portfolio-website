import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio-website",
  images: {
    unoptimized: true, // Required for Next.js static export
  }
};

export default nextConfig;
