'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './BrandGrid.module.css'
import brandsData from '@/data/brands.json'

export interface BrandItem {
  src: string
  w: number
  h: number
  kind: string
}

export interface Brand {
  name: string
  slug: string
  categories: string[]
  thumb: string
  count: number
  kinds: string[]
  items: BrandItem[]
}

export default function BrandGrid({ activeCategory }: { activeCategory: string }) {
  const brands = (brandsData as Brand[]).filter(
    (b) => activeCategory === 'all' || b.categories.includes(activeCategory),
  )
  const from = activeCategory === 'all' ? '' : `?from=${activeCategory}`

  return (
    <main className={styles.wrapper}>
      <div className={styles.grid}>
        {brands.map((b, i) => (
          <motion.div
            key={b.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3, delay: (i % 10) * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link href={`/brands/${b.slug}${from}`} className={styles.card}>
              <div className={styles.thumb}>
                <Image
                  src={b.thumb}
                  alt={b.name}
                  width={640}
                  height={640}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 18vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.meta}>
                <span className={styles.name}>{b.name}</span>
                <span className={styles.count}>
                  {b.count} {b.count === 1 ? 'creative' : 'creatives'}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
