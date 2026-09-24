"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * App-level motion configuration.
 *
 * `reducedMotion="user"` makes Framer Motion honour the operating system's
 * reduced-motion preference automatically: transform and layout animations are
 * flattened to their final value while opacity transitions still work. Doing it
 * here rather than per-component keeps SSR output consistent and means no
 * component can forget to respect the setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
