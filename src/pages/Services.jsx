import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services, categories } from '../data/services'

const WA_BASE = 'https://wa.me/923002050000?text='

function whatsappUrl(productName) {
  return WA_BASE + encodeURIComponent(`Hi, I'd like a quote for ${productName}.`)
}

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.25, ease: 'easeOut' } },
  exit:   { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.18 } },
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
              30 print products across 6 categories — all produced on our Heidelberg GTO 46 offset press.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category Filter Tabs ──────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1.5 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat.id
                    ? 'bg-[#CC0000] text-white shadow-sm'
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

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
                >
                  {/* icon + name */}
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl leading-none mt-0.5">{service.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1A1A] leading-snug">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* specs tags */}
                  <div className="flex flex-wrap gap-2 mb-5 mt-1">
                    {service.specs.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs font-medium bg-[#F5F0EB] text-[#1A1A1A] border border-gray-200 px-2.5 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <a
                      href={whatsappUrl(service.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#CC0000] hover:bg-[#A30000] text-white text-sm font-semibold px-4 py-2.5 rounded transition-colors w-full justify-center"
                    >
                      <WhatsAppIcon />
                      Get Quote on WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
