import Header from '@/components/Header'
import CategoryFilter from '@/components/CategoryFilter'
import Home from '@/components/home/Home'

export default function HomePage() {
  return (
    <>
      <Header />
      <Home />
      <CategoryFilter activeCategory="all" />
    </>
  )
}
