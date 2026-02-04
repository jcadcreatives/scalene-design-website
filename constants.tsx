
import { Stat, Testimonial, ServiceItem } from './types';
import content from './content.json';

export const HERO_STATS: Stat[] = content.hero.stats.map(s => ({
  label: s.label,
  value: s.value
}));

export const TESTIMONIALS: Testimonial[] = content.testimonials.map((t, i) => ({
  quote: t.quote,
  author: t.author,
  role: t.role,
  image: `/images/clients/client-${i + 1}.jpg`
}));

export const SERVICES: ServiceItem[] = [
  {
    id: 'listing',
    title: content.services.listing.title,
    description: content.services.listing.description,
    samples: content.services.listing.samples.map((s, i) => ({
      id: `l${i + 1}`,
      brand: s.brand,
      description: s.description,
      imageUrl: `/images/portfolio/${s.image}`
    }))
  },
  {
    id: 'aplus',
    title: content.services.aplus.title,
    description: content.services.aplus.description,
    samples: content.services.aplus.samples.map((s, i) => ({
      id: `a${i + 1}`,
      brand: s.brand,
      description: s.description,
      imageUrl: `/images/portfolio/${s.image}`
    }))
  },
  {
    id: 'brand',
    title: content.services.brand.title,
    description: content.services.brand.description,
    samples: content.services.brand.samples.map((s, i) => ({
      id: `b${i + 1}`,
      brand: s.brand,
      description: s.description,
      imageUrl: `/images/portfolio/${s.image}`
    }))
  },
  {
    id: 'storefront',
    title: content.services.storefront.title,
    description: content.services.storefront.description,
    samples: content.services.storefront.samples.map((s, i) => ({
      id: `s${i + 1}`,
      brand: s.brand,
      description: s.description,
      imageUrl: `/images/portfolio/${s.image}`
    }))
  }
];

// Export contact info for use in components
export const CONTACT = content.contact;
