import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Reusable closing call to action.
 *
 * Used at the end of every page and landing page so the conversion path is
 * never more than a scroll away from wherever the visitor stopped reading.
 */
export function CtaBanner({
  heading,
  body,
  primary = { label: "Start a Project", href: "/contact" },
  secondary,
  ctaEvent = "cta_banner",
  className,
}: {
  heading: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  ctaEvent?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60 px-6 py-12 edge-light sm:px-12 sm:py-14">
          {/* Grid + accent light, so the band reads as part of the system. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-sm opacity-40"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[90px]"
          />

          <div className="relative flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">
                {body}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button href={primary.href} size="lg" ctaEvent={ctaEvent}>
                {primary.label}
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>

              {secondary ? (
                <Button
                  href={secondary.href}
                  size="lg"
                  variant="secondary"
                  ctaEvent={`${ctaEvent}_secondary`}
                >
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
