import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "blog.ritikkumar.dev" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

nextConfig.output = "standalone";
export default nextConfig;
