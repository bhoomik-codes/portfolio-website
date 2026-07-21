import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/metrics/script.js",
        destination: "http://127.0.0.1:3002/script.js",
      },
      {
        source: "/api/metrics/api/send",
        destination: "http://127.0.0.1:3002/api/send",
      },
    ];
  },
};

export default nextConfig;
