
import React from 'react';

const Results: React.FC = () => {
  const stats = [
    { value: '40%', label: 'Avg. Conversion Increase' },
    { value: '250+', label: 'Listings Transformed' },
    { value: '3-5', label: 'Average Delivery Days' },
    { value: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section id="results" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-1 h-1 bg-orange-500 rounded-full" />
             <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Numbers That Matter</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="py-16 px-8 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] text-center hover:bg-neutral-900/50 transition-all">
              <div className="text-6xl font-black text-white mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-loose">
                {stat.label.split(' ').map((word, idx) => (
                  <span key={idx} className="block">{word}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
