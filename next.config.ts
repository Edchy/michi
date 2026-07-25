import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lesson URLs have moved twice as the hierarchy settled (ADR 0005, then 0006):
  // /modules/* → /provinces/* → /tracks/*. Both old forms keep working.
  async redirects() {
    return [
      { source: "/modules/:slug", destination: "/tracks/:slug", permanent: true },
      { source: "/provinces/:slug", destination: "/tracks/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
