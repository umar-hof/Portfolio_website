import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Narrower measure for long-form reading (case studies, legal pages). */
  width?: "default" | "prose";
}

const widths = {
  default: "max-w-7xl",
  prose: "max-w-3xl",
} as const;

/** Horizontal rhythm and max line length for every section on the site. */
export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}>
      {children}
    </Tag>
  );
}
