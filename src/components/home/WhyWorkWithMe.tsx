import { Boxes, Brain, Layers, Sparkles, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valuePoints } from "@/lib/data/why-me";
import type { ValuePoint } from "@/lib/types";

const icons: Record<ValuePoint["icon"], LucideIcon> = {
  layers: Layers,
  brain: Brain,
  target: Target,
  sparkles: Sparkles,
  package: Boxes,
};

/**
 * Why work with me.
 *
 * Every point is something a client can verify rather than a personality claim.
 * No "passionate", no "fast learner", no unquantified self-assessment.
 */
export function WhyWorkWithMe() {
  return (
    <Section id="why" divided>
      <SectionHeading
        eyebrow="Why work with me"
        title="What you actually get"
        description="Concrete differences that show up in how the project runs and how the finished product holds up."
      />

      <ul className="mt-12 grid gap-x-8 gap-y-9 md:grid-cols-2">
        {valuePoints.map((point, index) => {
          const Icon = icons[point.icon];

          return (
            <Reveal as="li" key={point.title} delay={index * 0.05}>
              <div className="flex gap-4">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent edge-light">
                  <Icon className="size-4.5" aria-hidden="true" strokeWidth={1.6} />
                </span>

                <div>
                  <h3 className="text-base font-semibold tracking-tight text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {point.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
