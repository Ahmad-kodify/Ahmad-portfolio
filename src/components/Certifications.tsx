import { useState } from 'react';
import { Award, Eye, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Certifications() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section id="certifications" className="border-t border-borders bg-white relative overflow-hidden">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
              06 / CREDENTIALS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
              Professional Certification
            </h2>
            <div className="space-y-4 pt-6 border-t border-borders/60">
              <div className="flex gap-3">
                <Award className="text-accent shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-lg font-semibold text-primary-text">
                    Web Development Internship Certificate
                  </h3>
                  <p className="text-sm text-secondary-text font-medium">
                    National Center of Robotics and Automation (NCRA) — MUST
                  </p>
                </div>
              </div>
              
              <p className="text-[14px] text-secondary-text leading-relaxed font-light">
                Issued upon successful completion of the Web Development Internship at the National Center of Robotics & Automation (NCRA) lab at MUST. The program involved hands-on development of modern interface systems, standardizing UI style guides, and optimizing React workflows.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsZoomed(true)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary-text hover:text-accent transition-colors duration-300"
                >
                  View Full Document
                  <Eye size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Framed Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-7 flex justify-center"
          >
            {/* Elegant double-border frame representing a real gallery frame */}
            <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
              {/* Outer frame styling */}
              <div className="bg-stone-50 border-[16px] border-[#EFEAE2] shadow-2xl p-6 sm:p-10 max-w-lg w-full rounded-2xl transition-transform duration-500 hover:scale-[1.01] hover:shadow-soft">
                {/* Inner double thin border line */}
                <div className="border border-borders p-4 sm:p-6 bg-white relative flex flex-col items-center text-center rounded-xl">
                  
                  {/* Actual certificate image */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden bg-stone-100 border border-borders/40 mb-6 flex justify-center items-center rounded-lg">
                    <img
                      src="/ncra-certificate.jpeg"
                      alt="NCRA Web Development Internship Certificate"
                      className="w-full h-full object-contain filter contrast-[1.02] brightness-[1.01]"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallbackDiv = document.getElementById('cert-fallback');
                        if (fallbackDiv) fallbackDiv.style.display = 'flex';
                      }}
                    />
                    
                    {/* Fallback View */}
                    <div
                      id="cert-fallback"
                      className="absolute inset-0 flex-col items-center justify-center p-4 bg-stone-50 border border-borders hidden"
                    >
                      <Award size={48} className="text-accent mb-2" />
                      <span className="font-editorial text-lg font-bold text-primary-text">NCRA — MUST</span>
                      <span className="text-[12px] text-muted-text uppercase tracking-wider mt-1">
                        Web Development Intern
                      </span>
                    </div>

                    {/* Hover zoom icon */}
                    <div className="absolute inset-0 bg-primary-text/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 text-primary-text px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center gap-2 rounded-xl">
                        <ZoomIn size={14} />
                        Zoom Document
                      </div>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="border-t border-borders/60 pt-4 w-full flex justify-between items-center text-[10px] font-mono text-muted-text">
                    <span>NCRA RESEARCH LAB</span>
                    <span>ISSUED 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Zoom Modal (Framer Motion AnimatePresence) */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary-text/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 text-white hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              <X size={28} />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-4xl w-full max-h-[85vh] flex justify-center items-center"
            >
              <img
                src="/ncra-certificate.jpeg"
                alt="NCRA Web Development Internship Certificate Full"
                className="max-w-full max-h-[85vh] object-contain shadow-2xl border-4 border-white rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const modalFallback = document.getElementById('modal-fallback');
                  if (modalFallback) modalFallback.style.display = 'flex';
                }}
              />
              {/* Modal Fallback */}
              <div
                id="modal-fallback"
                className="bg-white p-12 max-w-lg w-full rounded-2xl text-center flex-col items-center justify-center hidden shadow-2xl"
              >
                <Award size={64} className="text-accent mb-4" />
                <h3 className="font-editorial text-2xl font-bold mb-2">NCRA — MUST</h3>
                <p className="text-sm text-secondary-text mb-4">Web Development Internship Certificate</p>
                <p className="text-xs text-muted-text border-t border-borders pt-4">
                  Completed July 2023 - September 2023, specializing in React.js interfaces.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
