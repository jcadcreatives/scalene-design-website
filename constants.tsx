
import { Stat, Testimonial, ServiceItem } from './types';

export const HERO_STATS: Stat[] = [
  { label: 'Listings Optimized', value: '250+' },
  { label: 'Avg. Conversion Lift', value: '40%' },
  { label: 'Turnaround', value: '3-5 Day' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Our conversion rate jumped 47% within two weeks of launching the new images. Scalene understood exactly what we needed and delivered beyond expectations.",
    author: "Michael K.",
    role: "Home & Kitchen Brand",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Finally, an agency that gets Amazon. The team's attention to detail and quick turnaround made our product launch stress-free. Highly recommend.",
    author: "Sarah L.",
    role: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "We've worked with several agencies before. Scalene is the first one that actually moved the needle. Their A+ Content alone paid for itself in the first month.",
    author: "David T.",
    role: "Electronics Seller",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'listing',
    title: 'Listing Images',
    description: 'Main images, lifestyle shots, and infographics engineered for maximum conversion.',
    samples: [
      { id: 'l1', brand: 'Wireless Earbuds', description: 'Electronics • Complete 7-Image Set', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' },
      { id: 'l2', brand: 'Skincare Collection', description: 'Beauty • Lifestyle & Macro Set', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800' },
      { id: 'l3', brand: 'Yoga Mat Pro', description: 'Fitness • Feature-Benefit Set', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'aplus',
    title: 'A+ Content',
    description: 'Premium brand content modules that tell your story and differentiate your product.',
    samples: [
      { id: 'a1', brand: 'EcoPet Food', description: 'Pet • Storytelling Modules', imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800' },
      { id: 'a2', brand: 'Office Flow', description: 'Home • Product Comparison', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'brand',
    title: 'Brand Story',
    description: 'Build emotional connection and brand loyalty with compelling narrative design.',
    samples: [
      { id: 'b1', brand: 'Veda Wellness', description: 'Supplements • Brand Story Set', imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'storefront',
    title: 'Storefronts',
    description: 'Custom branded shopping experiences that increase AOV and customer lifetime value.',
    samples: [
      { id: 's1', brand: 'Lux Apparel', description: 'Clothing • Premium Storefront', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];
