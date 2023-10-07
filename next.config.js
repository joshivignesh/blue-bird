/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      remotePatterns: [
        {
          hostname: "avatars.githubusercontent.com",
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
  },
  };
  
  module.exports = nextConfig;
