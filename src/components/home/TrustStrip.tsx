import { Reveal } from "@/components/ui/Reveal";
import { coreCapabilities } from "@/lib/data/skills";

/**
 * Capability strip.
 *
 * Sits directly under the hero to answer "so what does he actually do?" in one
 * glance. Names capability areas only — no invented client counts, ratings,
 * project totals or years of experience.
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Areas of expertise"
      className="border-y border-white/6 bg-ink-950/40"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-2 py-5 sm:gap-3">
            <li className="mr-1 hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-subtle lg:block">
              What I do
            </li>

            {coreCapabilities.map((capability) => (
              <li key={capability}>
                <span className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-fg-muted">
                  {capability}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
