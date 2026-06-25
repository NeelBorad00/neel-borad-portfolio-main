import { Hero } from '@/components/sections/Hero';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
