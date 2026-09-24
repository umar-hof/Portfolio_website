"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { contactChannels, cta, mainNav } from "@/lib/data/site";
import { brandIcons } from "@/components/icons/brand";
import { cn } from "@/lib/utils";

const focusableSelector =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile navigation.
 *
 * Treated as a modal dialog: it traps Tab, closes on Escape, locks background
 * scrolling and restores focus to the trigger when dismissed.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close whenever the route changes (including hash-only navigation).
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll while open, restoring the previous value on cleanup.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus into the panel once it has mounted.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(focusableSelector);
    first?.focus();
  }, [open]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    },
    [onClose],
  );

  const channels = contactChannels.filter((channel) => channel.href !== null);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          className="fixed inset-0 z-60 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 bg-ink-950/92 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onKeyDown={handleKeyDown}
            className="relative flex h-full flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex h-18 shrink-0 items-center justify-between px-5 sm:px-8">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.08]"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-5 pb-8 pt-4 sm:px-8"
            >
              <ul className="flex flex-col">
                {mainNav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: 0.05 + index * 0.045,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    className="border-b border-white/6"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight text-fg transition-colors hover:text-accent"
                    >
                      {item.label}
                      <ArrowRight
                        className="size-5 text-fg-subtle"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  href={cta.primary.href}
                  size="lg"
                  className="w-full"
                  ctaEvent="mobile_menu_cta"
                  onClick={onClose}
                >
                  {cta.primary.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>

              {channels.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                  {channels.map((channel) => {
                    const Icon = brandIcons[channel.key];
                    return (
                      <li key={channel.key}>
                        <a
                          href={channel.href ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                          {Icon ? <Icon className="size-4" /> : null}
                          {channel.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p
                  className={cn(
                    "mt-8 font-mono text-[0.65rem] uppercase tracking-wider text-amber-200/80",
                  )}
                >
                  [Contact links required]
                </p>
              )}
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
