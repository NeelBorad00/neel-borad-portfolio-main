import { skillGroups } from '@/lib/data';
import { TextReveal } from '@/components/ui/TextReveal';

export function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 py-24 md:py-32 border-t border-border">
      {/* Header */}
      <TextReveal>
        <span className="font-mono text-label uppercase tracking-widest text-accent">04</span>
        <h2 className="mt-2 font-display text-h2 text-text">Skills</h2>
      </TextReveal>

      {/* Skills grid */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {skillGroups.map((group, i) => (
          <TextReveal
            key={group.category}
            delay={i * 0.07}
            className="bg-base p-8 md:p-10"
          >
            <span className="font-mono text-label uppercase tracking-widest text-accent block mb-6">
              {group.category}
            </span>
            <ul className="space-y-3" aria-label={`${group.category} skills`}>
              {group.skills.map((skill) => (
                <li key={skill} className="font-body text-sm text-t2 flex items-center gap-3">
                  <span className="h-px w-2 bg-border shrink-0" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </TextReveal>
        ))}
      </div>
    </section>
  );
}
