import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This will ignore any TypeScript or ESLint errors during Vercel Deployment
  },
};

export default nextConfig;
