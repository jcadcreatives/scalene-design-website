import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import BrandGallery from '@/components/BrandGallery'
import CategoryFilter from '@/components/CategoryFilter'
import type { Brand } from '@/components/BrandGrid'
import brandsData from '@/data/brands.json'

const brands = brandsData as Brand[]

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
  if (!brand) notFound()

  return (
    <>
      <Header />
      <Suspense>
        <BrandGallery brand={brand} />
      </Suspense>
      <CategoryFilter activeCategory={brand.categories[0]} />
    </>
  )
}
