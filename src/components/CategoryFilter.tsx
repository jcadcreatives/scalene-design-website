'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './CategoryFilter.module.css'

const CATEGORIES = [
  { id: 'home-kitchen', label: 'Home & Kitchen' },
  { id: 'supplements', label: 'Supplements' },
  { id: 'pets', label: 'Pets' },
  { id: 'all', label: 'logo' },
  { id: 'health-beauty', label: 'Health & Beauty' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'and-more', label: 'AND MORE' },
]

interface CategoryFilterProps {
  activeCategory: string
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter()

  const handleSelect = (id: string) => {
    router.push(id === 'all' ? '/' : `/${id}`)
  }

  return (
    <nav className={styles.bar} aria-label="Portfolio categories">
      {CATEGORIES.map((cat) => {
        if (cat.id === 'all') {
          return (
            <button
              key="all"
              className={`${styles.logoBtn} ${activeCategory === 'all' ? styles.logoActive : ''}`}
              onClick={() => handleSelect('all')}
              aria-label="Show all categories"
            >
              <Image
                src="/logo.webp"
                alt="Scalene — show all"
                width={400}
                height={120}
                style={{ width: 'auto', height: '32px' }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling as HTMLElement | null
                  if (fallback) fallback.style.display = 'inline'
                }}
              />
              <span className={styles.logoFallback}>SCALENE</span>
            </button>
          )
        }

        const isActive = activeCategory === cat.id
        return (
          <button
            key={cat.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => handleSelect(cat.id)}
          >
            {cat.label}
          </button>
        )
      })}
    </nav>
  )
}
