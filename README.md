# Umar_AI_Devs — freelancing portfolio & client-conversion site

A conversion-focused website for a **Software Engineer specializing in AI**.
Its job is not to be a CV — it is to take a visitor from an advertisement to a
qualified project enquiry.

```
AD → LANDING PAGE → "I understand what he does" → "I can see what he built"
   → "I trust his technical capability" → START A PROJECT → LEAD
```

**Where to start:** [`CONTENT_CHECKLIST.md`](./CONTENT_CHECKLIST.md). Nothing on
this site is invented — every unsupplied fact renders as a visible
`[SOMETHING REQUIRED]` marker rather than a plausible-looking placeholder.

## Stack

| Concern     | Choice                                                  |
| ----------- | ------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack), React 19            |
| Language    | TypeScript, strict mode                                  |
| Styling     | Tailwind CSS v4 (CSS-first tokens in `globals.css`)      |
| Motion      | Framer Motion, app-wide `reducedMotion="user"`           |
| Icons       | Lucide React + three inlined brand marks                 |
| Forms       | React Hook Form + Zod (same schema on client and server) |
| Database    | Supabase (env-gated, optional)                           |
| Deployment  | Vercel                                                   |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — the site runs with none of it set
npm run dev
```

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Development server               |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | `tsc --noEmit`                   |

## Routes

```
/                                  Homepage — full conversion narrative
/work                              Selected work index
/work/[slug]                       Dynamic case studies
/services                          Services index
/services/[slug]                   ai-development · web-development
                                   backend-development · automation
                                   product-development
/about                             Background and approach
/contact                           Lead capture (primary conversion target)

/ai-development                    Ad landing pages — one per paid campaign
/web-development                   (hero → problem → solutions → proof →
/automation                         process → FAQ → CTA → contact)
/saas-development

/api/contact                       POST — validated, rate-limited lead intake
/sitemap.xml · /robots.txt · /opengraph-image
```

Homepage order follows the conversion sequence: hero → capability strip → value
proposition → services → selected work → featured case study → process → why →
stack → about → FAQ → CTA → contact.

## Architecture

```
src/
├── app/                     routes, metadata, sitemap, robots, OG image
├── components/
│   ├── analytics/           env-gated GA/GTM + CTA click tracking
│   ├── home/                homepage sections
│   ├── icons/               inlined GitHub / LinkedIn / WhatsApp marks
│   ├── landing/             the reusable ad landing-page template
│   ├── layout/              navbar, mobile menu, footer, breadcrumbs, background
│   ├── providers/           MotionConfig wrapper
│   ├── seo/                 JSON-LD renderer
│   ├── shared/              cards, timeline, accordion, contact form, CTA
│   ├── ui/                  primitives: Button, Section, Reveal, Badge…
│   └── work/                case study blocks and architecture diagram
└── lib/
    ├── data/                ALL content lives here — edit this, not components
    ├── supabase/            server-only lead store
    ├── validation/          the contact schema shared by client and server
    ├── analytics.ts         UTM capture + event tracking
    ├── metadata.ts          consistent page metadata
    └── structured-data.ts   schema.org graph builders
```

**To change content, edit `src/lib/data/`.** Pages and components read from it,
so adding a project or service publishes its pages, sitemap entries and
navigation links automatically.

## Key decisions

**Nothing is fabricated.** No invented projects, clients, testimonials, metrics
or screenshots. Unsupplied content renders as an obvious, greppable marker.
`results` is empty until real numbers exist, and the testimonials section does
not render at all while no reviews are present.

**Dark-first, single accent.** Near-black surfaces, one cyan accent, fine
borders, a masked grid. Gradients and glow are kept faint enough that they never
compete with text for contrast.

**Server-first.** Only five components are client-side: navbar, mobile menu,
mobile sticky CTA, the contact form and the motion provider. The hero system
diagram, process timeline, architecture diagrams and FAQ accordion are all
CSS-only — no JavaScript shipped for decoration.

**Accessible by construction.** Native `<details>` for the FAQ, `<ol>` for the
process timeline, breadcrumb `<nav>` with `aria-current`, a skip link, a
focus-trapped mobile dialog that closes on Escape and restores focus,
`aria-invalid` + `role="alert"` on form errors, and `prefers-reduced-motion`
honoured both in CSS and via `MotionConfig`.

**Spam handling that does not cost real leads.** Five layers, cheapest first:
body-size cap → Zod validation → honeypot → interaction-timing check →
per-instance rate limit. Honeypot and timing failures return success and are
dropped silently; the timing check is skipped entirely when no interaction was
observed (browser autofill), because losing a real enquiry is worse than letting
one bot through.

**Analytics that ships nothing by default.** With no GA/GTM env vars set, no
third-party script loads and every tracking call is a no-op. Attribution is
first-touch, stored in `sessionStorage` (no cookies), and carries no personal
data — only campaign labels.

## Deploying

1. Push to a Git repository and import it into Vercel.
2. Set the environment variables from `.env.example` in the Vercel dashboard.
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical
   URLs, `sitemap.xml` and Open Graph tags resolve absolutely.
4. Optionally point the ad campaigns at `/ai-development`, `/web-development`,
   `/automation` or `/saas-development` and append UTM parameters — they are
   captured and stored with every lead.
# Portfolio_website
