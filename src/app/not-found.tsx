import { ArrowRight, SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-xl flex-col items-start gap-5">
          <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent edge-light">
            <SearchX className="size-5" aria-hidden="true" />
          </span>

          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fg-subtle">
            404
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            That page doesn&apos;t exist.
          </h1>

          <p className="text-base leading-relaxed text-fg-muted">
            The link may be out of date, or the page may have moved. Everything
            useful is reachable from here.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg" ctaEvent="404_home">
              Back to home
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>

            <Button
              href="/work"
              size="lg"
              variant="secondary"
              ctaEvent="404_work"
            >
              See my work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
