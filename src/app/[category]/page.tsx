import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import MasonryGrid from '@/components/MasonryGrid'
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

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  return (
    <>
      <Header />
      <MasonryGrid activeCategory={category} />
      <CategoryFilter activeCategory={category} />
    </>
  )
}
