
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-extrabold tracking-tighter">
          Scalene<span className="text-orange-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Process', 'Results', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20">
            Free Listing Audit
          </a>
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
