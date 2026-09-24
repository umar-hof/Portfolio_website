import type { FaqItem } from "@/lib/types";

/* ==========================================================================
   FAQ

   Answers describe how I actually work. No fixed timelines are promised
   without requirements, and no guarantees that depend on third parties.
   ========================================================================== */

export const faqs: FaqItem[] = [
  {
    question: "What kind of projects do you work on?",
    answer:
      "Mostly software products and the systems behind them: web applications, SaaS products and internal tools, backend services and APIs, AI-powered features and assistants, and automation that replaces manual work. If your project needs a database, a user interface and some logic in between, it is probably a fit.",
  },
  {
    question: "Can you build an AI-powered application from scratch?",
    answer:
      "Yes. That usually means deciding what the AI should actually do, designing the data pipeline that feeds it, choosing between a hosted model and a self-managed one, building the retrieval or tool layer it needs to be accurate, and then wrapping it in a real application with authentication, storage and an interface people can use. The AI is one component of a working product, not the whole thing.",
  },
  {
    question: "Can you add AI to an application I already have?",
    answer:
      "Yes, and it is often the better option. I start by looking at your existing codebase, data and constraints, then integrate the AI capability where it fits — usually behind your existing API layer so the rest of your application is unaffected if the model or provider changes later.",
  },
  {
    question: "I already have a developer or an existing codebase. Can you work with that?",
    answer:
      "Yes. I can join an existing frontend, backend or both, follow your conventions and contribute without rewriting what works. If the existing code is going to block progress, I will tell you plainly and propose the smallest change that unblocks it rather than pushing for a rebuild.",
  },
  {
    question: "Do you handle deployment and getting it live?",
    answer:
      "Yes — deployment is part of the work, not an afterthought. Depending on the project that means configuring the production environment and environment variables, setting up the database and migrations, building a deployment pipeline, and verifying the live system behaves the same as it did in testing. You get the deployed product plus the configuration needed to run it.",
  },
  {
    question: "How does a project start?",
    answer:
      "With a conversation. You describe what you are trying to build and what problem it solves. I ask enough questions to understand scope, constraints and priorities, then come back with a written proposal covering what will be built, what is explicitly out of scope, the milestones, and the cost. Development begins once that is agreed — no work starts before you know what you are getting.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends entirely on scope, and I will not quote a timeline before understanding the requirements. A focused automation or a single well-defined feature can be a matter of days. A full product with authentication, payments and AI features is measured in months. After the discovery conversation you get a realistic milestone-based estimate, and if scope changes we revisit it rather than pretending the original date still holds.",
  },
  {
    question: "How do we communicate during the project?",
    answer:
      "However suits you — email, a shared channel, or scheduled calls. You get progress updates at each milestone and working builds you can actually open, rather than status reports describing work you cannot see.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You own the source code and the deployed system. Many projects then move into an iteration phase where we act on real usage: fixing what surfaces, refining what people struggle with, and adding the features that only become obvious once the product is in front of users.",
  },
];
