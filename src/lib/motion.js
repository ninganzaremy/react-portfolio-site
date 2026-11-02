import { useReducedMotion } from 'framer-motion';

/** Shared framer-motion variants. Use with <Reveal> or directly. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Returns variants that collapse to instant when the user prefers reduced motion. */
export function useMotionSafe(variants = fadeUp) {
  const reduce = useReducedMotion();
  if (!reduce) return variants;
  return { hidden: { opacity: 1 }, show: { opacity: 1 } };
}
