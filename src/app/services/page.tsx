import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StructuredData } from "@/components/seo/StructuredData";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/process";
import { allServices } from "@/lib/data/services";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, schemaGraph } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Services — AI, Web, Backend, Automation & Full Product Development",
  description:
    "AI development, web applications, backend and API engineering, automation, and full product delivery from idea to production.",
  path: "/services",
});

export default function ServicesPage() {
  const services = allServices();

  return (
    <>
      <StructuredData
        id="services-structured-data"
        data={schemaGraph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ])}
      />

      <PageHeader
        eyebrow="Services"
        title="Software, built around your problem"
        description="Five ways to work together. Each one is scoped around the outcome you need rather than a fixed package — and each starts with understanding the problem before proposing a solution."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05} className="h-full">
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section divided>
        <SectionHeading
          eyebrow="Process"
          title="How an engagement runs"
          description="The same six stages whether the project is a two-week automation or a multi-month product build."
        />

        <ProcessTimeline steps={processSteps} />
      </Section>

      <Section spacing="compact" divided>
        <CtaBanner
          heading="Not sure which service fits?"
          body="Describe the problem in your own words. I'll tell you which of these applies, what it would take, and whether there's a simpler route."
          ctaEvent="services_cta"
        />
      </Section>
    </>
  );
}
