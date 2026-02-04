
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
    image: "/images/clients/client-1.jpg"  // Replace with your client photo
  },
  {
    quote: "Finally, an agency that gets Amazon. The team's attention to detail and quick turnaround made our product launch stress-free. Highly recommend.",
    author: "Sarah L.",
    role: "Beauty & Personal Care",
    image: "/images/clients/client-2.jpg"  // Replace with your client photo
  },
  {
    quote: "We've worked with several agencies before. Scalene is the first one that actually moved the needle. Their A+ Content alone paid for itself in the first month.",
    author: "David T.",
    role: "Electronics Seller",
    image: "/images/clients/client-3.jpg"  // Replace with your client photo
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'listing',
    title: 'Listing Images',
    description: 'Main images, lifestyle shots, and infographics engineered for maximum conversion.',
    samples: [
      { id: 'l1', brand: 'Wireless Earbuds', description: 'Electronics • Complete 7-Image Set', imageUrl: '/images/portfolio/listing-1.jpg' },
      { id: 'l2', brand: 'Skincare Collection', description: 'Beauty • Lifestyle & Macro Set', imageUrl: '/images/portfolio/listing-2.jpg' },
      { id: 'l3', brand: 'Yoga Mat Pro', description: 'Fitness • Feature-Benefit Set', imageUrl: '/images/portfolio/listing-3.jpg' }
    ]
  },
  {
    id: 'aplus',
    title: 'A+ Content',
    description: 'Premium brand content modules that tell your story and differentiate your product.',
    samples: [
      { id: 'a1', brand: 'EcoPet Food', description: 'Pet • Storytelling Modules', imageUrl: '/images/portfolio/aplus-1.jpg' },
      { id: 'a2', brand: 'Office Flow', description: 'Home • Product Comparison', imageUrl: '/images/portfolio/aplus-2.jpg' },
      { id: 'a3', brand: 'Premium Brand', description: 'Lifestyle • A+ Content Set', imageUrl: '/images/portfolio/aplus-3.jpg' },
      { id: 'a4', brand: 'GPS Tracker', description: 'Electronics • Feature Showcase', imageUrl: '/images/portfolio/aplus-4.jpg' }
    ]
  },
  {
    id: 'brand',
    title: 'Brand Story',
    description: 'Build emotional connection and brand loyalty with compelling narrative design.',
    samples: [
      { id: 'b1', brand: 'Veda Wellness', description: 'Supplements • Brand Story Set', imageUrl: '/images/portfolio/brand-1.jpg' }
    ]
  },
  {
    id: 'storefront',
    title: 'Storefronts',
    description: 'Custom branded shopping experiences that increase AOV and customer lifetime value.',
    samples: [
      { id: 's1', brand: 'Lux Apparel', description: 'Clothing • Premium Storefront', imageUrl: '/images/portfolio/storefront-1.jpg' }
    ]
  }
];
