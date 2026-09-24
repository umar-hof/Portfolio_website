import type { Metadata } from "next";
import { getLandingPage } from "@/lib/data/landing-pages";
import { buildMetadata } from "@/lib/metadata";

/**
 * Metadata for an ad landing page, derived from its content entry so the title
 * and description can never drift out of sync with the page itself.
 */
export function landingMetadata(slug: string): Metadata {
  const content = getLandingPage(slug);

  if (!content) {
    return { title: "Page not found", robots: { index: false, follow: false } };
  }

  return buildMetadata({
    title: content.title,
    description: content.intro,
    path: `/${content.slug}`,
  });
}
