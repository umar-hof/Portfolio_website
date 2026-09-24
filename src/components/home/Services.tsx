import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { allServices } from "@/lib/data/services";

/**
 * Services.
 *
 * Presented as client problems rather than a technology list. The sixth cell is
 * a route out for visitors who cannot self-identify — which is common, and
 * otherwise a dead end.
 */
export function Services() {
  const services = allServices();

  return (
    <Section id="services" divided>
      <SectionHeading
        eyebrow="Services"
        title="What I build"
        description="Five ways to work together, depending on whether you need a specific piece of software or the whole product taken off your hands."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.05} className="h-full">
            <ServiceCard service={service} className="h-full" />
          </Reveal>
        ))}

        {/* Doesn't-fit-anywhere escape hatch. */}
        <Reveal delay={services.length * 0.05} className="h-full">
          <Link
            href="/contact"
            data-cta="services_unsure"
            className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-dashed border-white/12 bg-transparent p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-accent/[0.03] sm:p-7"
          >
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                Not sure which you need?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                Describe the problem you&apos;re trying to solve and I&apos;ll tell
                you what it would take — including whether it needs building at
                all.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Tell me the problem
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
