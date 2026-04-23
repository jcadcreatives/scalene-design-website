import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
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
      </div>

      <a
        href="https://calendly.com/jcad-creatives/discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cta}
      >
        Let&apos;s chat!
      </a>
    </header>
  )
}
