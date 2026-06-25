import { education, achievements } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';

export function Education() {
  return (
    <section
      id="education"
      className="px-6 md:px-12 py-24 md:py-32 border-t border-border"
    >
      <TextReveal>
        <span className="font-mono text-label uppercase tracking-widest text-accent">05</span>
        <h2 className="mt-2 font-display text-h2 text-text">Education & Achievements</h2>
      </TextReveal>

      <div className="mt-16 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
        {/* Left: Education */}
        <div>
          <TextReveal>
            <span className="font-mono text-label uppercase tracking-widest text-t3">
              Education
            </span>
          </TextReveal>

          <TextReveal delay={0.08}>
            <div className="mt-6 p-8 bg-s1 border border-border">
              <h3 className="font-display text-h3 text-text">{education.institution}</h3>
              <p className="mt-2 font-body text-sm text-t2">{education.degree}</p>
              <p className="font-body text-sm text-t2">{education.field}</p>

              <div className="mt-4 flex items-center gap-6">
                <div>
                  <span className="font-mono text-label text-t3 uppercase tracking-widest">
                    GPA
                  </span>
                  <p className="mt-0.5 font-display text-lg text-accent">{education.gpa}</p>
                </div>
                <div className="h-8 w-px bg-border" aria-hidden="true" />
                <div>
                  <span className="font-mono text-label text-t3 uppercase tracking-widest">
                    Graduated
                  </span>
                  <p className="mt-0.5 font-body text-sm text-t2">{education.period}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <span className="font-mono text-label text-t3 uppercase tracking-widest">
                  Coursework
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <span
                      key={course}
                      className="font-mono text-label text-t3 border border-border px-2 py-0.5 rounded-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TextReveal>
        </div>

        {/* Right: Achievements */}
        <div>
          <TextReveal>
            <span className="font-mono text-label uppercase tracking-widest text-t3">
              Achievements
            </span>
          </TextReveal>

          <div className="mt-6 space-y-px">
            {achievements.map((item, i) => (
              <TextReveal key={item.title} delay={0.06 + i * 0.07}>
                <div className="p-6 bg-s1 border border-border group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-display text-base text-text">{item.title}</h4>
                      <p className="mt-1.5 font-body text-sm text-t2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-mono text-label text-accent uppercase tracking-widest shrink-0">
                      {item.type}
                    </span>
                  </div>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
