import Navbar from '../components/Navbar';
import SocialRail from '../components/SocialRail';
import Hero from '../components/Hero';
import Services from '../components/Services';
import IndustriesMarquee from '../components/IndustriesMarquee';
import Experience from '../components/Experience';
import Process from '../components/Process';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans selection:bg-hover-bg selection:text-primary-text transition-colors duration-300">
      {/* Navbar Component */}
      <Navbar />

      {/* Top-left social rail — docks/floats in sync with the navbar */}
      <SocialRail />

      {/* Main Content Layout */}
      <main className="relative">
        {/* Sections in Exact Requested Order */}
        <Hero />
        <Services />
        <IndustriesMarquee />
        <Projects />
        <Skills />
        <Clients />
        <Testimonials />
        <Experience />
        <Process />
        <Certifications />
        <FAQ />
        <Contact />
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
