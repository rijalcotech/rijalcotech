/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swr'],
  experimental: {
    optimizeCss: true,
  },
  images: {
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'venturekartapi.walkershive.com.np',
      },
    ],
  },
};

export default nextConfig;