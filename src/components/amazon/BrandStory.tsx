import styles from './Amazon.module.css'
import type { Img } from './types'

/** Amazon Brand Story: a wide background with cards scrolling over it; falls back to a plain strip. */
export default function BrandStory({ images, brand, mode }: { images: Img[]; brand: string; mode?: string }) {
  if (!images.length) return null
  const bg = mode === 'strip' ? undefined : images.find((i) => i.w / i.h > 2)
  const cards = images.filter((i) => i !== bg && i.w / i.h < 1.4 && i.w >= 250)
  if (bg && cards.length) {
    return (
      <div className={styles.story} style={{ aspectRatio: `${bg.w} / ${bg.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bg.src} alt={`${brand} brand story`} className={styles.storyBg} loading="lazy" />
        <div className={styles.storyCards}>
          {cards.map((c) => (
            // logo card (463x625) fills the height; standard cards (362x453) sit at ~72%
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={c.src}
              src={c.src}
              alt=""
              className={styles.storyCard}
              style={{ height: c.w / c.h < 0.77 ? '100%' : '72.5%', aspectRatio: `${c.w} / ${c.h}` }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={styles.strip}>
      {images.map((c) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={c.src} src={c.src} alt="" style={{ aspectRatio: `${c.w} / ${c.h}` }} loading="lazy" />
      ))}
    </div>
  )
}
