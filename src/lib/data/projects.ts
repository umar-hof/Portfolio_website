import type { Project } from "@/lib/types";

/* ==========================================================================
   SELECTED WORK

   ── EVERYTHING BELOW IS A PLACEHOLDER ─────────────────────────────────────
   No client names, metrics, screenshots or testimonials are invented. Each
   entry describes a *capability area* and carries `[SOMETHING REQUIRED]`
   markers where your real content goes. While `placeholder: true`, the UI
   renders a "PLACEHOLDER CONTENT" chip and a notice banner on /work.

   To publish the real thing:
     1. Replace `title`, `summary`, `category` and `technologies`.
     2. Fill every `[.. REQUIRED]` marker in `caseStudy`.
     3. Set `image` to a screenshot path in /public (e.g. "/work/foo.png").
     4. Set `liveUrl` / `githubUrl` if they exist, or leave them `null`.
     5. Set `ownership` honestly: client | professional | personal | practice.
     6. Flip `placeholder` to `false` once every marker is gone.

   Order is curated, not chronological — strongest, most client-relevant first.
   ========================================================================== */

export const projects: Project[] = [
  {
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Retrieval-augmented assistant that answers questions from a private document set with cited sources.",
    category: "RAG / LLM Application",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Embeddings", "Vector Database"],
    image: null,
    imageAlt: "Placeholder preview for the AI Knowledge Assistant project",
    featured: true,
    order: 1,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] What was the user or business actually struggling with before this existed? Be specific.",
      solution:
        "[SOLUTION REQUIRED] What did you build, and why does it solve that problem better than the alternative?",
      features: [
        "[FEATURE REQUIRED] Document ingestion and automatic chunking",
        "[FEATURE REQUIRED] Semantic search across the knowledge base",
        "[FEATURE REQUIRED] Answers grounded in retrieved passages, with source references",
        "[FEATURE REQUIRED] Conversation history and follow-up questions",
      ],
      architecture: [
        { label: "Documents", detail: "PDFs, docs and internal pages ingested on upload" },
        { label: "Processing", detail: "Text extraction, cleaning and chunking" },
        { label: "Embeddings", detail: "Chunks converted into vectors" },
        { label: "Vector Database", detail: "Persistent similarity index" },
        { label: "Retriever", detail: "Top-k nearest-neighbour search per question" },
        { label: "LLM", detail: "Answer generation constrained to retrieved context" },
        { label: "Response", detail: "Cited answer streamed back to the interface" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] What technical problem was genuinely hard, and how did you resolve it?",
      ],
      results: [],
    },
  },
  {
    slug: "ai-support-chatbot",
    title: "AI Support Chatbot",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Always-available AI assistant that handles first-line customer questions and hands off to a human when unsure.",
    category: "AI Chatbot",
    technologies: ["Python", "LLM APIs", "Next.js", "PostgreSQL", "REST APIs"],
    image: null,
    imageAlt: "Placeholder preview for the AI Support Chatbot project",
    featured: true,
    order: 2,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] Which customer questions were costing time or being answered inconsistently?",
      solution:
        "[SOLUTION REQUIRED] How does the assistant resolve them, and what happens when it cannot?",
      features: [
        "[FEATURE REQUIRED] Grounded answers from a curated knowledge source",
        "[FEATURE REQUIRED] Confidence threshold with human hand-off",
        "[FEATURE REQUIRED] Full conversation transcript stored per session",
        "[FEATURE REQUIRED] Admin view of unanswered questions",
      ],
      architecture: [
        { label: "Chat UI", detail: "Embeddable widget and standalone web page" },
        { label: "API", detail: "Message endpoint with session and rate handling" },
        { label: "Orchestration", detail: "Intent routing, prompt assembly and guardrails" },
        { label: "LLM", detail: "Response generation with fallback on low confidence" },
        { label: "Database", detail: "Conversations, messages and escalation queue" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] How did you keep answers accurate and prevent hallucinated responses?",
      ],
      results: [],
    },
  },
  {
    slug: "saas-application-platform",
    title: "SaaS Application Platform",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Multi-tenant web application with authentication, billing-ready accounts and an operational dashboard.",
    category: "Full-Stack Web Application",
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "PostgreSQL", "REST APIs"],
    image: null,
    imageAlt: "Placeholder preview for the SaaS Application Platform project",
    featured: true,
    order: 3,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] What workflow was being run in spreadsheets, email or a legacy tool?",
      solution:
        "[SOLUTION REQUIRED] What does the product let users do that they could not do before?",
      features: [
        "[FEATURE REQUIRED] Account creation and authentication",
        "[FEATURE REQUIRED] Role-based access for admins and members",
        "[FEATURE REQUIRED] Operational dashboard with key metrics",
        "[FEATURE REQUIRED] Exportable reports and audit history",
      ],
      architecture: [
        { label: "Frontend", detail: "Next.js App Router with server-rendered pages" },
        { label: "API", detail: "Route handlers with validated request payloads" },
        { label: "Backend", detail: "Business logic, permissions and background jobs" },
        { label: "Database", detail: "PostgreSQL with migrations and indexed queries" },
        { label: "Integrations", detail: "Third-party services and webhooks" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] What was the hardest part of the data model or permissions?",
      ],
      results: [],
    },
  },
  {
    slug: "business-workflow-automation",
    title: "Business Workflow Automation",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Automation pipeline that replaces repetitive manual data handling with a monitored, retryable workflow.",
    category: "Automation",
    technologies: ["Python", "REST APIs", "PostgreSQL", "Linux", "Deployment"],
    image: null,
    imageAlt: "Placeholder preview for the Business Workflow Automation project",
    featured: true,
    order: 4,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] Which manual process was slow, error-prone or dependent on one person?",
      solution:
        "[SOLUTION REQUIRED] What now happens automatically, and how is failure handled?",
      features: [
        "[FEATURE REQUIRED] Scheduled and event-triggered execution",
        "[FEATURE REQUIRED] Validation before data reaches downstream systems",
        "[FEATURE REQUIRED] Retry and failure alerting",
        "[FEATURE REQUIRED] Run history with per-step status",
      ],
      architecture: [
        { label: "Trigger", detail: "Schedule or inbound webhook starts a run" },
        { label: "Processing", detail: "Validation, transformation and enrichment" },
        { label: "Integrations", detail: "External APIs and internal services" },
        { label: "Database", detail: "State, run log and processed-record tracking" },
        { label: "Monitoring", detail: "Status reporting and alerting on failure" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] How did you make the workflow safe to re-run without duplicating work?",
      ],
      results: [],
    },
  },
  {
    slug: "backend-api-platform",
    title: "Backend & API Platform",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Documented service layer providing authentication, business logic and database access for client applications.",
    category: "Backend Systems",
    technologies: ["Python", "FastAPI", "Flask", "PostgreSQL", "MySQL", "REST APIs"],
    image: null,
    imageAlt: "Placeholder preview for the Backend & API Platform project",
    featured: true,
    order: 5,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] Why was the existing API or data access layer holding the product back?",
      solution:
        "[SOLUTION REQUIRED] What does the new service layer provide, and how is it consumed?",
      features: [
        "[FEATURE REQUIRED] Token-based authentication and scoped permissions",
        "[FEATURE REQUIRED] Versioned, documented endpoints",
        "[FEATURE REQUIRED] Centralised validation and consistent error responses",
        "[FEATURE REQUIRED] Database migrations and seed data",
      ],
      architecture: [
        { label: "Clients", detail: "Web and mobile applications" },
        { label: "API Layer", detail: "Versioned REST endpoints with schema validation" },
        { label: "Service Layer", detail: "Business rules isolated from transport" },
        { label: "Data Access", detail: "Query layer with connection pooling" },
        { label: "Database", detail: "Relational schema with migrations" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] What shaped the schema or API contract decisions?",
      ],
      results: [],
    },
  },
  {
    slug: "document-intelligence-tool",
    title: "Document Intelligence Tool",
    summary:
      "[PROJECT SUMMARY REQUIRED] — Extraction pipeline that turns unstructured documents into structured, searchable records.",
    category: "Document AI",
    technologies: ["Python", "Machine Learning", "NLP", "PostgreSQL", "Next.js"],
    image: null,
    imageAlt: "Placeholder preview for the Document Intelligence Tool project",
    featured: false,
    order: 6,
    liveUrl: null,
    githubUrl: null,
    ownership: "personal",
    year: null,
    placeholder: true,
    caseStudy: {
      problem:
        "[PROBLEM REQUIRED] Which documents were being read and retyped by hand?",
      solution:
        "[SOLUTION REQUIRED] What is extracted automatically, and how accurate is it in practice?",
      features: [
        "[FEATURE REQUIRED] Batch upload of mixed document formats",
        "[FEATURE REQUIRED] Field extraction with confidence scoring",
        "[FEATURE REQUIRED] Human review queue for low-confidence results",
        "[FEATURE REQUIRED] Structured export to downstream systems",
      ],
      architecture: [
        { label: "Upload", detail: "Batch intake with format detection" },
        { label: "Text Extraction", detail: "OCR and layout parsing where required" },
        { label: "Model", detail: "Field classification and value extraction" },
        { label: "Review", detail: "Confidence thresholds route uncertain records to a human" },
        { label: "Storage", detail: "Structured records with full audit trail" },
      ],
      role: "[MY ROLE REQUIRED] Which parts did you personally design and build?",
      challenges: [
        "[CHALLENGE REQUIRED] How did you handle inconsistent document layouts?",
      ],
      results: [],
    },
  },
];

/* ==========================================================================
   Selectors — keep page components free of filtering logic.
   ========================================================================== */

/** Curated "Selected Work" order. */
export function selectedWork(limit?: number): Project[] {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function featuredProjects(limit = 6): Project[] {
  return selectedWork().filter((project) => project.featured).slice(0, limit);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjects(slugs: string[]): Project[] {
  return slugs
    .map((slug) => getProject(slug))
    .filter((project): project is Project => Boolean(project));
}

export function projectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** True while any project still carries authoring markers. */
export const workHasPlaceholders = projects.some((project) => project.placeholder);
