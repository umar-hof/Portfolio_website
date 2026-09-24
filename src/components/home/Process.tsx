import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/process";

/** How I work — six stages, each naming what the client actually receives. */
export function Process() {
  return (
    <Section id="process" divided>
      <SectionHeading
        eyebrow="Process"
        title="How I work"
        description="A predictable path from first conversation to deployed product, so you always know what stage we're at and what comes next."
      />

      <ProcessTimeline steps={processSteps} />
    </Section>
  );
}
