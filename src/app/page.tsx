'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import MasonryGrid from '@/components/MasonryGrid'
import CategoryFilter from '@/components/CategoryFilter'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <>
      <Header />
      <MasonryGrid activeCategory={activeCategory} />
      <CategoryFilter activeCategory={activeCategory} onSelect={setActiveCategory} />
    </>
  )
}
