import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Process from '../components/Process';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Skills from '../components/Skills';
import Certifications from '../components/Certifications';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
  // Thin top progress bar, scoped to this page so it never runs under /admin.
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = `${winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0}%`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary-bg font-sans selection:bg-hover-bg selection:text-primary-text transition-colors duration-300">
      {/* Global Scroll Indicator (Thin top bar in luxury accent color) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-accent/20 z-50 pointer-events-none">
        <div className="h-full bg-accent w-0 transition-all duration-300" id="scroll-progress"></div>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative">
        {/* Sections in Exact Requested Order */}
        <Hero />
        <Projects />
        <Testimonials />
        <About />
        <Experience />
        <Process />
        <Skills />
        <Certifications />
        <FAQ />
        <Contact />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
