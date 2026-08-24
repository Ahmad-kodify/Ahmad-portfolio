import { motion } from 'framer-motion';
import CurveDivider from './CurveDivider';
import CtaButton from './CtaButton';
import SocialRail from './SocialRail';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section id="home" className="relative h-screen min-h-[620px] flex items-center justify-center overflow-hidden bg-primary-bg py-8">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 pointer-events-none opacity-[0.02] luxury-container">
        <div className="border-l border-r border-borders h-full"></div>
        <div className="border-r border-borders h-full hidden md:block"></div>
        <div className="border-r border-borders h-full hidden md:block"></div>
      </div>

      <div className="luxury-container w-full relative z-10 flex flex-col items-center justify-center translate-y-6 md:translate-y-8">
        
        {/* Core Content Layout (Centered & Compressed) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center space-y-6 md:space-y-8 relative"
        >
          {/* Centered Oversized Bold Editorial Typography */}
          <div className="relative w-full max-w-5xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-[54px] sm:text-[74px] md:text-[94px] lg:text-[114px] font-bold tracking-tighter text-primary-text leading-[0.95] font-editorial relative z-15"
            >
              <span className="block select-none">Software Engineer,</span>
              
              <span className="flex items-center justify-center gap-4 flex-wrap md:flex-nowrap">
                {/* Empty offset block on desktop to make space for the floating mockup card */}
                <span className="w-[160px] h-[50px] hidden md:inline-block shrink-0"></span>
                <span className="select-none">Full-Stack Web</span>
              </span>

              <span className="block select-none">& SaaS Builder</span>
            </motion.h1>

            {/* Left Floating Card (Alex - Blue Cursor) */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-6, -4, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute left-[-2%] md:left-[1%] lg:left-[3%] top-[48%] md:top-[50%] lg:top-[52%] -translate-y-1/2 hidden md:block z-20 pointer-events-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: -3 }}
                className="w-48 bg-white border border-borders p-3 rounded-2xl shadow-soft flex flex-col gap-2 transition-all duration-300 hover:border-accent"
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1 border-b border-borders/50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <div className="h-2 bg-stone-100/80 rounded w-16 ml-2"></div>
                </div>
                {/* Visual Content Block */}
                <div className="h-20 bg-emerald-100/60 rounded-xl relative flex items-center justify-center overflow-hidden">
                  {/* Play Button Mockup */}
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-accent border-b-[5px] border-b-transparent translate-x-[1px]"></div>
                  </div>
                  {/* Blue Alex Cursor Tag */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#007FFF] drop-shadow-sm rotate-[130deg]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 3L3 10.53v.97l6.84 2.66L12.5 21h.96L21 3z" />
                    </svg>
                    <div className="bg-[#007FFF] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                      Alex
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Floating Card (Maya - Orange Cursor) */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [6, 4, 6] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute right-[2%] md:right-[6%] lg:right-[8%] top-[2%] hidden md:block z-20 pointer-events-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: 3 }}
                className="w-48 bg-white border border-borders p-3 rounded-2xl shadow-soft flex flex-col gap-2 transition-all duration-300 hover:border-accent"
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1 border-b border-borders/50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <div className="h-2 bg-stone-100/80 rounded w-16 ml-2"></div>
                </div>
                {/* Visual Content Block */}
                <div className="h-20 bg-stone-50/50 rounded-xl p-2 flex flex-col justify-between">
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-[#B5E2FA]/50 rounded-md"></div>
                    <div className="w-12 h-5 bg-[#C5E0B4]/50 rounded-md"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-stone-200 w-full rounded"></div>
                    <div className="h-1 bg-stone-200 w-3/4 rounded"></div>
                  </div>
                </div>
                {/* Orange Maya Cursor Tag */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#FF6F59] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 3L3 10.53v.97l6.84 2.66L12.5 21h.96L21 3z" />
                  </svg>
                  <div className="bg-[#FF6F59] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                    Maya
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Custom Center Cursor Shape "You" (Overlapping typography exactly like screenshot) */}
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute left-[48%] md:left-[49%] top-[78%] md:top-[82%] z-30 flex items-center gap-1 pointer-events-none select-none"
            >
              <svg className="w-5 h-5 text-[#007FFF] drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3L3 10.53v.97l6.84 2.66L12.5 21h.96L21 3z" />
              </svg>
              <div className="bg-[#007FFF] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-md">
                You
              </div>
            </motion.div>
          </div>

          {/* Subtext Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-secondary-text font-light max-w-3xl leading-relaxed relative z-10"
          >
Full-Stack web applications and SaaS platforms built with Laravel and React, supported by Next.js, Node.js, and TypeScript for startups across the US, UK, and Europe.          </motion.p>

          {/* Centered CTA Buttons (Oversized Pills, fully inside 100vh) */}
          <motion.div variants={itemVariants} className="flex flex-row justify-center gap-4 relative z-10">
            <CtaButton href="#projects">Browse Projects</CtaButton>
            <CtaButton href="#contact" variant="outline">Let's Build</CtaButton>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Left Social Rail with hover/tap profile previews */}
      <SocialRail />

      <CurveDivider />
    </section>
  );
}
