import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strip a trailing slash so URLs compose predictably. */
export function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export function absoluteUrl(path: string, origin: string) {
  return `${normalizeUrl(origin)}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Wall-clock timestamp.
 *
 * Deliberately a module-scope function rather than an inline `Date.now()` call:
 * React's purity rule forbids impure calls anywhere reachable from a component
 * body, and a submit handler created during render is indistinguishable from
 * render code to static analysis. Event handlers legitimately need the clock.
 */
export function nowMs() {
  return Date.now();
}
