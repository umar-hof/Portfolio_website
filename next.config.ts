import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Deliberately limited to headers that cannot break anything: no CSP, because
 * getting one wrong would block Next's own runtime. `Referrer-Policy` still
 * sends the origin for cross-site arrivals, which is all the lead attribution
 * in `lib/analytics.ts` needs.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Stops advertising the framework version to scanners.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
