import { ArrowRight, ChevronRight } from "lucide-react";
import { TechTag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { selectedWork } from "@/lib/data/projects";

/**
 * Featured case study.
 *
 * A single project taken further than a card can go: the problem, the
 * architecture and the route into the full write-up. Placed before the process
 * section so proof lands before method.
 */
export function FeaturedCaseStudy() {
  const project = selectedWork(1)[0];
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <Section id="featured-case-study" divided>
      <Reveal>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent/80">
          Featured case study
        </span>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* Visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
            <ProjectVisual
              title={project.title}
              category={project.category}
              image={project.image}
              imageAlt={project.imageAlt}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent/80">
              {project.category}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-4xl">
            {project.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          {/* Problem */}
          <div className="mt-6 border-l-2 border-accent/30 pl-4">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-subtle">
              The problem
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {caseStudy.problem}
            </p>
          </div>

          {/* Architecture, condensed to a single readable line. */}
          <div className="mt-6">
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-subtle">
              Architecture
            </h3>
            <ol className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {caseStudy.architecture.map((layer, index) => (
                <li key={layer.label} className="flex items-center gap-1.5">
                  <span className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[0.62rem] text-fg-muted">
                    {layer.label}
                  </span>
                  {index < caseStudy.architecture.length - 1 ? (
                    <ChevronRight
                      className="size-3 shrink-0 text-fg-subtle/70"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          {project.technologies.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <TechTag label={technology} />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <Button
              href={`/work/${project.slug}`}
              variant="secondary"
              size="lg"
              ctaEvent="featured_case_study"
            >
              Read the full case study
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
