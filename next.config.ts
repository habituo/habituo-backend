import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactCompiler: true,
  reactStrictMode: false,
};

export default nextConfig;
