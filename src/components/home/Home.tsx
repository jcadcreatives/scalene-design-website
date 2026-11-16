import Link from 'next/link'
import styles from './Home.module.css'
import Reel from './Reel'
import HeroVisual from './HeroVisual'
import Services, { type ServicesData } from './Services'
import Stats from './Stats'
import { AuditButton } from '../AuditModal'
import brandsData from '@/data/brands.json'
import productsData from '@/data/products.json'

const CALL_URL = 'https://calendly.com/jcad-creatives/discovery-call'

type Img = { src: string; w: number; h: number }
type Store = {
  name: string
  slug: string
  storyMode?: string
  storefrontRows?: Img[][]
  storefront: Img[]
  brandstory: Img[]
  products: { name: string; slug: string; gallery: Img[]; aplus: Img[] }[]
}
const brands = brandsData as { name: string; slug: string; count: number; categories: string[]; thumb: string }[]
const stores = productsData as unknown as Record<string, Store>

const creatives = brands.reduce((n, b) => n + b.count, 0)
const products = Object.values(stores).reduce((n, s) => n + s.products.length, 0)

const pick = (slug: string) => stores[slug]
const SERVICES: ServicesData = {
  main: { slug: 'core-fiber', brand: 'Core Fiber', img: pick('core-fiber').products[0].gallery[0] },
  listing: { slug: 'luminoire', brand: 'Luminoire', imgs: pick('luminoire').products[0].gallery.slice(1, 4) },
  aplus: {
    slug: 'vornado',
    brand: 'Vornado',
    imgs: (pick('vornado').products.find((p) => p.aplus.length) ?? pick('vornado').products[0]).aplus,
  },
  story: { slug: 'fender', brand: 'Fender', imgs: pick('fender').brandstory, mode: pick('fender').storyMode },
  store: { slug: 'wuju', brand: 'WUJU', imgs: (pick('wuju').storefrontRows ?? [pick('wuju').storefront]).flat() },
}

const FEATURED = ['cuemill', 'jaybees-nuts', 'vornado', 'nostalgia', 'sprinkle-and-sweep', 'doc-itchy', 'fender', 'cogimex']

const STEPS = [
  {
    n: '00',
    title: 'Free audit',
    text: 'Send your ASIN, or tell us about the product if it isn’t live yet. We email you what we’d fix first. No call needed.',
  },
  {
    n: '01',
    title: 'A brief you approve',
    text: 'We study your listing, your competitors and your reviews, then plan every image. Nothing gets designed until you sign off the brief.',
  },
  {
    n: '02',
    title: 'Design',
    text: 'Amazon-only designers build the set to Amazon’s image and A+ specs, product-true and mobile-first.',
  },
  {
    n: '03',
    title: 'Review',
    text: 'Our creative director checks every image against the brief before you see it. Three rounds of changes are included.',
  },
  {
    n: '04',
    title: 'Ready to upload',
    text: 'Final files, named and sized for Seller Central, delivered to your folder.',
  },
]

const DECISIONS = [
  {
    n: '1',
    where: 'In search',
    q: 'Click, or scroll past?',
    text: 'Your main image is one thumbnail in a grid of competitors. It has a split second to say what it is and why it’s the better pick.',
    metric: 'Wins the click',
  },
  {
    n: '2',
    where: 'On the product page',
    q: 'Is this the right one for me?',
    text: 'Shoppers swipe the gallery before they read a bullet. Each image should answer the next question: size, use, quality, proof.',
    metric: 'Turns visits into sales',
  },
  {
    n: '3',
    where: 'Below the fold',
    q: 'Can I trust this brand?',
    text: 'A+ and Brand Story settle the last doubts, make the price feel fair and give shoppers a reason to come back.',
    metric: 'Closes the sale',
  },
]

const REVIEWS = [
  { q: 'Each time I upload a batch of assets created by Josh, our CVR improves by 25–40%.', who: 'Client review, Upwork' },
  { q: 'Joshua is an absolute beast!!!', who: 'Client review, Upwork' },
  { q: 'Beautiful, thoughtful designs.', who: 'Client review, Upwork' },
]

const FAQ: [string, string][] = [
  [
    'What does the free audit include?',
    'We look at your main image, listing images and A+ the way a shopper would, compare them with your top competitors, and email you what we’d change first and why. No call, no obligation.',
  ],
  [
    'My product isn’t on Amazon yet. Can you still help?',
    'Yes. Tell us about the product and send what you have: photos, packaging or a website. We’ll plan the full set before launch, and we can build lifestyle scenes from your packaging, so you don’t need a photoshoot for every image.',
  ],
  [
    'What do I need to send you?',
    'Your ASIN, or product photos and packaging files if you’re pre-launch, plus your logo and brand colours if you have them. We take it from there with a brief you approve before anything is designed.',
  ],
  [
    'How many revisions are included?',
    'Three rounds of changes on every deliverable. Most projects need fewer, because you approve the brief first.',
  ],
  [
    'Which marketplaces do you design for?',
    'Amazon US, UK, Europe and Australia, built to each marketplace’s image and A+ specs.',
  ],
  [
    'Do you work with agencies?',
    'Yes. Scalene plugs into your team as your Amazon creative arm: we work inside your tools and process, take briefs from your account managers, and scale up or down with your month.',
  ],
]

const COMPARE: [string, string, string, string][] = [
  ['Focus', 'Whatever comes in', 'Ads, social, web, print…', 'Amazon only'],
  ['Plan before design', 'Rarely', 'Sometimes', 'Research-backed brief you approve'],
  ['Quality check', 'You check it', 'Varies by team', 'Creative director reviews every image'],
  ['Main, listing, A+, Brand Story, Storefront', 'Piece by piece', 'Often split across teams', 'One team, one look'],
  ['More SKUs next month', 'Hope they’re free', 'New quote, new timeline', 'Same team scales with you'],
]

export default function Home() {
  return (
    <main className={styles.home}>
      {/* hero */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Amazon creative studio</p>
          <h1 className={styles.h1}>
            Amazon images
            <br />
            that <span>sell.</span>
          </h1>
          <p className={styles.lead}>
            Shoppers decide in seconds. We design every image they see, from the main image to the Storefront, planned from
            your reviews and your competitors so more of them click and buy.
          </p>
          <div className={styles.ctas}>
            <AuditButton className={styles.btnPrimary}>Get a free audit</AuditButton>
            <Link href="/work" className={styles.btnGhost}>
              See the work →
            </Link>
          </div>
          <div className={styles.trust}>
            <span className={styles.stars} aria-label="5 stars">
              ★★★★★
            </span>
            <span>Top Rated on Upwork</span>
            <i aria-hidden>·</i>
            <span>100% Job Success</span>
            <i aria-hidden>·</i>
            <span>130+ projects delivered</span>
          </div>
        </div>
        <HeroVisual />
      </section>


      <Stats brands={brands.length} products={products} creatives={Math.floor(creatives / 10) * 10} callUrl={CALL_URL} />

      {/* problem: the three decisions */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrowDark}>Where listings lose the sale</p>
          <h2 className={styles.h2}>Every shopper makes three decisions. Your images make or break each one.</h2>
        </div>
        <div className={styles.decisions}>
          {DECISIONS.map((d) => (
            <div key={d.n} className={styles.decision}>
              <span className={styles.dN}>{d.n}</span>
              <p className={styles.dWhere}>{d.where}</p>
              <h3>{d.q}</h3>
              <p className={styles.dText}>{d.text}</p>
              <span className={styles.dMetric}>{d.metric}</span>
            </div>
          ))}
        </div>
        <div className={styles.inlineCta}>
          <p>Not sure which one is costing you sales?</p>
          <AuditButton className={styles.linkBtn}>Send us your ASIN for a free audit →</AuditButton>
        </div>
      </section>

      <Services data={SERVICES} />

      {/* reel */}
      <section className={`${styles.reelBlock} ${styles.reelTop}`}>
        <div className={styles.reelHead}>
          <p className={styles.eyebrow}>The showreel</p>
          <h2 className={styles.h2Light}>See how we think, in 60 seconds.</h2>
        </div>
        <Reel />
      </section>

      {/* featured */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrowDark}>Selected work</p>
          <h2 className={styles.h2}>Open a brand. See it the way buyers do.</h2>
          <p className={styles.blockSub}>Every brand opens as an Amazon-style page: gallery, Brand Story and A+, exactly as shoppers scroll it.</p>
        </div>
        <div className={styles.featured}>
          {FEATURED.map((slug) => {
            const b = brands.find((x) => x.slug === slug)
            if (!b) return null
            return (
              <Link key={slug} href={`/brands/${slug}`} className={styles.fcard}>
                <span className={styles.fimg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.thumb} alt={b.name} loading="lazy" />
                </span>
                <span className={styles.fname}>{b.name}</span>
                <span className={styles.fcount}>{b.count} creatives</span>
              </Link>
            )
          })}
        </div>
        <div className={styles.center}>
          <Link href="/work" className={styles.btnDark}>
            See all {brands.length} brands
          </Link>
        </div>
        <div className={styles.reviews}>
          {REVIEWS.map((r) => (
            <figure key={r.q} className={styles.review}>
              <span className={styles.stars} aria-label="5 stars">
                ★★★★★
              </span>
              <blockquote>“{r.q}”</blockquote>
              <figcaption>{r.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* how */}
      <section className={`${styles.block} ${styles.dark}`}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrow}>How we work</p>
          <h2 className={styles.h2Light}>From your ASIN to upload-ready files. No guesswork.</h2>
        </div>
        <div className={styles.steps}>
          {STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepN}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* compare */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrowDark}>Why Scalene</p>
          <h2 className={styles.h2}>Freelancer or big agency? Neither.</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th />
                <th>Freelancer</th>
                <th>General design agency</th>
                <th className={styles.us}>Scalene</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([row, a, b, c]) => (
                <tr key={row}>
                  <th>{row}</th>
                  <td>{a}</td>
                  <td>{b}</td>
                  <td className={styles.us}>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      {/* faq */}
      <section className={styles.block}>
        <div className={styles.faqGrid}>
          <div className={styles.blockHead}>
            <p className={styles.eyebrowDark}>Questions</p>
            <h2 className={styles.h2}>Before you send your ASIN.</h2>
          </div>
          <div className={styles.faq}>
            {FAQ.map(([q, a]) => (
              <details key={q} className={styles.qa}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* close */}
      <section className={styles.close}>
        <h2>Find out what your listing is losing.</h2>
        <p>Send your ASIN and we’ll email you a free audit: what we’d fix first, and why. Prefer to talk? Book a call.</p>
        <div className={styles.ctas}>
          <AuditButton className={styles.btnPrimary}>Get a free audit</AuditButton>
          <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
            Book a call
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Scalene Design</span>
        <span>Amazon creative studio · Philippines</span>
      </footer>
    </main>
  )
}
