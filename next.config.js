/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "realestate-api.gmoplus.com" },
      { protocol: "https", hostname: "auto-api.gmoplus.com" },
      { protocol: "https", hostname: "jobs-api.gmoplus.com" },
      { protocol: "https", hostname: "api.gmoplus.com" },
      { protocol: "https", hostname: "admin-api.gmoplus.com" },
    ],
  },
  output: "standalone",
};
module.exports = nextConfig;
