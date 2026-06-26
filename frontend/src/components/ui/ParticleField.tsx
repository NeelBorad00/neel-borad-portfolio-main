'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

// ── Particle visual presets ───────────────────────────────────
// Tight palette: warm gold + cold white stars. No grey blobs.
const PRESETS = [
  { color: '#D4891A', glow: 'rgba(212,137,26,0.8)',  minR: 0.9, maxR: 1.8 }, // amber
  { color: '#E8A040', glow: 'rgba(232,160,64,0.7)',  minR: 0.7, maxR: 1.5 }, // light amber
  { color: '#F4F4F2', glow: 'rgba(244,244,242,0.6)', minR: 0.4, maxR: 1.0 }, // white star
  { color: '#C4791A', glow: 'rgba(196,121,26,0.7)',  minR: 0.6, maxR: 1.4 }, // deep amber
  { color: '#F4F4F2', glow: 'rgba(244,244,242,0.5)', minR: 0.3, maxR: 0.8 }, // tiny star (2× weight)
  { color: '#F4F4F2', glow: 'rgba(244,244,242,0.5)', minR: 0.3, maxR: 0.8 },
] as const;

// ── Physics ───────────────────────────────────────────────────
const COUNT        = 220;
const INNER_RADIUS = 65;    // repulsion core
const RING_RADIUS  = 90;    // orbit target
const OUTER_RADIUS = 210;   // influence falloff
const ATTRACT      = 0.09;
const REPEL        = 5.5;
const SPRING       = 0.036;
const FRICTION     = 0.84;
const DRIFT        = 0.006; // idle micro-motion

interface Particle {
  x: number; y: number;
  ox: number; oy: number;
  vx: number; vy: number;
  r: number;
  color: string;
  glow: string;
  glowSize: number; // shadowBlur
  alpha: number;
}

function scatter(W: number, H: number): Particle[] {
  return Array.from({ length: COUNT }, () => {
    const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    const r      = Math.random() * (preset.maxR - preset.minR) + preset.minR;
    const ox     = Math.random() * W;
    const oy     = Math.random() * H;
    return {
      x: ox, y: oy, ox, oy,
      vx: 0, vy: 0,
      r,
      color:    preset.color,
      glow:     preset.glow,
      glowSize: r * 5,           // larger particles glow proportionally more
      alpha:    Math.random() * 0.45 + 0.2,
    };
  });
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced   = useReducedMotion();
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width  = W;
      canvas.height = H;
      particles = scatter(W, H);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.current = (x >= 0 && x <= W && y >= 0 && y <= H)
        ? { x, y }
        : { x: -9999, y: -9999 };
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const mx       = mouse.current.x;
      const my       = mouse.current.y;
      const hasCursor = mx !== -9999;

      for (const p of particles) {
        // ── Cursor physics ──────────────────────────────────────
        if (hasCursor) {
          const dx   = p.x - mx;
          const dy   = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INNER_RADIUS && dist > 0.1) {
            // Repel from cursor core
            const f = ((INNER_RADIUS - dist) / INNER_RADIUS) * REPEL;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          } else if (dist < OUTER_RADIUS && dist > 0.1) {
            // Pull toward orbit ring — negative delta = inside ring → push out
            const delta = dist - RING_RADIUS;
            const t     = Math.max(0, 1 - (dist - INNER_RADIUS) / (OUTER_RADIUS - INNER_RADIUS));
            const f     = delta * ATTRACT * t;
            p.vx -= (dx / dist) * f;
            p.vy -= (dy / dist) * f;
          }
        }

        // ── Spring to origin ────────────────────────────────────
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;

        // ── Idle drift ──────────────────────────────────────────
        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x  += p.vx;
        p.y  += p.vy;

        // ── Draw glowing circle ─────────────────────────────────
        ctx.save();
        ctx.globalAlpha  = p.alpha;
        ctx.shadowColor  = p.glow;
        ctx.shadowBlur   = p.glowSize;
        ctx.fillStyle    = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
