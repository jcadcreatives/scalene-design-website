import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import CategoryFilter from '@/components/CategoryFilter'
import AmazonPDP from '@/components/amazon/AmazonPDP'
import type { StoreBrand } from '@/components/amazon/types'
import type { Brand } from '@/components/BrandGrid'
import brandsData from '@/data/brands.json'
import productsData from '@/data/products.json'

const brands = brandsData as Brand[]
const stores = productsData as unknown as Record<string, StoreBrand>

export function generateStaticParams() {
  return Object.values(stores).flatMap((s) => s.products.map((p) => ({ slug: s.slug, product: p.slug })))
}

type P = { params: Promise<{ slug: string; product: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug, product } = await params
  const s = stores[slug]
  const p = s?.products.find((x) => x.slug === product)
  if (!s || !p) return {}
  return {
    title: `${s.name} ${p.name} — Amazon Listing Images & A+ by Scalene Design`,
    alternates: { canonical: `/brands/${slug}/${product}` },
    description: `Amazon listing images and A+ by Scalene Design for ${s.name} ${p.name}.`,
    openGraph: { images: [p.gallery[0]?.src ?? `/images/thumbs/${slug}.webp`] },
  }
}

export default async function ProductPage({ params }: P) {
  const { slug, product } = await params
  const brand = brands.find((b) => b.slug === slug)
  const store = stores[slug]
  if (!brand || !store || !store.products.some((p) => p.slug === product)) notFound()
  const cat = brand.categories[0]
  return (
    <>
      <Header />
      <Suspense>
        <AmazonPDP brand={store} productSlug={product} category={cat} fallback={brand.thumb} />
      </Suspense>
      <CategoryFilter activeCategory={cat} />
    </>
  )
}
