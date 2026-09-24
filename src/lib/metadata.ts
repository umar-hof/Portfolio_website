import type { Metadata } from "next";
import { getSiteUrl, site } from "@/lib/data/site";
import { absoluteUrl } from "@/lib/utils";

/**
 * Generated social card, produced by `src/app/opengraph-image.tsx`.
 *
 * Referenced explicitly rather than relying on Next's file-convention
 * inheritance: a page that exports its own `openGraph` metadata replaces the
 * inherited image, which left every inner page without one.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.brand} — ${site.role}`,
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/services/ai-development". */
  path: string;
  /** Open Graph type. Defaults to "website". */
  type?: "website" | "article";
  /** Set for thank-you pages, previews and anything that should stay out of search. */
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Builds page metadata with sensible, consistent defaults.
 *
 * Every page gets a canonical URL derived from NEXT_PUBLIC_SITE_URL, plus
 * Open Graph and Twitter cards pointing at the generated OG image.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  keywords,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path, getSiteUrl());

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: site.brand,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
