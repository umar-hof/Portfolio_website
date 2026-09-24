import Image from "next/image";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  title: string;
  category: string;
  image: string | null;
  imageAlt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hides the placeholder marker when the surface already states it. */
  showMarker?: boolean;
}

/**
 * Project media.
 *
 * Renders the real screenshot when one exists. When `image` is null it renders
 * generated placeholder art rather than a stock photo or an invented mockup —
 * the marker makes it impossible to ship an empty project unnoticed.
 */
export function ProjectVisual({
  title,
  category,
  image,
  imageAlt,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  showMarker = true,
}: ProjectVisualProps) {
  if (image) {
    return (
      <div className={cn("relative aspect-16/10 overflow-hidden bg-ink-900", className)}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-16/10 overflow-hidden bg-ink-900",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid-sm opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-br from-accent/[0.08] via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fg-subtle">
          {category}
        </span>
        <span className="text-sm font-medium text-fg-muted">{title}</span>
        {showMarker ? <Placeholder label="Project image required" size="sm" /> : null}
      </div>
    </div>
  );
}
