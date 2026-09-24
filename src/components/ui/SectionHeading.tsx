import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Renders the title as an <h1>. Defaults to <h2>. */
  as?: "h1" | "h2";
  id?: string;
}

/**
 * Consistent section intro: eyebrow, title, supporting paragraph.
 * Keeping this in one place is what stops the pages drifting apart visually.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent/80">
          {eyebrow}
        </span>
      ) : null}

      <Heading
        id={id}
        className={cn(
          "text-gradient font-semibold tracking-tight",
          Heading === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          centered && "max-w-3xl",
        )}
      >
        {title}
      </Heading>

      {description ? (
        <div
          className={cn(
            "text-base leading-relaxed text-fg-muted sm:text-lg",
            centered ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}
