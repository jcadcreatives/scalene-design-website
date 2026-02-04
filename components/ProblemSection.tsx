
import React from 'react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Invisible Listings",
      desc: "Your product gets lost in a sea of competitors. Generic images and weak copy mean shoppers scroll right past you.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Wasted Ad Spend",
      desc: "You're paying to drive traffic to listings that don't convert. Every click without a sale is money down the drain.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "DIY Frustration",
      desc: "You've tried templates and freelancers. The results are mediocre at best, embarrassing at worst. You know it can be better.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-1 h-1 bg-orange-500 rounded-full" />
             <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">The Problem</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1]">Great Products Fail On Amazon Every Day. Here's Why.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((prob, i) => (
            <div key={i} className="p-12 bg-neutral-900/20 border border-white/5 rounded-[2.5rem] hover:bg-neutral-900/40 transition-all group">
              <div className="w-14 h-14 bg-neutral-800/50 rounded-2xl flex items-center justify-center text-orange-500 mb-10 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-xl">
                {prob.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">{prob.title}</h3>
              <p className="text-neutral-500 leading-relaxed text-sm font-medium">
                {prob.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
