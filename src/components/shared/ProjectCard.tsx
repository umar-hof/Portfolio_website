import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TechTag } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const ownershipLabels: Record<Project["ownership"], string> = {
  client: "Client project",
  professional: "Professional work",
  personal: "Personal project",
  practice: "Practice build",
};

/**
 * Project card — the primary proof of capability.
 *
 * Deliberately large: the media gets room to breathe because screenshots do
 * the persuading. Everything a touch user needs (case study link, technology
 * tags, ownership) is always visible; hover only adds the image zoom, the
 * scrim and the floating case-study chip.
 */
export function ProjectCard({
  project,
  className,
  priority = false,
  sizes,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/work/${project.slug}`}
        data-cta={`project_card_${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900/50 transition-[border-color,background-color] duration-300 hover:border-white/16 hover:bg-ink-850/70 focus-visible:border-accent/40"
      >
        {/* Media */}
        <div className="relative overflow-hidden">
          <ProjectVisual
            title={project.title}
            category={project.category}
            image={project.image}
            imageAlt={project.imageAlt}
            priority={priority}
            sizes={sizes}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />

          {/* Scrim + floating CTA, shown on hover/focus only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          />

          <span className="pointer-events-none absolute bottom-4 left-4 inline-flex translate-y-1.5 items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/80 px-3 py-1.5 text-xs font-medium text-fg opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View case study
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </span>

          {project.placeholder ? (
            <span className="absolute right-3 top-3">
              <Placeholder label="Placeholder" size="sm" />
            </span>
          ) : null}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent/80">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-fg-subtle">
              ·
            </span>
            <span className="text-[0.7rem] text-fg-subtle">
              {ownershipLabels[project.ownership]}
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight text-fg">
            {project.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <TechTag label={technology} />
                </li>
              ))}
            </ul>
          ) : null}

          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent">
            View case study
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
