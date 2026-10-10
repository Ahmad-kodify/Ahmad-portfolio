import { Band } from '@/components/ui/Band';
import { Button } from '@/components/ui/Button';
import { PillTag } from '@/components/ui/PillTag';

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pb-24 pt-40 text-center">
      <PillTag>404</PillTag>
      <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
        This page isn&apos;t part of the <Band>system</Band>.
      </h1>
      <p className="mt-6 max-w-md text-lg text-body">The link may be old, or the page has moved.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" magnetic>
          Back to home
        </Button>
        <Button href="/contact" variant="outline">
          Contact us
        </Button>
      </div>
    </section>
  );
}
