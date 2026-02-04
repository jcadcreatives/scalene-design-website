
import React from 'react';

const ContactCTA: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-orange-600 to-orange-700 rounded-[3.5rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-orange-900/40">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10">
            <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-black uppercase tracking-widest mb-8 border border-white/20">
              Let's Talk
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1] max-w-2xl mx-auto">
              Ready To Turn Browsers Into Buyers?
            </h2>
            <p className="text-orange-50 text-xl mb-12 max-w-xl mx-auto font-medium opacity-90 leading-relaxed">
              Book a free 15-minute strategy call. We'll analyze your listing, identify quick wins, and show you exactly how we can help.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button className="px-12 py-6 bg-white text-orange-600 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-black/20 group">
                Book Free Strategy Call →
              </button>
              <a href="#services" className="px-12 py-6 bg-black/20 hover:bg-black/30 border border-white/30 text-white rounded-full font-bold text-xl transition-all backdrop-blur-sm">
                View Our Work
              </a>
            </div>

            <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/70 font-bold text-xs uppercase tracking-widest">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                No obligation
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Free listing audit included
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
