/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/NewYear_2026' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/NewYear_2026/' : '',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
