'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './BrandGallery.module.css'
import type { Brand } from './BrandGrid'

const SECTIONS: [string, string][] = [
  ['main', 'Main images'],
  ['listing', 'Listing images'],
  ['aplus', 'A+ content'],
  ['brandstory', 'Brand story'],
  ['storefront', 'Storefront'],
]

const CATEGORY_LABEL: Record<string, string> = {
  'home-kitchen': 'Home & Kitchen',
  supplements: 'Supplements',
  pets: 'Pets',
  'health-beauty': 'Health & Beauty',
  electronics: 'Electronics',
  'and-more': 'And more',
}

export default function BrandGallery({ brand }: { brand: Brand }) {
  const params = useSearchParams()
  const from = params.get('from')
  const backHref = from && CATEGORY_LABEL[from] ? `/${from}` : '/'
  const backLabel = from && CATEGORY_LABEL[from] ? CATEGORY_LABEL[from] : 'All brands'

  // flat list in display order, for the viewer's next / previous
  const ordered = SECTIONS.flatMap(([k]) => brand.items.filter((i) => i.kind === k))
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + ordered.length) % ordered.length)),
    [ordered.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  return (
    <main className={styles.wrapper}>
      <Link href={backHref} className={styles.back}>
        ← {backLabel}
      </Link>
      <h1 className={styles.title}>{brand.name}</h1>
      <p className={styles.sub}>
        {brand.count} {brand.count === 1 ? 'creative' : 'creatives'} · {brand.kinds.join(' · ')}
      </p>

      {SECTIONS.map(([kind, label]) => {
        const items = brand.items.filter((i) => i.kind === kind)
        if (!items.length) return null
        return (
          <section key={kind} className={styles.section}>
            <h2 className={styles.sectionTitle}>{label}</h2>
            <div className={`${styles.grid} ${items.length === 1 ? styles.single : ''}`}>
              {items.map((it) => {
                const idx = ordered.indexOf(it)
                return (
                  <button key={it.src} className={styles.tile} onClick={() => setOpen(idx)}>
                    <Image
                      src={it.src}
                      alt={`${brand.name} — ${label}`}
                      width={it.w}
                      height={it.h}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.img}
                    />
                  </button>
                )
              })}
            </div>
          </section>
        )
      })}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <div className={styles.viewer} onClick={(e) => e.stopPropagation()}>
              <Image
                key={ordered[open].src}
                src={ordered[open].src}
                alt={brand.name}
                width={ordered[open].w}
                height={ordered[open].h}
                sizes="(max-width: 960px) 92vw, 900px"
                className={styles.viewerImg}
                priority
              />
            </div>
            <button className={styles.close} onClick={close} aria-label="Close">
              ✕
            </button>
            {ordered.length > 1 && (
              <>
                <button
                  className={`${styles.nav} ${styles.prev}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <button
                  className={`${styles.nav} ${styles.next}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  aria-label="Next"
                >
                  ›
                </button>
              </>
            )}
            <span className={styles.counter}>
              {open + 1} / {ordered.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
