import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/data/site";

/**
 * About.
 *
 * Short and client-focused. Deliberately avoids the resume dump and any claim
 * that cannot be verified — no years of experience, no employer list, no
 * certification badges. Full detail lives on /about.
 */
export function AboutSection() {
  return (
    <Section id="about" divided>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="Software engineering, with AI as the specialism"
        />

        <div className="flex flex-col gap-5">
          <Reveal>
            <p className="text-base leading-relaxed text-fg-muted">
              I&apos;m {site.name}, a software engineer who specializes in AI. I
              work across the full stack — frontend, backend, databases, APIs and
              deployment — with intelligent systems as my particular focus.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="text-base leading-relaxed text-fg-muted">
              That combination matters more than it sounds. AI features only
              become useful products when the engineering around them is solid:
              the data pipeline that feeds them, the API they sit behind, the
              interface people actually use, and the handling for when they get
              something wrong. I build that whole picture rather than dropping a
              model into an unfinished application.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="text-base leading-relaxed text-fg-muted">
              I work with founders, businesses and teams who have a problem worth
              solving — and I would rather tell you a simpler approach is enough
              than sell you something you do not need.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button href="/about" variant="secondary" ctaEvent="home_about_more">
                More about how I work
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>

              <Link
                href="/contact"
                data-cta="home_about_contact"
                className="text-sm font-medium text-accent hover:underline"
              >
                Start a conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
