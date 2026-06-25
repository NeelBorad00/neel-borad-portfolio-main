import { experience } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';

export function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-24 md:py-32 border-t border-border">
      {/* Header */}
      <TextReveal>
        <span className="font-mono text-label uppercase tracking-widest text-accent">03</span>
        <h2 className="mt-2 font-display text-h2 text-text">Experience</h2>
      </TextReveal>

      {/* Timeline */}
      <div className="mt-16 relative">
        {/* Vertical rule */}
        <div
          className="absolute left-[5px] top-2 bottom-2 w-px bg-border hidden md:block"
          aria-hidden="true"
        />

        <div className="space-y-14">
          {experience.map((job, i) => (
            <TextReveal key={job.company} delay={i * 0.1}>
              <div className="md:pl-12 relative">
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-[6px] w-[11px] h-[11px] rounded-full border-2 border-accent bg-base hidden md:block"
                  aria-hidden="true"
                />

                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-8">
                  <div>
                    <h3 className="font-display text-h3 text-text">{job.company}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-body text-sm font-medium text-t2">{job.role}</span>
                      {job.tags.length > 0 && (
                        <>
                          <span className="text-t3 text-xs" aria-hidden="true">·</span>
                          {job.tags.map((tag) => (
                            <span key={tag} className="font-mono text-label text-accent">
                              {tag}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-label text-t3 whitespace-nowrap">
                      {job.period}
                    </span>
                    {job.location && (
                      <p className="mt-0.5 font-mono text-label text-t3">{job.location}</p>
                    )}
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="mt-5 space-y-2.5" aria-label={`${job.company} responsibilities`}>
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        className="mt-[7px] h-[5px] w-[5px] rounded-full bg-t3 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-body text-sm text-t2 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
