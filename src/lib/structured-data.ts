import { contactChannels, getSiteUrl, site } from "@/lib/data/site";
import { allTechnologies } from "@/lib/data/skills";
import { allServices } from "@/lib/data/services";
import type { FaqItem } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

/* ==========================================================================
   JSON-LD structured data.

   Only properties backed by real values are emitted — an unset email address or
   a missing social profile is omitted rather than filled with a placeholder,
   because structured data must describe the page truthfully.
   ========================================================================== */

export function personId() {
  return `${getSiteUrl()}/#person`;
}

export function websiteId() {
  return `${getSiteUrl()}/#website`;
}

export function businessId() {
  return `${getSiteUrl()}/#business`;
}

function sameAsProfiles(): string[] {
  return contactChannels
    .filter((channel) => channel.href !== null && channel.key !== "email")
    .map((channel) => channel.href as string);
}

function emailChannel(): string | null {
  const email = contactChannels.find(
    (channel) => channel.key === "email" && channel.value !== null,
  );
  return (email?.value as string | undefined) ?? null;
}

export function personSchema() {
  const sameAs = sameAsProfiles();
  const email = emailChannel();

  return {
    "@type": "Person",
    "@id": personId(),
    name: site.name,
    jobTitle: site.role,
    description: site.metaDescription,
    url: getSiteUrl(),
    knowsAbout: allTechnologies(),
    ...(email ? { email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: site.brand,
    description: site.metaDescription,
    url: getSiteUrl(),
    inLanguage: "en",
    publisher: { "@id": personId() },
  };
}

export function professionalServiceSchema() {
  const services = allServices();

  return {
    "@type": "ProfessionalService",
    "@id": businessId(),
    name: site.brand,
    description: site.metaDescription,
    url: getSiteUrl(),
    founder: { "@id": personId() },
    areaServed: "Worldwide",
    serviceType: services.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.promise,
          url: absoluteUrl(`/services/${service.slug}`, getSiteUrl()),
        },
      })),
    },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, getSiteUrl()),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  capabilities: string[];
}) {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path, getSiteUrl()),
    provider: { "@id": personId() },
    serviceType: input.name,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: input.name,
      itemListElement: input.capabilities.map((capability) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: capability },
      })),
    },
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}) {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path, getSiteUrl()),
    author: { "@id": personId() },
    publisher: { "@id": personId() },
    ...(input.image
      ? { image: absoluteUrl(input.image, getSiteUrl()) }
      : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
  };
}

/** Wraps nodes in a single @graph document. */
export function schemaGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
