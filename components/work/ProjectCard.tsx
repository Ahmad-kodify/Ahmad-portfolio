'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { EASE, STAGGER } from '@/lib/motion';
import { cn } from '@/lib/cn';
import { Reveal } from '../ui/Reveal';
import { Chip } from '../ui/Chip';
import { ProjectVisual } from './ProjectVisual';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** On the Work page the card expands to show Problem → What we built → Result. */
  expandable?: boolean;
}

export function ProjectCard({ project, index, expandable = false }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const host = project.url ? new URL(project.url).host.replace(/^www\./, '') : 'Private platform';
  const notesId = `notes-${project.id}`;

  return (
    <Reveal delay={(index % 2) * STAGGER} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-lift">
        {/* Browser frame */}
        <div className="browser-bar flex items-center gap-3 border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </span>
          <span className="mx-auto truncate rounded-md bg-white/80 px-3 py-0.5 text-[11px] font-medium text-muted ring-1 ring-ink/5">
            {host}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-cream">
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`${project.client} — ${project.title}`}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-expo group-hover:scale-[1.035]"
            />
          ) : (
            <ProjectVisual id={project.id} />
          )}
          {project.live && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur">
              <span className="relative flex h-1.5 w-1.5 text-terracotta">
                <span className="live-dot absolute inset-0" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-terracotta" />
              </span>
              Live
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
            {project.client}
            {project.location && <span className="text-muted"> · {project.location}</span>}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-[-0.02em] text-ink">{project.title}</h3>
          <p className="mt-2 leading-relaxed text-body">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology">
            {project.tags.map((t) => (
              <li key={t}>
                <Chip size="sm">{t}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            {expandable ? (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={notesId}
                onClick={() => setOpen((o) => !o)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <motion.span
                  aria-hidden
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border transition-colors',
                    open ? 'border-terracotta bg-terracotta text-white' : 'border-ink/15 text-ink',
                  )}
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </motion.span>
                {open ? 'Hide case notes' : 'Case notes'}
              </button>
            ) : (
              <Link href="/work" className="link-draw text-sm font-semibold text-ink">
                Case notes
              </Link>
            )}

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-1 text-sm font-semibold text-terracotta"
              >
                Visit site
                <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 14L14 6M8 6h6v6" />
                </svg>
              </a>
            )}
          </div>

          {expandable && (
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={notesId}
                  key="notes"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    {[
                      ['Problem', project.problem],
                      ['What we built', project.built],
                      ['Result', project.result],
                    ].map(([k, v]) => (
                      <div key={k} className="lead-bar">
                        <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">{k}</dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-body">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </article>
    </Reveal>
  );
}
