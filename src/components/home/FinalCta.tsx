import { CtaBanner } from "@/components/shared/CtaBanner";
import { Section } from "@/components/ui/Section";
import { cta } from "@/lib/data/site";

/** Closing call to action, immediately before the contact form. */
export function FinalCta() {
  return (
    <Section spacing="compact" divided>
      <CtaBanner
        heading="Let's build something that works."
        body="Tell me the problem you're trying to solve. I'll tell you what it takes to build, what it would cost, and whether there's a simpler way."
        primary={cta.primary}
        secondary={cta.secondary}
        ctaEvent="final_cta"
      />
    </Section>
  );
}
