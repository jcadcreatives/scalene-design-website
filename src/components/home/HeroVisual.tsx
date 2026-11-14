'use client'

import { motion, useReducedMotion } from 'framer-motion'
import styles from './HeroVisual.module.css'
import productsData from '@/data/products.json'

type Img = { src: string; w: number; h: number }
type Store = { name: string; products: { name: string; gallery: Img[]; aplus: Img[] }[] }

// The hero shows one real Scalene job end to end: main image, listing images, A+ on a phone.
const store = (productsData as unknown as Record<string, Store>)['doc-itchy']
const product = store.products[0]
const MAIN = product.gallery[0]
const LISTING = product.gallery.slice(1, 5)
const APLUS = product.aplus.slice(0, 5)

const ease = [0.22, 1, 0.36, 1] as const

function Spark({ delay, path }: { delay: number; path: string }) {
  return (
    <svg viewBox="0 0 120 52" className={styles.spark} aria-hidden>
      <defs>
        <linearGradient id={`g${delay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FD6603" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FD6603" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${path} L118 52 L2 52 Z`}
        fill={`url(#g${delay})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, times: [0, 0.35, 0.85, 1], delay, repeat: Infinity, repeatDelay: 0.6 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="#FD6603"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4.2, times: [0, 0.35, 0.85, 1], delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.6 }}
      />
      <motion.circle
        cx="114"
        cy="6"
        r="4.5"
        fill="#FD6603"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 0, 1, 1, 0] }}
        transition={{ duration: 4.2, times: [0, 0.3, 0.4, 0.85, 1], delay, repeat: Infinity, repeatDelay: 0.6 }}
      />
    </svg>
  )
}

export default function HeroVisual() {
  const still = useReducedMotion()
  const float = (d: number, y = 10) =>
    still ? {} : { animate: { y: [0, -y, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: d } }

  return (
    <div className={styles.stage} aria-label={`${store.name} ${product.name}: main image, listing images and A+ by Scalene`}>
      <div className={styles.glow} />

      {/* listing images, 2 x 2 */}
      <div className={styles.grid}>
        {LISTING.map((im, i) => (
          <motion.div
            key={im.src}
            className={styles.tile}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease }}
          >
            <motion.div {...float(i * 0.7, 6)} className={styles.tileInner}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt="" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* phone: the listing as a shopper scrolls it */}
      <motion.div
        className={styles.phone}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease }}
      >
        <div className={styles.notch} />
        <div className={styles.screen}>
          <div className={styles.appbar}>
            <span className={styles.menu} />
            <span className={styles.searchPill}>hair skin nails for dogs</span>
          </div>
          <div className={styles.viewport}>
            <div className={`${styles.feed} ${still ? '' : styles.scroll}`}>
              <p className={styles.store}>Visit the {store.name} Store</p>
              <p className={styles.ptitle}>
                {store.name} {product.name} for Dogs
              </p>
              <div className={styles.gallery}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MAIN.src} alt="" />
              </div>
              <div className={styles.dots}>
                <i className={styles.on} />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className={styles.lines}>
                <i />
                <i />
                <i style={{ width: '62%' }} />
              </div>
              <p className={styles.fromBrand}>From the brand</p>
              {APLUS.map((a) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={a.src} src={a.src} alt="" className={styles.aplus} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* main image card */}
      <motion.div
        className={styles.main}
        initial={{ opacity: 0, x: -40, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -5 }}
        transition={{ duration: 1, delay: 0.35, ease }}
      >
        <motion.div {...float(0.3, 8)} className={styles.mainInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MAIN.src} alt="" />
          <span className={styles.chip}>Main image</span>
        </motion.div>
      </motion.div>

      {/* stat cards */}
      <motion.div
        className={`${styles.stat} ${styles.statA}`}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease }}
      >
        <motion.div {...float(1.2, 7)}>
          <div className={styles.statHead}>
            <span className={styles.icon} aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 3l14 7-6 2-2 6z" strokeLinejoin="round" />
              </svg>
            </span>
            Built to win the click
          </div>
          <Spark delay={1.4} path="M2 44 C 18 40, 26 42, 38 34 S 60 30, 70 22 S 96 16, 114 6" />
        </motion.div>
      </motion.div>

      <motion.div
        className={`${styles.stat} ${styles.statB}`}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.25, ease }}
      >
        <motion.div {...float(2, 7)}>
          <div className={styles.statHead}>
            <span className={styles.icon} aria-hidden>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 4h2l2.4 11h11L21 8H7" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="10" cy="19.5" r="1.4" />
                <circle cx="17" cy="19.5" r="1.4" />
              </svg>
            </span>
            Built to convert
          </div>
          <Spark delay={2.2} path="M2 46 L 20 40 L 34 42 L 50 30 L 66 33 L 84 18 L 100 14 L 114 6" />
        </motion.div>
      </motion.div>

      {/* label */}
      <motion.div
        className={styles.label}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <b>{store.name}</b> · main image, listing images &amp; Premium A+ by Scalene
      </motion.div>
    </div>
  )
}
