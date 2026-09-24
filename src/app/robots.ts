import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/data/site";

/**
 * robots.txt.
 *
 * The API route is disallowed — it is a write endpoint with no content worth
 * indexing. Everything else is crawlable, with the sitemap advertised so
 * crawlers do not have to discover pages by following links.
 */
export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
