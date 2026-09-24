import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cta, site } from "@/lib/data/site";

/**
 * Hero.
 *
 * Leads with the positioning and the outcome, never with "Hi, I'm …" and never
 * with a wall of technologies. The headline states what gets built; the
 * subheading states who it is for and what that means in practice. Two CTAs,
 * one primary — the whole page funnels back to these.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-fg-muted edge-light">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-accent/70 animate-blink" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.role}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl xl:text-[4rem]">
                Build software that{" "}
                <span className="text-accent">solves real problems</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
                I design and build web applications, backend systems and
                AI-powered products — taking an idea from first conversation
                through to something real users can open, rely on and pay for.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={cta.primary.href} size="lg" ctaEvent="hero_primary">
                  {cta.primary.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  href={cta.secondary.href}
                  size="lg"
                  variant="secondary"
                  ctaEvent="hero_secondary"
                >
                  {cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* System visual */}
          <Reveal delay={0.1} y={12} className="lg:pl-4">
            <HeroVisual />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
