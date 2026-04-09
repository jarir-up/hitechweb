import { motion, useInView, animate, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const WHATSAPP_URL = `https://wa.me/923343219844?text=Hello%2C%20I'd%20like%20to%20get%20a%20quote%20from%20Hi-Tech%20Printers.`

/* ── easing ─────────────────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1]

/* ── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.7, ease } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}
const staggerSm = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
}
const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease } },
}

/* ── glass helpers ──────────────────────────────────────────── */
const glass = (a = 0.07, blur = 24) => ({
  background: `rgba(255,255,255,${a})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: '1px solid rgba(255,255,255,0.11)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
})

/* ── CMYK registration mark — Easter egg for press people ───── */
function RegMark({ opacity = 0.07, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      style={{ opacity, color: 'white' }}
    >
      <circle cx="14" cy="14" r="8.5" stroke="currentColor" strokeWidth="0.6" />
      <line x1="14" y1="0" x2="14" y2="28" stroke="currentColor" strokeWidth="0.6" />
      <line x1="0" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  )
}

/* ── data ───────────────────────────────────────────────────── */
const stats = [
  {
    value: '20+',
    count: 20,
    suffix: '+',
    label: 'Years in Business',
    sub: 'Serving Karachi since 2005',
    color: '#7E0001',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: '500+',
    count: 500,
    suffix: '+',
    label: 'Happy Clients',
    sub: 'Corporate, schools & industry',
    color: '#1A3A6B',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    value: '4-Color',
    label: 'Offset Precision',
    sub: 'CMYK registration every run',
    color: '#0D6B6B',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    value: '7+',
    count: 7,
    suffix: '+',
    label: 'Districts Served',
    sub: 'SITE · Korangi · DHA · Clifton',
    color: '#5B2C8D',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const serviceCategories = [
  {
    id: 'corporate',
    icon: '🏢',
    name: 'Corporate Stationery',
    description: 'Business cards, letterheads, envelopes, and notepads branded to your identity.',
    href: '/services',
    accent: '#1A3A6B',
    gradTo: '#0D1F3C',
  },
  {
    id: 'marketing',
    icon: '📣',
    name: 'Marketing & Promo',
    description: 'Brochures, flyers, catalogues, and calendars that drive real results.',
    href: '/services',
    accent: '#0D6B6B',
    gradTo: '#054040',
  },
  {
    id: 'packaging',
    icon: '📦',
    name: 'Packaging & Labels',
    description: 'Custom die-cut packaging and pharma-grade labels for retail and industry.',
    href: '/services',
    accent: '#5B2C8D',
    gradTo: '#3A1A5F',
  },
  {
    id: 'school',
    icon: '🎓',
    name: 'School & Institutional',
    description: 'Registers, notebooks, admission forms, and prospectuses for educators.',
    href: '/services',
    accent: '#1A6B3C',
    gradTo: '#0D3D22',
  },
  {
    id: 'event',
    icon: '🎉',
    name: 'Event & Occasion',
    description: 'Invitations, posters, banners, and programmes for every kind of event.',
    href: '/services',
    accent: '#CC6600',
    gradTo: '#7A3D00',
  },
  {
    id: 'bulk',
    icon: '🖨️',
    name: 'Bulk & Custom',
    description: 'High-volume runs with quantity discounts — fully customised to your spec.',
    href: '/services',
    accent: '#2A2A2A',
    gradTo: '#111111',
  },
]

const portfolioHighlights = [
  { src: '/images/Business card Deck-Hitech Printers-Image 2.webp', client: 'Hi-Tech Printers', type: 'Business Cards' },
  { src: '/images/A4 Brochure Bifold-ICMA Pakistan.webp',           client: 'ICMA Pakistan',   type: 'A4 Bifold Brochure' },
  { src: '/images/A4 Flyer TriFold-Pulevlor.webp',                  client: 'Pulevlor',        type: 'A4 Trifold Flyer' },
  { src: '/images/Diary- Dar e Arqam Schools.webp',                  client: 'Dar e Arqam Schools', type: 'School Diary' },
  { src: '/images/Prospectus Book-Cadet College Karampur.webp',      client: 'Cadet College Karampur', type: 'Admissions Prospectus' },
  { src: '/images/Wedding Cards.webp',                               client: 'Private Client',  type: 'Wedding Cards' },
]

const whyItems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Offset Quality',
    description: 'Professional offset press delivering razor-sharp CMYK registration, vibrant colour, and consistent results — run after run.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Turnaround',
    description: "Standard jobs ready in 2–3 days. Rush 24-hour printing available when your deadline can't wait.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Karachi Delivery',
    description: 'We deliver to SITE, Nazimabad, Korangi, DHA, Clifton, and everywhere in between — on your schedule.',
  },
]

const heroCards = [
  { src: '/images/Business card Deck-Hitech Printers-Image 2.webp', label: 'Business Card Deck',  floatDuration: 7,  delay: 0   },
  { src: '/images/A4 Brochure Bifold-ICMA Pakistan.webp',           label: 'A4 Bifold Brochure', floatDuration: 6,  delay: 1.8 },
]

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Animated counter ───────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 1.8 }) {
  const textRef = useRef(null)  // inner span — direct DOM text mutation
  const inView = useInView(textRef, { once: true, margin: '-60px' })
  const [stamped, setStamped] = useState(false)
  useEffect(() => {
    if (!inView || !textRef.current) return
    const ctrl = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) { if (textRef.current) textRef.current.textContent = Math.round(v) + suffix },
      onComplete() { setStamped(true) },
    })
    return () => ctrl.stop()
  }, [inView, to, suffix, duration])
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      animate={stamped ? { scale: [1, 1.22, 0.93, 1.06, 1] } : {}}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <span ref={textRef}>0{suffix}</span>
    </motion.span>
  )
}

/* ── Section label component ────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
      {children}
    </p>
  )
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  /* ── hero mouse parallax ─────────────────────────────────── */
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), { stiffness: 65, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-9, 9]), { stiffness: 65, damping: 18 })

  function handleHeroMouseMove(e) {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }
  function handleHeroMouseLeave() { mouseX.set(0); mouseY.set(0) }

  return (
    <div className="pt-16">

      {/* ══ 1. HERO ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative bg-[#0E182A] text-white overflow-hidden min-h-[100svh] flex flex-col justify-center"
      >

        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="/images/Business card Deck-Hitech Printers.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.16 }}
            loading="eager"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(110deg, rgba(14,24,42,0.98) 0%, rgba(14,24,42,0.8) 48%, rgba(14,24,42,0.2) 100%)',
          }} />
          <div className="absolute inset-x-0 bottom-0 h-40" style={{
            background: 'linear-gradient(to top, #0E182A, transparent)',
          }} />
        </div>

        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* subtle grid */}
          <div className="absolute inset-0" style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.016) 60px,rgba(255,255,255,0.016) 61px),' +
              'repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.016) 60px,rgba(255,255,255,0.016) 61px)',
          }} />
          <motion.div
            className="absolute -top-40 -right-20 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(126,0,1,0.16) 0%,transparent 65%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(91,44,141,0.13) 0%,transparent 65%)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 80px,rgba(126,0,1,0.03) 80px,rgba(126,0,1,0.03) 81px)',
            }}
            animate={{ backgroundPositionX: ['0px', '160px'] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* CMYK registration marks — Easter egg for press people */}
        <div className="absolute top-5 left-5 pointer-events-none select-none"><RegMark /></div>
        <div className="absolute top-5 right-5 pointer-events-none select-none"><RegMark /></div>
        <div className="absolute bottom-20 left-5 pointer-events-none select-none"><RegMark /></div>
        <div className="absolute bottom-20 right-5 pointer-events-none select-none"><RegMark /></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-10 xl:gap-20 items-center">

            {/* LEFT */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">

              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-7 text-[#FF5555]"
                style={{
                  background: 'rgba(126,0,1,0.13)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(126,0,1,0.28)',
                }}
              >
                <span className="w-1.5 h-1.5 bg-[#FF5555] rounded-full animate-pulse" />
                20+ Years of Precision Offset Printing
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] font-semibold leading-tight tracking-tight mb-7"
              >
                Karachi's
                <br />
                <span
                  className="text-[#7E0001]"
                  style={{ textShadow: '0 0 80px rgba(126,0,1,0.35)' }}
                >
                  Precision
                </span>
                <br />
                Print House
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[17px] text-white/60 mb-10 max-w-[480px] leading-relaxed">
                Delivering sharp, vibrant offset printing since 2005 — trusted by corporate offices, schools, pharma, and textile clients across Karachi.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-white transition-all duration-200 hover:scale-[1.03]"
                  style={glass(0.1, 14)}
                >
                  View Services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:bg-[#1EB854]"
                  style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.4)' }}
                >
                  <WhatsAppIcon />
                  WhatsApp Us Now
                </a>
              </motion.div>

              {/* Process chips — distinct from the stats band below */}
              <motion.div variants={staggerSm} initial="hidden" animate="show" className="flex flex-wrap gap-2">
                {[
                  ['2–3 Day', 'Turnaround'],
                  ['Rush', '24 hr Available'],
                  ['Free', 'Quote'],
                  ['Walk-ins', 'Welcome'],
                ].map(([val, lbl]) => (
                  <motion.div
                    key={lbl}
                    variants={fadeUp}
                    className="flex items-baseline gap-1.5 px-3.5 py-1.5 rounded-full text-sm"
                    style={glass(0.06, 10)}
                    whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                  >
                    <span className="font-black text-white text-[15px]">{val}</span>
                    <span className="text-white/40 text-xs">{lbl}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT: floating product cards */}
            <div style={{ perspective: '900px' }}>
            <motion.div
              className="hidden lg:flex flex-col gap-3 items-center"
              initial={{ opacity: 0, x: 52, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              style={{ rotateX, rotateY, willChange: 'transform' }}
            >
              {heroCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  className="relative rounded-2xl overflow-hidden w-full"
                  style={{
                    ...glass(0.09, 20),
                    boxShadow: '0 28px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                    ...(i === 1 ? { width: '80%', alignSelf: 'flex-end' } : {}),
                  }}
                  animate={{ y: [i === 0 ? -10 : 0, i === 0 ? 0 : -12, i === 0 ? -10 : 0] }}
                  transition={{ duration: card.floatDuration, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
                >
                  <div className="overflow-hidden" style={{ height: i === 0 ? 190 : 150 }}>
                    <img
                      src={card.src}
                      alt={card.label}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.6),transparent)' }} />
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-0.5">Portfolio</div>
                    <div className="text-sm font-bold text-white/90">{card.label}</div>
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/70 mt-1"
                style={glass(0.06, 10)}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" style={{ boxShadow: '0 0 8px rgba(37,211,102,0.9)' }} />
                Based in S.I.T.E, Karachi
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ 2. STATS BAND ════════════════════════════════════ */}
      <section className="py-16" style={{ background: '#0B1220' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="relative rounded-2xl p-6 overflow-hidden group"
                style={glass(0.05, 16)}
                whileHover={{ scale: 1.03, transition: { duration: 0.22 } }}
              >
                {/* top glow line */}
                <div className="absolute inset-x-0 top-0 h-[1px]" style={{
                  background: `linear-gradient(90deg, transparent, ${s.color}80, transparent)`,
                }} />

                {/* ambient color glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${s.color}22 0%, transparent 65%)` }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* pulsing icon */}
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: s.color + '20', color: s.color, border: `1px solid ${s.color}30` }}
                  animate={{ boxShadow: [`0 0 0px ${s.color}00`, `0 0 16px ${s.color}55`, `0 0 0px ${s.color}00`] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
                >
                  {s.icon}
                </motion.div>

                <div className="text-3xl font-black text-white mb-1">
                  {s.count != null
                    ? <Counter to={s.count} suffix={s.suffix} />
                    : s.value
                  }
                </div>
                <div className="text-sm font-semibold text-white/70 mb-0.5">{s.label}</div>
                <div className="text-[11px] text-white/35 leading-snug">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 3. SERVICES PREVIEW ══════════════════════════════ */}
      <section className="py-24" style={{ background: '#0E182A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              What We Print
            </h2>
            <p className="text-white/45 max-w-lg mx-auto text-[15px] leading-relaxed">
              Six specialised categories, one trusted press, all under one roof in SITE, Karachi.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {serviceCategories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className="rounded-2xl overflow-hidden flex flex-col group"
                style={{
                  background: 'rgba(22,32,53,0.7)',
                  backdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px ${cat.accent}55`,
                  transition: { type: 'spring', stiffness: 260, damping: 22 },
                }}
              >
                {/* Gradient header */}
                <div
                  className="relative h-[108px] flex items-center justify-center flex-shrink-0 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${cat.accent} 0%, ${cat.gradTo} 100%)`,
                  }}
                >
                  {/* subtle grid pattern inside header */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.03) 20px,rgba(255,255,255,0.03) 21px)',
                  }} />
                  <motion.span
                    className="relative text-4xl"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))', display: 'inline-block' }}
                    whileHover={{
                      scale: 1.28,
                      rotate: [0, -14, 11, -7, 7, 0],
                      transition: { duration: 0.48, ease: 'easeInOut' },
                    }}
                  >
                    {cat.icon}
                  </motion.span>
                  {/* bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-8" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.15),transparent)' }} />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[15px] font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-sm text-white/45 leading-relaxed flex-1 mb-4">{cat.description}</p>
                  <div className="border-t pt-3 mt-auto" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <Link
                      to={cat.href}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-200 group-hover:gap-3"
                      style={{ color: cat.accent }}
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
            >
              See All 37 Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ 4. PORTFOLIO STRIP ═══════════════════════════════ */}
      <section className="py-24" style={{ background: '#0E182A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <SectionLabel>Our Work</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Work That Speaks
                <br />
                <span className="text-[#7E0001]">For Itself</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors group"
            >
              View Full Portfolio
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            style={{ gridAutoRows: '200px' }}
          >
            {portfolioHighlights.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer${i === 0 ? ' md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? undefined : '4/3' }}
                whileHover="hovered"
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={item.src}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-4"
                  initial={{ opacity: 0 }}
                  variants={{ hovered: { opacity: 1 } }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                  }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-0.5">{item.type}</div>
                  <div className="text-sm font-bold text-white">{item.client}</div>
                </motion.div>

                {/* Always-visible bottom fade on mobile */}
                <div
                  className="absolute inset-x-0 bottom-0 h-16 md:hidden"
                  style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.7),transparent)' }}
                />
                <div className="absolute bottom-0 left-0 p-3 md:hidden">
                  <div className="text-xs font-bold text-white/90">{item.client}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl text-white transition-all duration-200 hover:scale-[1.03]"
              style={glass(0.08, 14)}
            >
              Browse All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ 5. WHY HI-TECH ═══════════════════════════════════ */}
      <section className="py-24 bg-[#0E182A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionLabel>Our Edge</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
              Why Choose Hi-Tech?
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-[15px]">
              Three reasons Karachi's businesses keep coming back, decade after decade.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="relative rounded-2xl p-8 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: '3px solid #7E0001',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.06)',
                  boxShadow: '0 12px 48px rgba(126,0,1,0.18)',
                  transition: { duration: 0.25 },
                }}
              >
                {/* Shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ backgroundPositionX: '-100%' }}
                  whileHover={{ backgroundPositionX: '200%' }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                />

                {/* Ghost ordinal */}
                <span
                  className="absolute top-4 right-4 font-black text-white/[0.04] select-none leading-none"
                  style={{ fontSize: '5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#7E0001] mb-6"
                  style={{ background: 'rgba(126,0,1,0.1)', border: '1px solid rgba(126,0,1,0.18)' }}
                  animate={{ boxShadow: ['0 0 0px rgba(126,0,1,0)', '0 0 20px rgba(126,0,1,0.4)', '0 0 0px rgba(126,0,1,0)'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 1.1 }}
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 6. CTA BANNER ════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 text-white">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="/images/Full Portfolio Landscape for AI.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.22 }}
            loading="lazy"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 50%, rgba(26,0,0,0.85) 100%)',
          }} />
        </div>

        {/* Red radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(126,0,1,0.14) 0%, transparent 70%)',
        }} />

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,transparent,transparent 48px,rgba(255,255,255,0.014) 48px,rgba(255,255,255,0.014) 49px),' +
            'repeating-linear-gradient(90deg,transparent,transparent 48px,rgba(255,255,255,0.014) 48px,rgba(255,255,255,0.014) 49px)',
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Let's Work Together</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-2xl md:text-[2.8rem] font-semibold mb-5 tracking-tight"
            >
              Ready to Print
              <br />
              <span className="text-[#7E0001]">Something Great?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 mb-10 text-lg max-w-md mx-auto leading-relaxed"
            >
              Send your design on WhatsApp — get a quote in minutes. No waiting, no forms.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-10 py-4 rounded-2xl text-[15px] transition-all duration-200"
                style={{ background: '#25D366', boxShadow: '0 8px 36px rgba(37,211,102,0.45)' }}
                whileHover={{ scale: 1.04, backgroundColor: '#1EB854' }}
                whileTap={{ scale: 0.98 }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp Us Now
              </motion.a>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-2xl text-[15px] text-white transition-all duration-200 hover:scale-[1.03]"
                style={glass(0.09, 14)}
              >
                Price Calculator
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Address line */}
            <motion.p variants={fadeUp} className="mt-10 text-white/25 text-sm flex items-center justify-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              D-123/A, S.I.T.E Industrial Area, Near Bawani Chali, Karachi
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
