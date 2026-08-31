import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostHog behind a first-party path, matching the other sites. Analytics
  // served from posthog.com is on every blocklist, and this site's audience —
  // people who install a Claude plugin to triage their job search — blocks more
  // than most. Routed through our own origin the requests are same-origin and
  // survive.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // PostHog's API expects trailing slashes preserved on the proxied paths.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
