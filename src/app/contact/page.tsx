import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/data/faq";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, schemaGraph } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start a Project",
  description:
    "Tell me what you're building and what problem it should solve. I'll reply with questions or a proposed plan — no obligation on either side.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        id="contact-structured-data"
        data={schemaGraph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqSchema(faqs),
        ])}
      />

      <ContactSection
        headingAs="h1"
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        heading="Start a project"
        intro="Tell me what you're trying to build and what problem it should solve. I read every enquiry myself and reply with questions or a proposed plan."
      />

      <Section divided>
        <SectionHeading
          eyebrow="Before you write"
          title="Useful things to know"
          description="How I work, what I build and where the limits are — answered before you spend time on an email."
        />

        <Reveal className="mt-10">
          <FaqAccordion items={faqs} />
        </Reveal>
      </Section>
    </>
  );
}
