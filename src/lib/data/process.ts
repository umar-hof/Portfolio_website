import type { ProcessStep } from "@/lib/types";

/* ==========================================================================
   HOW I WORK

   Six stages, each naming what the client actually receives at that point.
   Rendered as a horizontal timeline on desktop, vertical on mobile.
   ========================================================================== */

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with the problem, not the technology. What are you trying to achieve, who uses it, and what does success look like once it ships?",
    output: ["Requirements summary", "Success criteria", "Scope boundaries"],
  },
  {
    number: "02",
    title: "Planning",
    description:
      "The idea becomes a buildable plan: features, data model, architecture and the technical decisions that shape everything downstream.",
    output: ["Feature breakdown", "Architecture outline", "Delivery milestones"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Product structure and user experience before code. Screens, states, empty cases and error paths get decided here rather than discovered during development.",
    output: ["Screen flows", "Interface direction", "Component inventory"],
  },
  {
    number: "04",
    title: "Development",
    description:
      "Built in structured iterations, so you see working software early instead of waiting for one large reveal at the end.",
    output: ["Working builds", "Progress previews", "Version-controlled source"],
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Functionality, integrations, edge cases and failure states. Anything that touches an external service gets verified against the real thing.",
    output: ["Test pass on key flows", "Fixed defect list", "Edge-case handling"],
  },
  {
    number: "06",
    title: "Deployment",
    description:
      "Launched to production with the environment, configuration and monitoring in place — plus a clear path for what comes next.",
    output: ["Production deployment", "Environment configuration", "Handover documentation"],
  },
];
