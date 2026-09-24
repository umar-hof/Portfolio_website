import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary>, so it works with JavaScript disabled,
 * is keyboard accessible for free, and is found by in-page search and
 * assistive technology without any ARIA patching. The open/close animation uses
 * a CSS grid row transition, which means no client component and no layout
 * measurement.
 */
export function FaqAccordion({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-white/6 border-y border-white/6", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent",
              "[&::-webkit-details-marker]:hidden",
            )}
          >
            <h3 className="text-base font-medium tracking-tight text-fg transition-colors group-hover:text-accent sm:text-lg">
              {item.question}
            </h3>

            <span
              aria-hidden="true"
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg-muted transition-[transform,border-color,color] duration-300 group-hover:border-accent/30 group-hover:text-accent group-open:rotate-180"
            >
              <ChevronDown className="size-4" />
            </span>
          </summary>

          {/* 0fr -> 1fr animates height without measuring anything. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="overflow-hidden">
              <p className="max-w-3xl pb-6 pr-10 text-sm leading-relaxed text-fg-muted">
                {item.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
