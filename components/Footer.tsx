
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <a href="#" className="text-3xl font-extrabold tracking-tighter mb-6 block">
              Scalene<span className="text-orange-500">.</span>
            </a>
            <p className="text-neutral-500 max-w-sm mb-8">
              Premium Amazon listing optimization agency helping brands dominate their categories with psychology-backed visual assets.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-orange-600 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {['Services', 'Portfolio', 'Process', 'Contact'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-neutral-500 hover:text-orange-500 transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-neutral-500">hello@scalenedesign.com</li>
              <li className="text-neutral-500">+1 (555) 000-0000</li>
              <li className="text-neutral-500">New York, NY</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-neutral-600 text-sm">© 2025 Scalene Design. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-neutral-600 text-sm hover:text-white">Privacy Policy</a>
            <a href="#" className="text-neutral-600 text-sm hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
