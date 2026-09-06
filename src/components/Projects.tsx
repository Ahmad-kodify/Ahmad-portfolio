import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, ShoppingBag, Search, Calendar, Star, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CurveDivider from './CurveDivider';
import CtaButton from './CtaButton';
import { projects } from '../data/projects';
import type { ProjectData } from '../data/projects';

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>('simplifyapps');
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="projects" className="border-t border-borders bg-white relative py-20 lg:py-32">
      <div className="luxury-container">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mb-20 space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            01 / PORTFOLIO
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter text-primary-text font-editorial">
            Featured Projects
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary-text max-w-xl font-light">
            An editorial look at business requirements and technical outcomes across major software systems.
          </p>
        </motion.div>

        {/* Split Screen Sticky Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative items-start">
          
          {/* Left Column: Sticky Monitor Mockup (55% width on desktop) */}
          <div className="lg:col-span-7 lg:sticky lg:top-[15vh] lg:h-[70vh] flex flex-col justify-center z-10 w-full">
            <MonitorFrame activeProjectId={activeProjectId} />
          </div>

          {/* Right Column: Scrolling Project Details (45% width on desktop) */}
          <div className="lg:col-span-5 space-y-[20vh] pb-[10vh]">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onVisible={() => setActiveProjectId(project.id)}
              />
            ))}
          </div>

        </div>

      </div>

      <CurveDivider targetRef={sectionRef} fill="#F5F3EE" />
    </section>
  );
}

/* ==========================================
   LEFT SIDE MONITOR FRAME SUBCOMPONENT
   ========================================== */
interface MonitorFrameProps {
  activeProjectId: string;
}

function MonitorFrame({ activeProjectId }: MonitorFrameProps) {
  const activeProject = projects.find((p) => p.id === activeProjectId);
  const shots = activeProject?.screenshots ?? [];
  const [imageIndex, setImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // New project in focus — restart its gallery from the first shot.
  useEffect(() => {
    setImageIndex(0);
    setIsLightboxOpen(false);
  }, [activeProjectId]);

  const safeIndex = shots.length > 0 ? imageIndex % shots.length : 0;
  const goPrev = () => setImageIndex((i) => (i - 1 + shots.length) % shots.length);
  const goNext = () => setImageIndex((i) => (i + 1) % shots.length);

  // Escape closes the zoom overlay.
  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (event.key === 'ArrowLeft' && shots.length > 1) goPrev();
      if (event.key === 'ArrowRight' && shots.length > 1) goNext();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, shots.length]);

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary-text text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)] ring-1 ring-white/15 transition-all duration-300 hover:bg-accent hover:text-primary-text hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer';

  return (
    <div className="w-full max-w-[460px] md:max-w-[500px] mx-auto flex flex-col items-center relative">
      {/* Premium gallery arrows flanking the monitor */}
      {shots.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous screenshot"
            className={`${arrowClass} -left-3 md:-left-14`}
          >
            <ChevronLeft size={20} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next screenshot"
            className={`${arrowClass} -right-3 md:-right-14`}
          >
            <ChevronRight size={20} strokeWidth={2.4} />
          </button>
        </>
      )}

      {/* Mockup Monitor Screen Frame */}
      <div className="w-full aspect-[16/10] bg-neutral-900 border-[10px] md:border-[14px] border-neutral-950 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
        {/* Top Browser Bar */}
        <div className="h-6 bg-neutral-950 px-4 flex items-center justify-between shrink-0 select-none border-b border-neutral-900">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
            <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
          </div>
          <div className="text-[9px] text-stone-500 font-mono tracking-wider truncate max-w-[200px]">
            {activeProject?.mockupUrl}
          </div>
          <div className="w-10"></div>
        </div>

        {/* Content Area with smooth cross-fade animation */}
        <div className="flex-1 bg-neutral-50 relative overflow-hidden select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProjectId}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              {shots.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label={`Zoom ${activeProject?.name} screenshot`}
                  className="block w-full h-full cursor-zoom-in focus-visible:outline-none"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={shots[safeIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="w-full h-full"
                    >
                      <ScreenshotMockup src={shots[safeIndex]} name={activeProject?.name ?? ''} />
                    </motion.div>
                  </AnimatePresence>
                </button>
              ) : (
                <>
                  {activeProjectId === 'tayfa' && <TayfaMockup />}
                  {activeProjectId === 'schuul' && <SchuulMockup />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Visually Prominent LED Monitor Stand/Base */}
      <div className="relative flex flex-col items-center select-none pointer-events-none w-full mt-[-1px]">
        {/* Stem (Silver / Brushed Metal Gradient) */}
        <div className="w-14 h-14 bg-gradient-to-b from-stone-400 via-stone-300 to-stone-400/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] relative">
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/30 -translate-x-1/2"></div>
        </div>
        
        {/* Stand Base Plate */}
        <div className="w-44 h-3.5 bg-gradient-to-r from-stone-500 via-stone-300 to-stone-500 rounded-t-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] relative">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40"></div>
        </div>
        
        {/* Soft natural floor shadow cast by monitor and stand */}
        <div className="w-56 h-10 bg-black/15 rounded-full blur-lg -mt-3.5 z-[-1]"></div>
      </div>

      {/* Zoom lightbox — portaled to <body> so no ancestor stacking context
          (sticky column z-10) can trap it below the fixed navbar. */}
      {createPortal(
      <AnimatePresence>
        {isLightboxOpen && shots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close zoomed screenshot"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/25 cursor-pointer"
            >
              <X size={18} />
            </button>

            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-accent hover:text-primary-text cursor-pointer"
                >
                  <ChevronLeft size={22} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-accent hover:text-primary-text cursor-pointer"
                >
                  <ChevronRight size={22} strokeWidth={2.4} />
                </button>
              </>
            )}

            <motion.img
              key={shots[safeIndex]}
              src={shots[safeIndex]}
              alt={`${activeProject?.name} screenshot enlarged`}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full rounded-xl shadow-2xl ring-1 ring-white/15 object-contain cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  );
}

/* ==========================================
   PROJECT MOCKUP TEMPLATES (INLINE REACT)
   ========================================== */

// 0. Client website screenshot inside the browser frame.
//    Drop the referenced images into `public/` (ads.png, arascow.png, ...).
function ScreenshotMockup({ src, name }: { src: string; name: string }) {
  return (
    <div className="w-full h-full bg-stone-100 relative">
      <img
        src={src}
        alt={`${name} website screenshot`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
    </div>
  );
}

// 2. Tayfa.pk Marketplace Mockup
function TayfaMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-stone-50 text-stone-800 font-sans text-[10px]">
      {/* Header bar */}
      <div className="h-10 bg-white border-b border-stone-200 px-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-stone-900">
          <ShoppingBag className="w-3.5 h-3.5 text-accent" />
          <span>tayfa.pk</span>
        </div>
        <div className="flex-1 max-w-[140px] mx-4 relative">
          <input
            type="text"
            placeholder="Search stores..."
            disabled
            className="w-full h-5.5 bg-stone-100 border border-stone-200 rounded px-2 pl-6 text-[8px] placeholder-stone-400"
          />
          <Search className="w-2.5 h-2.5 text-stone-400 absolute left-2 top-1.5" />
        </div>
        <div className="w-4 h-4 bg-stone-100 rounded-full flex items-center justify-center border border-stone-200">
          <span className="text-[7px] font-bold">3</span>
        </div>
      </div>

      {/* Banner Area */}
      <div className="p-3">
        <div className="bg-[#FAF2DF] border border-accent/20 rounded-lg p-2.5 flex justify-between items-center">
          <div className="space-y-0.5">
            <div className="font-bold text-stone-900 text-[11px]">Local Multi-Vendor Marketplace</div>
            <div className="text-stone-500 text-[8px]">Connecting vendors and processing real checkout transactions.</div>
          </div>
          <div className="bg-stone-900 text-white text-[8px] font-bold px-2 py-0.5 rounded">15% OFF</div>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 px-3 pb-3 grid grid-cols-3 gap-3 overflow-hidden">
        {[
          { title: 'Branded Hoodie', price: '$45.00', seller: 'Clothing Co' },
          { title: 'Leather Boots', price: '$85.00', seller: 'Footwear Hub' },
          { title: 'Canvas Backpack', price: '$35.00', seller: 'Traveler Gear' },
        ].map((prod, idx) => (
          <div key={idx} className="bg-white border border-stone-200 rounded-lg p-2 flex flex-col justify-between hover:border-accent">
            <div className="w-full aspect-[4/3] bg-stone-100 rounded-md mb-2 flex items-center justify-center text-stone-300">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-stone-900 truncate">{prod.title}</div>
              <div className="text-[7px] text-stone-400 truncate">Store: {prod.seller}</div>
            </div>
            <div className="flex justify-between items-center mt-2 border-t border-stone-100 pt-1.5">
              <span className="font-bold text-stone-950">{prod.price}</span>
              <span className="bg-stone-100 text-[7px] font-bold px-1 py-0.5 rounded text-stone-600">Buy</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Schuul.com Tutoring Platform Mockup
function SchuulMockup() {
  return (
    <div className="w-full h-full flex bg-[#F6F8FA] text-stone-800 font-sans text-[10px]">
      {/* Left panel: Active Tutors */}
      <div className="w-5/12 bg-white border-r border-stone-200 p-3 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 pb-2 border-b border-stone-200">
          <Users className="w-3.5 h-3.5 text-accent" />
          <span className="font-semibold text-stone-900">Active Tutoring Listings</span>
        </div>
        <div className="space-y-2 flex-1 overflow-hidden">
          {[
            { name: 'Dr. Sarah Miller', sub: 'Mathematics & Algebra' },
            { name: 'Prof. John Doe', sub: 'Physics & Engineering' },
            { name: 'Jane Williams', sub: 'Chemistry & Biology' },
          ].map((tutor, idx) => (
            <div key={idx} className="border border-stone-150 p-2 rounded-lg bg-[#FAFBFB] flex items-center gap-2">
              <div className="w-6 h-6 bg-accent/20 rounded-full shrink-0 flex items-center justify-center font-bold text-accent text-[8px]">
                {tutor.name[0]}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-stone-900 truncate">{tutor.name}</div>
                <div className="text-[7px] text-stone-500 truncate">{tutor.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Scheduling & Slots */}
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className="flex justify-between items-center pb-2 border-b border-stone-200">
          <span className="font-semibold text-stone-900">Dr. Sarah Miller Schedule</span>
          <div className="flex items-center gap-0.5 text-amber-500">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span className="font-bold text-[8px]">5.0</span>
          </div>
        </div>

        {/* Date Slot Grid */}
        <div className="space-y-1.5 flex-1">
          <span className="text-[8px] uppercase tracking-wider text-stone-400 flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> Next Available Slots</span>
          
          <div className="space-y-1 mt-1">
            <div className="bg-emerald-50 border border-emerald-200/50 p-1.5 rounded flex justify-between items-center">
              <span className="font-semibold text-emerald-800">Monday, 09:00 AM</span>
              <span className="bg-emerald-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded">Book Now</span>
            </div>
            <div className="bg-stone-100 border border-stone-200 p-1.5 rounded flex justify-between items-center opacity-60">
              <span className="font-semibold text-stone-600">Monday, 10:30 AM</span>
              <span className="text-stone-400 text-[7px] font-bold">Booked</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/50 p-1.5 rounded flex justify-between items-center">
              <span className="font-semibold text-emerald-800">Tuesday, 02:00 PM</span>
              <span className="bg-emerald-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded">Book Now</span>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="bg-stone-950 text-white p-2 rounded-lg flex items-center justify-between">
          <span className="text-[7px]">Stripe Connect Active</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   RIGHT SIDE PROJECT CARD SUBCOMPONENT
   ========================================== */
interface ProjectCardProps {
  project: ProjectData;
  onVisible: () => void;
}

function ProjectCard({ project, onVisible }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible();
        }
      },
      {
        threshold: 0.35, // When 35% of the card is visible
        rootMargin: '-10% 0px -30% 0px', // Focus window on the middle area of viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [onVisible]);

  return (
    <div
      ref={cardRef}
      className="min-h-[75vh] lg:min-h-screen flex flex-col justify-center py-16 space-y-6 scroll-mt-24"
      id={`project-${project.id}`}
    >
      {/* Category Pill/Badge + optional location tag */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex px-3 py-1 text-xs font-semibold text-secondary-text bg-stone-100 rounded-full border border-borders/50">
          {project.category}
        </span>
        {project.country && (
          <span className="text-xs text-muted-text font-medium tracking-wide">
            {project.country}
          </span>
        )}
      </div>

      {/* Project Name and Optional Badge */}
      <div className="space-y-3">
        <h3 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tighter text-primary-text leading-none flex items-center gap-3 flex-wrap">
          <span>{project.name}</span>
          {project.badge && (
            <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
              project.badge === 'Live' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-250/30' 
                : 'bg-orange-50 text-orange-700 border-orange-250/30'
            }`}>
              {project.badge}
            </span>
          )}
        </h3>
      </div>

      {/* Description */}
      <p className="text-base sm:text-lg text-secondary-text font-light leading-relaxed max-w-lg">
        {project.description}
      </p>

      {/* Tech chips (client websites) */}
      {project.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs font-medium text-secondary-text bg-stone-100 rounded-full border border-borders/50"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Equal Style Action Buttons — data-driven links replace the defaults when present */}
      <div className="flex flex-row flex-wrap gap-3 pt-4">
        {project.links && project.links.length > 0 ? (
          project.links.map((link, index) => (
            <CtaButton
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant={index === 0 ? 'solid' : 'outline'}
            >
              {link.label}
            </CtaButton>
          ))
        ) : (
          <>
            <CtaButton href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              View Project
            </CtaButton>
            <CtaButton
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Live Preview
            </CtaButton>
          </>
        )}
      </div>
    </div>
  );
}
