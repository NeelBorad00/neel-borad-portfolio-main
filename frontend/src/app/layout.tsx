import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { LenisProvider } from '@/components/ui/LenisProvider';

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Neel Borad — Product Manager & AI Solutions Builder',
  description:
    'Product Manager and AI Solutions Builder specialising in conversational AI, voice agents, prompt engineering, and end-to-end product delivery.',
  keywords: [
    'Product Manager',
    'AI Solutions Builder',
    'Conversational AI',
    'Voice AI',
    'Prompt Engineering',
    'Neel Borad',
  ],
  openGraph: {
    title: 'Neel Borad — Product Manager & AI Solutions Builder',
    description: 'Building intelligent products at the intersection of AI and strategy.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="font-body bg-base text-text">
        <LenisProvider>
          <CustomCursor />
          <NoiseOverlay />
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
