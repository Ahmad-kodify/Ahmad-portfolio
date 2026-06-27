import { motion } from 'framer-motion';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Architecture',
      subtitle: 'Analysis & Planning',
      desc: 'Deeply analyzing the business requirements to outline data flows, map system endpoints, and select the optimal structural framework before writing any code.',
    },
    {
      num: '02',
      title: 'Implementation & Types',
      subtitle: 'Agile MERN Engineering',
      desc: 'Developing modular, highly maintainable components using React/Next.js with TypeScript, connected to robust Express.js backends and structured MongoDB layers.',
    },
    {
      num: '03',
      title: 'Optimization & Launch',
      subtitle: 'Audit & Deployment',
      desc: 'Refining bundle weights, configuring database indexes, establishing responsive layouts, and launching on Vercel/Docker to secure 95+ Lighthouse metrics.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="process" className="border-t border-borders bg-white relative overflow-hidden">
      <div className="luxury-container">
        
        {/* Section Header */}
        <div className="mb-20 space-y-4 max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            04 / METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
            How I Approach Engineering Solutions
          </h2>
          <p className="text-[15px] text-secondary-text font-light leading-relaxed">
            A structured, repeatable process designed to ensure high performance, security, and exceptional visual outputs from day one.
          </p>
        </div>

        {/* Steps List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
              className="bg-primary-bg/30 border border-borders p-8 rounded-2xl flex flex-col justify-between h-80 transition-all duration-300 group hover:border-accent hover:bg-white"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-4xl font-editorial font-medium text-accent/60 group-hover:text-accent transition-colors duration-300">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono text-muted-text uppercase tracking-wider bg-white px-2 py-0.5 border border-borders rounded-xl">
                    Step
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-primary-text">{step.title}</h3>
                </div>
              </div>

              <p className="text-sm text-secondary-text font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
