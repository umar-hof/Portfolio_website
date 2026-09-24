import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Anchor target for in-page navigation (e.g. #process). */
  id?: string;
  /** Adds a hairline top border to separate consecutive sections. */
  divided?: boolean;
  /** Tighter vertical rhythm for CTAs and short bands. */
  spacing?: "default" | "compact" | "loose";
  label?: string;
}

const spacings = {
  compact: "py-14 sm:py-16",
  default: "py-20 sm:py-24 lg:py-28",
  loose: "py-24 sm:py-32 lg:py-36",
} as const;

export function Section({
  children,
  className,
  id,
  divided = false,
  spacing = "default",
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative",
        spacings[spacing],
        divided && "border-t border-white/6",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
