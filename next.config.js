/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`i0.wp.com`, `i1.wp.com`],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        path: false,
        process: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
