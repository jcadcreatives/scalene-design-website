'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Cursor.module.css'

export default function Cursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)

  const springX = useSpring(x, { damping: 28, stiffness: 550, mass: 0.5 })
  const springY = useSpring(y, { damping: 28, stiffness: 550, mass: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-cursor]')) setHovering(true)
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-cursor]')) setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [visible, x, y])

  return (
    <motion.div
      className={styles.cursor}
      animate={hovering ? 'hover' : 'default'}
      variants={{
        default: { width: 20, height: 20, backgroundColor: 'rgba(253,102,3,0.85)' },
        hover:   { width: 88, height: 36, backgroundColor: 'rgba(253,102,3,1)' },
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
    >
      <motion.span
        className={styles.label}
        animate={{ opacity: hovering ? 1 : 0, y: hovering ? 0 : 4 }}
        transition={{ duration: 0.15 }}
      >
        View
      </motion.span>
    </motion.div>
  )
}
