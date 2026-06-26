'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AiOrb() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-[88px] right-6 md:right-12 z-10 flex flex-col items-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Orb button */}
        <button
          onClick={toggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isPlaying ? 'Pause portfolio audio' : 'Play portfolio audio'}
          className="relative w-14 h-14 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          {/* Animated outer ring — only when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.span
                key="ring"
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.28, 1] }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(100, 120, 255, 0.45) 0%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* The sphere */}
          <span className={`ai-orb${isPlaying ? ' ai-orb--playing' : ''}`} />
        </button>

        {/* Tooltip — appears on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: -6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.92 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full mt-3 right-0 pointer-events-none"
            >
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap text-white/75">
                {isPlaying ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse shrink-0" />
                    Tap to pause
                  </>
                ) : (
                  <>
                    <span>🎧</span>
                    Hear about me
                  </>
                )}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio
        ref={audioRef}
        src="/Portfolio_Audio.mpeg"
        onEnded={() => setIsPlaying(false)}
        preload="none"
      />
    </motion.div>
  );
}
