// file: next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src'],
  },
}

module.exports = nextConfig
