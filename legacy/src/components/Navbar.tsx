import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CtaButton from './CtaButton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Clients', href: '#clients' },
    { name: 'Experience', href: '#experience' },
    { name: 'Process', href: '#process' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      >
        <div
          className={`relative flex items-center gap-1 text-white transition-all duration-500 p-2 pr-2 xl:pl-3 ${
            isScrolled
              ? 'mt-1.5 rounded-full bg-primary-text/95 backdrop-blur-md ring-1 ring-white/10 shadow-[0_16px_40px_-12px_rgba(15,15,15,0.45)]'
              : 'mt-0 rounded-t-none rounded-b-[26px] bg-primary-text shadow-[0_18px_36px_-16px_rgba(15,15,15,0.45)]'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 shrink-0 pl-1 pr-2 hover:opacity-85 transition-opacity"
          >
            <img
              src="/profile.webp"
              alt="Muhammad Ahmad"
              width={32}
              height={32}
              className="h-8 w-8 rounded-[10px] object-cover object-top ring-1 ring-white/20"
            />
            <span className="text-[15px] font-bold tracking-tight font-editorial">
              Ahmad<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop links — pill highlight follows the hovered link */}
          <div className="hidden xl:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-2.5 py-2 text-[13px] font-medium tracking-wide text-white/65 hover:text-white transition-colors duration-300"
              >
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Desktop CTA — white pill, mirrors the reference button */}
          <a
            href="#contact"
            className="group hidden xl:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white pl-4 pr-1.5 py-1.5 ml-1 text-[13px] font-semibold text-primary-text transition-colors duration-300 hover:bg-white/90"
          >
            Let's Build
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={13} strokeWidth={2.4} />
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer (Framer Motion Animated) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-35 bg-black xl:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-primary-bg border-l border-borders p-8 shadow-xl xl:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold font-editorial text-primary-text">Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-primary-text focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-5 overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-editorial text-secondary-text hover:text-primary-text transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <CtaButton
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  fullWidth
                  className="mt-4"
                >
                  Let's Build
                </CtaButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
