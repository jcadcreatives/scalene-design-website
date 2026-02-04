
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="results" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-1 h-1 bg-orange-500 rounded-full" />
             <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Client Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">What Sellers Say</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-12 bg-white rounded-[2.5rem] flex flex-col h-full shadow-2xl relative group overflow-hidden">
              <div className="text-orange-600 mb-8">
                <svg className="w-10 h-10 opacity-20" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8h6v8H8v-8H4V8h6zm14 0v8h6v8h-8v-8h-4V8h6z" /></svg>
              </div>
              <p className="text-neutral-800 font-medium mb-12 flex-grow leading-relaxed text-lg italic">"{t.quote}"</p>
              
              <div className="flex items-center gap-4 border-t border-neutral-100 pt-8">
                <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover grayscale" />
                <div>
                  <div className="text-black font-black text-sm tracking-tight">— {t.author}</div>
                  <div className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
