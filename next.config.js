/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: false,
  swcLoader: false,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: true, // Use true for a permanent redirect, false for a temporary one
      },
    ];
  },
};
