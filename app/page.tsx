import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Hero } from '@/components/home/Hero';
import { Gap } from '@/components/home/Gap';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { StatsBand } from '@/components/home/StatsBand';
import { SelectedWork } from '@/components/home/SelectedWork';
import { WhoItsFor } from '@/components/home/WhoItsFor';
import { CTABand } from '@/components/CTABand';

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { title: site.title, description: site.description, url: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Gap />
      <ServicesGrid />
      <HowItWorks />
      <StatsBand />
      <SelectedWork />
      <WhoItsFor />
      <CTABand />
    </>
  );
}
