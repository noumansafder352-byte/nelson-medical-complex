import type { NextConfig } from "next";

/**
 * Fully static export. `next build` writes the complete website to `out/`,
 * which can be uploaded to any static host (cPanel, Vercel, Netlify, S3…).
 *
 * - `trailingSlash` emits `/about/index.html`, which Apache/cPanel serves
 *   for `/about/` without any rewrite rules.
 * - `images.unoptimized` is required because the default image optimizer
 *   needs a running Node.js server.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
