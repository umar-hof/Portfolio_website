/**
 * Ambient page background.
 *
 * Fixed, non-interactive, and deliberately quiet: a fine grid that fades out
 * toward the edges, two soft accent lights, and a barely-visible grain layer so
 * large flat areas do not band. Content sits above it on `z-10`, so nothing
 * here ever competes with text for attention or blocks a click.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Grid, masked so it dissolves before it reaches the content edges. */}
      <div
        className="absolute inset-0 bg-grid opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 110% 62% at 50% 0%, black 12%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 110% 62% at 50% 0%, black 12%, transparent 72%)",
        }}
      />

      {/* Key light behind the hero. */}
      <div className="absolute -top-64 left-1/2 h-[34rem] w-[68rem] -translate-x-1/2 rounded-full bg-accent/[0.055] blur-[130px] animate-glow" />

      {/* Cooler counterweight low on the page so the lower fold is not flat. */}
      <div className="absolute bottom-[-18rem] left-[-10rem] h-[30rem] w-[42rem] rounded-full bg-accent-dim/[0.06] blur-[140px]" />

      {/* Grain. */}
      <div className="absolute inset-0 bg-noise opacity-[0.028] mix-blend-overlay" />
    </div>
  );
}
