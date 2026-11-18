import { NextResponse } from 'next/server'

// Free-audit requests from the website land as tasks in ClickUp › SCALENE › COMMERCIAL › Deals.
// Needs CLICKUP_TOKEN in Vercel (Settings → Environment Variables). CLICKUP_AUDIT_LIST_ID overrides the list.
const LIST_ID = process.env.CLICKUP_AUDIT_LIST_ID || '901617685265'

export const dynamic = 'force-dynamic'

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max) : '')

export async function POST(req: Request) {
  let b: Record<string, unknown>
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  // Bots: the hidden field is filled, or the form was sent faster than a person can type.
  if (clean(b.website) || (typeof b.elapsed === 'number' && b.elapsed < 2500)) {
    return NextResponse.json({ ok: true })
  }

  const live = b.live !== false
  const email = clean(b.email, 200)
  const asin = clean(b.asin, 10).toUpperCase()
  const market = clean(b.market, 40) || 'amazon.com'
  const product = clean(b.product, 200)
  const link = clean(b.link, 500)
  const note = clean(b.note, 1500)
  const page = clean(b.page, 200)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'email' }, { status: 400 })
  if (live && !/^[A-Z0-9]{10}$/.test(asin)) return NextResponse.json({ error: 'asin' }, { status: 400 })
  if (!live && product.length < 2) return NextResponse.json({ error: 'product' }, { status: 400 })

  const token = process.env.CLICKUP_TOKEN
  if (!token) {
    console.error('free-audit: CLICKUP_TOKEN is not set', { email, asin, product })
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const name = live
    ? `FREE AUDIT - ${asin} (${market}) - ${email}`
    : `FREE AUDIT - ${product} (not live yet) - ${email}`

  const lines = [
    '**Free audit request from scalenedesign.com**',
    '',
    `- **Email:** ${email}`,
    live
      ? `- **Listing:** live · ASIN ${asin} · https://www.${market}/dp/${asin}`
      : `- **Listing:** not live yet · ${product}`,
    link ? `- **Link:** ${link}` : '',
    note ? `- **Note:** ${note}` : '',
    page ? `- **Sent from:** ${page}` : '',
    `- **Received:** ${new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })} (Manila)`,
  ].filter(Boolean)

  const r = await fetch(`https://api.clickup.com/api/v2/list/${LIST_ID}/task`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, markdown_description: lines.join('\n') }),
  })
  if (!r.ok) {
    console.error('free-audit: ClickUp error', r.status, await r.text())
    return NextResponse.json({ error: 'upstream' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
