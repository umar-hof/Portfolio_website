import { cn } from "@/lib/utils";
import { site } from "@/lib/data/site";

/**
 * Identity mark. The single letter keeps the navbar compact; the wordmark
 * carries the brand. Marked aria-hidden because it always sits inside a link
 * that already has an accessible name.
 */
export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-white/12 bg-white/[0.05] font-mono text-sm font-semibold text-accent edge-light"
      >
        {site.brandMark}
        <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
      </span>

      {withWordmark ? (
        <span className="text-[0.9rem] font-semibold tracking-tight text-fg">
          {site.brand}
        </span>
      ) : null}
    </span>
  );
}
