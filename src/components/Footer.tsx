import { Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { socialUrls } from '../data/socialProfiles';
import UpworkIcon from './icons/UpworkIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-dark-bg pt-16 pb-8 relative text-white">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo & Left details */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tight font-editorial text-white">
              MA<span className="text-accent">/</span>
            </span>
            <span className="text-[11px] font-mono text-muted-text">
              MERN STACK & FRONTEND ENGINEER
            </span>
          </div>

          {/* Quick navigations */}
          <div className="flex flex-wrap justify-center gap-6 text-[12px] font-medium text-white/70">
            <a href="#home" className="hover:text-accent transition-colors duration-300">Home</a>
            <a href="#projects" className="hover:text-accent transition-colors duration-300">Projects</a>
            <a href="#experience" className="hover:text-accent transition-colors duration-300">Experience</a>
            <a href="#skills" className="hover:text-accent transition-colors duration-300">Skills</a>
            <a href="#certifications" className="hover:text-accent transition-colors duration-300">Certifications</a>
            <a href="#contact" className="hover:text-accent transition-colors duration-300">Contact</a>
          </div>

          {/* Socials & Top Scroll */}
          <div className="flex items-center gap-4">
            {/* LinkedIn icon */}
            <a
              href={socialUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>

            {/* Instagram icon */}
            <a
              href={socialUrls.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Instagram Profile"
            >
              <Instagram size={15} />
            </a>

            {/* Facebook icon */}
            <a
              href={socialUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Facebook Profile"
            >
              <Facebook size={15} />
            </a>

            {/* Upwork icon */}
            <a
              href={socialUrls.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300"
              aria-label="Upwork Profile"
            >
              <UpworkIcon size={15} />
            </a>

            {/* Back to top */}
            <button
              onClick={handleScrollToTop}
              className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white hover:bg-white/10 cursor-pointer transition-all duration-300"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>

        </div>

        {/* Outer sub-footer details */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center sm:text-left text-[11px] font-mono text-muted-text">
          <span>© {currentYear} MUHAMMAD AHMAD. ALL RIGHTS RESERVED.</span>
        </div>

      </div>
    </footer>
  );
}
