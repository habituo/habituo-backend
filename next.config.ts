import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  reactCompiler: true,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...config.externals,
        'resend',
        '@react-email/render',
        ({ request }, callback) => {
          if (request.startsWith('../../emails')) {
            return callback(null, { commonjs: request });
          }
          callback();
        },
      ];
    }
    
    return config;
  },
};

export default nextConfig;
