import type { ArchitectureLayer } from "@/lib/types";

/**
 * Architecture diagram.
 *
 * Renders the actual stack as an ordered flow — Frontend → API → Backend →
 * Database → AI/External — with real detail per layer instead of abstract
 * boxes. CSS-only entrance, so it adds no client JavaScript to case studies.
 */
export function ArchitectureDiagram({
  layers,
  label = "Architecture",
}: {
  layers: ArchitectureLayer[];
  label?: string;
}) {
  if (layers.length === 0) return null;

  return (
    <div>
      <h2 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </h2>

      <ol className="mt-4 flex flex-col">
        {layers.map((layer, index) => (
          <li key={layer.label}>
            <div
              className="flex items-start gap-3 rounded-xl border border-white/8 bg-ink-900/60 px-3.5 py-3 animate-rise"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <span className="mt-0.5 font-mono text-[0.6rem] text-accent/70">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-fg">
                  {layer.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                  {layer.detail}
                </span>
              </span>
            </div>

            {index < layers.length - 1 ? (
              <span
                aria-hidden="true"
                className="relative mx-auto my-1.5 block h-4 w-px bg-[repeating-linear-gradient(to_bottom,rgb(255_255_255/0.16)_0_3px,transparent_3px_6px)]"
              >
                <span
                  className="absolute -left-[1.5px] top-0 size-1 rounded-full bg-accent/80 animate-travel"
                  style={{ animationDelay: `${index * 240}ms` }}
                />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
