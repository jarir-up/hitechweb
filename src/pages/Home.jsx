import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const WHATSAPP_URL = `https://wa.me/923343219844?text=Hello%2C%20I'd%20like%20to%20get%20a%20quote%20from%20Hi-Tech%20Printers.`

/* ── animation variants ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

/* ── static data ────────────────────────────────────────────── */
const trustStats = [
  { value: '20+',  label: 'Years in Business' },
  { value: '500+', label: 'Clients Served' },
  { value: 'Offset', label: 'Press Quality' },
  { value: 'Citywide', label: 'Delivery Across Karachi' },
]

const serviceCategories = [
  {
    id: 'corporate',
    icon: '🏢',
    name: 'Corporate Stationery',
    description: 'Business cards, letterheads, envelopes, and notepads branded to your identity.',
    href: '/services',
  },
  {
    id: 'marketing',
    icon: '📣',
    name: 'Marketing & Promo',
    description: 'Brochures, flyers, catalogues, and calendars that drive results.',
    href: '/services',
  },
  {
    id: 'packaging',
    icon: '📦',
    name: 'Packaging & Labels',
    description: 'Custom die-cut packaging and pharma-grade labels for retail and industry.',
    href: '/services',
  },
  {
    id: 'school',
    icon: '🎓',
    name: 'School & Institutional',
    description: 'Registers, notebooks, admission forms, and prospectuses for educational bodies.',
    href: '/services',
  },
  {
    id: 'event',
    icon: '🎉',
    name: 'Event & Occasion',
    description: 'Invitations, posters, banners, and programmes for every kind of event.',
    href: '/services',
  },
  {
    id: 'bulk',
    icon: '🖨️',
    name: 'Bulk & Custom',
    description: 'High-volume runs with quantity discounts — fully customised to your spec.',
    href: '/services',
  },
]

const whyItems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Offset Quality',
    description:
      'Our professional offset press delivers razor-sharp registration, vibrant CMYK colour, and consistent output — run after run.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Turnaround',
    description:
      "Standard jobs turn around in 2\u20133 days. Rush 24-hour printing available when your deadline can't wait.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Karachi Delivery',
    description:
      'We deliver to SITE, Nazimabad, Korangi, DHA, Clifton, and everywhere in between — on schedule.',
  },
]

/* ── WhatsApp SVG icon ──────────────────────────────────────── */
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="pt-16">

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden min-h-[560px] flex items-center">

        {/* animated geometric pattern */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* static grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(255,255,255,0.6) 48px, rgba(255,255,255,0.6) 49px),' +
                'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.6) 48px, rgba(255,255,255,0.6) 49px)',
            }}
          />
          {/* slowly drifting diagonal stripes */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(204,0,0,0.9) 60px, rgba(204,0,0,0.9) 61px)',
            }}
            animate={{ backgroundPositionX: ['0px', '120px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          {/* red corner glow */}
          <div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)' }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            {/* badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-[#CC0000]/20 border border-[#CC0000]/30 text-[#CC0000] text-sm font-medium px-3 py-1.5 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full animate-pulse" />
              20+ Years of Precision Offset Printing
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black leading-tight mb-4"
            >
              Karachi's Precision
              <br />
              <span className="text-[#CC0000]">Print House</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Delivering sharp, vibrant offset printing since 2005 — over 20 years of trusted quality for corporate offices, schools, pharma, and textile clients across Karachi.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-semibold px-6 py-3 rounded transition-colors"
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
                className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#A30000] text-white font-semibold px-6 py-3 rounded transition-colors"
              >
                <WhatsAppIcon />
                WhatsApp Us Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. TRUST BAR ────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-[#CC0000]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center divide-x-0 md:divide-x divide-red-400/40">
            {trustStats.map(({ value, label }) => (
              <div key={label} className="px-4">
                <div className="text-2xl md:text-3xl font-black tracking-tight">{value}</div>
                <div className="text-sm text-red-100 mt-1 leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 3. SERVICES PREVIEW ─────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="py-20 bg-[#F5F0EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
              What We Print
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Full-service offset printing across six specialised categories — all on one press, all under one roof.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {serviceCategories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group flex flex-col"
              >
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#CC0000] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {cat.description}
                </p>
                <Link
                  to={cat.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#CC0000] hover:underline"
                >
                  View Details
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-2 border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              See All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── 4. WHY HI-TECH ──────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
              Why Hi-Tech?
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Three reasons Karachi's businesses keep coming back.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {whyItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 hover:border-[#CC0000]/30 hover:shadow-md transition-all group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#CC0000]/10 text-[#CC0000] mb-5 group-hover:bg-[#CC0000] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── 5. CTA BANNER ───────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="bg-[#CC0000] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Ready to Print?</h2>
          <p className="text-red-100 mb-8 text-lg max-w-lg mx-auto">
            Send us your design on WhatsApp and get a quote in minutes.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#CC0000] hover:bg-red-50 font-bold px-8 py-3.5 rounded transition-colors"
          >
            <WhatsAppIcon />
            WhatsApp Us Now
          </a>
        </div>
      </motion.section>

    </div>
  )
}
