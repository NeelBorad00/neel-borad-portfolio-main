import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--color-base)',
        s1: 'var(--color-s1)',
        s2: 'var(--color-s2)',
        s3: 'var(--color-s3)',
        text: 'var(--color-text)',
        t2: 'var(--color-t2)',
        t3: 'var(--color-t3)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        borderh: 'var(--color-border-h)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(4.5rem,13vw,13rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'h1': ['clamp(2.5rem,6vw,6rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem,3.5vw,3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.25rem,2vw,1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
};

export default config;
