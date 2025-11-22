/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use transpilePackages for cross-workspace imports; switch to experimental.externalDir if needed for future builds.
  // Must match backend package name defined in backend/package.json ("backend").
  transpilePackages: ['backend'],
};

module.exports = nextConfig;
