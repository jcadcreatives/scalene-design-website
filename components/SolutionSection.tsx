
import React from 'react';
import { SOLUTION } from '../constants';

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
            <div className="rounded-[2rem] overflow-hidden shadow-2xl bg-black">
              <img
                src={SOLUTION.image}
                alt="Solution showcase"
                className="w-full h-auto object-contain"
              />
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
