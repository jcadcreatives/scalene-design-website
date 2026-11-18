import styles from './Amazon.module.css'

/** Browser-style frame + Amazon-like top bar, so the page reads as a preview of a listing. */
export default function MockFrame({ search, children }: { search: string; children: React.ReactNode }) {
  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.chromeLabel}>Amazon listing preview · designed by Scalene</span>
      </div>
      <div className={styles.topbar}>
        <span className={styles.topbarBrand}>preview</span>
        <div className={styles.search}>
          <span className={styles.searchText}>{search}</span>
          <span className={styles.searchBtn} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
        </div>
        <span className={styles.topbarNote}>Scalene Design</span>
      </div>
      <div className={styles.page}>{children}</div>
    </div>
  )
}
