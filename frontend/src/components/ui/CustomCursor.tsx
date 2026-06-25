'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { springOpts } from '@/lib/motion';

export function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, springOpts.cursor);
  const y = useSpring(mouseY, springOpts.cursor);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) setHovered(true);
    };

    const onLeave = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) setHovered(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-accent/60"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          transition: 'width 0.22s ease, height 0.22s ease',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        aria-hidden="true"
      />
    </>
  );
}
