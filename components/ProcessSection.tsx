
import React from 'react';

const ProcessSection: React.FC = () => {
  const steps = [
    { title: 'Discovery', desc: 'We analyze your product, competitors, and target customer deeply.' },
    { title: 'Strategy', desc: 'Custom creative brief with positioning and visual direction.' },
    { title: 'Create', desc: 'Our team produces conversion-optimized creative assets.' },
    { title: 'Launch', desc: 'Refined deliverables ready to upload and start converting.' }
  ];

  return (
    <section id="process" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-32">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-1 h-1 bg-orange-500 rounded-full" />
             <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">Our Process</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white">From Brief to Launch in Days, Not Weeks</h2>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line - Precise positioning */}
          <div className="absolute top-[26px] left-[50px] right-[50px] h-[2px] bg-white/5 hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-y-20 gap-x-12">
            {steps.map((item, i) => (
              <div key={i} className="relative z-10 text-center lg:text-left group">
                <div className="w-14 h-14 bg-[#0a0a0a] border-2 border-orange-600 rounded-full flex items-center justify-center text-white font-black text-lg mb-10 mx-auto lg:mx-0 shadow-[0_0_30px_rgba(234,88,12,0.4)] group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-[240px] mx-auto lg:mx-0">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
