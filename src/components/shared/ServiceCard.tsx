import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TechTag } from "@/components/ui/Badge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Service card.
 *
 * Leads with the client outcome, then proves breadth with capability tags.
 * The whole card is the link, so the hit area is generous on touch devices;
 * hover only adds refinement (border, background, icon, arrow).
 */
export function ServiceCard({
  service,
  className,
  capabilityLimit = 3,
}: {
  service: Service;
  className?: string;
  capabilityLimit?: number;
}) {
  const capabilities = service.capabilities.slice(0, capabilityLimit);

  return (
    <Link
      href={`/services/${service.slug}`}
      data-cta={`service_card_${service.slug}`}
      className={cn(
        "group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/50 p-6 transition-[border-color,background-color] duration-300 hover:border-accent/25 hover:bg-ink-850/70 sm:p-7",
        className,
      )}
    >
      {/* Accent wash on hover — subtle, never enough to hurt contrast. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-accent/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <ServiceIcon name={service.icon} />

      <div className="relative">
        <h3 className="text-lg font-semibold tracking-tight text-fg">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {service.promise}
        </p>
      </div>

      <ul className="relative flex flex-wrap gap-1.5">
        {capabilities.map((capability) => (
          <li key={capability}>
            <TechTag label={capability} />
          </li>
        ))}
      </ul>

      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent">
        Learn more
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
