'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';
import { spring } from '@/lib/motion';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...spring.gentle, delay }}
    >
      {children}
    </motion.div>
  );
}
