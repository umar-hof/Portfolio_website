import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Value proposition.
 *
 * The section that answers "can he handle the whole thing, or just part of it?"
 * The pipeline is the argument: the same person is accountable at every stage,
 * so there is no integration gap between design, build, AI and launch.
 */

const pipeline = [
  "Idea",
  "Planning",
  "Design",
  "Development",
  "AI / API integration",
  "Testing",
  "Deployment",
];

export function ValueProposition() {
  return (
    <Section id="value">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <SectionHeading
          eyebrow="What I help with"
          title="From idea to working product."
          description="Most people who come to me have a clear idea and no reliable path to a finished product. My job is to turn that idea into something scoped, buildable and genuinely useful — and to remove the gaps where projects normally stall."
        />

        <div className="lg:pt-2">
          <Reveal>
            <p className="text-sm leading-relaxed text-fg-muted">
              That means handling the parts that sit either side of writing
              code: deciding what version one should contain, designing the
              structure, connecting AI and third-party services, testing the
              failure paths, and getting it deployed somewhere real users can
              reach it.
            </p>
          </Reveal>

          {/* Pipeline */}
          <Reveal delay={0.08}>
            <ol className="mt-8 flex flex-wrap items-center gap-x-1.5 gap-y-3 rounded-2xl border border-white/8 bg-ink-900/50 p-4 sm:p-5">
              {pipeline.map((stage, index) => (
                <li key={stage} className="flex items-center gap-1.5">
                  <span className="inline-flex items-center rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[0.66rem] tracking-wide text-fg-muted">
                    {stage}
                  </span>

                  {index < pipeline.length - 1 ? (
                    <ChevronRight
                      className="size-3.5 shrink-0 text-fg-subtle/70"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 text-xs leading-relaxed text-fg-subtle">
              Frontend, backend, database, AI layer and deployment are handled as
              one system — not stitched together from separate hand-offs.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
