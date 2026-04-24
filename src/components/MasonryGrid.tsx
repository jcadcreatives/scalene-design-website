'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './MasonryGrid.module.css'
import portfolioData from '@/data/portfolio.json'

interface PortfolioItem {
  id: string
  src: string
  alt: string
  category: string
  priority: boolean
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      delay: (i % 9) * 0.03,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

const HOVER_SHADOW = [
  '0 6px 20px rgba(25, 12, 6, 0.10)',
  '0 24px 80px rgba(25, 12, 6, 0.12)',
  '0 48px 100px rgba(25, 12, 6, 0.08)',
].join(', ')

interface MasonryGridProps {
  activeCategory: string
}

export default function MasonryGrid({ activeCategory }: MasonryGridProps) {
  const items = (portfolioData as PortfolioItem[])
    .filter((item) => activeCategory === 'all' || item.category === activeCategory)
    .sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0))

  return (
    <main className={styles.wrapper}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className={styles.grid}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className={styles.itemWrapper}
            >
              <motion.div
                className={styles.item}
                custom={i}
                variants={itemVariants}
                viewport={{ once: true, amount: 0.08 }}
                whileInView="visible"
                initial="hidden"
                whileHover={{
                  scale: 1.07,
                  boxShadow: HOVER_SHADOW,
                  zIndex: 10,
                  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                }}
                data-cursor
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ width: '100%', height: 'auto' }}
                  className={styles.image}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
