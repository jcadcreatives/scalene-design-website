import type { Metadata } from 'next'
import Header from '@/components/Header'
import BrandGrid from '@/components/BrandGrid'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = {
  title: 'Amazon Listing Images & A+ Content Portfolio — Scalene Design',
  description: 'Main images, listing images, Premium A+, Brand Story and Storefronts for 130+ Amazon brands. Browse by brand.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <>
      <Header />
      <BrandGrid activeCategory="all" />
      <CategoryFilter activeCategory="all" />
    </>
  )
}
