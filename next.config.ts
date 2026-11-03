import type { NextConfig } from "next";

// Vercel is the default target. Set NEXT_EXPORT=1 to produce a folder of static
// files (out/) for a plain Apache/nginx host instead.
const staticExport = process.env.NEXT_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport
    ? { output: "export" as const, images: { unoptimized: true }, trailingSlash: true }
    : {}),
};

export default nextConfig;
