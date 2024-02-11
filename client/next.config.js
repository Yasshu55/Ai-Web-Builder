/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    // Ensure that any URL with hostname "img.icons8.com" is allowed
    remotePatterns: [{ hostname: 'img.icons8.com' }],
  },
};

module.exports = nextConfig;
