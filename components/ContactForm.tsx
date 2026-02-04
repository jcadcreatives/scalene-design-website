
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Using FormSubmit.co - emails go directly to your inbox
    const response = await fetch('https://formsubmit.co/ajax/scalenedesigns@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        product: formData.product,
        message: formData.message,
        _subject: `New inquiry from ${formData.name} - Scalene Design`
      })
    });

    if (response.ok) {
      setStatus('success');
      setFormData({ name: '', email: '', product: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact-form" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-orange-500 text-xs font-black uppercase tracking-widest mb-6">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Send Us A Message
            </h2>
            <p className="text-neutral-400 text-lg">
              Have questions? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-neutral-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="product" className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">
                  What do you sell on Amazon?
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="e.g., Kitchen gadgets, Electronics, Beauty products..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-neutral-400 mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="Tell us about your product and what you're looking to improve..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-5 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-orange-900/20"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-center">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
