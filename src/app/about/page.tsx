import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { TechStackGrid } from "@/components/shared/TechStackGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/process";
import { site } from "@/lib/data/site";
import { coreCapabilities } from "@/lib/data/skills";
import { valuePoints } from "@/lib/data/why-me";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  personSchema,
  schemaGraph,
} from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "About — Software Engineer specializing in AI",
  description:
    "I work across software engineering, full-stack development, backend systems and AI — building complete products rather than isolated features.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        id="about-structured-data"
        data={schemaGraph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          personSchema(),
        ])}
      />

      <PageHeader
        eyebrow="About"
        title={site.role}
        description="I build complete software products — and I specialize in the AI systems inside them."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Bio */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg">
                I&apos;m {site.name} — a software engineer who specializes in AI.
                I work across the full stack: frontend, backend, databases, APIs
                and deployment, with intelligent systems as the part I focus on
                most.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="text-base leading-relaxed text-fg-muted">
                That combination matters more than it might sound. An AI feature
                is only useful once the engineering around it is solid: the data
                pipeline that feeds it, the API it sits behind, the interface
                people actually use, and the handling for the moments it gets
                something wrong. Plenty of AI projects stall precisely because
                those parts were never built. I build the whole picture rather
                than dropping a model into an unfinished application.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-base leading-relaxed text-fg-muted">
                In practice that means I am equally comfortable defining what
                version one of a product should contain, designing its data
                model, building the interface, wiring up retrieval over a private
                knowledge base, and getting the whole thing deployed and
                monitored in production.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="text-base leading-relaxed text-fg-muted">
                I work with founders, businesses and teams who have a problem
                worth solving. My preference is to be direct about trade-offs: if
                a simpler approach would ship faster and hold up better, I would
                rather tell you that than sell you something more complicated.
              </p>
            </Reveal>
          </div>

          {/* Focus areas */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/8 bg-ink-900/40 p-6">
              <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
                Where I work
              </h2>

              <ul className="mt-5 flex flex-col gap-3">
                {coreCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="border-b border-white/6 pb-3 text-sm text-fg-muted last:border-0 last:pb-0"
                  >
                    {capability}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-fg-subtle">
                Working remotely with clients worldwide.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How I think about the work */}
      <Section divided>
        <SectionHeading
          eyebrow="Approach"
          title="How I approach the work"
          description="The principles that shape what gets built and what gets left out."
        />

        <ul className="mt-12 grid gap-x-8 gap-y-9 md:grid-cols-2">
          {valuePoints.map((point, index) => (
            <Reveal as="li" key={point.title} delay={index * 0.05}>
              <h3 className="text-base font-semibold tracking-tight text-fg">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {point.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Technology */}
      <Section divided>
        <SectionHeading
          eyebrow="Technology"
          title="What I build with"
          description="Established tools rather than exotic ones — chosen so the work stays maintainable by whoever touches it next."
        />
        <TechStackGrid />
      </Section>

      {/* Process */}
      <Section divided>
        <SectionHeading
          eyebrow="Process"
          title="How a project runs"
          description="Six stages, each producing something concrete you can review."
        />
        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section spacing="compact" divided>
        <CtaBanner
          heading="Let's talk about what you're building."
          body="Explain the problem in plain terms. I'll tell you what it takes, what it costs, and where the risks are."
          ctaEvent="about_cta"
        />
      </Section>
    </>
  );
}
