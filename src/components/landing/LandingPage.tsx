import { ArrowRight, Check, X } from "lucide-react";
import { ContactSection } from "@/components/home/ContactSection";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/process";
import { getProjects } from "@/lib/data/projects";
import { cta } from "@/lib/data/site";
import {
  breadcrumbSchema,
  faqSchema,
  schemaGraph,
} from "@/lib/structured-data";
import type { LandingPageContent } from "@/lib/types";

/**
 * Ad landing page template.
 *
 * One component, four destinations. The structure is fixed — hero, problem,
 * solutions, proof, process, FAQ, CTA — so paid traffic always meets the same
 * predictable argument in the same order, while the copy is swapped to match
 * whichever advertisement sent the visitor here.
 *
 * Proof is pulled from real project data and filtered: placeholder entries are
 * never shown as evidence.
 */
export function LandingPage({ content }: { content: LandingPageContent }) {
  const path = `/${content.slug}`;
  const crumbTrail = [
    { name: "Home", path: "/" },
    { name: content.eyebrow, path },
  ];

  const proof = getProjects(content.proofSlugs).filter(
    (project) => !project.placeholder,
  );

  return (
    <>
      <StructuredData
        id={`${content.slug}-structured-data`}
        data={schemaGraph([
          breadcrumbSchema(crumbTrail),
          faqSchema(content.faq),
        ])}
      />

      {/* 1. Hero — message match with the advertisement */}
      <section className="relative overflow-hidden border-b border-white/6 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]"
        />

        <Container>
          <Breadcrumbs trail={crumbTrail} />

          <div className="max-w-3xl">
            <Reveal>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent/80">
                {content.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
                {content.title}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-fg-muted sm:text-lg">
                {content.intro}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contact" size="lg" ctaEvent={`${content.slug}_hero_primary`}>
                  {cta.primary.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  href="/work"
                  size="lg"
                  variant="secondary"
                  ctaEvent={`${content.slug}_hero_secondary`}
                >
                  See My Work
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Problem */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            eyebrow="The problem"
            title={content.problem.heading}
            description={content.problem.body}
          />

          <ul className="flex flex-col gap-3 lg:pt-2">
            {content.problem.painPoints.map((point, index) => (
              <Reveal
                as="li"
                key={point}
                delay={index * 0.04}
                className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3.5"
              >
                <X
                  className="mt-0.5 size-4 shrink-0 text-red-400/70"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-fg-muted">
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. Solutions */}
      <Section divided>
        <SectionHeading
          eyebrow="What I build"
          title={content.solutions.heading}
          description={content.solutions.intro}
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {content.solutions.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.04}
              className="bg-ink-950 p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/[0.07] text-accent">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. Proof — real projects only */}
      {proof.length > 0 ? (
        <Section divided>
          <SectionHeading
            eyebrow="Examples"
            title="Related work"
            description="Projects that demonstrate this kind of build."
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

      {/* 5. Process */}
      <Section divided>
        <SectionHeading
          eyebrow="Process"
          title="How a project runs"
          description="A predictable path from first conversation to deployed product."
        />
        <ProcessTimeline steps={processSteps} />
      </Section>

      {/* 6. FAQ */}
      <Section divided>
        <SectionHeading
          eyebrow="Questions"
          title="Answered before you ask"
          description="The things that come up most often on this kind of project."
        />
        <Reveal className="mt-10">
          <FaqAccordion items={content.faq} />
        </Reveal>
      </Section>

      {/* 7. CTA */}
      <Section spacing="compact" divided>
        <CtaBanner
          heading={content.closing.heading}
          body={content.closing.body}
          ctaEvent={`${content.slug}_cta`}
        />
      </Section>

      {/* 8. Conversion — id must stay "contact" so the mobile sticky CTA hides. */}
      <ContactSection
        id="contact"
        heading="Have a project in mind?"
        intro="Tell me what you're trying to build. I'll reply with questions or a proposed plan — no obligation on either side."
      />
    </>
  );
}
