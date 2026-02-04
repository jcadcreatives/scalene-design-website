
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
            {/* Social media links - add when available */}
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
              <li className="text-neutral-500">scalenedesigns@gmail.com</li>
              <li className="text-neutral-500">
                <a href="https://wa.me/639773323052" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">
                  +63 977 332 3052 (WhatsApp)
                </a>
              </li>
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
