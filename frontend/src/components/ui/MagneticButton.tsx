'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { useRef, ReactNode } from 'react';
import Link from 'next/link';
import { springOpts } from '@/lib/motion';

interface MagneticButtonProps {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  external?: boolean;
}

export function MagneticButton({
  children,
  href,
  variant = 'ghost',
  className = '',
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springOpts.magnetic);
  const springY = useSpring(y, springOpts.magnetic);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold font-body rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';

  const styles = {
    primary: `${base} bg-accent text-[#0A0A0A] hover:opacity-90`,
    ghost: `${base} border border-borderh text-t2 hover:text-text hover:border-text/20`,
  };

  const extra = external ? { target: '_blank', rel: 'noreferrer noopener' } : {};

  return (
    <motion.div
      style={reduced ? {} : { x: springX, y: springY }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        className={`${styles[variant]} ${className}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...extra}
      >
        {children}
      </Link>
    </motion.div>
  );
}
