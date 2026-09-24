import { TechStackGrid } from "@/components/shared/TechStackGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Technology stack, grouped so it can be scanned rather than decoded. */
export function TechStack() {
  return (
    <Section id="stack" divided>
      <SectionHeading
        eyebrow="Technology"
        title="Tools I build with"
        description="Established, well-documented technology — chosen so the product stays maintainable by whoever works on it next."
      />

      <TechStackGrid />
    </Section>
  );
}
