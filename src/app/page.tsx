import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Faq } from "@/components/home/Faq";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ValueProposition } from "@/components/home/ValueProposition";
import { WhyWorkWithMe } from "@/components/home/WhyWorkWithMe";
import { StructuredData } from "@/components/seo/StructuredData";
import { Testimonials } from "@/components/shared/Testimonials";
import { site } from "@/lib/data/site";
import { faqs } from "@/lib/data/faq";
import { buildMetadata } from "@/lib/metadata";
import {
  faqSchema,
  personSchema,
  professionalServiceSchema,
  schemaGraph,
  websiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.brand} — ${site.role}`,
    description: site.metaDescription,
    path: "/",
    keywords: [
      "hire AI developer",
      "freelance software engineer",
      "AI development services",
      "build SaaS product",
      "RAG system development",
      "Next.js and Python developer",
    ],
  }),
  // Homepage already declares the canonical root in buildMetadata("/").
  title: {
    absolute: `${site.brand} — ${site.role}`,
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData
        id="home-structured-data"
        data={schemaGraph([
          personSchema(),
          websiteSchema(),
          professionalServiceSchema(),
          faqSchema(faqs),
        ])}
      />

      {/* 1. Positioning + outcome */}
      <Hero />

      {/* 2. Immediate clarity on capability areas */}
      <TrustStrip />

      {/* 3. Can he handle the whole thing? */}
      <ValueProposition />

      {/* 4. What he builds */}
      <Services />

      {/* 5. Proof */}
      <FeaturedProjects limit={6} />

      {/* 6. Deeper proof on one project */}
      <FeaturedCaseStudy />

      {/* 7. Method */}
      <Process />

      {/* 8. Differentiators */}
      <WhyWorkWithMe />

      {/* 9. Technical credibility */}
      <TechStack />

      {/* 10. Who he is */}
      <AboutSection />

      {/* 11. Real testimonials only — renders nothing when none exist */}
      <Testimonials />

      {/* 12. Removing objections */}
      <Faq />

      {/* 13. Closing CTA for scanners */}
      <FinalCta />

      {/* 14. Conversion */}
      <ContactSection />
    </>
  );
}
