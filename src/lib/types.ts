/* ==========================================================================
   Shared domain types.

   Everything the UI renders is described by one of these shapes, so pages and
   components stay free of hardcoded content.
   ========================================================================== */

/** Where a project came from — never blur these together. */
export type ProjectOwnership = "client" | "professional" | "personal" | "practice";

/** One rung of an architecture diagram (Frontend -> API -> Database ...). */
export interface ArchitectureLayer {
  label: string;
  detail: string;
}

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  features: string[];
  architecture: ArchitectureLayer[];
  /** What *I* personally built, as opposed to the wider team. */
  role: string;
  challenges: string[];
  /** Leave empty rather than inventing numbers. */
  results: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** One-line problem -> solution. Shown on cards and in metadata. */
  summary: string;
  category: string;
  technologies: string[];
  /** `null` renders generated placeholder art instead of a screenshot. */
  image: string | null;
  imageAlt: string;
  featured: boolean;
  /** Curated position in "Selected Work". Lower sorts first. */
  order: number;
  liveUrl: string | null;
  githubUrl: string | null;
  ownership: ProjectOwnership;
  year: string | null;
  caseStudy: ProjectCaseStudy;
  /** True while this entry still contains `[PLACEHOLDER]` markers. */
  placeholder: boolean;
}

/** Maps to a Lucide icon in `components/ui/ServiceIcon.tsx`. */
export type ServiceIconKey =
  | "ai"
  | "web"
  | "backend"
  | "automation"
  | "product";

export interface Service {
  slug: string;
  title: string;
  /** Short label used in nav-adjacent contexts and cards. */
  eyebrow: string;
  icon: ServiceIconKey;
  /** The client-facing outcome, one sentence. */
  promise: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  /** Typical engagement shapes, e.g. "2-6 week build". */
  engagement: string[];
  featured: boolean;
  order: number;
}

export interface SkillGroup {
  title: string;
  /** Lucide icon key, resolved in `components/shared/TechStackGrid.tsx`. */
  icon: "code" | "layout" | "server" | "brain" | "database" | "mobile" | "tools";
  items: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  /** Concrete artefacts produced at this stage. */
  output: string[];
}

export interface ValuePoint {
  title: string;
  description: string;
  icon: "layers" | "brain" | "target" | "sparkles" | "package";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Only set once a real, verifiable review exists. */
  source: string | null;
}

export interface ContactChannel {
  key: "email" | "linkedin" | "whatsapp" | "github";
  label: string;
  /** `null` until a real address is supplied — renders a marked placeholder. */
  value: string | null;
  href: string | null;
}

export interface LandingPageContent {
  slug: string;
  /** Drives <title> and the hero eyebrow. */
  eyebrow: string;
  title: string;
  intro: string;
  /** Problem framing shown directly under the hero. */
  problem: {
    heading: string;
    body: string;
    painPoints: string[];
  };
  solutions: {
    heading: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  /** Which project slugs to surface as proof of capability. */
  proofSlugs: string[];
  faq: FaqItem[];
  closing: {
    heading: string;
    body: string;
  };
}
