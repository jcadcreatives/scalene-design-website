'use client'

import Link from 'next/link'
import { useRef } from 'react'
import styles from './Services.module.css'

type Img = { src: string; w: number; h: number }

export type ServicesData = {
  main: { slug: string; img: Img; brand: string }
  listing: { slug: string; imgs: Img[]; brand: string }
  aplus: { slug: string; imgs: Img[]; brand: string }
  story: { slug: string; imgs: Img[]; brand: string; mode?: string }
  store: { slug: string; imgs: Img[]; brand: string }
}

function Card({
  n,
  title,
  text,
  href,
  brand,
  children,
}: {
  n: string
  title: string
  text: string
  href: string
  brand: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.stage}>{children}</div>
      <div className={styles.body}>
        <span className={styles.n}>{n}</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className={styles.more}>
          See it on {brand} <i aria-hidden>→</i>
        </span>
      </div>
    </Link>
  )
}

export default function Services({ data }: { data: ServicesData }) {
  const track = useRef<HTMLDivElement>(null)
  const go = (d: number) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(`.${styles.card}`)
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 400) + 20), behavior: 'smooth' })
  }
  const { main, listing, aplus, story, store } = data
  const storyBg = story.mode === 'strip' ? undefined : story.imgs.find((i) => i.w / i.h > 2)
  const storyCards = story.imgs.filter((i) => i !== storyBg && i.w / i.h < 1.4)

  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>What we make</p>
          <h2 className={styles.h2}>Everything a buyer sees on Amazon.</h2>
        </div>
        <div className={styles.arrows}>
          <button onClick={() => go(-1)} aria-label="Previous">
            ←
          </button>
          <button onClick={() => go(1)} aria-label="Next">
            →
          </button>
        </div>
      </div>

      <div className={styles.track} ref={track}>
        <Card
          n="01"
          title="Main images"
          text="The one image that decides the click in search. Product-true, with props and a claim that sells it at a glance."
          href={`/brands/${main.slug}`}
          brand={main.brand}
        >
          <div className={styles.mainStage}>
            <div className={styles.searchRow}>
              <span />
              <span />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={main.img.src} alt={`${main.brand} main image`} className={styles.mainImg} loading="lazy" />
          </div>
        </Card>

        <Card
          n="02"
          title="Listing images"
          text="Six to eight images that answer every question a buyer has before they scroll: benefits, features, size, use."
          href={`/brands/${listing.slug}`}
          brand={listing.brand}
        >
          <div className={styles.fan}>
            {listing.imgs.slice(0, 3).map((im, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={im.src} src={im.src} alt="" loading="lazy" className={styles[`fan${i}`]} />
            ))}
          </div>
        </Card>

        <Card
          n="03"
          title="Premium A+"
          text="The story below the fold, module by module. Built mobile-first, so it sells on the screen most buyers use."
          href={`/brands/${aplus.slug}`}
          brand={aplus.brand}
        >
          <div className={styles.device}>
            <div className={styles.vscroll}>
              {[...aplus.imgs, ...aplus.imgs].map((im, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={im.src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </Card>

        <Card
          n="04"
          title="Brand Story"
          text="A carousel that introduces the brand and walks shoppers into the rest of your range."
          href={`/brands/${story.slug}`}
          brand={story.brand}
        >
          <div className={styles.storyStage}>
            {storyBg && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={storyBg.src} alt="" className={styles.storyBg} loading="lazy" />
            )}
            <div className={styles.hscroll}>
              {[...(storyCards.length ? storyCards : story.imgs), ...(storyCards.length ? storyCards : story.imgs)].map(
                (im, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={im.src} alt="" loading="lazy" />
                ),
              )}
            </div>
          </div>
        </Card>

        <Card
          n="05"
          title="Storefronts"
          text="A branded home on Amazon that matches every product page and ties the catalogue together."
          href={`/brands/${store.slug}`}
          brand={store.brand}
        >
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.browserView}>
              <div className={styles.vscrollSlow}>
                {store.imgs.map((im, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={im.src} alt="" loading="lazy" style={{ width: im.w < 500 ? '25%' : im.w < 900 ? '50%' : '100%' }} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
