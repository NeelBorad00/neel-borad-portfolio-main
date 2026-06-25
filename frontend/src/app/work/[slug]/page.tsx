import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };
  return {
    title: `${project.title} — Neel Borad`,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = projects[idx];
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const num = String(idx + 1).padStart(2, '0');
  const total = String(projects.length).padStart(2, '0');

  const sections = [
    { label: 'Problem',  body: project.problem  },
    { label: 'Approach', body: project.approach },
    { label: 'Outcome',  body: project.outcome  },
  ];

  return (
    /*
     * h-dvh: fills exactly one viewport height (respects mobile chrome bars).
     * flex-col + overflow-hidden: each band takes its natural size;
     * the middle content grid absorbs whatever remains via flex-1 min-h-0.
     */
    <article className="h-dvh flex flex-col px-6 md:px-12 pt-[72px] overflow-hidden">

      {/* ── Band 1: Top bar ───────────────────────────── shrink-0 */}
      <div className="shrink-0 flex items-center justify-between py-3 border-b border-border">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-widest text-t3 hover:text-t2 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M11 6H1M1 6l4-4M1 6l4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Work
        </Link>
        <span className="font-mono text-label text-t3">{num} / {total}</span>
      </div>

      {/* ── Band 2: Header ────────────────────────────── shrink-0 */}
      <header className="shrink-0 relative py-6 border-b border-border overflow-hidden">
        {/* Watermark index — fills the negative space on the right */}
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display leading-none text-s2 select-none pointer-events-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 16rem)' }}
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {/* Left: title block */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="font-mono text-label uppercase tracking-widest text-accent">
                {project.year}
              </span>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-label text-t3 border border-border rounded-sm px-2 py-px"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display leading-none text-text" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {project.title}
            </h1>
            <p className="mt-2 font-body text-sm text-t2 max-w-lg">{project.subtitle}</p>
          </div>

          {/* Right: source link */}
          <div className="shrink-0">
            {project.githubUrl && project.githubUrl !== '#' ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent hover:opacity-75 transition-opacity"
              >
                View Source
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ) : (
              <span className="font-mono text-label text-t3 uppercase tracking-widest">
                Private repo
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Band 3: Metrics strip ─────────────────────── shrink-0 */}
      <div className="shrink-0 grid grid-cols-3 gap-px bg-border border-b border-border">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-base px-5 md:px-7 py-4">
            <p className="font-display text-lg md:text-xl text-text leading-tight">{m.value}</p>
            <span className="mt-0.5 font-mono text-label uppercase tracking-widest text-t3 block">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Band 4: Problem / Approach / Outcome ────── flex-1 */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-3 gap-px bg-border border-b border-border">
        {sections.map(({ label, body }, i) => (
          <section
            key={label}
            className="bg-base px-5 md:px-7 py-6 flex flex-col overflow-y-auto"
          >
            <div className="shrink-0 flex items-baseline gap-3 mb-4">
              <span
                className="font-display leading-none text-s3 select-none"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <span className="font-mono text-label uppercase tracking-widest text-accent">
                {label}
              </span>
            </div>
            <p className="font-body text-sm text-t2 leading-relaxed">{body}</p>
          </section>
        ))}
      </div>

      {/* ── Band 5: Prev / Next nav ───────────────────── shrink-0 */}
      <nav
        className="shrink-0 grid grid-cols-2 gap-px bg-border"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group bg-base px-5 md:px-7 py-4 flex flex-col gap-0.5 hover:bg-s1 transition-colors"
          >
            <span className="font-mono text-label uppercase tracking-widest text-t3">← Previous</span>
            <span className="font-display text-sm text-t2 group-hover:text-text transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="bg-base" />
        )}

        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group bg-base px-5 md:px-7 py-4 flex flex-col gap-0.5 items-end text-right hover:bg-s1 transition-colors"
          >
            <span className="font-mono text-label uppercase tracking-widest text-t3">Next →</span>
            <span className="font-display text-sm t-t2 group-hover:text-text transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="bg-base" />
        )}
      </nav>

    </article>
  );
}
