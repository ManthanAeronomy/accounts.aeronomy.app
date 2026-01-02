/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize for production - creates a standalone build for Railway
  output: 'standalone',
}

module.exports = nextConfig

