import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  // Fix CORS warning for development
  experimental: {
    allowedDevOrigins: ['192.168.10.38:3000', 'localhost:3000'],
  },
};



module.exports = nextConfig;

export default nextConfig;
