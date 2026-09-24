import {
  Brain,
  CheckCircle2,
  Database,
  Layers,
  MessageSquare,
  Plug,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   Hero visual.

   A schematic of a real AI system rather than a decorative abstraction: a
   request enters, passes through application logic and an agent, retrieves
   from a knowledge base, calls tools, and returns a grounded response.

   Deliberately a server component with CSS-only motion — no client JavaScript,
   no fake metrics, no invented dashboards. Each node rises in sequence and a
   small pulse travels down the connectors so the flow reads as live.
   ========================================================================== */

interface Layer {
  icon: LucideIcon;
  label: string;
  detail: string;
  tag: string;
  /** The terminal node gets a steady state indicator. */
  terminal?: boolean;
}

const layers: Layer[] = [
  {
    icon: MessageSquare,
    label: "User request",
    detail: "“Answer this from our own documents”",
    tag: "input",
  },
  {
    icon: Layers,
    label: "Application",
    detail: "Session, validation, access rules",
    tag: "web",
  },
  {
    icon: Brain,
    label: "AI agent",
    detail: "Plans the steps and picks the tools",
    tag: "llm",
  },
  {
    icon: Database,
    label: "Knowledge base",
    detail: "Vector index over your content",
    tag: "retrieval",
  },
  {
    icon: Plug,
    label: "Tools & APIs",
    detail: "Internal services and third parties",
    tag: "actions",
  },
  {
    icon: CheckCircle2,
    label: "Response",
    detail: "Answer grounded in retrieved sources",
    tag: "output",
    terminal: true,
  },
];

function Connector({ delay }: { delay: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative ml-[1.35rem] block h-4 w-px bg-[repeating-linear-gradient(to_bottom,rgb(255_255_255/0.16)_0_3px,transparent_3px_6px)]"
    >
      <span
        className="absolute -left-[1.5px] top-0 size-1 rounded-full bg-accent animate-travel"
        style={{ animationDelay: `${delay}ms` }}
      />
    </span>
  );
}

export function HeroVisual() {
  return (
    <div className="relative">
      {/* Ambient light behind the panel. */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[2.5rem] bg-accent/[0.07] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 edge-light backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent/80" aria-hidden="true" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-muted">
              AI system
            </span>
          </span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-emerald-300/80">
            <span
              className="size-1.5 rounded-full bg-emerald-400 animate-blink"
              aria-hidden="true"
            />
            operational
          </span>
        </div>

        {/* Flow */}
        <div className="bg-grid-sm p-3.5 sm:p-4">
          <ol className="flex flex-col">
            {layers.map((layer, index) => {
              const Icon = layer.icon;

              return (
                <li key={layer.label}>
                  <div
                    className="flex items-center gap-3 rounded-lg border border-white/8 bg-ink-850/85 px-3 py-2 animate-rise"
                    style={{ animationDelay: `${index * 85}ms` }}
                  >
                    <Icon
                      className="size-4 shrink-0 text-accent"
                      aria-hidden="true"
                      strokeWidth={1.7}
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium text-fg">
                        {layer.label}
                      </span>
                      <span className="block truncate font-mono text-[0.58rem] text-fg-subtle">
                        {layer.detail}
                      </span>
                    </span>

                    <span className="shrink-0 font-mono text-[0.55rem] uppercase tracking-wider text-fg-subtle">
                      {layer.tag}
                    </span>
                  </div>

                  {index < layers.length - 1 ? (
                    <Connector delay={index * 260} />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
          <span className="font-mono text-[0.58rem] text-fg-subtle">
            request → response
          </span>
          <span className="font-mono text-[0.58rem] text-fg-subtle">
            sources cited
          </span>
        </div>
      </div>

      {/* Floating side note — reinforces the engineering, not the magic. */}
      <div className="pointer-events-none absolute -bottom-5 -left-3 hidden rounded-xl border border-white/10 bg-ink-900/95 px-3.5 py-2.5 edge-light backdrop-blur-sm animate-float-slow sm:block">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-fg-subtle">
          Architecture
        </p>
        <p className="mt-1 text-[0.7rem] font-medium text-fg">
          Frontend → API → Data → AI
        </p>
      </div>
    </div>
  );
}
