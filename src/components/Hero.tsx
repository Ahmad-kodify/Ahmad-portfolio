import { motion } from 'framer-motion';
import CurveDivider from './CurveDivider';
import CtaButton from './CtaButton';

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
              className="text-[42px] sm:text-[58px] md:text-[74px] lg:text-[90px] font-bold tracking-tighter text-primary-text leading-[0.95] font-editorial relative z-15"
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
              className="absolute left-[-6%] md:left-[-8%] lg:left-[-10%] top-[48%] md:top-[50%] lg:top-[52%] -translate-y-1/2 hidden md:block z-20 pointer-events-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: -3 }}
                className="w-56 lg:w-64 bg-white border border-borders p-3 rounded-2xl shadow-soft flex flex-col gap-2 transition-all duration-300 hover:border-accent"
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1 border-b border-borders/50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <div className="h-2 bg-stone-100/80 rounded w-16 ml-2"></div>
                </div>
                {/* Visual Content Block — intro-video style with the real photo */}
                <div className="h-28 lg:h-32 bg-emerald-100/60 rounded-xl relative flex items-center justify-center overflow-hidden">
                  <img
                    src="/profile.webp"
                    alt="Muhammad Ahmad"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Floating Card (Maya - Orange Cursor) */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [6, 4, 6] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute right-[-10%] md:right-[-14%] lg:right-[-18%] top-[0%] hidden md:block z-20 pointer-events-auto"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: 3 }}
                className="w-56 lg:w-64 bg-white border border-borders p-3 rounded-2xl shadow-soft flex flex-col gap-2 transition-all duration-300 hover:border-accent"
              >
                {/* Browser bar */}
                <div className="flex items-center gap-1 border-b border-borders/50 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <div className="h-2 bg-stone-100/80 rounded w-16 ml-2"></div>
                </div>
                {/* Visual Content Block — profile-card style, B&W close-crop variant of the photo */}
                <div className="h-28 lg:h-32 bg-stone-50/50 rounded-xl p-3 flex items-center gap-3">
                  <img
                    src="/profile.webp"
                    alt="Muhammad Ahmad portrait"
                    className="h-16 w-16 lg:h-20 lg:w-20 shrink-0 rounded-full object-cover object-top grayscale scale-100 ring-2 ring-accent/60 shadow-sm"
                  />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="h-1.5 bg-stone-300 w-3/4 rounded"></div>
                    <div className="h-1 bg-stone-200 w-full rounded"></div>
                    <div className="flex gap-1.5 pt-0.5">
                      <div className="w-8 h-4 bg-[#B5E2FA]/50 rounded-md"></div>
                      <div className="w-10 h-4 bg-[#C5E0B4]/50 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* Subtext Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-base text-secondary-text font-light max-w-3xl leading-relaxed relative z-10"
          >
Full-Stack web applications and SaaS platforms built with Laravel and React, supported by Next.js, Node.js, and TypeScript for startups across the US, UK, and Europe.          </motion.p>

          {/* Client footprint line */}
          <motion.p
            variants={itemVariants}
            className="text-[12px] sm:text-[13px] text-muted-text font-light relative z-10 -mt-2"
          >
            Currently maintaining production sites for clients in 🇨🇦 🇬🇧 🇺🇸 🇸🇦
          </motion.p>

          {/* Centered CTA Buttons (Oversized Pills, fully inside 100vh) */}
          <motion.div variants={itemVariants} className="flex flex-row justify-center gap-4 relative z-10">
            <CtaButton
              href="https://wa.me/923196522386"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.148.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
                </svg>
              }
            >
              WhatsApp
            </CtaButton>
            <CtaButton href="#contact" variant="outline">Let's Build</CtaButton>
          </motion.div>

        </motion.div>
      </div>

      <CurveDivider />
    </section>
  );
}
