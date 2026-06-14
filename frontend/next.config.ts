import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow images from any domain for future use
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
