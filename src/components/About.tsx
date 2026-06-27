import { motion } from 'framer-motion';

export default function About() {
  const specialties = [
    { title: 'Frontend Architecture', desc: 'Crafting responsive, high-performance UI layers using React.js and Next.js.' },
    { title: 'Fullstack Applications', desc: 'Designing secure and robust backend systems with Node.js, Express.js, and MongoDB.' },
    { title: 'Performance Optimization', desc: 'Fine-tuning page speeds, SEO metrics, and responsive states for premium UX.' },
    { title: 'TypeScript & Typings', desc: 'Implementing type-safe systems for robust maintenance and scalable engineering.' },
  ];

  const blockVariants = {
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
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="about" className="border-t border-borders bg-primary-bg relative overflow-hidden">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
              02 / ABOUT ME
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
              Crafting Digital Solutions with Engineering Rigor
            </h2>
          </motion.div>

          {/* Right Column: Narrative and specialties */}
          <div className="lg:col-span-7 space-y-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-secondary-text leading-relaxed font-light"
            >
              Muhammad Ahmad is a MERN Stack Engineer focused on building scalable frontend systems, modern SaaS interfaces, responsive applications, and premium digital experiences. He bridges the gap between design precision and clean, maintainable code.
            </motion.p>

            {/* Specialty List (Staggered reveals) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-borders"
            >
              {specialties.map((item, index) => (
                <motion.div
                  variants={blockVariants}
                  key={item.title}
                  whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
                  className="bg-primary-bg/30 border border-borders p-8 rounded-2xl space-y-3 transition-all duration-300 group hover:border-accent hover:bg-white"
                >
                  <span className="text-[11px] font-mono text-accent font-semibold block">
                    0{index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-primary-text">{item.title}</h3>
                  <p className="text-sm text-secondary-text leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Core Tech Quick-List */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-8 border-t border-borders"
            >
              <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted-text mb-4">
                Core Stack Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'React.js',
                  'Next.js',
                  'Node.js',
                  'Express.js',
                  'MongoDB',
                  'TypeScript',
                  'Tailwind CSS',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs border border-borders rounded-xl text-secondary-text hover:border-primary-text hover:text-primary-text transition-colors duration-300 bg-white hover:bg-hover-bg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
