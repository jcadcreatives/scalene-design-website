import type { Metadata } from 'next'
import Header from '@/components/Header'
import BrandGrid from '@/components/BrandGrid'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata: Metadata = { title: 'Our work — Scalene Design' }

export default function WorkPage() {
  return (
    <>
      <Header />
      <BrandGrid activeCategory="all" />
      <CategoryFilter activeCategory="all" />
    </>
  )
}
