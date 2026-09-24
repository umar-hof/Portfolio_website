"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTag = "div" | "li";

/** Explicit map keeps the indexed access type-safe. */
const motionTags = {
  div: motion.div,
  li: motion.li,
} as const;

/**
 * Entrance animation for sections and cards.
 *
 * Opacity plus a small translate. Transform animations are automatically
 * flattened for users who prefer reduced motion by the app-level
 * <MotionConfig reducedMotion="user"> wrapper, so this stays SSR-safe and
 * never leaves content stuck in a hidden state.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 8,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
}) {
  const MotionTag = motionTags[Tag];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
