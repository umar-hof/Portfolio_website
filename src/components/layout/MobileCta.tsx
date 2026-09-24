"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cta } from "@/lib/data/site";
import Link from "next/link";

/**
 * Mobile-only conversion bar.
 *
 * Appears once the visitor has scrolled past the hero, and hides itself as soon
 * as the contact section enters the viewport — so it never covers the very form
 * it is pointing at, and never obstructs the footer.
 */
export function MobileCta() {
  const [pastHero, setPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !contactInView;

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-ink-950/85 backdrop-blur-xl transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-fg">
            Have a project in mind?
          </p>
          <p className="truncate text-xs text-fg-muted">
            Tell me what you&apos;re building.
          </p>
        </div>

        <Link
          href={cta.primary.href}
          tabIndex={visible ? undefined : -1}
          data-cta="mobile_sticky_cta"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-bright"
        >
          {cta.primary.label}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
