import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactCompiler: true,
  allowedDevOrigins: ["192.168.10.231"],
};

export default nextConfig;
