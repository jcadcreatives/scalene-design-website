'use client'

import { useCallback, useEffect, useState } from 'react'
import styles from './Amazon.module.css'
import type { Img } from './types'

export default function Lightbox({ images, start, onClose }: { images: Img[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const step = useCallback((d: number) => setI((x) => (x + d + images.length) % images.length), [images.length])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, step])
  return (
    <div className={styles.lb} onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[i].src} alt="" className={styles.lbImg} onClick={(e) => e.stopPropagation()} />
      <button className={styles.lbClose} onClick={onClose} aria-label="Close">
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Previous">
            ‹
          </button>
          <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Next">
            ›
          </button>
          <span className={styles.lbCount}>
            {i + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  )
}
