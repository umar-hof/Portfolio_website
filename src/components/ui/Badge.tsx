import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "accent" | "muted";

const tones: Record<Tone, string> = {
  default: "border-white/10 bg-white/[0.05] text-fg-muted",
  accent: "border-accent/25 bg-accent/10 text-accent-bright",
  muted: "border-white/8 bg-transparent text-fg-subtle",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  /** Renders in monospace — used for codes, categories and tech tags. */
  mono?: boolean;
}

export function Badge({ children, tone = "default", className, mono = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs leading-none",
        mono && "font-mono text-[0.68rem] uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Neutral technology tag used on project cards and case studies. */
export function TechTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 font-mono text-[0.68rem] tracking-wide text-fg-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
