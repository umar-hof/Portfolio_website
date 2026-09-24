import type { ContactChannel } from "@/lib/types";
import { absoluteUrl, normalizeUrl } from "@/lib/utils";

/* ==========================================================================
   Site-wide identity and links.

   ── CONTENT TO REPLACE ────────────────────────────────────────────────────
   The `contact` entries below are `null` on purpose. Nothing is invented and
   nothing false is published: while a value is `null` the UI renders a marked
   placeholder chip instead of a link. Set `value` and `href` once you have the
   real details and the links appear automatically everywhere.

   See CONTENT_CHECKLIST.md for the full list of what to fill in.
   ========================================================================== */

export const site = {
  brand: "M_Umar_Farooq",
  /** Single-letter mark used in the navbar and footer. */
  brandMark: "U",
  name: "Umar",
  /** Primary positioning. Used verbatim in titles and metadata. */
  role: "Software Engineer specializing in AI",
  shortDescription:
    "I design and build software products powered by modern AI — web applications, backend systems, automation, and intelligent tools that solve real business problems.",
  /** Used as the default <meta name="description">. */
  metaDescription:
    "Software Engineer specializing in AI. I build web applications, backend systems, AI-powered products and automation for startups and businesses — from idea to production.",
  /** Fallback origin when NEXT_PUBLIC_SITE_URL is unset (local dev / preview). */
  fallbackUrl: "http://localhost:3000",
} as const;

/** Canonical origin, resolved from the environment with a safe fallback. */
export function getSiteUrl() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || site.fallbackUrl);
}

export function siteUrl(path = "/") {
  return absoluteUrl(path, getSiteUrl());
}

/* ==========================================================================
   Navigation
   ========================================================================== */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

/** Secondary links surfaced in the footer only. */
export const footerServiceNav: NavItem[] = [
  { label: "AI Development", href: "/services/ai-development" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Automation", href: "/services/automation" },
  { label: "Backend & APIs", href: "/services/backend-development" },
  { label: "Full Product", href: "/services/product-development" },
];

/* ==========================================================================
   Calls to action
   ========================================================================== */

export const cta = {
  primary: { label: "Start a Project", href: "/contact" },
  secondary: { label: "View My Work", href: "/work" },
  tertiary: { label: "Let's Build Your Idea", href: "/contact" },
} as const;

/* ==========================================================================
   Contact channels — set the real values, or leave null to hide.
   ========================================================================== */

export const contactChannels: ContactChannel[] = [
  {
    key: "email",
    label: "Email",
    // TODO(content): e.g. value: "hello@yourdomain.com", href: "mailto:hello@yourdomain.com"
    value: null,
    href: null,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    // TODO(content): e.g. value: "linkedin.com/in/your-handle", href: "https://linkedin.com/in/your-handle"
    value: null,
    href: null,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    // TODO(content): e.g. value: "+00 000 000 0000", href: "https://wa.me/000000000000"
    value: null,
    href: null,
  },
  {
    key: "github",
    label: "GitHub",
    // TODO(content): e.g. value: "github.com/your-handle", href: "https://github.com/your-handle"
    value: null,
    href: null,
  },
];

/** Channels that are actually configured. Used to skip empty sections. */
export function configuredChannels() {
  return contactChannels.filter((channel) => channel.href !== null);
}
