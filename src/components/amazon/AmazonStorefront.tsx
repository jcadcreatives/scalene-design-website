'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import styles from './Amazon.module.css'
import MockFrame from './MockFrame'
import { CATEGORY_LABEL, type Img, type StoreBrand } from './types'

/** Group storefront images into rows: wide images take a full row, square tiles pair up. */
function rows(imgs: Img[]): Img[][] {
  const out: Img[][] = []
  let buf: Img[] = []
  for (const im of imgs) {
    if (im.w / im.h >= 1.6) {
      if (buf.length) out.push(buf), (buf = [])
      out.push([im])
    } else {
      buf.push(im)
      if (buf.length === 2) out.push(buf), (buf = [])
    }
  }
  if (buf.length) out.push(buf)
  return out
}

export default function AmazonStorefront({
  brand,
  category,
  fallback,
}: {
  brand: StoreBrand
  category: string
  fallback: string
}) {
  const params = useSearchParams()
  const from = params.get('from')
  const cat = from && CATEGORY_LABEL[from] ? from : category
  const q = from ? `?from=${from}` : ''
  const imgs = brand.storefront
  const hero = imgs[0] && imgs[0].w / imgs[0].h >= 3 ? imgs[0] : null
  const body = hero ? imgs.slice(1) : imgs
  // storefronts that ship their own navigation strip don't need ours
  const ownNav = body.some((i) => i.w / i.h > 6)

  return (
    <main className={styles.wrapper}>
      <Link href={`/${cat}`} className={styles.back}>
        ← {CATEGORY_LABEL[cat] ?? 'All brands'}
      </Link>

      <MockFrame search={`${brand.name} store`}>
        <div className={styles.store}>
          {hero && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.src} alt={`${brand.name} storefront`} className={styles.storeHero} />
          )}
          {!ownNav && (
          <div className={styles.storeNav}>
            <span className={styles.storeName}>{brand.name}</span>
            <span className={`${styles.storeTab} ${styles.storeTabOn}`}>Home</span>
            <a href="#products" className={styles.storeTab}>
              Products
            </a>
          </div>
          )}
          <div className={styles.storeBody}>
            {rows(body).map((r, i) => (
              <div key={i} className={styles.storeRow} data-n={r.length}>
                {r.map((im) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={im.src} src={im.src} alt="" loading="lazy" style={{ aspectRatio: `${im.w} / ${im.h}` }} />
                ))}
              </div>
            ))}
          </div>

          <section id="products" className={styles.storeProducts}>
            <h2 className={styles.belowTitle}>Products</h2>
            <p className={styles.storeHint}>Click a product to see the listing images and A+ we designed for it.</p>
            <div className={styles.pgrid}>
              {brand.products.map((p) => (
                <Link key={p.slug} href={`/brands/${brand.slug}/${p.slug}${q}`} className={styles.pcard}>
                  <span className={styles.pimg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.gallery[0]?.src ?? fallback} alt={p.name} loading="lazy" />
                  </span>
                  <span className={styles.pname}>
                    {brand.name} {p.name}
                  </span>
                  <span className={styles.pmeta}>
                    {[p.gallery.length && 'Listing images', p.aplus.length && 'Premium A+'].filter(Boolean).join(' · ')}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </MockFrame>
    </main>
  )
}
