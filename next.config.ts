import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores TypeScript or ESLint errors on Vercel
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // 🔥 Environment Variable ko expose karta hai
  },
  reactStrictMode: false, // Intersection Observer ka Error Fix
};

export default nextConfig;
