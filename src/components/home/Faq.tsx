import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faq";

/**
 * FAQ.
 *
 * Answers describe how I actually work and where the limits are — no promised
 * timelines without requirements, no guarantees that depend on third parties.
 */
export function Faq({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;

  return (
    <Section id="faq" divided>
      <SectionHeading
        eyebrow="Questions"
        title="Answers before you get in touch"
        description="The things clients usually ask first. If your question isn't here, ask me directly — I'd rather answer it than have you guess."
      />

      <Reveal className="mt-10">
        <FaqAccordion items={items} />
      </Reveal>

      <Reveal delay={0.06}>
        <Link
          href="/contact"
          data-cta="faq_ask_question"
          className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          Ask a question
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
