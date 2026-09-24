import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PlaceholderNotice } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { selectedWork, workHasPlaceholders } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, schemaGraph } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Selected Work — Software, AI & Digital Products",
  description:
    "Case studies of software, AI and full-stack projects: the problem, the approach, the architecture, and what was actually built.",
  path: "/work",
});

export default function WorkPage() {
  const projects = selectedWork();

  return (
    <>
      <StructuredData
        id="work-structured-data"
        data={schemaGraph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
        ])}
      />

      <PageHeader
        eyebrow="Selected work"
        title="Software I've built"
        description="A curated selection of projects — web applications, AI systems, backend platforms and automation. Each one documents the problem, the approach and the architecture rather than just showing a screenshot."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
      />

      <Section>
        {workHasPlaceholders ? (
          <PlaceholderNotice className="mb-10">
            Every project below is a placeholder entry. Real screenshots,
            summaries, roles and outcomes have not been supplied, so nothing has
            been invented to fill the gaps. Replace them in{" "}
            <code className="font-mono text-amber-100/90">
              src/lib/data/projects.ts
            </code>{" "}
            and flip <code className="font-mono text-amber-100/90">placeholder</code>{" "}
            to <code className="font-mono text-amber-100/90">false</code>.
          </PlaceholderNotice>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05} className="h-full">
              <ProjectCard
                project={project}
                className="h-full"
                priority={index < 3}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="compact" divided>
        <CtaBanner
          heading="Have a project like one of these?"
          body="Tell me what you're building. I'll give you an honest read on scope, approach and what it would take to ship it."
          ctaEvent="work_cta"
        />
      </Section>
    </>
  );
}
