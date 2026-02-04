
export interface Stat {
  label: string;
  value: string;
  subLabel?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export interface ServiceSample {
  id: string;
  brand: string;
  description: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  samples: ServiceSample[];
}

export type ServiceType = 'listing' | 'aplus' | 'brand' | 'storefront';
