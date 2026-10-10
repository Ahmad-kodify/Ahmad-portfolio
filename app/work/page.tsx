import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { PageHero } from '@/components/PageHero';
import { ProjectCard } from '@/components/work/ProjectCard';
import { CTABand } from '@/components/CTABand';
import { Accent, Band } from '@/components/ui/Band';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Systems Arkar has shipped: a bilingual services site in Riyadh, a tutoring marketplace, an ERP and HRMS platform, a multi-vendor e-commerce platform and more. Real projects, in production.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — Arkar',
    description: "Systems we've shipped. Real projects, in production, for real businesses.",
    url: '/work',
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            <Accent>Systems</Accent> we&apos;ve <Band>shipped</Band>.
          </>
        }
        sub="Every project here is real and in production. Open the case notes for the problem, what we built, and the result."
      />

      <section aria-label="Projects" className="container-x pb-20 md:pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} expandable />
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Your business could be the <Band>next one</Band> on this <Accent>page</Accent>.
          </>
        }
        sub="Tell us what you're working on. We'll show you what to build first."
      />
    </>
  );
}
