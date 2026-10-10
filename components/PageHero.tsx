import { SectionHeading } from './ui/SectionHeading';

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
}

/** Consistent hero for every inner page — one H1, eyebrow pill, supporting line. */
export function PageHero({ eyebrow, title, sub, children }: PageHeroProps) {
  return (
    <section className="container-x pb-14 pt-32 md:pb-20 md:pt-44">
      <SectionHeading as="h1" size="display" eyebrow={eyebrow} title={title} sub={sub} bar className="max-w-4xl" />
      {children}
    </section>
  );
}
