import Link from 'next/link'
import styles from './Home.module.css'
import Reel from './Reel'
import HeroVisual from './HeroVisual'
import Services, { type ServicesData } from './Services'
import Stats from './Stats'
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
            Main images, listing images, Premium A+, Brand Story and Storefronts. One marketplace, one team, built to turn
            searches into sales.
          </p>
          <div className={styles.ctas}>
            <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Book a call
            </a>
            <Link href="/work" className={styles.btnGhost}>
              See the work →
            </Link>
          </div>
        </div>
        <HeroVisual />
      </section>


      <Stats brands={brands.length} products={products} creatives={Math.floor(creatives / 10) * 10} callUrl={CALL_URL} />

      <Services data={SERVICES} />

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
      </section>

      {/* how */}
      <section className={`${styles.block} ${styles.dark}`}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrow}>How we work</p>
          <h2 className={styles.h2Light}>No guesswork. No surprises.</h2>
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

      {/* reel */}
      <section className={styles.reelBlock}>
        <div className={styles.reelHead}>
          <p className={styles.eyebrow}>The showreel</p>
          <h2 className={styles.h2Light}>60 seconds of what we make.</h2>
        </div>
        <Reel />
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


      {/* close */}
      <section className={styles.close}>
        <h2>Show us your listing.</h2>
        <p>Book a call. We’ll go through your images with you and tell you what we’d change first.</p>
        <a href={CALL_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
          Book a call
        </a>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Scalene Design</span>
        <span>Amazon creative studio · Philippines</span>
      </footer>
    </main>
  )
}
