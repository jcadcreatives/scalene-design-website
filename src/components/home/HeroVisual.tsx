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

const LOOP = { duration: 4.2, repeat: Infinity, repeatDelay: 0.6 }

function Spark({ delay, path }: { delay: number; path: string }) {
  return (
    <svg viewBox="0 0 120 52" className={styles.spark} aria-hidden>
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FD6603" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FD6603" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffb27a" />
          <stop offset="1" stopColor="#FD6603" />
        </linearGradient>
      </defs>
      {[12, 26, 40].map((y) => (
        <line key={y} x1="2" x2="118" y1={y} y2={y} className={styles.gridLine} />
      ))}
      <motion.path
        d={`${path} L114 52 L2 52 Z`}
        fill="url(#sparkFill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ ...LOOP, times: [0, 0.35, 0.85, 1], delay }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#sparkLine)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.glowLine}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ ...LOOP, times: [0, 0.35, 0.85, 1], delay, ease: 'easeOut' }}
      />
      <motion.circle
        cx="114"
        cy="6"
        r="8"
        fill="#FD6603"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 0, 1, 1.8], opacity: [0, 0, 0.5, 0] }}
        transition={{ ...LOOP, times: [0, 0.34, 0.45, 0.85], delay }}
      />
      <motion.circle
        cx="114"
        cy="6"
        r="3.6"
        fill="#fff"
        stroke="#FD6603"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 0, 1, 1, 0] }}
        transition={{ ...LOOP, times: [0, 0.3, 0.4, 0.85, 1], delay }}
      />
    </svg>
  )
}

// Conversion card: a ring fills, the cart drops in, "Added to cart" confirms.
function Ring({ delay }: { delay: number }) {
  const C = 2 * Math.PI * 20
  return (
    <div className={styles.ringWrap}>
      <svg viewBox="0 0 48 48" className={styles.ring} aria-hidden>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffb27a" />
            <stop offset="1" stopColor="#FD6603" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" className={styles.ringTrack} />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={C}
          transform="rotate(-90 24 24)"
          className={styles.glowLine}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: [C, C * 0.14, C * 0.14, C] }}
          transition={{ ...LOOP, times: [0, 0.4, 0.85, 1], delay, ease: 'easeInOut' }}
        />
      </svg>
      <motion.span
        className={styles.ringIcon}
        animate={{ y: [0, 0, -3, 0, 0], scale: [1, 1, 1.15, 1, 1] }}
        transition={{ ...LOOP, times: [0, 0.38, 0.45, 0.52, 1], delay }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M3 4h2l2.4 11h11L21 8H7" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="10" cy="19.5" r="1.4" />
          <circle cx="17" cy="19.5" r="1.4" />
        </svg>
      </motion.span>
    </div>
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
            <span className={styles.headText}>
              <span className={styles.kicker}>Search → click</span>
              <span className={styles.statTitle}>Built to win the click</span>
            </span>
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
        <motion.div {...float(2, 7)} className={styles.convert}>
          <Ring delay={2.2} />
          <div className={styles.convertText}>
            <span className={styles.kicker}>Listing → cart</span>
            <span className={styles.statTitle}>Built to convert</span>
            <motion.span
              className={styles.added}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, 4] }}
              transition={{ ...LOOP, times: [0, 0.4, 0.5, 0.85, 1], delay: 2.2 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Added to cart
            </motion.span>
          </div>
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
