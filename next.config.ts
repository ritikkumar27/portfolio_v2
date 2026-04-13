import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "blog.ritikkumar.dev" },
    ],
  },
};

nextConfig.output = "standalone";
export default nextConfig;
