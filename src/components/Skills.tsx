import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Inertia.js', 'HTML5 / CSS3', 'JavaScript (ES6+)'],
    },
    {
      title: 'Backend Systems',
      skills: ['Node.js', 'Express.js', 'WebSockets', 'REST APIs', 'JWT Authentication', 'MVC Architecture'],
    },
    {
      title: 'Database & Storage',
      skills: ['MongoDB', 'Mongoose ODM', 'PostgreSQL', 'Database Indexing', 'SQL Queries'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['GitHub', 'Git Version Control', 'Docker', 'Vercel', 'Postman API Testing', 'NPM / PNPM'],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
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
    <section id="skills" className="border-t border-borders relative bg-primary-bg/50">
      <div className="luxury-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mb-16 space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
            05 / SKILLS
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-primary-text">
            Technical Competencies
          </h2>
          <p className="text-[15px] sm:text-[16px] text-secondary-text max-w-lg font-light">
            An organized view of the languages, frameworks, databases, and tooling in my engineering stack.
          </p>
        </motion.div>

        {/* Skill Card Grid (Framer Motion Staggered) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}
              className="bg-white border border-borders p-8 rounded-2xl flex flex-col justify-between hover:border-accent transition-all duration-300 group shadow-soft"
            >
              <div className="space-y-6">
                {/* Number & Title */}
                <div className="flex justify-between items-start border-b border-borders/60 pb-4">
                  <span className="text-[10px] font-mono text-muted-text">0{idx + 1}</span>
                  <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                    Category
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-text group-hover:text-accent transition-colors duration-300">
                  {category.title}
                </h3>

                {/* List items */}
                <ul className="space-y-2.5 pt-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-[14px] text-secondary-text font-light">
                      <span className="h-1 w-1 bg-accent/60 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Detail */}
              <div className="pt-6 mt-6 border-t border-borders/60 text-[10px] font-mono text-muted-text text-right">
                VERIFIED SKILLS
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
