import Header from '@/components/Header'
import BrandGrid from '@/components/BrandGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default function Home() {
  return (
    <>
      <Header />
      <BrandGrid activeCategory="all" />
      <CategoryFilter activeCategory="all" />
    </>
  )
}
