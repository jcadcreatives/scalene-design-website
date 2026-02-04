
import React from 'react';
import { HERO_STATS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-page background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-right md:bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Dark overlay - stronger on mobile for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-24 pb-12 md:pt-32 lg:pt-48 lg:pb-32 flex flex-col justify-end md:justify-center min-h-screen">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Amazon Listing Optimization</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-4 md:mb-8 text-white">
            Your Product Deserves To Be Seen
          </h1>

          <p className="text-base md:text-xl text-neutral-300 md:text-neutral-400 mb-6 md:mb-10 leading-relaxed max-w-lg">
            We transform underperforming Amazon listings into conversion machines. Strategic visuals. Compelling copy. Measurable results.
          </p>

          <div className="flex flex-wrap gap-4 mb-10 md:mb-20">
            <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold transition-all shadow-xl shadow-orange-900/20 text-base md:text-lg">
              Start Converting More →
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-12 border-t border-white/10 pt-6 md:pt-12">
            {HERO_STATS.map((stat, i) => (
              <div key={i}>
                <div className="text-xl md:text-3xl font-bold text-white mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] font-semibold text-neutral-400 md:text-neutral-500 uppercase tracking-wider md:tracking-widest">{stat.label}</div>
                <div className="text-[8px] md:text-[9px] text-neutral-500 md:text-neutral-600 uppercase mt-1 hidden md:block">Average</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
