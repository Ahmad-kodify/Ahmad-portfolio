import { Mail, Linkedin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';
import { profile, socialProfiles, socialUrls } from '../data/socialProfiles';

const linkedinProfile = socialProfiles.find((item) => item.platform === 'linkedin');

export default function Contact() {

  return (
    <section id="contact" className="border-t border-borders relative bg-primary-bg/30 overflow-hidden">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-accent block">
                08 / CONTACT
              </span>
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tighter text-primary-text leading-tight">
                Let’s Build Something Meaningful
              </h2>
              <p className="text-[15px] sm:text-[16px] text-secondary-text font-light leading-relaxed">
                Open to frontend engineering roles, SaaS product development, and modern web contract projects. Reach out directly.
              </p>
            </div>

            {/* Direct Contact Blocks */}
            <div className="space-y-6 pt-8 border-t border-borders">
              
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 border border-borders bg-white flex items-center justify-center rounded-xl group-hover:border-primary-text transition-colors duration-300">
                  <Mail size={16} className="text-secondary-text group-hover:text-primary-text" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-text block">
                    Write an Email
                  </span>
                  <span className="text-sm font-medium text-secondary-text group-hover:text-primary-text transition-colors">
                    {profile.email}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 border border-borders bg-white flex items-center justify-center rounded-xl group-hover:border-primary-text transition-colors duration-300">
                  <Linkedin size={16} className="text-secondary-text group-hover:text-primary-text" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-text block">
                    Connect on LinkedIn
                  </span>
                  <span className="text-sm font-medium text-secondary-text group-hover:text-primary-text transition-colors">
                    {linkedinProfile?.username}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 border border-borders bg-white flex items-center justify-center rounded-xl group-hover:border-primary-text transition-colors duration-300">
                  <Phone size={16} className="text-secondary-text group-hover:text-primary-text" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-text block">
                    Call Direct
                  </span>
                  <span className="text-sm font-medium text-secondary-text group-hover:text-primary-text transition-colors">
                    {profile.phoneDisplay}
                  </span>
                </div>
              </a>

            </div>
          </motion.div>

          {/* Right Column: Premium Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="lg:col-span-7 bg-white border border-borders p-8 sm:p-10 rounded-2xl shadow-soft"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
