
import React from 'react';

const SolutionSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Solution</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-10 leading-[1.1]">Conversion-Focused Creative That Actually Sells</h2>
            <p className="text-neutral-400 text-lg mb-12 leading-relaxed">
              We don't just make pretty pictures. We engineer every visual element to guide shoppers from scroll to sale. Psychology-backed. Data-driven. Obsessively optimized.
            </p>
            
            <ul className="space-y-8">
              {[
                "Competitor-crushing main images that stop the scroll and win the click",
                "Infographics that sell by answering every buyer objection before they ask",
                "A+ Content that converts browsers into buyers with strategic storytelling",
                "Brand Storefronts that build trust and increase average order value"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-5">
                  <div className="mt-1 flex-shrink-0 text-orange-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span className="text-neutral-300 text-sm font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="bg-neutral-900/40 rounded-[3rem] border border-white/5 p-10 backdrop-blur-3xl shadow-2xl">
               <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                  <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Before</span>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em]">After</span>
                  </div>
                  <div className="px-6 py-2 bg-orange-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-orange-900/40">Optimized</div>
               </div>
               
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Generic Listing</div>
                     <div className="aspect-[3/4] bg-neutral-800/50 rounded-[2rem] flex flex-col items-center justify-center border border-white/5 group overflow-hidden">
                        <div className="w-1/2 h-1/2 bg-neutral-900 rounded-lg opacity-50 mb-4" />
                        <span className="text-[10px] uppercase font-black text-neutral-700">Generic Card</span>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Optimized Listing</div>
                     <div className="aspect-[3/4] bg-neutral-100 rounded-[2rem] flex flex-col p-8 shadow-2xl group overflow-hidden relative">
                        <div className="w-full h-full bg-neutral-200/50 rounded-xl flex items-center justify-center">
                           <span className="text-[10px] uppercase font-black text-neutral-400">High-Res Hero</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                     </div>
                  </div>
               </div>
            </div>
            {/* Accent Blur */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
