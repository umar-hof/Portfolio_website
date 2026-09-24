import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { PlaceholderNotice } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { selectedWork, workHasPlaceholders } from "@/lib/data/projects";

/**
 * Selected work.
 *
 * Six items maximum, curated rather than exhaustive — the point is relevance to
 * the visitor's problem, not a complete archive. Nothing here is invented: while
 * the data still carries markers, a notice says so plainly.
 */
export function FeaturedProjects({ limit = 6 }: { limit?: number }) {
  const projects = selectedWork(limit);

  if (projects.length === 0) return null;

  return (
    <Section id="work" divided>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Software I've built"
          description="A selection of software, AI and digital products — with the problem, the approach and the architecture behind each one."
        />

        <Reveal delay={0.08} className="shrink-0">
          <Link
            href="/work"
            data-cta="home_view_all_work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            View all work
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>

      {workHasPlaceholders ? (
        <PlaceholderNotice className="mt-8">
          These entries are placeholders. Real project screenshots, summaries and
          outcomes have not been supplied yet, so nothing has been invented to
          fill the gap. Replace them in{" "}
          <code className="font-mono text-amber-100/90">
            src/lib/data/projects.ts
          </code>
          .
        </PlaceholderNotice>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05} className="h-full">
            <ProjectCard
              project={project}
              className="h-full"
              priority={index === 0}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
