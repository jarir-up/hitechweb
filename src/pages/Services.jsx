import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services, categories } from '../data/services'

const WA_BASE = 'https://wa.me/923343219844?text='

function whatsappUrl(productName) {
  return WA_BASE + encodeURIComponent(`Hi, I'd like a quote for ${productName}.`)
}

/* Per-category accent colour — used on card top-border and icon tint */
const categoryColor = {
  stationery: '#1A3A6B',
  marketing:  '#0D6B6B',
  packaging:  '#5B2C8D',
  school:     '#1A6B3C',
  event:      '#CC6600',
  bulk:       '#2A2A2A',
}

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ArrowRight({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.22, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

function ServiceCard({ service }) {
  const accent = categoryColor[service.category] ?? '#CC0000'
  const iconBg  = accent + '15'   /* 8% opacity tint */

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col group"
    >
      {/* category accent line */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: accent }} />

      <div className="p-5 flex flex-col flex-1">
        {/* icon + name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: iconBg }}
          >
            {service.icon}
          </div>
          <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug pt-1.5 group-hover:text-[#1A1A1A]">
            {service.name}
          </h3>
        </div>

        {/* description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {service.shortDesc}
        </p>

        {/* spec chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.specs.map((spec) => (
            <span
              key={spec}
              className="text-[11px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-md leading-5"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* WhatsApp CTA — green, compact */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <a
            href={whatsappUrl(service.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1FAD5B] hover:text-[#178046] font-semibold text-[13px] transition-colors group/cta"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Get a Quote
            <ArrowRight className="w-3 h-3 opacity-60 group-hover/cta:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? services
    : services.filter((s) => s.category === active)

  const activeLabel = categories.find((c) => c.id === active)?.label ?? 'All Services'

  return (
    <div className="pt-16 min-h-screen bg-[#F5F0EB]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[#CC0000] text-sm font-semibold uppercase tracking-widest mb-2">
              What We Print
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Our Services</h1>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              37 print products across 6 categories — everything your business needs, under one roof.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter Tabs ──────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Card Grid ─────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* count line */}
          <motion.p
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400 mb-6"
          >
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} in{' '}
            <span className="font-medium text-[#1A1A1A]">{activeLabel}</span>
          </motion.p>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
