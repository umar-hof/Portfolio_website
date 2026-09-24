import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { ProcessStep } from "@/lib/types";

/**
 * Six-stage delivery process.
 *
 * One markup tree, two readings: a vertical timeline with a numbered rail on
 * mobile and small screens, and a horizontal timeline on desktop where each
 * node connects to the next with a segment that fades out at the end.
 *
 * Zero client JavaScript — the whole thing is CSS.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol
      className={[
        "relative mt-12 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 2xl:grid-cols-6",
        // Vertical rail, mobile only: passes through the centre of each node.
        "before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:content-['']",
        "before:bg-linear-to-b before:from-accent/30 before:via-white/10 before:to-transparent",
        "lg:before:hidden",
      ].join(" ")}
    >
      {steps.map((step, index) => (
        <Reveal as="li" key={step.number} delay={index * 0.05} className="relative pl-14 lg:pl-0">
          {/* Horizontal connector, desktop only. Fades out, so it stays correct
              in the last column of every row without any positional hacks. */}
          <span
            aria-hidden="true"
            className="absolute left-11 right-0 top-5 hidden h-px bg-linear-to-r from-white/14 to-transparent lg:block"
          />

          <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-accent/25 bg-ink-900 font-mono text-[0.7rem] text-accent edge-light lg:static lg:mb-5 lg:size-10">
            {step.number}
          </span>

          <div className="lg:mt-0">
            <h3 className="text-base font-semibold tracking-tight text-fg">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              {step.description}
            </p>

            <ul className="mt-3.5 space-y-1.5">
              {step.output.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-fg-subtle"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-accent/60"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
