import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logos.covalenthq.com",
      },
      {
        protocol: "https",
        hostname: "www.datocms-assets.com",
      },
    ],
  },
};

export default nextConfig;
