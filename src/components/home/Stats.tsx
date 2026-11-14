'use client'

import { animate, motion, useInView, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.css'

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
}

export default function Stats({
  brands,
  products,
  creatives,
  callUrl,
}: {
  brands: number
  products: number
  creatives: number
  callUrl: string
}) {
  const stats = [
    { n: brands, s: '', label: 'brands designed for' },
    { n: products, s: '', label: 'products on Amazon' },
    { n: creatives, s: '+', label: 'creatives in the portfolio' },
  ]
  return (
    <section className={styles.wrap}>
      <div className={styles.stats}>
        {stats.map((st, i) => (
          <motion.div
            key={st.label}
            className={styles.stat}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={i}
          >
            <b className={styles.num}>
              <Count to={st.n} suffix={st.s} />
            </b>
            <span className={styles.label}>{st.label}</span>
            <span className={styles.bar}>
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.div>
        ))}
        <motion.div
          className={`${styles.stat} ${styles.statDark}`}
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          custom={3}
        >
          <b className={styles.num}>1</b>
          <span className={styles.label}>marketplace. Only Amazon.</span>
          <span className={styles.pulse} aria-hidden />
        </motion.div>
      </div>

      <div className={styles.doors}>
        <motion.div
          className={`${styles.door} ${styles.doorDark}`}
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
        >
          <p className={styles.tag}>For brands</p>
          <h3>Your listing, rebuilt to convert.</h3>
          <p className={styles.text}>
            Launching a product or fixing one that isn’t selling? We plan, design and deliver the full set, from the main image
            to the Storefront.
          </p>
          <a href={callUrl} target="_blank" rel="noopener noreferrer" className={styles.btnOrange}>
            Book a call <i aria-hidden>→</i>
          </a>
          <div className={styles.thumbs} aria-hidden>
            {['core-fiber', 'jaybees-nuts', 'cuemill'].map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s} src={`/images/thumbs/${s}.webp`} alt="" className={styles[`t${i}`]} loading="lazy" />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`${styles.door} ${styles.doorOrange}`}
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          custom={1}
        >
          <p className={styles.tag}>For agencies</p>
          <h3>Your creative team, on call.</h3>
          <p className={styles.text}>
            We work white-label behind Amazon agencies: your brand on the work, your clients stay yours, and the volume flexes
            with your month.
          </p>
          <a href={callUrl} target="_blank" rel="noopener noreferrer" className={styles.btnWhite}>
            Talk partnership <i aria-hidden>→</i>
          </a>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className={styles.mark} aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}
