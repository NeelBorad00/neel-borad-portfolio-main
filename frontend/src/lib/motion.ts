import type { SpringOptions, Transition, Variants } from 'motion/react';

// For useSpring() — SpringOptions only (no 'type' key)
export const springOpts = {
  gentle: { stiffness: 100, damping: 25, mass: 0.5 } satisfies SpringOptions,
  snappy: { stiffness: 300, damping: 30, mass: 0.5 } satisfies SpringOptions,
  cursor: { stiffness: 500, damping: 42, mass: 0.3 } satisfies SpringOptions,
  magnetic: { stiffness: 400, damping: 28, mass: 0.5 } satisfies SpringOptions,
};

// For motion element Transition objects
export const spring = {
  gentle: { type: 'spring', stiffness: 100, damping: 25, mass: 0.5 } as Transition,
  snappy: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 } as Transition,
  cursor: { type: 'spring', stiffness: 500, damping: 42, mass: 0.3 } as Transition,
  magnetic: { type: 'spring', stiffness: 400, damping: 28, mass: 0.5 } as Transition,
  page: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring.gentle, delay },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { ...spring.gentle, delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.gentle,
  },
};
