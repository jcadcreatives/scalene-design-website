'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'

/** Showreel: plays muted on loop; one tap turns the sound on and restarts it. */
export default function Reel() {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [near, setNear] = useState(false)
  // load the 6 MB reel only when it's about to scroll into view
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setNear(true)
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (muted) {
      v.currentTime = 0
      v.muted = false
      v.play().catch(() => {})
    } else {
      v.muted = true
    }
    setMuted(!muted)
  }
  return (
    <div className={styles.reel}>
      <video
        ref={ref}
        className={styles.reelVideo}
        src={near ? '/video/scalene-reel-v17.mp4' : undefined}
        poster="/video/reel-poster-v17.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        controls={!muted}
      />
      {muted && (
        <button className={styles.soundBtn} onClick={toggle}>
          <span aria-hidden>▶</span> Watch with sound
        </button>
      )}
    </div>
  )
}
