import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The chat API reads this file at runtime; make sure it is bundled with the function.
  outputFileTracingIncludes: {
    "/api/chat": ["./components/data/portfolio.txt"],
  },
};

export default nextConfig;
