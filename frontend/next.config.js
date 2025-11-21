/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use transpilePackages for cross-workspace imports; switch to experimental.externalDir if needed for future builds.
  transpilePackages: ['backend'],
};

module.exports = nextConfig;
