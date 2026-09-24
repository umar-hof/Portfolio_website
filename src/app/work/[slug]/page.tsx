import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { TechTag } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Placeholder, PlaceholderNotice } from "@/components/ui/Placeholder";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import {
  CaseStudyBlock,
  ChallengeList,
  FeatureList,
  ResultsList,
} from "@/components/work/CaseStudyBlocks";
import { getProject, projectSlugs } from "@/lib/data/projects";
import { buildMetadata } from "@/lib/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  schemaGraph,
} from "@/lib/structured-data";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Unknown slugs 404 instead of rendering an empty shell. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return buildMetadata({
    title: `${project.title} — Case Study`,
    description: project.summary,
    path: `/work/${project.slug}`,
    type: "article",
    keywords: project.technologies,
  });
}

const ownershipLabels: Record<Project["ownership"], string> = {
  client: "Client project",
  professional: "Professional work",
  personal: "Personal project",
  practice: "Practice build",
};

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { caseStudy } = project;
  const crumbTrail = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ];

  return (
    <>
      <StructuredData
        id="case-study-structured-data"
        data={schemaGraph([
          breadcrumbSchema(crumbTrail),
          articleSchema({
            headline: project.title,
            description: project.summary,
            path: `/work/${project.slug}`,
          }),
        ])}
      />

      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
        breadcrumb={crumbTrail}
      >
        {/* Meta row */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-sm text-fg-subtle">
              {ownershipLabels[project.ownership]}
            </span>

            {project.year ? (
              <span className="text-sm text-fg-subtle">{project.year}</span>
            ) : (
              <Placeholder label="Year required" size="sm" />
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`case_study_live_${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                Live demo
              </a>
            ) : (
              <Placeholder label="Live url required" size="sm" />
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`case_study_github_${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                Source code
              </a>
            ) : (
              <Placeholder label="Github url required" size="sm" />
            )}
          </div>
        </Reveal>

        {project.technologies.length > 0 ? (
          <Reveal delay={0.12}>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <TechTag label={technology} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </PageHeader>

      {/* Hero visual */}
      <Section spacing="compact">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
            <ProjectVisual
              title={project.title}
              category={project.category}
              image={project.image}
              imageAlt={project.imageAlt}
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
          </div>
        </Reveal>

        {project.placeholder ? (
          <PlaceholderNotice className="mt-6">
            This case study still contains placeholder content. Every{" "}
            <span className="font-mono text-amber-100/90">
              [SOMETHING REQUIRED]
            </span>{" "}
            marker needs replacing with real detail before this page is
            published — nothing has been invented to fill it in.
          </PlaceholderNotice>
        ) : null}
      </Section>

      {/* Body */}
      <Section divided>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-12">
            <CaseStudyBlock title="The problem">
              <p>{caseStudy.problem}</p>
            </CaseStudyBlock>

            <CaseStudyBlock title="The solution">
              <p>{caseStudy.solution}</p>
            </CaseStudyBlock>

            <CaseStudyBlock title="Key features">
              <FeatureList items={caseStudy.features} />
            </CaseStudyBlock>

            <CaseStudyBlock title="My role">
              <p>{caseStudy.role}</p>
            </CaseStudyBlock>

            <CaseStudyBlock title="Challenges">
              <ChallengeList items={caseStudy.challenges} />
            </CaseStudyBlock>

            <CaseStudyBlock title="Results">
              <ResultsList items={caseStudy.results} />
            </CaseStudyBlock>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              className={cn(
                "flex flex-col gap-8 rounded-2xl border border-white/8 bg-ink-900/40 p-5 sm:p-6",
              )}
            >
              <ArchitectureDiagram layers={caseStudy.architecture} />

              <div className="border-t border-white/6 pt-6">
                <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
                  Technology
                </h2>
                {project.technologies.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.map((technology) => (
                      <li key={technology}>
                        <TechTag label={technology} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4">
                    <Placeholder label="Technologies required" size="sm" />
                  </div>
                )}
              </div>

              <div className="border-t border-white/6 pt-6">
                <p className="text-sm leading-relaxed text-fg-muted">
                  Working on something similar?
                </p>
                <Button
                  href="/contact"
                  size="sm"
                  className="mt-4 w-full"
                  ctaEvent={`case_study_sidebar_${project.slug}`}
                >
                  Let&apos;s build it
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section spacing="compact" divided>
        <CtaBanner
          heading="Have a similar project?"
          body="Tell me what you're trying to build. I'll tell you what it takes to ship it properly."
          primary={{ label: "Let's Build It", href: "/contact" }}
          secondary={{ label: "See More Work", href: "/work" }}
          ctaEvent="case_study_footer"
        />
      </Section>
    </>
  );
}
