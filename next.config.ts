import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "agvanta.in",
      },
      {
        protocol: "https",
        hostname: "cms.agvanta.in",
      },
    ],
  },
};

export default nextConfig;