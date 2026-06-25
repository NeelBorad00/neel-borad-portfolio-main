'use client';

import { useState, FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { personal } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '', _hp: '' });
  const [status, setStatus] = useState<Status>('idle');
  const reduced = useReducedMotion();

  const set = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (fields._hp) return; // honeypot

    setStatus('loading');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: fields.name, email: fields.email, message: fields.message }),
        },
      );
      if (!res.ok) throw new Error('non-ok');
      setStatus('success');
      setFields({ name: '', email: '', message: '', _hp: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-s1 border border-border text-text font-body text-sm px-4 py-3 rounded-sm placeholder:text-t3 focus:outline-none focus:border-accent transition-colors duration-200';

  return (
    <section id="contact" className="px-6 md:px-12 py-24 md:py-32 border-t border-border">
      <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">
        {/* Left: CTA */}
        <div>
          <TextReveal>
            <span className="font-mono text-label uppercase tracking-widest text-accent">06</span>
            <h2 className="mt-2 font-display text-h1 text-text leading-none">
              Let&apos;s
              <br />
              Talk.
            </h2>
          </TextReveal>

          <TextReveal delay={0.1}>
            <p className="mt-8 max-w-sm font-body text-body-lg text-t2 leading-relaxed">
              Got a project, a role, or just want to exchange ideas? I&apos;d love to hear about it.
            </p>
          </TextReveal>

          <TextReveal delay={0.18}>
            <div className="mt-10 space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="font-body text-sm text-t2 hover:text-text transition-colors block"
              >
                {personal.email}
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-sm text-t2 hover:text-text transition-colors block"
              >
                LinkedIn ↗
              </a>
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-sm text-t2 hover:text-text transition-colors block"
              >
                GitHub ↗
              </a>
            </div>
          </TextReveal>
        </div>

        {/* Right: Form */}
        <TextReveal delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot — hidden from real users */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                value={fields._hp}
                onChange={set('_hp')}
              />
            </div>

            <div>
              <label htmlFor="contact-name" className="block font-mono text-label uppercase tracking-widest text-t3 mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                autoComplete="name"
                value={fields.name}
                onChange={set('name')}
                placeholder="Your name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-mono text-label uppercase tracking-widest text-t3 mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={fields.email}
                onChange={set('email')}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-label uppercase tracking-widest text-t3 mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={fields.message}
                onChange={set('message')}
                placeholder="Tell me about your project or idea..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-3.5 bg-accent text-[#0A0A0A] font-body font-semibold text-sm rounded-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              whileTap={reduced ? {} : { scale: 0.98 }}
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'success'
                ? 'Message Sent ✓'
                : 'Send Message'}
            </motion.button>

            {status === 'error' && (
              <p className="font-body text-sm text-red-400 text-center" role="alert">
                Something went wrong. Please email me directly at{' '}
                <a href={`mailto:${personal.email}`} className="underline">
                  {personal.email}
                </a>
                .
              </p>
            )}
          </form>
        </TextReveal>
      </div>
    </section>
  );
}
