import type { LandingPageContent } from "@/lib/types";

/* ==========================================================================
   AD LANDING PAGES

   One entry per paid-traffic destination. The copy is aligned to the intent
   that brought the visitor here, so the page can match its advertisement.

   Every entry renders through components/landing/LandingPage.tsx in the
   order: Hero -> Problem -> Solutions -> Proof -> Process -> FAQ -> CTA.
   Proof is pulled from real project data via `proofSlugs`, so case study
   links stay correct automatically.
   ========================================================================== */

export const landingPages: LandingPageContent[] = [
  {
    slug: "ai-development",
    eyebrow: "AI Development",
    title: "AI features that work in production, not just in a demo",
    intro:
      "I build AI-powered applications and features that answer real questions from your own data, handle the cases they should refuse, and run reliably once real users touch them.",
    problem: {
      heading: "Most AI projects stall between the prototype and production",
      body: "A demo that impresses in a meeting is not the same as a system that holds up under real usage. The gap is almost never the model — it is the data pipeline, the accuracy guardrails, the cost per request, and what happens when the AI is wrong. That is the part I build.",
      painPoints: [
        "A prototype that never made it into the product",
        "Answers that sound confident but are wrong",
        "Knowledge trapped in documents nobody can search",
        "Manual work that should have been automated already",
        "No clear way to measure whether the AI is actually helping",
      ],
    },
    solutions: {
      heading: "What I build",
      intro:
        "AI work is only useful when it is attached to something people can use. Every engagement produces a deployed feature, not a notebook.",
      items: [
        {
          title: "Assistants over your own knowledge",
          description:
            "Chat and search interfaces grounded in your documents, so answers come from your content instead of the model's general training.",
        },
        {
          title: "RAG systems",
          description:
            "Ingestion, chunking, embeddings, retrieval and answer generation wired together as one pipeline you can maintain.",
        },
        {
          title: "AI agents and tool use",
          description:
            "Systems that call your APIs and services to complete multi-step work rather than just producing text.",
        },
        {
          title: "Document and information extraction",
          description:
            "Turning unstructured documents into structured records, with a human review path for the uncertain cases.",
        },
        {
          title: "AI added to existing software",
          description:
            "New capability inside the product you already run, behind your existing API layer and your existing interface.",
        },
        {
          title: "Automation with AI in the loop",
          description:
            "Pipelines where the reasoning is automated but validation and failure handling are still explicit.",
        },
      ],
    },
    proofSlugs: ["ai-knowledge-assistant", "ai-support-chatbot", "document-intelligence-tool"],
    faq: [
      {
        question: "Do I need my own data before this is worth doing?",
        answer:
          "You need content the AI should reason over — documentation, policies, product information, historical tickets. If that material exists anywhere, even as PDFs or a shared drive, it can usually be turned into a usable knowledge base. If it genuinely does not exist yet, that is worth knowing before spending on AI.",
      },
      {
        question: "Which model or provider do you use?",
        answer:
          "Whatever fits the requirement. The integration is written so the provider sits behind a single interface — if you later need to switch, self-host, or route different tasks to different models, that change stays contained instead of rippling through the application.",
      },
      {
        question: "How do you stop it from making things up?",
        answer:
          "By constraining what the model is allowed to answer from. Retrieval limits responses to retrieved source material, prompts instruct the model to say when context is insufficient, and confidence thresholds route uncertain cases to a human or a fallback path. There is no setting that makes hallucination impossible, so the design assumes it will happen and handles it.",
      },
      {
        question: "What does this cost to run?",
        answer:
          "It depends on volume and model choice, and I treat it as an engineering constraint rather than an afterthought. Caching, retrieval limits and prompt sizing all affect the per-request cost, and I will give you a realistic estimate based on your expected usage before you commit.",
      },
    ],
    closing: {
      heading: "Have an AI project in mind?",
      body: "Tell me what you want it to do and what problem it solves. I will tell you honestly whether AI is the right answer.",
    },
  },
  {
    slug: "web-development",
    eyebrow: "Web Development",
    title: "Web applications built to be used, not just launched",
    intro:
      "Business applications, SaaS products and internal tools built with modern web engineering — fast, accessible, responsive, and structured so the next feature does not require a rewrite.",
    problem: {
      heading: "A spreadsheet is not a system",
      body: "Most businesses outgrow their tools long before they replace them. Processes run through spreadsheets, shared inboxes and one person who knows how everything connects. It works until it doesn't — until the data conflicts, the person leaves, or the volume makes manual handling impossible.",
      painPoints: [
        "Critical workflows living in spreadsheets",
        "Internal tools nobody wants to use",
        "A product that works on desktop but not on phones",
        "Features that take weeks because the codebase resists change",
        "No visibility into what is actually happening in the business",
      ],
    },
    solutions: {
      heading: "What I build",
      intro:
        "From a focused internal tool to a full customer-facing product. Same engineering standards either way.",
      items: [
        {
          title: "Custom web applications",
          description:
            "Software shaped around how your business actually operates, instead of your business bending to a rigid off-the-shelf tool.",
        },
        {
          title: "SaaS products",
          description:
            "Multi-user products with accounts, permissions and the foundation needed to grow past the first version.",
        },
        {
          title: "Dashboards and admin panels",
          description:
            "One place to see the numbers and manage the data, replacing five exports and a manual reconciliation.",
        },
        {
          title: "Customer and partner portals",
          description:
            "Let customers or partners self-serve the information and actions that currently arrive as emails and phone calls.",
        },
        {
          title: "Internal operational tools",
          description:
            "Tools your team will actually use, because they replace real friction rather than adding a step.",
        },
        {
          title: "Existing product improvements",
          description:
            "Performance, responsiveness, accessibility and maintainability work on a product that already exists.",
        },
      ],
    },
    proofSlugs: ["saas-application-platform", "business-workflow-automation", "backend-api-platform"],
    faq: [
      {
        question: "Can you work from a design I already have?",
        answer:
          "Yes. Figma files, a design system, or even detailed screenshots work as a starting point. If there are states the design does not cover — loading, empty, error, long content — I will raise them rather than inventing something silently.",
      },
      {
        question: "Will it work on mobile?",
        answer:
          "Yes, and it is designed for mobile rather than shrunken into it. Layouts are planned per breakpoint from 320px upward, because most business software now gets used on a phone at least some of the time.",
      },
      {
        question: "Can the site be found on Google?",
        answer:
          "Technical SEO is built in from the start: semantic markup, proper heading structure, metadata, canonical URLs, a sitemap and structured data. That gives search engines a correct foundation — ranking for competitive terms then depends on content and authority, which is a separate ongoing effort.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. The work lives in your repository and your deployment accounts, handed over with the configuration needed to run it. I do not hold client projects hostage behind a proprietary platform.",
      },
    ],
    closing: {
      heading: "Need a web application built?",
      body: "Describe the workflow you want to improve and I will tell you what it takes to build it properly.",
    },
  },
  {
    slug: "automation",
    eyebrow: "Automation",
    title: "Stop paying people to copy data between tools",
    intro:
      "I build automation that moves information between your systems reliably, validates it on the way, and tells you when something needs a human — so repetitive work stops consuming your week.",
    problem: {
      heading: "Manual processes do not scale, and they fail quietly",
      body: "Every manual hand-off is a chance for a transcription error, a missed update or a delay nobody notices until a customer does. The cost rarely shows up as one large problem. It shows up as hours every week, spread across people who have better things to do.",
      painPoints: [
        "The same data typed into two or three different systems",
        "End-of-month reporting assembled by hand",
        "Updates that arrive by email and get actioned late",
        "A process that only works because one person remembers it",
        "No alert when an integration silently stops working",
      ],
    },
    solutions: {
      heading: "What I build",
      intro:
        "Automation designed on the assumption that things will fail, because they do. Every run is observable and safe to repeat.",
      items: [
        {
          title: "Business process automation",
          description:
            "The multi-step workflow your team repeats daily, turned into a pipeline that runs on a schedule or a trigger.",
        },
        {
          title: "System integration",
          description:
            "Connecting the tools that do not talk to each other, through their APIs where they exist and careful handling where they do not.",
        },
        {
          title: "Data processing pipelines",
          description:
            "Validation, transformation and enrichment, so downstream systems receive clean data instead of whatever arrived.",
        },
        {
          title: "AI-assisted workflows",
          description:
            "Classification, extraction and summarisation inserted at the step where a human was previously reading and deciding.",
        },
        {
          title: "Reporting automation",
          description:
            "Reports generated and delivered on schedule, from live data instead of an export that is already stale.",
        },
        {
          title: "Monitoring and alerting",
          description:
            "Run history and failure notifications, so a broken integration surfaces in minutes rather than at month end.",
        },
      ],
    },
    proofSlugs: ["business-workflow-automation", "document-intelligence-tool", "backend-api-platform"],
    faq: [
      {
        question: "What if my tools do not have an API?",
        answer:
          "Most commercial tools do, at least on paid tiers. Where one genuinely does not, the options are scheduled import and export, a database-level connection, or a documented manual step at the boundary. I will tell you which is realistic for your stack before you commit to anything.",
      },
      {
        question: "What happens if the automation breaks?",
        answer:
          "It is built to fail visibly. Runs are logged step by step, failures trigger alerts rather than silence, and the process is designed to be safe to re-run without duplicating data that was already processed.",
      },
      {
        question: "Will this replace anyone's job?",
        answer:
          "It replaces the repetitive part of one. In practice automation tends to remove the data entry and reconciliation that nobody enjoys, and leaves the judgement calls that actually need a person.",
      },
      {
        question: "How do you start on something like this?",
        answer:
          "With a short process audit. I need to see how the workflow currently runs — who does what, in which tool, in what order — before proposing anything. Automating a process you have not mapped usually automates the wrong thing.",
      },
    ],
    closing: {
      heading: "Have a process worth automating?",
      body: "Walk me through how it works today and I will tell you what can realistically be automated.",
    },
  },
  {
    slug: "saas-development",
    eyebrow: "SaaS Development",
    title: "Take your SaaS idea from concept to a product people can use",
    intro:
      "End-to-end development for founders and businesses with a product idea — accounts, payments, data, interface and AI features built together so the pieces actually fit.",
    problem: {
      heading: "The hardest part is not writing code, it is deciding what to build first",
      body: "Most SaaS ideas do not fail because the technology was impossible. They fail because the first version tried to do everything, took too long to ship, and never reached real users. The engineering decision that matters most is scope.",
      painPoints: [
        "A clear idea and no path from here to working software",
        "A build that keeps growing and never launches",
        "Agencies quoting for features you do not need yet",
        "No technical partner to challenge the plan",
        "Uncertainty about what version one should actually contain",
      ],
    },
    solutions: {
      heading: "What I build",
      intro:
        "The complete path from requirements to a deployed product, with scope decisions made explicitly rather than by accident.",
      items: [
        {
          title: "Scope and requirements",
          description:
            "Turning the idea into a defined first version: what ships now, what waits, and what is deliberately cut.",
        },
        {
          title: "Product structure and UX",
          description:
            "Screens, flows and states designed before development, so the interface is not being invented mid-build.",
        },
        {
          title: "Accounts and permissions",
          description:
            "Authentication, user roles and the access boundaries a multi-user product needs from day one.",
        },
        {
          title: "Application and backend",
          description:
            "Frontend, API, business logic and database, built as one system instead of separately bolted-together pieces.",
        },
        {
          title: "Billing-ready foundations",
          description:
            "The subscription-related data model and integration points prepared, so adding payments later is contained work.",
        },
        {
          title: "Launch and iteration",
          description:
            "Deployed to production, then improved against real usage rather than assumptions.",
        },
      ],
    },
    proofSlugs: ["saas-application-platform", "ai-knowledge-assistant", "backend-api-platform"],
    faq: [
      {
        question: "I have an idea but no technical background. Is that a problem?",
        answer:
          "No — it is the normal starting point. You bring the domain knowledge and the customer insight; I bring the technical decisions. Expect me to explain trade-offs in plain terms and to push back when something is not worth building yet.",
      },
      {
        question: "Should I build an MVP or the full product?",
        answer:
          "Almost always the smaller thing. A version that reaches real users in weeks teaches you more than a feature-complete build that arrives in six months. The architecture is designed so the parts you leave out can be added without redoing the parts you shipped.",
      },
      {
        question: "Can you handle payments and subscriptions?",
        answer:
          "Yes. I prepare the subscription data model and integration points, then integrate the payment provider that suits your market. Billing logic has enough edge cases — failed payments, upgrades, proration, refunds — that it is worth designing deliberately rather than improvising.",
      },
      {
        question: "What if I need to raise investment?",
        answer:
          "A working product with real users is a considerably stronger position than a deck. A live, deployed system demonstrates that you can ship and gives any technical reviewer something concrete to assess.",
      },
    ],
    closing: {
      heading: "Have a product idea?",
      body: "Describe what you want to build. I will tell you what version one should realistically contain.",
    },
  },
];

export function getLandingPage(slug: string): LandingPageContent | undefined {
  return landingPages.find((page) => page.slug === slug);
}

export function landingPageSlugs(): string[] {
  return landingPages.map((page) => page.slug);
}
