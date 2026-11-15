'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Header.module.css'
import { openAudit } from './AuditModal'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Scalene — all brands">
        <Image
          src="/logo.png"
          alt="Scalene Design"
          width={400}
          height={120}
          priority
          style={{ width: 'auto', height: '38px' }}
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'block'
          }}
        />
        <span className={styles.logoFallback}>SCALENE</span>
      </Link>

      <nav className={styles.nav}>
        <Link href="/work" className={styles.navLink}>
          Our work
        </Link>
        <button type="button" className={styles.navLink} onClick={openAudit}>
          Free audit
        </button>
      <a
        href="https://calendly.com/jcad-creatives/discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Work with us
      </a>
      </nav>
    </header>
  )
}
