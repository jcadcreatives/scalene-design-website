
import { Stat, Testimonial, ServiceItem } from './types';
import content from './content.json';

export const HERO_STATS: Stat[] = content.hero.stats;

export const TESTIMONIALS: Testimonial[] = content.testimonials.map((t, i) => ({
  quote: t.quote,
  author: t.name,
  role: t.business,
  image: `/images/clients/client-${i + 1}.jpg`
}));

export const SERVICES: ServiceItem[] = [
  {
    id: 'listing',
    title: content.portfolio.listing.title,
    description: content.portfolio.listing.description,
    samples: content.portfolio.listing.images.map((img, i) => ({
      id: `l${i + 1}`,
      brand: img.name,
      description: img.subtitle,
      imageUrl: `/images/portfolio/${img.file}`
    }))
  },
  {
    id: 'aplus',
    title: content.portfolio.aplus.title,
    description: content.portfolio.aplus.description,
    samples: content.portfolio.aplus.images.map((img, i) => ({
      id: `a${i + 1}`,
      brand: img.name,
      description: img.subtitle,
      imageUrl: `/images/portfolio/${img.file}`
    }))
  },
  {
    id: 'brand',
    title: content.portfolio.brand.title,
    description: content.portfolio.brand.description,
    samples: content.portfolio.brand.images.map((img, i) => ({
      id: `b${i + 1}`,
      brand: img.name,
      description: img.subtitle,
      imageUrl: `/images/portfolio/${img.file}`
    }))
  },
  {
    id: 'storefront',
    title: content.portfolio.storefront.title,
    description: content.portfolio.storefront.description,
    samples: content.portfolio.storefront.images.map((img, i) => ({
      id: `s${i + 1}`,
      brand: img.name,
      description: img.subtitle,
      imageUrl: `/images/portfolio/${img.file}`
    }))
  }
];

export const CONTACT = content.contact;
