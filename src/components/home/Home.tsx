import Link from 'next/link'
import styles from './Home.module.css'
import Reel from './Reel'
import HeroVisual from './HeroVisual'
import brandsData from '@/data/brands.json'
import productsData from '@/data/products.json'

const CALL_URL = 'https://calendly.com/jcad-creatives/discovery-call'

type Img = { src: string; w: number; h: number }
type Store = {
  name: string
  slug: string
  storefront: Img[]
  brandstory: Img[]
  products: { name: string; slug: string; gallery: Img[]; aplus: Img[] }[]
}
const brands = brandsData as { name: string; slug: string; count: number; categories: string[]; thumb: string }[]
const stores = productsData as unknown as Record<string, Store>

const creatives = brands.reduce((n, b) => n + b.count, 0)
const products = Object.values(stores).reduce((n, s) => n + s.products.length, 0)

const SERVICES = [
  {
    title: 'Main images',
    text: 'The one image that decides the click in search. Product-true, with props and a claim that sells it at a glance.',
    slug: 'jaybees-nuts',
    imgs: [stores['jaybees-nuts'].products[0].gallery[0]],
  },
  {
    title: 'Listing images',
    text: 'Six to eight images that answer every question a buyer has before they scroll: benefits, features, size, use.',
    slug: 'cuemill',
    imgs: [stores['cuemill'].products[0].gallery[1]],
  },
  {
    title: 'Premium A+',
    text: 'The story below the fold. Modules built for mobile first, so the page sells on the screen most buyers use.',
    slug: 'doc-itchy',
    imgs: stores['doc-itchy'].products[0].aplus.slice(0, 3),
  },
  {
    title: 'Brand Story',
    text: 'A carousel that introduces the brand and walks shoppers into the rest of your range.',
    slug: 'luminoire',
    imgs: [stores['luminoire'].brandstory.find((i) => i.w / i.h < 1) ?? stores['luminoire'].brandstory[0]],
  },
  {
    title: 'Storefronts',
    text: 'A branded home on Amazon that matches every product page and ties the catalogue together.',
    slug: 'vornado',
    imgs: stores['vornado'].storefront.slice(0, 4),
  },
]

const MARQUEE = [
  'jaybees-nuts', 'cuemill', 'vornado', 'sprinkle-and-sweep', 'nostalgia', 'cogimex', 'oramd', 'fender',
  'king-coil', 'tillbrook', 'core-fiber', 'mr-remys', 'hot-star-honey', 'naturello', 'pupiboo', 'luminoire',
  'the-restroom-kit', 'bubble-bro', 'cpx-pickleball', 'netrox', 'better-boat', 'reglow',
]
  .map((slug) => brands.find((b) => b.slug === slug))
  .filter((b): b is (typeof brands)[number] => Boolean(b))

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

      {/* main images marquee */}
      <section className={styles.marquee} aria-label="Main images by Scalene">
        <div className={styles.track}>
          {[...MARQUEE, ...MARQUEE].map((b, i) => (
            <Link key={`${b.slug}-${i}`} href={`/brands/${b.slug}`} className={styles.mq} tabIndex={i >= MARQUEE.length ? -1 : 0}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.thumb} alt={b.name} loading="lazy" />
            </Link>
          ))}
        </div>
      </section>

      {/* proof */}
      <section className={styles.proof}>
        <div>
          <b>{brands.length}</b>
          <span>brands designed for</span>
        </div>
        <div>
          <b>{products}</b>
          <span>products on Amazon</span>
        </div>
        <div>
          <b>{Math.floor(creatives / 10) * 10}+</b>
          <span>creatives in the portfolio</span>
        </div>
        <div>
          <b>1</b>
          <span>marketplace. Only Amazon.</span>
        </div>
      </section>

      {/* reel */}
      <section className={styles.reelBlock}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrowDark}>The showreel</p>
          <h2 className={styles.h2}>60 seconds of what we make.</h2>
        </div>
        <Reel />
      </section>

      {/* who */}
      <section className={styles.doors}>
        <div className={styles.door}>
          <p className={styles.doorTag}>For brands</p>
          <h3>Your listing, rebuilt to convert.</h3>
          <p>
            Launching a product or fixing one that isn’t selling? We plan, design and deliver the full set, from the main image
            to the Storefront.
          </p>
          <a href={CALL_URL} target="_blank" rel="noopener noreferrer">
            Book a call →
          </a>
        </div>
        <div className={styles.door}>
          <p className={styles.doorTag}>For agencies</p>
          <h3>Your creative team, on call.</h3>
          <p>
            We work white-label behind Amazon agencies: your brand on the work, your clients stay yours, and the volume flexes
            with your month.
          </p>
          <a href={CALL_URL} target="_blank" rel="noopener noreferrer">
            Talk partnership →
          </a>
        </div>
      </section>

      {/* services */}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <p className={styles.eyebrowDark}>What we make</p>
          <h2 className={styles.h2}>Everything a buyer sees on Amazon.</h2>
        </div>
        <div className={styles.services}>
          {SERVICES.map((s) => (
            <Link key={s.title} href={`/brands/${s.slug}`} className={styles.service}>
              <span className={`${styles.serviceImg} ${s.imgs.length > 1 ? styles.stack : ''}`}>
                {s.imgs.map((im) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={im.src} src={im.src} alt={s.title} loading="lazy" />
                ))}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className={styles.more}>See an example →</span>
            </Link>
          ))}
        </div>
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
