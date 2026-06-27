import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Process from './components/Process';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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

// Add simple scroll event listener to update top progress bar if desired
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    }
  });
}

export default App;
