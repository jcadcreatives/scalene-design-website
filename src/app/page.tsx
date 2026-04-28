import Header from '@/components/Header'
import MasonryGrid from '@/components/MasonryGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default function Home() {
  return (
    <>
      <Header />
      <MasonryGrid activeCategory="all" />
      <CategoryFilter activeCategory="all" />
    </>
  )
}
