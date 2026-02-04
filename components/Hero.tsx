
import React from 'react';
import { HERO_STATS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-page background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="max-w-2xl">
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
        </div>
    </section>
  );
};

export default Hero;
