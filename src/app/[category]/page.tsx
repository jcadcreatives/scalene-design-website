import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import BrandGrid from '@/components/BrandGrid'
import CategoryFilter from '@/components/CategoryFilter'

const VALID_CATEGORIES = [
  'home-kitchen',
  'supplements',
  'pets',
  'health-beauty',
  'electronics',
  'and-more',
]

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

const NAMES: Record<string, string> = {
  'home-kitchen': 'Home & Kitchen',
  supplements: 'Supplements',
  pets: 'Pet',
  'health-beauty': 'Health & Beauty',
  electronics: 'Electronics',
  'and-more': 'Sports, Outdoor & More',
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const n = NAMES[category]
  if (!n) return {}
  return {
    title: `${n} Amazon Listing Images & A+ Content Examples — Scalene Design`,
    description: `Amazon main images, listing images and Premium A+ we designed for ${n.toLowerCase()} brands. Browse the work, then get a free audit of your listing.`,
    alternates: { canonical: `/${category}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  return (
    <>
      <Header />
      <BrandGrid activeCategory={category} />
      <CategoryFilter activeCategory={category} />
    </>
  )
}
