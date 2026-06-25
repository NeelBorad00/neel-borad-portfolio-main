import { aboutParagraphs, coreAreas } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';

export function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-24 md:py-32 border-t border-border">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Narrative */}
        <div>
          <TextReveal>
            <span className="font-mono text-label uppercase tracking-widest text-accent">02</span>
            <h2 className="mt-2 font-display text-h2 text-text">About</h2>
          </TextReveal>

          <div className="mt-10 space-y-5">
            {aboutParagraphs.map((para, i) => (
              <TextReveal key={i} delay={i * 0.08}>
                <p className="font-body text-body-lg text-t2 leading-relaxed">{para}</p>
              </TextReveal>
            ))}
          </div>
        </div>

        {/* Right: Core capabilities */}
        <div>
          <TextReveal delay={0.1}>
            <span className="font-mono text-label uppercase tracking-widest text-t3">
              Core capabilities
            </span>
          </TextReveal>

          <ul className="mt-6 grid grid-cols-1 gap-3" aria-label="Core areas">
            {coreAreas.map((area, i) => (
              <TextReveal key={area} delay={0.05 + i * 0.04}>
                <li className="flex items-center gap-4 py-3 border-b border-border">
                  <span
                    className="h-px w-4 bg-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-sm text-text">{area}</span>
                </li>
              </TextReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
