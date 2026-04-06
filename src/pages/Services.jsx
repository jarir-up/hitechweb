import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services, categories } from '../data/services'

const WA_BASE = 'https://wa.me/923343219844?text='

function whatsappUrl(productName) {
  return WA_BASE + encodeURIComponent(`Hi, I'd like a quote for ${productName}.`)
}

const ease = [0.22, 1, 0.36, 1]

/* Category accent colors — mapped to navy palette */
const categoryColor = {
  stationery: '#4B7FCC',
  marketing:  '#4BACC6',
  packaging:  '#9B6ED4',
  school:     '#4BAF7C',
  event:      '#D4924B',
  bulk:       '#8899AA',
}

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Single catalog row ── */
function ServiceRow({ service, index }) {
  const accent = categoryColor[service.category] ?? '#4B7FCC'

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.25), ease }}
      className="group relative flex items-center gap-4 sm:gap-6 py-4 px-4 sm:px-6 transition-all duration-200"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Maroon left border on hover */}
      <div
        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: '#7E0001' }}
      />

      {/* Index number */}
      <span
        className="flex-shrink-0 text-[11px] font-bold tabular-nums w-6 text-right"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon */}
      <span
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg"
        style={{ background: accent + '18', border: `1px solid ${accent}28` }}
      >
        {service.icon}
      </span>

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
          {service.name}
        </p>
        <p className="text-[12px] text-white/35 mt-0.5 leading-snug line-clamp-1 hidden sm:block">
          {service.shortDesc}
        </p>
      </div>

      {/* Spec chips — hidden on small screens */}
      <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[240px] flex-shrink-0">
        {service.specs.slice(0, 3).map((spec) => (
          <span
            key={spec}
            className="text-[10px] px-2 py-0.5 rounded"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <a
        href={whatsappUrl(service.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{
          background: 'rgba(37,211,102,0.10)',
          border: '1px solid rgba(37,211,102,0.22)',
          color: '#25D366',
        }}
      >
        <WhatsAppIcon />
        <span className="hidden sm:inline">Quote</span>
      </a>
    </motion.div>
  )
}

/* ── Category section header ── */
function CategoryHeader({ label, accent, count }) {
  return (
    <div
      className="flex items-center gap-4 py-5 px-4 sm:px-6 mt-8 first:mt-0"
      style={{ borderBottom: `1px solid ${accent}30` }}
    >
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}50, transparent)` }} />
      <span
        className="text-[11px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full"
        style={{
          background: accent + '15',
          border: `1px solid ${accent}35`,
          color: accent,
        }}
      >
        {label}
      </span>
      <span className="text-[11px] text-white/20">{count}</span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}20)` }} />
    </div>
  )
}

export default function Services() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? services
    : services.filter((s) => s.category === active)

  /* Group by category when showing all */
  const grouped = active === 'all'
    ? categories
        .filter((c) => c.id !== 'all')
        .map((cat) => ({
          ...cat,
          items: services.filter((s) => s.category === cat.id),
        }))
        .filter((g) => g.items.length > 0)
    : null

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#0E182A' }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative text-white py-20 overflow-hidden" style={{ background: '#0E182A' }}>
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(126,0,1,0.12) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.012) 60px,rgba(255,255,255,0.012) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.012) 60px,rgba(255,255,255,0.012) 61px)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">What We Print</p>
            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-tight mb-5 text-white">
              Our Services
            </h1>
            <p className="text-white/45 max-w-xl text-lg leading-relaxed">
              37 print products across 6 categories — everything your business needs, under one roof in S.I.T.E Karachi.
            </p>
          </motion.div>
        </div>

        {/* Section divider */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.4) 30%, rgba(126,0,1,0.4) 70%, transparent)',
        }} />
      </section>

      {/* ── Category Filter Tabs ──────────────────────────────── */}
      <div className="sticky top-16 z-30" style={{
        background: 'rgba(14,24,42,0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={active === cat.id
                  ? { background: 'rgba(126,0,1,0.25)', color: '#fff', border: '1px solid rgba(126,0,1,0.5)' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Catalog List ──────────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.p
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/25 mb-6 px-4 sm:px-6"
          >
            {filtered.length} services
          </motion.p>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(22,32,53,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.3)',
            }}
          >
            <AnimatePresence mode="wait">
              {grouped ? (
                /* ── Grouped by category (all tab) ── */
                <motion.div
                  key="grouped"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {grouped.map((group) => {
                    const accent = categoryColor[group.id] ?? '#4B7FCC'
                    let rowOffset = 0
                    grouped.slice(0, grouped.indexOf(group)).forEach(g => { rowOffset += g.items.length })
                    return (
                      <div key={group.id}>
                        <CategoryHeader label={group.label} accent={accent} count={group.items.length} />
                        {group.items.map((service, i) => (
                          <ServiceRow key={service.id} service={service} index={rowOffset + i} />
                        ))}
                      </div>
                    )
                  })}
                </motion.div>
              ) : (
                /* ── Flat filtered list ── */
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {filtered.map((service, i) => (
                    <ServiceRow key={service.id} service={service} index={i} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(126,0,1,0.08) 0%, transparent 60%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Can't Find What You Need?</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              We Print Almost Anything
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
              Don't see your product above? WhatsApp us your specs — we handle custom jobs daily.
            </p>
            <a
              href={`https://wa.me/923343219844?text=${encodeURIComponent("Hi, I need a custom print quote — not in your listed products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: 'rgba(37,211,102,0.10)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
                boxShadow: '0 4px 24px rgba(37,211,102,0.12)',
              }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Ask About Custom Jobs
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
