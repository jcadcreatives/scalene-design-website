
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* SECTION 1: HERO */}
        <Hero />
        
        {/* SECTION 2: THE PROBLEM */}
        <ProblemSection />

        {/* SECTION 3: THE SOLUTION */}
        <SolutionSection />

        {/* SECTION 4: SERVICES (WHAT WE DO) */}
        <ServicesSection />
        
        {/* SECTION 5: PROCESS */}
        <ProcessSection />

        {/* SECTION 6: RESULTS */}
        <Results />

        {/* SECTION 7: TESTIMONIALS */}
        <Testimonials />

        {/* SECTION 8: FINAL CTA */}
        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
};

export default App;
