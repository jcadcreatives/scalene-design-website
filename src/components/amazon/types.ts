export interface Img {
  src: string
  w: number
  h: number
  product?: string
}

export interface Product {
  name: string
  slug: string
  gallery: Img[]
  aplus: Img[]
  kinds: string[]
}

export interface StoreBrand {
  name: string
  slug: string
  storefront: Img[]
  storefrontRows?: Img[][]
  brandstory: Img[]
  products: Product[]
}

export const CATEGORY_LABEL: Record<string, string> = {
  'home-kitchen': 'Home & Kitchen',
  supplements: 'Supplements',
  pets: 'Pets',
  'health-beauty': 'Health & Beauty',
  electronics: 'Electronics',
  'and-more': 'And more',
}

export const CALL_URL = 'https://calendly.com/jcad-creatives/discovery-call'
