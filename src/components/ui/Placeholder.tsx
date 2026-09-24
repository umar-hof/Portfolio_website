import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Marks content that has not been supplied yet.
 *
 * The site never invents clients, metrics, testimonials, screenshots or links.
 * Instead, missing content renders as an obvious, greppable marker like
 * `[PROJECT IMAGE REQUIRED]` so it cannot ship unnoticed. See
 * CONTENT_CHECKLIST.md.
 */
export function Placeholder({
  label,
  className,
  size = "default",
}: {
  label: string;
  className?: string;
  size?: "default" | "sm";
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-md border border-dashed border-amber-400/35 bg-amber-400/[0.07] font-mono uppercase tracking-wider text-amber-200/90",
        size === "sm"
          ? "px-1.5 py-0.5 text-[0.6rem]"
          : "px-2 py-1 text-[0.65rem]",
        className,
      )}
    >
      <TriangleAlert className="size-3 shrink-0" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </span>
  );
}

/**
 * Full-width notice used at the top of a section or page that is entirely
 * placeholder content, so a visitor (or you) immediately understands.
 */
export function PlaceholderNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-dashed border-amber-400/30 bg-amber-400/[0.05] px-4 py-3.5",
        className,
      )}
      role="note"
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-300/90" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-amber-100/80">{children}</p>
    </div>
  );
}
