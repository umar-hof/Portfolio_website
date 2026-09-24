import { Check, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Case study content blocks.

   Small, composable pieces so the [slug] route reads as a document rather than
   a wall of markup, and every field that may still be a placeholder gets
   consistent treatment.
   ========================================================================== */

export function CaseStudyBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("scroll-mt-28", className)}>
      <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 text-[0.95rem] leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}

/** Checklist of shipped features. */
export function FeatureList({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 rounded-lg border border-white/6 bg-white/[0.02] px-3.5 py-3 text-sm leading-relaxed"
        >
          <Check
            className="mt-0.5 size-4 shrink-0 text-accent/70"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Challenges — the honest engineering narrative. */
export function ChallengeList({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-l-2 border-accent/25 pl-4 text-sm leading-relaxed"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Results.
 *
 * Renders nothing when there are no verified outcomes. Fabricated metrics are
 * worse than no metrics — a visitor who catches one invented number stops
 * trusting every other claim on the page.
 */
export function ResultsList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return (
      <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-fg-subtle">
        <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        No verified outcomes measured for this project yet — none will be
        published until there are.
      </p>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
          <Check
            className="mt-0.5 size-4 shrink-0 text-accent/70"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
