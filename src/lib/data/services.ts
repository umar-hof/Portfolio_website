import type { Service } from "@/lib/types";

/* ==========================================================================
   SERVICES

   Framed around the problem a client has, not around a list of technologies.
   Each service owns a statically generated page at /services/<slug>.
   ========================================================================== */

export const services: Service[] = [
  {
    slug: "ai-development",
    title: "AI Development",
    eyebrow: "AI systems",
    icon: "ai",
    promise: "Build practical AI-powered applications for your business or product.",
    description:
      "AI is only worth building when it removes real work. I design and ship systems that answer questions from your own documents, handle repetitive reasoning, and fit inside the software you already use — with the accuracy guardrails that keep them trustworthy in production.",
    capabilities: [
      "AI chatbots and assistants",
      "LLM-powered applications",
      "RAG systems over private knowledge bases",
      "AI agents that call tools and APIs",
      "Document AI and information extraction",
      "AI features inside existing products",
    ],
    deliverables: [
      "Working AI application deployed to production",
      "Grounded retrieval layer over your own content",
      "Evaluation notes on accuracy and failure modes",
      "Handover documentation for your team",
    ],
    engagement: ["2–6 week build", "Fixed scope or iterative", "Existing product integration"],
    featured: true,
    order: 1,
  },
  {
    slug: "web-development",
    title: "Web Application Development",
    eyebrow: "Product & web",
    icon: "web",
    promise: "Web applications that hold up under real users, not just in a demo.",
    description:
      "Business applications, SaaS products and internal tools built with modern frontend engineering. Fast, accessible, responsive, and structured so new features can be added without rewriting what already works.",
    capabilities: [
      "Business applications",
      "SaaS products and MVPs",
      "Operational dashboards",
      "Admin panels and back-office tools",
      "Customer and partner portals",
      "Custom web applications",
    ],
    deliverables: [
      "Responsive, accessible interface across all breakpoints",
      "Component architecture your team can extend",
      "SEO and performance fundamentals in place",
      "Deployment pipeline to production",
    ],
    engagement: ["3–8 week build", "Design-led or design-supplied", "MVP or full product"],
    featured: true,
    order: 2,
  },
  {
    slug: "backend-development",
    title: "Backend & API Development",
    eyebrow: "Systems",
    icon: "backend",
    promise: "A service layer your frontend, mobile app and partners can rely on.",
    description:
      "The part users never see and businesses always feel. Well-defined APIs, sensible data models, authentication that holds, and business logic kept in one place instead of scattered across screens.",
    capabilities: [
      "REST API design and implementation",
      "Authentication and authorisation",
      "Business logic and workflow services",
      "Database design, queries and migrations",
      "Third-party and payment API integration",
      "Background jobs and scheduled processing",
    ],
    deliverables: [
      "Documented, versioned API endpoints",
      "Relational schema with migrations",
      "Centralised validation and error handling",
      "Local and production environment setup",
    ],
    engagement: ["2–6 week build", "Greenfield or rescue work", "Integration into existing systems"],
    featured: true,
    order: 3,
  },
  {
    slug: "automation",
    title: "Automation",
    eyebrow: "Workflows",
    icon: "automation",
    promise: "Remove the repetitive work that quietly consumes your team's week.",
    description:
      "Manual data handling is slow, inconsistent and impossible to scale. I build automation that moves information between your tools reliably, validates it on the way, and tells you when something needs a human.",
    capabilities: [
      "Business process automation",
      "AI-assisted workflows",
      "Data processing and transformation",
      "API and webhook automation",
      "Scheduled jobs and reporting pipelines",
      "Integration between disconnected tools",
    ],
    deliverables: [
      "Automated pipeline running on a schedule or trigger",
      "Validation and error handling at each step",
      "Run history and failure alerting",
      "Documentation of every integration point",
    ],
    engagement: ["1–4 week build", "Process audit included", "Ongoing support available"],
    featured: true,
    order: 4,
  },
  {
    slug: "product-development",
    title: "Full Product Development",
    eyebrow: "Idea to production",
    icon: "product",
    promise: "From idea to production — one engineer accountable for the whole product.",
    description:
      "If you have a product idea and no idea how to turn it into working software, this is the end-to-end path. Interface, backend, database, AI features and deployment, designed together so the pieces actually fit.",
    capabilities: [
      "Requirements and scope definition",
      "Product structure and user experience",
      "Frontend, backend and database",
      "AI and third-party integrations",
      "Testing and production deployment",
      "Iteration after launch",
    ],
    deliverables: [
      "Scoped feature plan before development starts",
      "Working product deployed and usable by real users",
      "Source code and deployment configuration",
      "Post-launch iteration plan",
    ],
    engagement: ["6–12+ week build", "Milestone-based delivery", "Long-term partnership"],
    featured: true,
    order: 5,
  },
];

/* ==========================================================================
   Selectors
   ========================================================================== */

export function allServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function serviceSlugs(): string[] {
  return services.map((service) => service.slug);
}
