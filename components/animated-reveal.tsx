import type { ReactNode } from "react";

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  /** Retained for callers; content never waits for an animation. */
  delay?: number;
}

/** Core content is rendered in its final state, including without JavaScript. */
export function AnimatedReveal({ children, className }: AnimatedRevealProps) {
  return <div className={className}>{children}</div>;
}
