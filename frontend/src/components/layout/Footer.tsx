import { personal } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-mono text-label uppercase tracking-widest text-t3">
        © {year} {personal.name}
      </span>
      <div className="flex items-center gap-6">
        <a
          href={personal.linkedinUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-label uppercase tracking-widest text-t3 hover:text-t2 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={personal.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-label uppercase tracking-widest text-t3 hover:text-t2 transition-colors"
        >
          GitHub
        </a>
        <a
          href={`mailto:${personal.email}`}
          className="font-mono text-label uppercase tracking-widest text-t3 hover:text-t2 transition-colors"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
