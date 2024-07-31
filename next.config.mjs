/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'deschide.api',
      },
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      }
    ]
  },
};

export default nextConfig;
