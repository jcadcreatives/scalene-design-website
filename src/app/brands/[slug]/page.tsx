import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import CategoryFilter from '@/components/CategoryFilter'
import AmazonPDP from '@/components/amazon/AmazonPDP'
import AmazonStorefront from '@/components/amazon/AmazonStorefront'
import type { StoreBrand } from '@/components/amazon/types'
import type { Brand } from '@/components/BrandGrid'
import brandsData from '@/data/brands.json'
import productsData from '@/data/products.json'

const brands = brandsData as Brand[]
const stores = productsData as unknown as Record<string, StoreBrand>

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) return {}
  return {
    title: `${brand.name} — Scalene Design`,
    description: `Amazon creatives by Scalene Design for ${brand.name}: ${brand.kinds.join(', ')}.`,
    openGraph: { images: [brand.thumb] },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  const store = stores[slug]
  if (!brand || !store) notFound()
  const cat = brand.categories[0]

  return (
    <>
      <Header />
      <Suspense>
        {store.storefront.length ? (
          <AmazonStorefront brand={store} category={cat} fallback={brand.thumb} />
        ) : (
          <AmazonPDP brand={store} category={cat} fallback={brand.thumb} />
        )}
      </Suspense>
      <CategoryFilter activeCategory={cat} />
    </>
  )
}
