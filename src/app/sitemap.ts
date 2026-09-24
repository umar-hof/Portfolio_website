import type { MetadataRoute } from "next";
import { landingPageSlugs } from "@/lib/data/landing-pages";
import { projectSlugs } from "@/lib/data/projects";
import { serviceSlugs } from "@/lib/data/services";
import { getSiteUrl } from "@/lib/data/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * Sitemap.
 *
 * Built from the data layer, so adding a project, service or landing page
 * publishes it to search engines automatically — no list to keep in sync.
 * `lastModified` is intentionally omitted rather than faked with `new Date()`,
 * which would tell crawlers every page changed on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path, origin),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    ...serviceSlugs().map((slug) => ({
      url: absoluteUrl(`/services/${slug}`, origin),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),

    ...projectSlugs().map((slug) => ({
      url: absoluteUrl(`/work/${slug}`, origin),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),

    // Paid-traffic destinations. Included so they are indexable if you also
    // want organic traffic; exclude them here if they should be ads-only, and
    // set `robots: { index: false }` in lib/landing.ts.
    ...landingPageSlugs().map((slug) => ({
      url: absoluteUrl(`/${slug}`, origin),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
