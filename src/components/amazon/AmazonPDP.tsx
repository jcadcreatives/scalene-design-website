'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './Amazon.module.css'
import MockFrame from './MockFrame'
import BrandStory from './BrandStory'
import Lightbox from './Lightbox'
import { CALL_URL, CATEGORY_LABEL, type Img, type StoreBrand } from './types'

export default function AmazonPDP({
  brand,
  productSlug,
  category,
  fallback,
}: {
  brand: StoreBrand
  productSlug?: string
  category: string
  fallback: string
}) {
  const params = useSearchParams()
  const from = params.get('from')
  const cat = from && CATEGORY_LABEL[from] ? from : category
  const q = from ? `?from=${from}` : ''
  const product = brand.products.find((p) => p.slug === productSlug) ?? brand.products[0]
  const hasStore = brand.storefront.length > 0

  const gallery: Img[] = product.gallery.length ? product.gallery : [{ src: fallback, w: 640, h: 640 }]
  const [active, setActive] = useState(0)
  const [box, setBox] = useState<number | null>(null)
  const swipe = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActive(0)
    swipe.current?.scrollTo({ left: 0 })
  }, [product.slug])

  const onSwipe = () => {
    const el = swipe.current
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const bullets: string[] = []
  const nMain = product.kinds.includes('main')
  if (product.gallery.length) {
    bullets.push(
      nMain
        ? `Main image + ${product.gallery.length - 1} gallery images, built to win the click and answer buyer questions before they scroll.`
        : `${product.gallery.length} listing images: hero, benefits, features, size and lifestyle, in one consistent look.`,
    )
  }
  if (product.aplus.length) {
    bullets.push(`A+ content: ${product.aplus.length} modules that tell the product story below the fold.`)
  }
  if (brand.brandstory.length) bullets.push('Brand Story carousel that introduces the brand and links shoppers to the full range.')
  if (hasStore) bullets.push('Brand Storefront designed to match, so every product page leads back to one branded home.')
  bullets.push('Designed by Scalene Design for Amazon, using Amazon’s image and A+ specs.')

  const title = product.name.toLowerCase().startsWith(brand.name.toLowerCase())
    ? product.name
    : `${brand.name} ${product.name}`

  return (
    <main className={styles.wrapper}>
      <Link href={hasStore ? `/brands/${brand.slug}${q}` : `/${cat}`} className={styles.back}>
        ← {hasStore ? `${brand.name} Store` : CATEGORY_LABEL[cat] ?? 'All brands'}
      </Link>

      <MockFrame search={title}>
        <nav className={styles.crumbs}>
          <Link href={`/${cat}`}>{CATEGORY_LABEL[cat]}</Link>
          <span>›</span>
          {hasStore ? <Link href={`/brands/${brand.slug}${q}`}>{brand.name}</Link> : <span>{brand.name}</span>}
          <span>›</span>
          <span className={styles.crumbNow}>{product.name}</span>
        </nav>

        <section className={styles.pdp}>
          {/* gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {gallery.map((g, i) => (
                <button
                  key={g.src}
                  className={`${styles.thumb} ${i === active ? styles.thumbOn : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <button className={styles.hero} onClick={() => setBox(active)} aria-label="Open image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[active].src} alt={`${title} — image ${active + 1}`} />
            </button>
            <div className={styles.swipe} ref={swipe} onScroll={onSwipe}>
              {gallery.map((g, i) => (
                <button key={g.src} className={styles.swipeItem} onClick={() => setBox(i)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={`${title} — image ${i + 1}`} loading={i ? 'lazy' : 'eager'} />
                </button>
              ))}
            </div>
            {gallery.length > 1 && (
              <div className={styles.gdots}>
                {gallery.map((g, i) => (
                  <i key={g.src} className={i === active ? styles.dotOn : ''} />
                ))}
              </div>
            )}
          </div>

          {/* title block */}
          <div className={styles.titleBlock}>
            {hasStore ? (
              <Link href={`/brands/${brand.slug}${q}`} className={styles.storeLink}>
                Visit the {brand.name} Store
              </Link>
            ) : (
              <span className={styles.storeLink}>Brand: {brand.name}</span>
            )}
            <h1 className={styles.ptitle}>{title}</h1>
          </div>

          {/* details */}
          <div className={styles.details}>
            {brand.products.length > 1 && (
              <div className={styles.twister}>
                <p className={styles.twisterLabel}>
                  Product: <b>{product.name}</b>
                </p>
                <div className={styles.chips}>
                  {brand.products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/brands/${brand.slug}/${p.slug}${q}`}
                      scroll={false}
                      className={`${styles.chip} ${p.slug === product.slug ? styles.chipOn : ''}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.gallery[0]?.src ?? fallback} alt="" loading="lazy" />
                      <span>{p.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h2 className={styles.about}>About this design work</h2>
            <ul className={styles.bullets}>
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className={styles.buybox}>
              <p className={styles.buyTitle}>Want listing images like these?</p>
              <p className={styles.buyText}>Main images, listing images, A+, Brand Story and Storefronts, made for Amazon.</p>
              <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className={styles.buyBtn}>
                Book a call
              </a>
            </div>
          </div>
        </section>

        {brand.brandstory.length > 0 && (
          <section className={styles.below}>
            <h2 className={styles.belowTitle}>From the brand</h2>
            <BrandStory images={brand.brandstory} brand={brand.name} />
          </section>
        )}

        {product.aplus.length > 0 && (
          <section className={styles.below}>
            <h2 className={styles.belowTitle}>Product description</h2>
            <div className={styles.aplus}>
              {product.aplus.map((a, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={a.src}
                  src={a.src}
                  alt={`${title} — A+ module ${i + 1}`}
                  width={a.w}
                  height={a.h}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}
      </MockFrame>

      {box !== null && <Lightbox images={gallery} start={box} onClose={() => setBox(null)} />}
    </main>
  )
}
