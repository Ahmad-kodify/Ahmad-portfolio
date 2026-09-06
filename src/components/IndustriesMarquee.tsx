import type { CSSProperties } from 'react';
import { industries } from '../data/services';

/**
 * Infinite horizontal marquee of industries, rendered in the strip directly
 * below the Services grid. Pure CSS transform animation (keyframes live in
 * index.css): the list is duplicated so translateX(-50%) loops seamlessly.
 * Hover pauses it; prefers-reduced-motion renders it as static wrapped text.
 */

const edgeFade: CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
  maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
};

export default function IndustriesMarquee() {
  return (
    <section id="industries" aria-label="Industries I have built for" className="bg-primary-bg pt-2 pb-8">
      <p className="mb-5 text-center text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-text">
        INDUSTRIES I'VE BUILT FOR
      </p>

      <div className="industries-marquee overflow-hidden" style={edgeFade}>
        <div className="industries-track flex w-max">
          {[false, true].map((isDuplicate) => (
            <ul
              key={isDuplicate ? 'copy' : 'original'}
              aria-hidden={isDuplicate || undefined}
              className="flex shrink-0 items-center"
            >
              {industries.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="flex items-center whitespace-nowrap text-[1.1rem] lg:text-[1.4rem] font-medium tracking-wide text-secondary-text"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="mr-2.5 h-[1.15em] w-[1.15em] text-accent"
                  />
                  {name}
                  <span aria-hidden="true" className="mx-6 text-[0.55em] text-accent">
                    ◆
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
