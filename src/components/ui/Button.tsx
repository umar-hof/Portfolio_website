import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink-950 shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_30px_-12px_rgba(79,209,255,0.65)] hover:bg-accent-bright",
  secondary:
    "border border-white/12 bg-white/[0.035] text-fg edge-light hover:border-white/22 hover:bg-white/[0.07]",
  ghost: "text-fg-muted hover:bg-white/[0.05] hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem] sm:h-13 sm:px-7 sm:text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /**
   * Marks this as a conversion action. The analytics listener picks up
   * `data-cta` on click, so buttons stay server components.
   */
  ctaEvent?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Renders as a <button> by default, or as a next/link when `href` is present.
 * That keeps the call site simple while preserving correct semantics and
 * keyboard behaviour for each case.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ctaEvent,
    ...rest
  } = props as CommonProps & { href?: string } & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], className);
  const tracking = ctaEvent ? { "data-cta": ctaEvent } : {};

  if (typeof rest.href === "string") {
    const { href, ...linkRest } = rest;

    return (
      <Link href={href} className={classes} {...tracking} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...tracking} {...rest}>
      {children}
    </button>
  );
}
