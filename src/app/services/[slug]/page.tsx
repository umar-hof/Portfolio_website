import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faq";
import { processSteps } from "@/lib/data/process";
import { featuredProjects } from "@/lib/data/projects";
import { allServices, getService, serviceSlugs } from "@/lib/data/services";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  schemaGraph,
  serviceSchema,
} from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found" };

  return buildMetadata({
    title: `${service.title} — ${service.eyebrow}`,
    description: `${service.promise} ${service.description}`.slice(0, 300),
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const crumbTrail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  const otherServices = allServices().filter((item) => item.slug !== service.slug);
  // Only surface proof once real projects exist; placeholders would undercut
  // the credibility this section is meant to add.
  const proof = featuredProjects(3).filter((project) => !project.placeholder);

  return (
    <>
      <StructuredData
        id="service-structured-data"
        data={schemaGraph([
          breadcrumbSchema(crumbTrail),
          serviceSchema({
            name: service.title,
            description: service.description,
            path: `/services/${service.slug}`,
            capabilities: service.capabilities,
          }),
        ])}
      />

      <PageHeader
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.promise}
        breadcrumb={crumbTrail}
      >
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.engagement.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.66rem] tracking-wide text-fg-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </PageHeader>

      {/* Overview + capabilities */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="flex items-start gap-4">
                <ServiceIcon name={service.icon} />
                <p className="pt-1 text-base leading-relaxed text-fg-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                What this covers
              </h2>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.capabilities.map((capability, index) => (
                  <Reveal
                    as="li"
                    key={capability}
                    delay={index * 0.04}
                    className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/[0.02] px-3.5 py-3 text-sm leading-relaxed text-fg-muted"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent/70"
                      aria-hidden="true"
                    />
                    {capability}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6 rounded-2xl border border-white/8 bg-ink-900/40 p-5 sm:p-6">
              <div>
                <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
                  What you receive
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-muted"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-accent/70"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/6 pt-6">
                <p className="text-sm leading-relaxed text-fg-muted">
                  Want to talk through your project?
                </p>
                <Button
                  href="/contact"
                  size="md"
                  className="mt-4 w-full"
                  ctaEvent={`service_sidebar_${service.slug}`}
                >
                  Start a Project
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Proof, only when real projects exist */}
      {proof.length > 0 ? (
        <Section divided>
          <SectionHeading
            eyebrow="Relevant work"
            title="Projects using this"
            description="Examples of this kind of work, with the problem and architecture documented."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proof.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05} className="h-full">
                <ProjectCard project={project} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section divided>
        <SectionHeading eyebrow="Process" title="How this runs" />

        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section divided>
        <SectionHeading
          eyebrow="Questions"
          title="Common questions"
          description="Answered directly, including where the limits are."
        />
        <Reveal className="mt-10">
          <FaqAccordion items={faqs.slice(0, 6)} />
        </Reveal>
      </Section>

      {otherServices.length > 0 ? (
        <Section spacing="compact" divided>
          <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
            Other services
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Button
                  href={`/services/${item.slug}`}
                  variant="secondary"
                  size="sm"
                  ctaEvent={`service_related_${item.slug}`}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section spacing="compact" divided>
        <CtaBanner
          heading={`Ready to build with ${service.title.toLowerCase()}?`}
          body="Tell me about the problem. I'll come back with a realistic scope, approach and cost — no obligation."
          ctaEvent={`service_cta_${service.slug}`}
        />
      </Section>
    </>
  );
}
