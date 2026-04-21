import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioItems, sectors } from '../data/portfolio'

const WA_SAMPLES = `https://wa.me/923343219844?text=${encodeURIComponent("Hi, I'd like to request print samples from Hi-Tech Printers.")}`
const ease = [0.22, 1, 0.36, 1]

/* Cards that span 2 columns + their aspect ratios */
const WIDE_IDS  = new Set([1, 16])
/* Cards that are portrait (tall) */
const TALL_IDS  = new Set([2, 7, 10])

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ── Film strip — infinite horizontal scroll ───────────────── */
function FilmStrip({ items }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden py-5 my-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0E182A 30%, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0E182A 30%, transparent)' }} />
      <div className="pf-strip flex gap-3" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex-shrink-0 rounded-lg overflow-hidden"
            style={{ width: 84, height: 84, border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <img src={item.imageSrc} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Single portfolio card ─────────────────────────────────── */
function PortfolioCard({ item, index, isWide, isTall, onOpen }) {
  const sectorLabel = sectors.find(s => s.id === item.sector)?.label ?? item.sector
  const aspectRatio  = isWide ? '16/9' : isTall ? '3/4' : '4/3'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.045, 0.32), ease }}
      style={{ gridColumn: isWide ? 'span 2' : 'span 1', aspectRatio }}
    >
      {/* layoutId lives here — this is what morphs into the lightbox */}
      <motion.div
        layoutId={`pf-card-${item.id}`}
        className="relative overflow-hidden rounded-xl cursor-pointer group w-full h-full"
        style={{
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
        }}
        onClick={() => onOpen(item)}
        whileHover={{ borderColor: 'rgba(200,16,46,0.45)', boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,16,46,0.25)' }}
        transition={{ duration: 0.2 }}
      >
        <img
          src={item.imageSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Permanent bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(14,24,42,0.90) 0%, rgba(14,24,42,0.35) 65%, transparent)' }}
        />

        {/* Always-visible minimal label */}
        <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none">
          <span className="text-[9px] font-bold uppercase tracking-[0.17em] block mb-0.5" style={{ color: 'rgba(200,16,46,0.80)' }}>{sectorLabel}</span>
          <p className="text-[12px] font-semibold text-white/80 leading-tight line-clamp-1">{item.title}</p>
        </div>

        {/* Hover overlay — description slides up */}
        <div
          className="absolute inset-0 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,16,28,0.98) 0%, rgba(10,16,28,0.90) 55%, rgba(10,16,28,0.15) 100%)' }}
        >
          <div className="p-4 pb-5">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] block mb-1.5" style={{ color: '#C8102E' }}>{sectorLabel}</span>
            <p className="text-[13px] font-semibold text-white mb-2 leading-snug">{item.title}</p>
            <p className="text-[11px] leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.52)' }}>{item.description}</p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: '#C8102E' }}>
              View full image
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Crimson accent bar — expands from left on hover */}
        <div
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ background: 'linear-gradient(90deg, #C8102E 0%, rgba(126,0,1,0.25) 100%)' }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ── Lightbox ──────────────────────────────────────────────── */
function Lightbox({ item, allItems, onClose, onNavigate }) {
  const currentIndex = allItems.findIndex(i => i.id === item.id)
  const sectorLabel  = sectors.find(s => s.id === item.sector)?.label ?? item.sector
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < allItems.length - 1

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowRight' && hasNext) onNavigate(1)
      if (e.key === 'ArrowLeft'  && hasPrev) onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNavigate, hasPrev, hasNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 lg:p-12"
      style={{ background: 'rgba(6,10,18,0.96)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.60)' }}
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
          className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.60)' }}
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
          className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.60)' }}
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main panel — layoutId matches the card */}
      <motion.div
        layoutId={`pf-card-${item.id}`}
        className="relative rounded-2xl overflow-hidden"
        style={{
          maxWidth: 'min(860px, 88vw)',
          maxHeight: '86vh',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.45, ease }}
      >
        <img
          src={item.imageSrc}
          alt={item.title}
          className="block w-full h-auto"
          style={{ maxHeight: '86vh', objectFit: 'contain' }}
        />

        {/* Info bar at bottom of lightbox */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35, ease }}
          className="absolute inset-x-0 bottom-0 p-5"
          style={{ background: 'linear-gradient(to top, rgba(10,16,28,0.97) 0%, rgba(10,16,28,0.80) 60%, transparent)' }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.20em] block mb-1" style={{ color: '#C8102E' }}>{sectorLabel}</span>
              <p className="text-[15px] font-semibold text-white leading-snug">{item.title}</p>
              <p className="text-[12px] mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.50)' }}>{item.description}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-[10px] uppercase tracking-wider mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {currentIndex + 1} / {allItems.length}
              </div>
              <div className="w-20 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / allItems.length) * 100}%`, background: '#C8102E' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] hidden sm:block"
        style={{ color: 'rgba(255,255,255,0.18)' }}
      >
        ← → to navigate · ESC to close
      </motion.p>
    </motion.div>
  )
}

/* ── Main page ─────────────────────────────────────────────── */
export default function Portfolio() {
  const [activeSector, setActiveSector] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = (
    activeSector === 'all'
      ? portfolioItems
      : portfolioItems.filter(p => p.sector === activeSector)
  ).filter(p => p.imageSrc)

  const mid = Math.ceil(filtered.length / 2)
  const firstHalf  = filtered.slice(0, mid)
  const secondHalf = filtered.slice(mid)

  const openLightbox = useCallback((item) => setSelectedItem(item), [])

  const closeLightbox = useCallback(() => setSelectedItem(null), [])

  const navigateLightbox = useCallback((dir) => {
    setSelectedItem(prev => {
      if (!prev) return null
      const idx  = filtered.findIndex(i => i.id === prev.id)
      const next = filtered[idx + dir]
      return next ?? prev
    })
  }, [filtered])

  const activeLabel = sectors.find(s => s.id === activeSector)?.label ?? 'All Work'

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#0E182A' }}>
      <style>{`
        @keyframes pf-filmroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .pf-strip {
          animation: pf-filmroll 30s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pf-strip { animation: none; }
        }
      `}</style>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative text-white py-20 overflow-hidden">
        <motion.div
          className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,16,46,0.08) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.1, 1], x: [0, 24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.011) 60px,rgba(255,255,255,0.011) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.011) 60px,rgba(255,255,255,0.011) 61px)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: '#C8102E' }}>Our Work</p>
            <h1 className="font-bold leading-[0.92] tracking-tight mb-5 text-white" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}>
              Print<br />
              <span style={{ color: '#C8102E', textShadow: '0 0 80px rgba(200,16,46,0.35)' }}>Portfolio</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: 'rgba(255,255,255,0.42)' }}>
              {filtered.length} print projects — delivered to brands, institutions, and businesses across Karachi.
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,16,46,0.40) 30%, rgba(200,16,46,0.40) 70%, transparent)' }} />
      </section>

      {/* ── Sticky sector filter ─────────────────────────────── */}
      <div
        className="sticky top-16 z-30"
        style={{ background: 'rgba(14,24,42,0.94)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {sectors.map(sec => (
              <motion.button
                key={sec.id}
                onClick={() => setActiveSector(sec.id)}
                aria-pressed={activeSector === sec.id}
                whileTap={{ scale: 0.92 }}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
                style={activeSector === sec.id
                  ? { background: 'rgba(200,16,46,0.18)', color: '#fff', border: '1px solid rgba(200,16,46,0.42)' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.42)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {sec.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.p
            key={activeSector}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-medium uppercase tracking-[0.16em] mb-8"
            style={{ color: 'rgba(255,255,255,0.22)' }}
          >
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}{' '}
            <span style={{ color: 'rgba(255,255,255,0.50)' }}>— {activeLabel}</span>
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* First half */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 items-start" style={{ gridAutoFlow: 'dense' }}>
                {firstHalf.map((item, i) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    index={i}
                    isWide={WIDE_IDS.has(item.id) && activeSector === 'all'}
                    isTall={TALL_IDS.has(item.id)}
                    onOpen={openLightbox}
                  />
                ))}
              </div>

              {/* Film strip — only in "all" view */}
              {activeSector === 'all' && <FilmStrip items={filtered} />}

              {/* Second half */}
              {secondHalf.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-3 lg:mt-4">
                  {secondHalf.map((item, i) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      index={i + mid}
                      isWide={WIDE_IDS.has(item.id) && activeSector === 'all'}
                      isTall={TALL_IDS.has(item.id)}
                      onOpen={openLightbox}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(200,16,46,0.05) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: '#C8102E' }}>Hold It In Your Hands</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              Want to See Print Samples?
            </h2>
            <p className="mb-8 max-w-md mx-auto text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              Visit our press in S.I.T.E or we'll deliver physical samples anywhere in Karachi.
            </p>
            <a
              href={WA_SAMPLES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(37,211,102,0.22)', color: 'rgba(37,211,102,0.78)' }}
            >
              <WhatsAppIcon />
              Request Print Samples
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            key={selectedItem.id}
            item={selectedItem}
            allItems={filtered}
            onClose={closeLightbox}
            onNavigate={navigateLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
