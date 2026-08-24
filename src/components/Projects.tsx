import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ShoppingBag, Search, Calendar, Star, Users, Briefcase, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CurveDivider from './CurveDivider';
import CtaButton from './CtaButton';

// TypeScript interfaces for project details
interface ProjectData {
  id: string;
  category: string;
  name: string;
  badge: string | null;
  description: string;
  liveUrl: string;
}

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>('simplifyapps');
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: ProjectData[] = [
    {
      id: 'simplifyapps',
      category: 'Enterprise Software',
      name: 'SimplifyApps ERP',
      badge: 'Featured',
      description: 'A complete enterprise resource planning platform built for real business operations. Covers inventory, HR, sales, and reporting modules.',
      liveUrl: '#',
    },
    {
      id: 'tayfa',
      category: 'E-Commerce',
      name: 'Tayfa.pk',
      badge: 'Live',
      description: 'A full-stack multi-vendor e-commerce platform handling real transactions for real customers built with Laravel and React.',
      liveUrl: 'https://tayfa.pk',
    },
    {
      id: 'schuul',
      category: 'EdTech',
      name: 'Schuul.com',
      badge: null,
      description: 'A live tutoring marketplace with Stripe Connect, real-time scheduling, and multi-role user management.',
      liveUrl: '#',
    },
  ];

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
  return (
    <div className="w-full max-w-[460px] md:max-w-[500px] mx-auto flex flex-col items-center">
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
            {activeProjectId === 'simplifyapps' && 'simplifyapps.io/dashboard'}
            {activeProjectId === 'tayfa' && 'tayfa.pk/shop'}
            {activeProjectId === 'schuul' && 'schuul.com/tutors'}
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
              {activeProjectId === 'simplifyapps' && <ErpMockup />}
              {activeProjectId === 'tayfa' && <TayfaMockup />}
              {activeProjectId === 'schuul' && <SchuulMockup />}
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
    </div>
  );
}

/* ==========================================
   PROJECT MOCKUP TEMPLATES (INLINE REACT)
   ========================================== */

// 1. SimplifyApps ERP Dashboard Mockup
function ErpMockup() {
  return (
    <div className="w-full h-full flex bg-neutral-900 text-stone-100 font-sans text-[10px]">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-neutral-950 border-r border-neutral-800 p-3 flex flex-col gap-4">
        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-800">
          <Briefcase className="w-3.5 h-3.5 text-accent" />
          <span className="font-bold tracking-tight text-white">Simplify ERP</span>
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="bg-neutral-800 text-accent font-medium px-2 py-1 rounded flex items-center gap-1.5">
            <Activity className="w-3 h-3" /> Dashboard
          </div>
          <div className="text-stone-400 px-2 py-1 rounded">Inventory</div>
          <div className="text-stone-400 px-2 py-1 rounded">HR Logs</div>
          <div className="text-stone-400 px-2 py-1 rounded">Sales Rep</div>
        </div>
        <div className="h-4 bg-neutral-800 rounded w-full opacity-30"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-neutral-900 flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
          <span className="font-semibold text-white">Enterprise Systems Overview</span>
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 bg-neutral-800 rounded-full"></div>
            <div className="w-12 h-3.5 bg-neutral-800 rounded"></div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-neutral-950 p-2 border border-neutral-800 rounded-lg">
            <div className="text-stone-500">Live Inventory</div>
            <div className="text-[12px] font-bold text-white mt-0.5">1,240 <span className="text-[8px] text-green-400 font-normal">+4%</span></div>
          </div>
          <div className="bg-neutral-950 p-2 border border-neutral-800 rounded-lg">
            <div className="text-stone-500">Active Staff</div>
            <div className="text-[12px] font-bold text-white mt-0.5">42 Units</div>
          </div>
          <div className="bg-neutral-950 p-2 border border-neutral-800 rounded-lg">
            <div className="text-stone-500">Today Sales</div>
            <div className="text-[12px] font-bold text-accent mt-0.5">$12,450</div>
          </div>
        </div>

        {/* System Logs */}
        <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 flex flex-col gap-2">
          <span className="font-semibold text-stone-300 border-b border-neutral-800 pb-1">Real-time Operations log</span>
          <div className="space-y-1.5 overflow-hidden">
            <div className="flex justify-between text-stone-400 font-mono text-[8px] py-0.5 border-b border-neutral-800/40">
              <span>DB_REFRESH_INVENTORY</span>
              <span className="text-green-400">SUCCESS</span>
            </div>
            <div className="flex justify-between text-stone-400 font-mono text-[8px] py-0.5 border-b border-neutral-800/40">
              <span>SALES_PIPELINE_SYNC</span>
              <span className="text-green-400">SYNCED</span>
            </div>
            <div className="flex justify-between text-stone-400 font-mono text-[8px] py-0.5">
              <span>HR_PAYROLL_QUEUE</span>
              <span className="text-amber-400">PENDING</span>
            </div>
          </div>
        </div>
      </div>
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
      {/* Category Pill/Badge */}
      <div>
        <span className="inline-flex px-3 py-1 text-xs font-semibold text-secondary-text bg-stone-100 rounded-full border border-borders/50">
          {project.category}
        </span>
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

      {/* Equal Style Action Buttons */}
      <div className="flex flex-row flex-wrap gap-3 pt-4">
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
      </div>
    </div>
  );
}
