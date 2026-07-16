import type { NextConfig } from "next";

// Where the backend (Bun/Hono) listens. In production nginx routes /api and
// /uploads to the backend directly, so these rewrites mainly serve local dev
// (and are harmless in prod, where nginx intercepts first).
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN ?? "http://127.0.0.1:4009";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  allowedDevOrigins: [
    "154.197.124.206",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async rewrites() {
    return [
      // Backend API (NextAuth's /api/auth/* stays on Next — not matched here).
      { source: "/api/v1/:path*", destination: `${BACKEND_ORIGIN}/api/v1/:path*` },
      // Uploaded images served by the backend.
      { source: "/uploads/:path*", destination: `${BACKEND_ORIGIN}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
