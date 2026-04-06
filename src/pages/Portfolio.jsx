import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, sectors, sectorColors } from '../data/portfolio'

const WA_SAMPLES = `https://wa.me/923343219844?text=${encodeURIComponent("Hi, I'd like to request print samples from Hi-Tech Printers.")}`

const ease = [0.22, 1, 0.36, 1]

const sectorIcon = {
  corporate: '🏢',
  schools:   '🎓',
  pharma:    '💊',
  textile:   '🧵',
  events:    '🎉',
  retail:    '🛍️',
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Portfolio card — uniform grid, golden ratio span for featured ── */
function PortfolioCard({ item, index, featured = false }) {
  const colors = sectorColors[item.sector]
  const sectorLabel = sectors.find((s) => s.id === item.sector)?.label ?? item.sector

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.035, 0.3), ease }}
      className={featured ? 'col-span-2' : 'col-span-1'}
    >
      {item.imageSrc ? (
        <motion.div
          className="group relative overflow-hidden rounded-lg cursor-pointer"
          style={{
            aspectRatio: featured ? '16/9' : '4/3',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
          whileHover={{
            borderColor: 'rgba(126,0,1,0.6)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(126,0,1,0.4)',
            transition: { duration: 0.2 },
          }}
        >
          <img
            src={item.imageSrc}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Thin maroon accent line — always visible at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, #7E0001, rgba(126,0,1,0.2))` }}
          />
        </motion.div>
      ) : (
        <div
          className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center gap-3"
          style={{
            aspectRatio: featured ? '16/9' : '4/3',
            background: `linear-gradient(135deg, ${colors.bg}20 0%, ${colors.bg}08 100%)`,
            border: `1px solid ${colors.bg}25`,
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
            style={{ background: colors.bg + '25', border: `1px solid ${colors.bg}35` }}
          >
            {sectorIcon[item.sector]}
          </div>
          <p className="text-[11px] text-white/30 text-center px-4">Photo coming soon</p>
          <div
            className="absolute inset-x-0 bottom-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, #7E0001, transparent)` }}
          />
        </div>
      )}

      {/* Label row — always visible, below image */}
      <div className="mt-2.5 px-0.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{ color: colors.bg + 'cc' }}
          >
            {sectorLabel}
          </span>
          <p className="text-[13px] font-semibold text-white/75 leading-snug mt-0.5 truncate">
            {item.title}
          </p>
        </div>
        {featured && (
          <span
            className="flex-shrink-0 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ background: 'rgba(126,0,1,0.2)', color: '#c0737380', border: '1px solid rgba(126,0,1,0.3)' }}
          >
            Featured
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeSector, setActiveSector] = useState('all')

  const filtered = activeSector === 'all'
    ? portfolioItems
    : portfolioItems.filter((p) => p.sector === activeSector)

  const activeLabel = sectors.find((s) => s.id === activeSector)?.label ?? 'All Work'

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#0E182A' }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative text-white py-20 overflow-hidden" style={{ background: '#0E182A' }}>
        {/* Ambient orb */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(126,0,1,0.10) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
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
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Our Work</p>
            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-tight mb-5 text-white">
              Portfolio
            </h1>
            <p className="text-white/45 max-w-xl text-lg leading-relaxed">
              Print projects delivered to businesses, schools, and institutions across Karachi.
            </p>
          </motion.div>
        </div>

        {/* Section divider */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.4) 30%, rgba(126,0,1,0.4) 70%, transparent)',
        }} />
      </section>

      {/* ── Sector Filter ─────────────────────────────────────── */}
      <div className="sticky top-16 z-30" style={{
        background: 'rgba(14,24,42,0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {sectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={activeSector === sec.id
                  ? { background: 'rgba(126,0,1,0.25)', color: '#fff', border: '1px solid rgba(126,0,1,0.5)' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Uniform Grid ─────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.p
            key={activeSector}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/30 mb-8"
          >
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} — <span className="text-white/55">{activeLabel}</span>
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              /* 4-col grid; every 5th item (index 4, 9, 14…) spans 2 for golden rhythm */
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
            >
              {filtered.map((item, i) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={i}
                  featured={(i + 1) % 5 === 0}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(37,211,102,0.06) 0%, transparent 60%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Hold It In Your Hands</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              Want to See Print Samples?
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
              Visit our press in S.I.T.E or we'll deliver physical samples anywhere in Karachi.
            </p>
            <a
              href={WA_SAMPLES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl text-white transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.3)',
                color: '#25D366',
                boxShadow: '0 4px 24px rgba(37,211,102,0.15)',
              }}
            >
              <WhatsAppIcon />
              Request Print Samples
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
