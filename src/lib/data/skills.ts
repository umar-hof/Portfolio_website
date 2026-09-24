import type { SkillGroup } from "@/lib/types";

/* ==========================================================================
   TECHNOLOGY STACK

   Groups are ordered by how a client reads them: what I build with first,
   supporting infrastructure last. Only technologies actually in use.
   ========================================================================== */

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["Python", "JavaScript", "TypeScript", "Kotlin"],
  },
  {
    title: "Frontend",
    icon: "layout",
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: "server",
    items: ["Python", "Flask", "FastAPI", "REST APIs"],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    items: [
      "Machine Learning",
      "NLP",
      "LLMs",
      "Generative AI",
      "RAG",
      "Embeddings",
      "AI Agents",
    ],
  },
  {
    title: "Databases",
    icon: "database",
    items: ["MySQL", "PostgreSQL", "Supabase", "Vector Databases"],
  },
  {
    title: "Mobile",
    icon: "mobile",
    items: ["Flutter", "Kotlin"],
  },
  {
    title: "Tools & Infrastructure",
    icon: "tools",
    items: ["Git", "GitHub", "Linux", "Cloud", "Deployment"],
  },
];

/** Short list for compact surfaces (hero trust strip, metadata keywords). */
export const coreCapabilities = [
  "Software Engineering",
  "AI Development",
  "Full-Stack Development",
  "Backend Systems",
  "Automation",
] as const;

/** Flat list used for metadata keywords and the tech ticker. */
export function allTechnologies(): string[] {
  return Array.from(new Set(skillGroups.flatMap((group) => group.items)));
}
