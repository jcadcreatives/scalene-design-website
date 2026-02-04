
import React from 'react';
import { HERO_STATS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-500 font-bold uppercase tracking-widest text-[10px]">Amazon Listing Optimization</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 text-white">
              Your Product Deserves To Be Seen
            </h1>
            
            <p className="text-xl text-neutral-400 mb-10 leading-relaxed max-w-lg">
              We transform underperforming Amazon listings into conversion machines. Strategic visuals. Compelling copy. Measurable results.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-20">
              <a href="#contact" className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold transition-all shadow-xl shadow-orange-900/20 text-lg">
                Start Converting More →
              </a>
            </div>

            <div className="grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
              {HERO_STATS.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-[9px] text-neutral-600 uppercase mt-1">Average</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Visual Concept: Comparison UI Frame */}
            <div className="relative w-full aspect-[4/3] bg-neutral-900/40 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl p-8 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-neutral-800 rounded-lg text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Before</span>
                  <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold text-black uppercase tracking-widest">After</span>
                </div>
                <div className="w-24 h-2 bg-neutral-800 rounded-full" />
              </div>

              <div className="grid grid-cols-2 gap-8 flex-grow">
                {/* Left: Before */}
                <div className="bg-neutral-800/50 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="relative z-10 text-xs font-black text-neutral-500 uppercase tracking-tighter">Generic Photo</span>
                  <div className="absolute bottom-4 left-4 right-4 h-1 bg-neutral-700 rounded-full" />
                </div>
                {/* Right: After */}
                <div className="bg-neutral-100 rounded-2xl flex flex-col p-6 shadow-xl relative overflow-hidden">
                  <div className="flex-grow bg-neutral-200/50 rounded-xl flex items-center justify-center mb-4">
                     <span className="text-xs font-black text-neutral-400 uppercase">Optimized Hero</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-neutral-200 rounded-full" />
                    <div className="w-2/3 h-1.5 bg-neutral-200 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Performance Badges */}
              <div className="absolute top-1/2 -right-12 bg-white p-4 rounded-2xl shadow-2xl border border-neutral-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '5s' }}>
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase">Conversion</div>
                  <div className="text-lg font-black text-black">+40%</div>
                </div>
              </div>

              <div className="absolute bottom-8 -left-12 bg-black/90 p-4 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black">S</div>
                <div>
                  <div className="text-[9px] font-bold text-neutral-500 uppercase">Revenue</div>
                  <div className="text-lg font-black text-white">+218%</div>
                </div>
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
