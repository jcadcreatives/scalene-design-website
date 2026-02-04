
import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';

const ServicesSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);

  const activeCategory = SERVICES[activeCategoryIndex];
  const samples = activeCategory.samples;

  // Reset sample index when category changes
  useEffect(() => {
    setCurrentSampleIndex(0);
  }, [activeCategoryIndex]);

  const next = () => setCurrentSampleIndex((prev) => (prev + 1) % samples.length);
  const prev = () => setCurrentSampleIndex((prev) => (prev - 1 + samples.length) % samples.length);

  return (
    <section id="services" className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">Complete Amazon Creative Suite</h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {SERVICES.map((category, i) => (
              <button
                key={category.id}
                onClick={() => setActiveCategoryIndex(i)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategoryIndex === i 
                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-900/40 border border-orange-500' 
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Moved description here, below buttons, without a box */}
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <p className="text-neutral-400 text-lg leading-relaxed">
              <span className="text-white font-bold">{activeCategory.title}:</span> {activeCategory.description}
            </p>
          </div>
        </div>

        <div className="relative h-[450px] md:h-[600px] flex items-center justify-center perspective-[1500px]">
          {/* Controls - only show if multiple samples */}
          {samples.length > 1 && (
            <>
              <button 
                onClick={prev} 
                className="absolute left-4 lg:left-24 z-[60] w-14 h-14 bg-black/40 backdrop-blur-md hover:bg-orange-600 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 shadow-2xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              
              <button 
                onClick={next} 
                className="absolute right-4 lg:right-24 z-[60] w-14 h-14 bg-black/40 backdrop-blur-md hover:bg-orange-600 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 shadow-2xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
            {samples.map((sample, index) => {
              const diff = (index - currentSampleIndex + samples.length) % samples.length;
              let position = 0;
              
              if (diff === 0) position = 0;
              else if (diff === 1 || diff === -samples.length + 1) position = 1;
              else if (diff === samples.length - 1 || diff === -1) position = -1;
              else return null;

              const style = {
                transform: `translateX(${position * 90}%) scale(${1 - Math.abs(position) * 0.25}) translateZ(${Math.abs(position) * -150}px) rotateY(${position * -20}deg)`,
                zIndex: 10 - Math.abs(position),
                opacity: position === 0 ? 1 : 0.25,
                filter: position === 0 ? 'blur(0)' : 'blur(10px)',
                transition: 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)'
              };

              return (
                <div
                  key={sample.id}
                  style={style}
                  className="absolute inset-0 bg-neutral-900 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group pointer-events-none"
                >
                  <img src={sample.imageUrl} alt={sample.brand} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                  
                  <div className={`absolute bottom-12 left-12 right-12 transition-all duration-700 ${position === 0 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                    <span className="inline-block px-3 py-1 bg-orange-600/20 text-orange-500 text-[10px] font-black uppercase tracking-widest rounded mb-4 border border-orange-500/30">
                      Sample Case
                    </span>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none">{sample.brand}</h3>
                    <p className="text-neutral-400 text-base leading-relaxed max-w-xs">{sample.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {samples.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentSampleIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSampleIndex ? 'w-16 bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 'w-4 bg-neutral-800'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
