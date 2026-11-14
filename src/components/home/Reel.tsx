'use client'

import { useRef, useState } from 'react'
import styles from './Home.module.css'

/** Showreel: plays muted on loop; one tap turns the sound on and restarts it. */
export default function Reel() {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
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
        src="/video/scalene-reel.mp4"
        poster="/video/reel-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
