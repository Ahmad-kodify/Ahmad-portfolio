import { featuredProjects } from '@/lib/projects';
import { ProjectCard } from '../work/ProjectCard';
import { Accent, Band } from '../ui/Band';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="container-x py-20 md:py-28">
      <SectionHeading
        id="work-heading"
        eyebrow="Selected work"
        title={
          <>
            <Accent>Systems</Accent> we&apos;ve <Band>shipped</Band>.
          </>
        }
        sub="Real projects, in production, for real businesses."
        bar
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Button href="/work" variant="outline" size="lg">
          See all work
        </Button>
      </Reveal>
    </section>
  );
}
