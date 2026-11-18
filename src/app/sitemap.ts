import type { MetadataRoute } from 'next'
import brandsData from '@/data/brands.json'
import productsData from '@/data/products.json'

const BASE = 'https://www.scalenedesign.com'
const CATEGORIES = ['home-kitchen', 'supplements', 'pets', 'health-beauty', 'electronics', 'and-more']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const brands = brandsData as { slug: string }[]
  const stores = productsData as unknown as Record<string, { slug: string; products: { slug: string }[] }>
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...CATEGORIES.map((c) => ({ url: `${BASE}/${c}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...brands.map((b) => ({ url: `${BASE}/brands/${b.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...Object.values(stores).flatMap((s) =>
      s.products.map((p) => ({ url: `${BASE}/brands/${s.slug}/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ),
  ]
}
