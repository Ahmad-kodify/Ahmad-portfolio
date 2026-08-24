import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Process', href: '#process' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-primary-bg/85 backdrop-blur-md border-borders py-2.5 shadow-soft'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="luxury-container flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold tracking-tight font-editorial text-primary-text hover:opacity-85 transition-opacity">
          MA<span className="text-accent">/</span>
        </a>

        {/* Desktop Links with Framer Motion Underline hover */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="text-[13px] tracking-wide text-secondary-text font-medium hover:text-primary-text transition-colors duration-300 relative py-1"
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA with Rounded Corners */}
        <div className="hidden lg:block">
          <CtaButton href="#contact" size="sm">Let's Build</CtaButton>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-primary-text hover:opacity-80 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

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
              className="fixed inset-0 z-35 bg-black lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-primary-bg border-l border-borders p-8 shadow-xl lg:hidden flex flex-col"
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
    </nav>
  );
}
