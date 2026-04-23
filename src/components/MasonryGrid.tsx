'use client'

import { AnimatePresence, motion } from 'framer-motion'
import styles from './MasonryGrid.module.css'
import portfolioData from '@/data/portfolio.json'

interface PortfolioItem {
  id: string
  src: string
  alt: string
  category: string
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

interface MasonryGridProps {
  activeCategory: string
}

export default function MasonryGrid({ activeCategory }: MasonryGridProps) {
  const items = (portfolioData as PortfolioItem[]).filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  )

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
            <motion.div
              key={item.id}
              className={styles.item}
              custom={i}
              variants={itemVariants}
              viewport={{ once: true, amount: 0.08 }}
              whileInView="visible"
              initial="hidden"
              data-cursor
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={styles.image}
              />
              <div className={styles.overlay} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
