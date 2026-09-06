import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { clients, clientStats } from '../data/clients';

/**
 * Client roster between Projects and Testimonials — real businesses whose
 * sites I built and still maintain. Content lives in `src/data/clients.ts`.
 */
export default function Clients() {
  return (
    <section id="clients" className="border-t border-borders bg-primary-bg relative py-20 lg:py-28 scroll-mt-24">
      <div className="luxury-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            02 / CLIENTS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-primary-text font-editorial">
            Clients
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary-text max-w-xl font-light">
            Real businesses, real deadlines — sites I've built and still maintain.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid grid-cols-3 divide-x divide-borders rounded-2xl border border-borders bg-white shadow-soft"
        >
          {clientStats.map((stat) => (
            <div key={stat.label} className="px-3 py-5 sm:px-6 text-center">
              <div className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-primary-text">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-secondary-text">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Client cards — 2×2 on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {clients.map((client, index) => (
            <motion.article
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-borders bg-white p-6 shadow-soft transition-all duration-300 hover:border-accent/60 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none select-none" aria-hidden="true">
                  {client.flag}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-semibold tracking-tight text-primary-text">
                  {client.name}
                </h3>
              </div>

              <p className="mt-3 text-[14px] text-secondary-text font-light leading-relaxed">
                {client.business}
              </p>
              <p className="mt-1.5 text-[14px] text-primary-text leading-relaxed">
                <span className="font-semibold">My role:</span>{' '}
                <span className="font-light text-secondary-text">{client.role}</span>
              </p>

              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex max-w-full items-center gap-1 text-[13px] font-semibold text-primary-text underline-offset-4 transition-colors hover:text-accent"
              >
                <span className="truncate">{client.linkLabel}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={2.4}
                  className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            </motion.article>
          ))}
        </div>

        {/* Closing line */}
        <p className="mt-10 text-center text-[13px] font-light text-muted-text">
          Every site above is live, in production, and maintained by me on an ongoing basis.
        </p>
      </div>
    </section>
  );
}
