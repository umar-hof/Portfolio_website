import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Standard header for every interior page.
 *
 * Keeps the eyebrow/title/description rhythm and breadcrumb placement
 * identical across /work, /services, /about and the landing pages, so the pages
 * feel like one product rather than a set of templates.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/6 pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
      {/* Accent light, softer than the hero's. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-accent/[0.05] blur-[110px]"
      />

      <Container>
        {breadcrumb && breadcrumb.length > 0 ? (
          <Breadcrumbs trail={breadcrumb} />
        ) : null}

        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {children}
      </Container>
    </section>
  );
}
