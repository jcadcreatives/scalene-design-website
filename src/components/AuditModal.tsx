'use client'

import { useCallback, useEffect, useState } from 'react'
import FreeAudit from './FreeAudit'
import styles from './AuditModal.module.css'

const CALL_URL = 'https://calendly.com/jcad-creatives/discovery-call'
export const OPEN_AUDIT = 'scalene:audit'

/** Anywhere on the site: openAudit() opens the free-audit popup. */
export function openAudit() {
  window.dispatchEvent(new Event(OPEN_AUDIT))
}

/** A plain button that opens the free-audit popup (usable from server components). */
export function AuditButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={openAudit}>
      {children}
    </button>
  )
}

function Icon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
      <path d="m7.8 10.6 1.9 1.9 3.4-3.6" />
    </svg>
  )
}

export default function AuditModal() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  const show = useCallback(() => {
    setHint(false)
    setOpen(true)
  }, [])
  const hide = useCallback(() => {
    setOpen(false)
    if (window.location.hash === '#audit') history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [])

  // open from buttons, from a #audit link, and on load with #audit
  useEffect(() => {
    const fromHash = () => window.location.hash === '#audit' && show()
    fromHash()
    window.addEventListener(OPEN_AUDIT, show)
    window.addEventListener('hashchange', fromHash)
    return () => {
      window.removeEventListener(OPEN_AUDIT, show)
      window.removeEventListener('hashchange', fromHash)
    }
  }, [show])

  // one nudge per visit: after a few seconds the floating button says what it is
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('auditHint') === '1'
    } catch {}
    if (seen) return
    const t1 = setTimeout(() => {
      setHint(true)
      try {
        sessionStorage.setItem('auditHint', '1')
      } catch {}
    }, 7000)
    const t2 = setTimeout(() => setHint(false), 15000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // esc to close, no page scroll behind the popup
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide()
    window.addEventListener('keydown', onKey)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prev
    }
  }, [open, hide])

  return (
    <>
      <div className={`${styles.fab} ${open ? styles.fabHidden : ''}`}>
        {hint && (
          <button type="button" className={styles.hint} onClick={show}>
            Get a free audit of your Amazon listing
          </button>
        )}
        <button type="button" className={styles.fabBtn} onClick={show} aria-label="Get a free listing audit">
          <span className={styles.pulse} aria-hidden />
          <Icon />
          <span>Free audit</span>
        </button>
      </div>

      {open && (
        <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && hide()} data-lenis-prevent>
          <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="audit-title">
            <button type="button" className={styles.close} onClick={hide} aria-label="Close">
              ×
            </button>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>Free listing audit</p>
              <h2 id="audit-title">Not sure what to fix first? Send us your ASIN.</h2>
              <p className={styles.lead}>
                Our team reviews your listing the way a shopper and an Amazon designer would, and emails you what we’d change
                first. Not live yet? Tell us about the product and we’ll tell you what your images need to do.
              </p>
              <ul className={styles.list}>
                <li>Main image: does it win the click in search?</li>
                <li>Listing images: do they answer the buyer’s questions in order?</li>
                <li>A+ and Brand Story: what’s missing, and what to keep</li>
              </ul>
            </div>
            <div className={styles.formWrap}>
              <FreeAudit callUrl={CALL_URL} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
