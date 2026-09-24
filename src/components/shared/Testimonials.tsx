import { Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { hasTestimonials, testimonials } from "@/lib/data/testimonials";

/**
 * Testimonials.
 *
 * Renders nothing at all while `testimonials` is empty. No invented clients,
 * quotes, ratings or results are ever displayed — the section either contains
 * real, attributable reviews or it does not exist.
 */
export function Testimonials() {
  if (!hasTestimonials) return null;

  return (
    <Section id="testimonials" divided>
      <SectionHeading
        eyebrow="Client feedback"
        title="What clients say"
        description="Feedback from people I have built software with."
      />

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal
            as="li"
            key={`${testimonial.author}-${index}`}
            delay={index * 0.06}
          >
            <figure className="flex h-full flex-col gap-5 rounded-2xl border border-white/8 bg-ink-900/50 p-6">
              <Quote className="size-5 text-accent/60" aria-hidden="true" />

              <blockquote className="flex-1 text-sm leading-relaxed text-fg-muted">
                {testimonial.quote}
              </blockquote>

              <figcaption className="border-t border-white/6 pt-4">
                <span className="block text-sm font-medium text-fg">
                  {testimonial.author}
                </span>
                <span className="mt-0.5 block text-xs text-fg-subtle">
                  {testimonial.role}
                  {testimonial.company ? `, ${testimonial.company}` : ""}
                </span>
                {testimonial.source ? (
                  <a
                    href={testimonial.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-accent hover:underline"
                  >
                    View source
                  </a>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
