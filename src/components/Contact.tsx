import React, { useState } from 'react';
import { Mail, Linkedin, Phone, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

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
                href="mailto:ahmads.contacts@gmail.com"
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
                    ahmads.contacts@gmail.com
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/ahmads-contacts"
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
                    linkedin.com/in/ahmads-contacts
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+923000000000"
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
                    +92 300 0000000
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
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Form Header */}
              <div className="border-b border-borders pb-4 mb-2">
                <h3 className="text-lg font-semibold text-primary-text">Send a Message</h3>
                <p className="text-[12px] text-muted-text font-mono uppercase mt-1">
                  Expected response: Within 24 Hours
                </p>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="name" className="text-[10px] uppercase tracking-wider font-semibold text-muted-text">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full border-b border-borders border-t-0 border-l-0 border-r-0 py-2.5 text-sm bg-transparent text-primary-text placeholder-stone-300 focus:outline-none focus:ring-0 focus:border-primary-text transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="text-[10px] uppercase tracking-wider font-semibold text-muted-text">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="w-full border-b border-borders border-t-0 border-l-0 border-r-0 py-2.5 text-sm bg-transparent text-primary-text placeholder-stone-300 focus:outline-none focus:ring-0 focus:border-primary-text transition-colors"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="text-[10px] uppercase tracking-wider font-semibold text-muted-text">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, role opportunities, or question..."
                  className="w-full border-b border-borders border-t-0 border-l-0 border-r-0 py-2.5 text-sm bg-transparent text-primary-text placeholder-stone-300 focus:outline-none focus:ring-0 focus:border-primary-text resize-none transition-colors"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-xl shadow-soft ${
                    isSent
                      ? 'bg-accent text-primary-text'
                      : 'bg-primary-text text-primary-bg hover:bg-accent hover:text-primary-text'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : isSent ? (
                    <>
                      Message Sent
                      <Check size={14} />
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
