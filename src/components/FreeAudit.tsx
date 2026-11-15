'use client'

import { useRef, useState } from 'react'
import styles from './FreeAudit.module.css'

const MARKETS = ['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.ca', 'amazon.com.au', 'amazon.fr', 'amazon.it', 'amazon.es']

/** Pull an ASIN (and the marketplace, if it's a link) out of whatever the seller pasted. */
function parseAsin(raw: string): { asin: string | null; market: string | null } {
  const s = raw.trim()
  const market = s.match(/amazon\.(com\.au|co\.uk|com|de|ca|fr|it|es)/i)?.[0].toLowerCase() ?? null
  const m = s.match(/(?:\/dp\/|\/gp\/product\/|\/product\/|asin=)([A-Z0-9]{10})/i) ?? s.match(/^([A-Z0-9]{10})$/i)
  return { asin: m ? m[1].toUpperCase() : null, market }
}

type State = 'idle' | 'sending' | 'done' | 'error'

export default function FreeAudit({ callUrl }: { callUrl: string }) {
  const [live, setLive] = useState(true)
  const [asinRaw, setAsinRaw] = useState('')
  const [market, setMarket] = useState('amazon.com')
  const [product, setProduct] = useState('')
  const [link, setLink] = useState('')
  const [note, setNote] = useState('')
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [state, setState] = useState<State>('idle')
  const [err, setErr] = useState('')
  const started = useRef(Date.now())

  const parsed = parseAsin(asinRaw)
  const shownMarket = parsed.market ?? market

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (live && !parsed.asin) return setErr('That doesn’t look like an ASIN. It’s 10 characters, like B0C1234XYZ, or paste the Amazon link.')
    if (!live && product.trim().length < 2) return setErr('Tell us what the product is.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr('Enter the email we should send your audit to.')
    setState('sending')
    try {
      const r = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          live,
          asin: parsed.asin,
          market: shownMarket,
          product: product.trim(),
          link: link.trim(),
          note: note.trim(),
          email: email.trim(),
          website: hp,
          elapsed: Date.now() - started.current,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div className={styles.card} role="status">
        <div className={styles.done}>
          <span className={styles.check} aria-hidden>
            ✓
          </span>
          <h3>Got it. Your audit is on its way.</h3>
          <p>
            We’ll review {live ? `ASIN ${parsed.asin}` : product} and email your audit to <strong>{email.trim()}</strong>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form className={styles.card} onSubmit={submit} noValidate>
      <div className={styles.toggle} role="radiogroup" aria-label="Is your listing live?">
        <button type="button" role="radio" aria-checked={live} className={live ? styles.on : ''} onClick={() => setLive(true)}>
          My listing is live
        </button>
        <button type="button" role="radio" aria-checked={!live} className={!live ? styles.on : ''} onClick={() => setLive(false)}>
          Not live yet
        </button>
      </div>

      {live ? (
        <>
          <label className={styles.field}>
            <span>ASIN or Amazon link</span>
            <input
              value={asinRaw}
              onChange={(e) => setAsinRaw(e.target.value)}
              placeholder="B0C1234XYZ or amazon.com/dp/…"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          {parsed.asin && (
            <p className={styles.found}>
              ASIN <strong>{parsed.asin}</strong>
              {parsed.market ? ` on ${parsed.market}` : ''}
            </p>
          )}
          {!parsed.market && (
            <label className={styles.field}>
              <span>Marketplace</span>
              <select value={market} onChange={(e) => setMarket(e.target.value)}>
                {MARKETS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          )}
        </>
      ) : (
        <>
          <label className={styles.field}>
            <span>What’s the product?</span>
            <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Magnesium glycinate gummies, 60 count" />
          </label>
          <label className={styles.field}>
            <span>
              Link to photos, your website or a competitor <em>(optional)</em>
            </span>
            <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Drive folder, website, or a competitor’s Amazon link" />
          </label>
          <label className={styles.field}>
            <span>
              Anything we should know? <em>(optional)</em>
            </span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Who it’s for, launch date, marketplace…" />
          </label>
        </>
      )}

      <label className={styles.field}>
        <span>Your email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@brand.com" autoComplete="email" />
      </label>

      {/* spam trap: hidden from people, bots fill it */}
      <input className={styles.hp} tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} name="website" aria-hidden />

      {err && <p className={styles.err}>{err}</p>}
      {state === 'error' && (
        <p className={styles.err}>
          Something went wrong on our side. Try again, or{' '}
          <a href={callUrl} target="_blank" rel="noopener noreferrer">
            book a call
          </a>{' '}
          instead.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send me my free audit'}
      </button>
      <p className={styles.fine}>Free. No call needed.</p>
    </form>
  )
}
