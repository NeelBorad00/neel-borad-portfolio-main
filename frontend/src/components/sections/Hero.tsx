'use client';

import { motion, useReducedMotion } from 'motion/react';
import { personal } from '@/lib/data';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParticleField } from '@/components/ui/ParticleField';

export function Hero() {
  const reduced = useReducedMotion();

  const entry = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduced
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 90, damping: 22, delay },
  });

  const slideEntry = (delay: number) => ({
    initial: { opacity: 0, x: reduced ? 0 : -32 },
    animate: { opacity: 1, x: 0 },
    transition: reduced
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 90, damping: 22, delay },
  });

  return (
    <section
      id="hero"
      className="relative h-dvh flex flex-col px-6 md:px-12 pt-24 pb-16 overflow-hidden"
    >
      {/* Particle field — behind all content */}
      <ParticleField />

      {/* Role label */}
      <motion.div {...entry(0.05)} className="relative z-10 mb-6 md:mb-8">
        <span className="font-mono text-label uppercase tracking-widest text-accent">
          {personal.role}
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 grid lg:grid-cols-[1fr_280px] gap-8 items-center min-h-0">
        {/* Left: Identity */}
        <div>
          <h1 className="font-display leading-none tracking-tight text-hero text-text select-none">
            <motion.span {...slideEntry(0.1)} className="block">
              NEEL
            </motion.span>
            <motion.span {...slideEntry(0.2)} className="block pl-[0.18em] md:pl-[0.32em]">
              BORAD
            </motion.span>
          </h1>

          <motion.div
            className="mt-5 h-px w-10 bg-accent origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
          />

          <motion.p {...entry(0.45)} className="mt-5 max-w-md font-body text-body-lg text-t2 leading-relaxed">
            {personal.tagline}
          </motion.p>

          <motion.div {...entry(0.6)} className="mt-7 flex flex-wrap gap-4">
            <MagneticButton href="#experience" variant="primary">
              View Experience
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in Touch
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: Current status — desktop only */}
        <motion.aside
          {...entry(0.75)}
          className="hidden lg:flex flex-col self-center"
          aria-label="Current status"
        >
          <span className="font-mono text-label uppercase tracking-widest text-t3">Currently</span>
          <div className="mt-3 h-px bg-border" />
          <div className="mt-4 space-y-0.5">
            <p className="font-body text-sm text-text">{personal.currentCompany}</p>
            <p className="font-body text-sm text-t2">{personal.currentRole}</p>
          </div>
          <div className="mt-4 h-px bg-border" />
          <p className="mt-4 font-mono text-label text-t3">{personal.location}</p>
        </motion.aside>
      </div>

      {/* Scroll indicator — absolutely pinned to bottom, never overlaps buttons */}
      <motion.div {...entry(0.9)} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        <span className="font-mono text-label uppercase tracking-widest text-t3">Scroll</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-t3">
          <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
