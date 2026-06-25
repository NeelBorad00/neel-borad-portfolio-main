'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';
import { spring, springOpts } from '@/lib/motion';

export function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const thumbX = useSpring(cursorX, springOpts.snappy);
  const thumbY = useSpring(cursorY, springOpts.snappy);

  const onMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  return (
    <section
      id="work"
      className="px-6 md:px-12 py-24 md:py-32 border-t border-border"
      onMouseMove={onMouseMove}
    >
      <TextReveal>
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="font-mono text-label uppercase tracking-widest text-accent">01</span>
            <h2 className="mt-2 font-display text-h2 text-text">Selected Work</h2>
          </div>
          <span className="font-mono text-label text-t3 hidden md:block">
            {projects.length} projects
          </span>
        </div>
      </TextReveal>

      <div>
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative"
          >
            <Link
              href={`/work/${project.slug}`}
              className="flex items-start md:items-center justify-between gap-6 py-7 border-t border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="flex items-start md:items-center gap-5 md:gap-8 min-w-0">
                <span className="font-mono text-label text-t3 shrink-0 pt-1 md:pt-0">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-h3 text-text transition-colors duration-200 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-t2">{project.subtitle}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-label text-t3 border border-border rounded-sm px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-label text-t3 hidden md:block">{project.year}</span>
                <motion.span
                  className="font-body text-text"
                  animate={!reduced && hoveredIndex === i ? { x: 4, y: -4 } : { x: 0, y: 0 }}
                  transition={spring.snappy}
                  aria-hidden="true"
                >
                  ↗
                </motion.span>
              </div>
            </Link>

            {!reduced && (
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </motion.div>
        ))}

        <div className="border-t border-border" />
      </div>

      {/* Cursor-follow thumbnail — desktop, no reduced motion */}
      {!reduced && (
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="fixed pointer-events-none z-30 w-64 h-44 bg-s2 border border-border flex items-center justify-center overflow-hidden"
              style={{ x: thumbX, y: thumbY, translateX: '-50%', translateY: '-110%' }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={spring.snappy}
              aria-hidden="true"
            >
              <div className="text-center px-6">
                <p className="font-display text-base text-text leading-tight">
                  {projects[hoveredIndex].title}
                </p>
                <p className="mt-1 font-mono text-label text-t3 uppercase tracking-widest">
                  {projects[hoveredIndex].year}
                </p>
              </div>
              <span className="absolute bottom-3 right-3 font-mono text-label text-t3">
                // PLACEHOLDER
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
