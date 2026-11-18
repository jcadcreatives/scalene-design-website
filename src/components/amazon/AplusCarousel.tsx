'use client'

import { useRef, useState } from 'react'
import styles from './Amazon.module.css'
import type { Img } from './types'

/** Premium A+ carousel module: one slide at a time, swipe or arrows, dots underneath (like Amazon). */
export default function AplusCarousel({ images, label }: { images: Img[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const n = images.length
  const go = (k: number) => {
    const el = track.current
    if (!el) return
    const next = (k + n) % n
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    setI(next)
  }
  const onScroll = () => {
    const el = track.current
    if (el) setI(Math.round(el.scrollLeft / el.clientWidth))
  }
  const ratio = images[0] ? `${images[0].w} / ${images[0].h}` : '1464 / 600'
  return (
    <div className={styles.apc} aria-roledescription="carousel" aria-label={label}>
      <div className={styles.apcTrack} ref={track} onScroll={onScroll} style={{ aspectRatio: ratio }}>
        {images.map((a, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={a.src}
            src={a.src}
            alt={`${label}, slide ${k + 1} of ${n}`}
            width={a.w}
            height={a.h}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
      {n > 1 && (
        <>
          <button type="button" className={`${styles.apcArrow} ${styles.apcPrev}`} onClick={() => go(i - 1)} aria-label="Previous slide">
            ‹
          </button>
          <button type="button" className={`${styles.apcArrow} ${styles.apcNext}`} onClick={() => go(i + 1)} aria-label="Next slide">
            ›
          </button>
          <div className={styles.apcDots}>
            {images.map((a, k) => (
              <button
                type="button"
                key={a.src}
                className={k === i ? styles.apcDotOn : styles.apcDot}
                onClick={() => go(k)}
                aria-label={`Go to slide ${k + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
