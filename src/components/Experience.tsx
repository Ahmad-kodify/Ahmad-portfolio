import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience() {
  const experiences = [
    {
      role: 'Junior Software Engineer',
      company: 'NumDesk Pvt Ltd',
      duration: 'Nov 2024 - Present',
      location: 'Pakistan',
      details: [
        'Contributed to the development and scaling of enterprise-level ERP and HRMS systems.',
        'Built interactive, real-time chat modules to streamline team and client communication.',
        'Developed modular and responsive frontend architectures using React.js and Inertia.js.',
        'Collaborated on backend APIs and integrations using Node.js and WebSocket frameworks.',
      ],
      tech: ['React.js', 'Node.js', 'Inertia.js', 'WebSockets', 'Tailwind CSS'],
    },
    {
      role: 'Web Development Intern',
      company: 'NCRA — MUST',
      duration: 'Jul 2023 - Sep 2023',
      location: 'MUST University',
      details: [
        'Gained hands-on experience crafting responsive user interfaces with React.js.',
        'Configured utility-first styling systems using Tailwind CSS for clean layout alignments.',
        'Optimized site components for fast loading speeds and cross-browser responsiveness.',
      ],
      tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5 & CSS3'],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section id="experience" className="border-t border-borders relative overflow-hidden bg-primary-bg/50">
      <div className="absolute top-0 right-0 w-96 h-96 bg-hover-bg/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Vertical Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-4 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
              03 / EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight sticky top-32">
              Career Journey & Key Milestones
            </h2>
            <p className="text-[14px] text-secondary-text max-w-sm leading-relaxed font-light">
              Collaborating with software firms, marketplaces, and academic research institutions to deliver robust code.
            </p>
          </motion.div>

          {/* Right Column: Vertical Timeline with Cards */}
          <div className="lg:col-span-8 space-y-10 relative">
            {/* Main timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-[1px] bg-borders"></div>

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company + idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="relative pl-16 group"
              >
                {/* Timeline Node dot */}
                <div className="absolute left-[20px] top-6 w-2.5 h-2.5 rounded-full border-2 border-primary-bg bg-accent transition-all duration-300 group-hover:scale-125 group-hover:bg-primary-text z-10"></div>

                {/* Styled experience card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
                  className="bg-white border border-borders p-8 rounded-2xl space-y-4 transition-all duration-300 group-hover:border-accent"
                >
                  {/* Metadata header */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-text">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Role Title */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-text flex flex-wrap items-center gap-x-2 gap-y-1">
                      {exp.role}
                      <span className="text-[14px] font-normal text-secondary-text font-sans">
                        at {exp.company}
                      </span>
                    </h3>
                  </div>

                  {/* Responsibilities list */}
                  <ul className="space-y-2.5 text-[14px] sm:text-[15px] text-secondary-text font-light leading-relaxed">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="list-disc list-outside ml-4 pl-1">
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Technology labels used */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[11px] font-medium border border-borders rounded-xl bg-primary-bg/50 text-secondary-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
