import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "blog.ritikkumar.dev"],
  },
};

nextConfig.output = "standalone";
export default nextConfig;
