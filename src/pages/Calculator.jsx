import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const WA_NUMBER = '923343219844'

// ── Products (sticker first) ─────────────────────────────────────────────
const PRODUCTS = [
  { id: 'sticker',       label: 'Sticker Sheets',  moq: 100 },
  { id: 'business_card', label: 'Business Cards',  moq: 500 },
  { id: 'flyer_a4',      label: 'Flyer A4',        moq: 500 },
  { id: 'flyer_a5',      label: 'Flyer A5',        moq: 500 },
  { id: 'brochure_a4',   label: 'Brochure A4',     moq: 500 },
  { id: 'letterhead',    label: 'Letterhead A4',   moq: 500 },
  { id: 'notepad_a5',    label: 'Notepad A5',      moq: 10  },
]

const QTY_BREAKS = {
  sticker_digital: [100, 200, 500, 1000],
  business_card:   [500, 1000, 2000, 5000],
  flyer_a4:        [500, 1000, 2500, 5000],
  flyer_a5:        [500, 1000, 2500, 5000],
  brochure_a4:     [500, 1000, 2500],
  letterhead:      [500, 1000, 2500, 5000],
  notepad_a5:      [10, 20, 50, 100],
}

const FLYER_PAPERS = [
  { id: 'newspaper', label: 'Newspaper',  addon: -1 },
  { id: '90gsm',     label: '90 GSM',     addon: 0  },
  { id: '113gsm',    label: '113 GSM',    addon: 1  },
  { id: '128gsm',    label: '128 GSM',    addon: 2  },
  { id: '150gsm',    label: '150 GSM',    addon: 3  },
]
const BROCHURE_PAPERS = FLYER_PAPERS.filter(p => p.id !== 'newspaper')

// ── Pricing engine ───────────────────────────────────────────────────────
function calcEstimate(product, qty, cfg) {

  if (product === 'sticker') {
    if (cfg.stickerMode === 'offset') {
      return {
        isCustom: true,
        customNote: 'Offset sticker printing is done on a per-job basis. MOQ 500 sheets — fully custom sizes. Contact us on WhatsApp with your size, qty & design specs for a fast quote.',
      }
    }
    const rate = cfg.stickerSize === 'A4' ? 40 : 20
    return { isCustom: false, perUnit: rate, total: rate * qty, unit: 'per sheet' }
  }

  if (product === 'business_card') {
    if (cfg.bcSides === 'single') {
      let rate
      if (cfg.bcPaper === '300') {
        rate = cfg.bcLam === 'matte' ? 2.75 : 2.30
      } else {
        rate = cfg.bcLam === 'matte' ? 6.00 : 5.00
      }
      return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per card' }
    }
    // double-sided
    const tier = qty >= 1000 ? 1000 : 500
    let rate = tier === 1000 ? 8 : 12    // base: 350 GSM + Matte
    if (cfg.bcPaper === '300') rate -= 1
    if (cfg.bcLam === 'gloss') rate -= 1
    if (cfg.bcSpotUV && tier === 1000) rate += 2
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per card' }
  }

  if (product === 'flyer_a4') {
    const tier = qty >= 1000 ? 1000 : 500
    const base = tier === 1000 ? 6 : 9
    const paper = FLYER_PAPERS.find(p => p.id === cfg.flyerPaper) ?? FLYER_PAPERS[1]
    const rate = base + paper.addon
    const foldCharge = cfg.flyerFold !== 'none' ? 500 : 0
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty) + foldCharge, unit: 'per piece', foldCharge }
  }

  if (product === 'flyer_a5') {
    const tier = qty >= 1000 ? 1000 : 500
    const base = tier === 1000 ? 4 : 8
    const paper = FLYER_PAPERS.find(p => p.id === cfg.flyerPaper) ?? FLYER_PAPERS[1]
    const rate = base + paper.addon
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per piece' }
  }

  if (product === 'brochure_a4') {
    const tier = qty >= 1000 ? 1000 : 500
    const base = tier === 1000 ? 6 : 9
    const paper = BROCHURE_PAPERS.find(p => p.id === cfg.flyerPaper) ?? BROCHURE_PAPERS[0]
    const rate = base + paper.addon
    const foldCharge = cfg.flyerFold !== 'none' ? 500 : 0
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty) + foldCharge, unit: 'per piece', foldCharge }
  }

  if (product === 'letterhead') {
    const tier = qty >= 1000 ? 1000 : 500
    const base = tier === 1000 ? 5 : 8
    const addon = cfg.lhPaper === '100gsm' ? 1 : 0
    const rate = base + addon
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per sheet' }
  }

  if (product === 'notepad_a5') {
    return { isCustom: false, perUnit: 450, total: 450 * qty, unit: 'per pad' }
  }

  return { isCustom: true, customNote: 'Please contact us for a quote.' }
}

// ── WA message ───────────────────────────────────────────────────────────
function buildWAMessage(product, qty, cfg, estimate) {
  const label = PRODUCTS.find(p => p.id === product)?.label || product
  const lines = [
    `Hello! I used the Price Calculator on your website.`,
    ``,
    `*Product:* ${label}`,
    `*Quantity:* ${qty.toLocaleString()}`,
  ]
  if (product === 'sticker') {
    lines.push(`*Mode:* ${cfg.stickerMode === 'digital' ? 'Digital Printing' : 'Offset Printing'}`)
    if (cfg.stickerMode === 'digital') lines.push(`*Size:* ${cfg.stickerSize}`)
  }
  if (product === 'business_card') {
    lines.push(`*Paper:* ${cfg.bcPaper} GSM`)
    lines.push(`*Lamination:* ${cfg.bcLam === 'matte' ? 'Matte' : 'Gloss'}`)
    lines.push(`*Sides:* ${cfg.bcSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
    if (cfg.bcSides === 'double' && cfg.bcSpotUV) lines.push(`*Spot UV:* Yes`)
  }
  if (['flyer_a4', 'flyer_a5', 'brochure_a4'].includes(product)) {
    const papers = product === 'brochure_a4' ? BROCHURE_PAPERS : FLYER_PAPERS
    lines.push(`*Paper:* ${papers.find(p => p.id === cfg.flyerPaper)?.label ?? cfg.flyerPaper}`)
    lines.push(`*Sides:* ${cfg.flyerSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
    if (product !== 'flyer_a5' && cfg.flyerFold !== 'none') {
      lines.push(`*Fold:* ${cfg.flyerFold === 'bifold' ? 'Bi-fold' : 'Tri-fold'}`)
    }
  }
  if (product === 'letterhead') {
    lines.push(`*Paper:* ${cfg.lhPaper === '80gsm' ? '80 GSM Offset' : '100 GSM'}`)
  }
  lines.push(``)
  if (estimate.isCustom) {
    lines.push(`I'd like a custom quote for the above specs.`)
  } else {
    lines.push(`*Estimated Total:* PKR ${estimate.total.toLocaleString()}`)
    lines.push(``)
    lines.push(`Can you confirm the final quote?`)
  }
  return lines.join('\n')
}

// ── UI helpers ───────────────────────────────────────────────────────────
function StepLabel({ n, children }) {
  return (
    <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2 text-sm">
      <span className="w-6 h-6 bg-[#CC0000] text-white text-xs rounded-full flex items-center justify-center font-black shrink-0">
        {n}
      </span>
      {children}
    </h3>
  )
}

function OptBtn({ active, onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
        active
          ? 'bg-[#CC0000] text-white border-[#CC0000]'
          : disabled
          ? 'border-gray-100 text-gray-300 cursor-not-allowed'
          : 'border-gray-200 text-gray-700 hover:border-[#CC0000] hover:text-[#CC0000]'
      }`}
    >
      {children}
    </button>
  )
}

function RadioOpt({ name, value, checked, onChange, label, note }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-[#CC0000] mt-0.5"
      />
      <span className="text-sm text-gray-700">
        {label}
        {note && <span className="text-xs text-gray-400 ml-1.5">({note})</span>}
      </span>
    </label>
  )
}

// ── Main component ───────────────────────────────────────────────────────
export default function Calculator() {
  const [product, setProduct]       = useState('sticker')
  const [qty, setQty]               = useState(100)
  // sticker
  const [stickerMode, setStickerMode] = useState('digital')
  const [stickerSize, setStickerSize] = useState('A5')
  // business card
  const [bcPaper, setBcPaper]   = useState('350')
  const [bcLam,   setBcLam]     = useState('matte')
  const [bcSides, setBcSides]   = useState('double')
  const [bcSpotUV, setBcSpotUV] = useState(false)
  // flyer / brochure
  const [flyerPaper, setFlyerPaper] = useState('90gsm')
  const [flyerSides, setFlyerSides] = useState('single')
  const [flyerFold,  setFlyerFold]  = useState('none')
  // letterhead
  const [lhPaper, setLhPaper] = useState('80gsm')

  function switchProduct(pid) {
    setProduct(pid)
    const p = PRODUCTS.find(x => x.id === pid)
    setQty(p?.moq ?? 500)
    setFlyerFold('none')
    setBcSpotUV(false)
    if (pid === 'sticker') { setStickerMode('digital'); setStickerSize('A5') }
    if (pid === 'brochure_a4') setFlyerPaper('90gsm')
  }

  const cfg = { stickerMode, stickerSize, bcPaper, bcLam, bcSides, bcSpotUV, flyerPaper, flyerSides, flyerFold, lhPaper }

  const estimate = useMemo(
    () => calcEstimate(product, qty, cfg),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, qty, stickerMode, stickerSize, bcPaper, bcLam, bcSides, bcSpotUV, flyerPaper, flyerSides, flyerFold, lhPaper]
  )

  const isOffsetSticker = product === 'sticker' && stickerMode === 'offset'
  const qtyKey = product === 'sticker' ? 'sticker_digital' : product
  const qtyBreaks = isOffsetSticker ? [] : (QTY_BREAKS[qtyKey] ?? [500, 1000])
  const moq = isOffsetSticker ? 500 : (PRODUCTS.find(p => p.id === product)?.moq ?? 500)

  const waMessage = buildWAMessage(product, qty, cfg, estimate)
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="pt-16 min-h-screen bg-[#F5F0EB]">

      {/* Header */}
      <section className="bg-[#1A1A1A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-[#CC0000] text-sm font-semibold uppercase tracking-wider mb-2">Pricing Tool</div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Print Calculator</h1>
            <p className="text-gray-400 max-w-xl text-lg">
              Get a ballpark estimate instantly. Final pricing confirmed via WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Left: option panels ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* ① Product type */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <StepLabel n={1}>Product Type</StepLabel>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => switchProduct(p.id)}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        product === p.id
                          ? 'bg-[#CC0000] text-white border-[#CC0000]'
                          : 'border-gray-200 text-gray-700 hover:border-[#CC0000] hover:text-[#CC0000]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ─────────── STICKER ─────────── */}
              {product === 'sticker' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={2}>Print Mode</StepLabel>
                    <div className="space-y-2.5">
                      <RadioOpt
                        name="stickerMode" value="digital"
                        checked={stickerMode === 'digital'}
                        onChange={() => { setStickerMode('digital'); setQty(100) }}
                        label="Digital Printing"
                        note="A4 & A5 sizes · MOQ 100 sheets · instant pricing"
                      />
                      <RadioOpt
                        name="stickerMode" value="offset"
                        checked={stickerMode === 'offset'}
                        onChange={() => { setStickerMode('offset'); setQty(500) }}
                        label="Offset Printing"
                        note="fully custom sizes · MOQ 500 · custom quote"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Glossy finish only. All designs accepted.</p>
                  </div>

                  {stickerMode === 'digital' && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={3}>Sheet Size</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={stickerSize === 'A5'} onClick={() => setStickerSize('A5')}>
                          A5 — PKR 20 / sheet
                        </OptBtn>
                        <OptBtn active={stickerSize === 'A4'} onClick={() => setStickerSize('A4')}>
                          A4 — PKR 40 / sheet
                        </OptBtn>
                      </div>
                    </div>
                  )}

                  {stickerMode === 'offset' && (
                    <div className="bg-[#F5F0EB] border border-dashed border-gray-300 rounded-xl p-5">
                      <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Offset stickers — custom quote</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Significantly lower per-unit cost at 500+ qty. Sizes are fully custom.
                        Hit the button below and send us your size, quantity, and design — we'll quote back fast.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* ─────────── BUSINESS CARDS ─────────── */}
              {product === 'business_card' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={2}>Paper Stock</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={bcPaper === '350'} onClick={() => setBcPaper('350')}>350 GSM</OptBtn>
                      <OptBtn active={bcPaper === '300'} onClick={() => setBcPaper('300')}>300 GSM</OptBtn>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">350 GSM is premium — stiffer, better feel.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={3}>Lamination</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="bcLam" value="matte" checked={bcLam === 'matte'} onChange={() => setBcLam('matte')} label="Matte" />
                        <RadioOpt name="bcLam" value="gloss" checked={bcLam === 'gloss'} onChange={() => setBcLam('gloss')} label="Gloss" note="-1 PKR/card" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={4}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="bcSides" value="double" checked={bcSides === 'double'} onChange={() => setBcSides('double')} label="Double-sided" />
                        <RadioOpt name="bcSides" value="single" checked={bcSides === 'single'} onChange={() => { setBcSides('single'); setBcSpotUV(false) }} label="Single-sided" />
                      </div>
                    </div>
                  </div>

                  {bcSides === 'double' && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={5}>Spot UV Coating</StepLabel>
                      <label className={`flex items-start gap-3 cursor-pointer ${qty < 1000 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <input
                          type="checkbox"
                          checked={bcSpotUV}
                          disabled={qty < 1000}
                          onChange={e => setBcSpotUV(e.target.checked)}
                          className="accent-[#CC0000] w-4 h-4 mt-0.5"
                        />
                        <span className="text-sm text-gray-700">
                          Add Spot UV
                          <span className="block text-xs text-gray-400 mt-0.5">+PKR 2/card · available at 1,000+ qty only</span>
                        </span>
                      </label>
                    </div>
                  )}
                </>
              )}

              {/* ─────────── FLYER A4 ─────────── */}
              {product === 'flyer_a4' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={2}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {FLYER_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">No finishing available on flyers. Up to 4-colour CMYK.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={3}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="flySides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                        <RadioOpt name="flySides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={4}>Fold Style</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="flyFold" value="none"     checked={flyerFold === 'none'}     onChange={() => setFlyerFold('none')}     label="No Fold" />
                        <RadioOpt name="flyFold" value="bifold"   checked={flyerFold === 'bifold'}   onChange={() => setFlyerFold('bifold')}   label="Bi-fold"   note="+PKR 500 flat" />
                        <RadioOpt name="flyFold" value="trifold"  checked={flyerFold === 'trifold'}  onChange={() => setFlyerFold('trifold')}  label="Tri-fold"  note="+PKR 500 flat" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─────────── FLYER A5 ─────────── */}
              {product === 'flyer_a5' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={2}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {FLYER_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">No finishing. Up to 4-colour CMYK.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={3}>Print Sides</StepLabel>
                    <div className="flex gap-6">
                      <RadioOpt name="flySidesA5" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                      <RadioOpt name="flySidesA5" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                    </div>
                  </div>
                </>
              )}

              {/* ─────────── BROCHURE A4 ─────────── */}
              {product === 'brochure_a4' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={2}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {BROCHURE_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Minimum 90 GSM for brochures. Up to 4-colour CMYK.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={3}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="broSides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                        <RadioOpt name="broSides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={4}>Fold Style</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="broFold" value="none"     checked={flyerFold === 'none'}     onChange={() => setFlyerFold('none')}     label="No Fold" />
                        <RadioOpt name="broFold" value="bifold"   checked={flyerFold === 'bifold'}   onChange={() => setFlyerFold('bifold')}   label="Bi-fold"   note="+PKR 500 flat" />
                        <RadioOpt name="broFold" value="trifold"  checked={flyerFold === 'trifold'}  onChange={() => setFlyerFold('trifold')}  label="Tri-fold"  note="+PKR 500 flat" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─────────── LETTERHEAD ─────────── */}
              {product === 'letterhead' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={2}>Paper Stock</StepLabel>
                  <div className="flex gap-2">
                    <OptBtn active={lhPaper === '80gsm'}  onClick={() => setLhPaper('80gsm')}>80 GSM Offset</OptBtn>
                    <OptBtn active={lhPaper === '100gsm'} onClick={() => setLhPaper('100gsm')}>100 GSM</OptBtn>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Single-sided only. Up to 4-colour CMYK. No finishing.</p>
                </div>
              )}

              {/* ─────────── NOTEPAD ─────────── */}
              {product === 'notepad_a5' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={2}>Specifications</StepLabel>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Paper: 70 GSM</li>
                    <li>• Pages: 100 per pad (standard)</li>
                    <li>• Size: A5</li>
                    <li>• Rate: PKR 450 per pad</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    For custom page counts, sizes or covers — request a quote on WhatsApp.
                  </p>
                </div>
              )}

              {/* ─────────── QUANTITY ─────────── */}
              {!isOffsetSticker && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={product === 'sticker' ? 4 : product === 'business_card' && bcSides === 'double' ? 6 : product === 'letterhead' || product === 'notepad_a5' ? 3 : product === 'flyer_a5' ? 4 : 5}>
                    Quantity
                  </StepLabel>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {qtyBreaks.map(q => (
                      <button
                        key={q}
                        onClick={() => setQty(q)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                          qty === q
                            ? 'bg-[#CC0000] text-white border-[#CC0000]'
                            : 'border-gray-200 text-gray-700 hover:border-[#CC0000]'
                        }`}
                      >
                        {q.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={qty}
                      min={moq}
                      max={100000}
                      step={product === 'notepad_a5' ? 10 : 100}
                      onChange={e => setQty(Math.max(moq, parseInt(e.target.value) || moq))}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-32 focus:outline-none focus:border-[#CC0000]"
                    />
                    <span className="text-sm text-gray-500">custom (min {moq.toLocaleString()})</span>
                  </div>
                </div>
              )}

            </div>

            {/* ── Right: estimate panel ── */}
            <div className="lg:col-span-1">
              <div className="bg-[#1A1A1A] text-white rounded-xl p-6 shadow-sm sticky top-24">
                <div className="text-[#CC0000] text-xs font-semibold uppercase tracking-wider mb-4">Your Estimate</div>

                {estimate.isCustom ? (
                  <div className="mb-6">
                    <div className="text-gray-400 text-sm mb-2">{PRODUCTS.find(p => p.id === product)?.label}</div>
                    <div className="text-2xl font-black text-white mb-3">Custom Quote</div>
                    <p className="text-sm text-gray-400 leading-relaxed">{estimate.customNote}</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-gray-400 text-sm mb-1">{PRODUCTS.find(p => p.id === product)?.label}</div>
                    <div className="text-4xl font-black text-white mb-1">
                      PKR {estimate.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      ≈ PKR {Number(estimate.perUnit).toFixed(2)} {estimate.unit}
                    </div>
                    {estimate.foldCharge > 0 && (
                      <div className="text-xs text-[#CC0000] mt-1">incl. PKR 500 fold surcharge</div>
                    )}
                  </div>
                )}

                {!estimate.isCustom && (
                  <div className="space-y-2 text-sm border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quantity</span>
                      <span>{qty.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Per unit</span>
                      <span>PKR {Number(estimate.perUnit).toFixed(2)}</span>
                    </div>
                    {product === 'business_card' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paper</span>
                          <span>{bcPaper} GSM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lam</span>
                          <span className="capitalize">{bcLam}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sides</span>
                          <span className="capitalize">{bcSides}</span>
                        </div>
                        {bcSides === 'double' && bcSpotUV && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Spot UV</span>
                            <span>Yes</span>
                          </div>
                        )}
                      </>
                    )}
                    {['flyer_a4', 'flyer_a5', 'brochure_a4'].includes(product) && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paper</span>
                          <span>{(product === 'brochure_a4' ? BROCHURE_PAPERS : FLYER_PAPERS).find(p => p.id === flyerPaper)?.label}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sides</span>
                          <span className="capitalize">{flyerSides}</span>
                        </div>
                        {product !== 'flyer_a5' && flyerFold !== 'none' && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Fold</span>
                            <span className="capitalize">{flyerFold}</span>
                          </div>
                        )}
                      </>
                    )}
                    {product === 'letterhead' && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Paper</span>
                        <span>{lhPaper === '80gsm' ? '80 GSM Offset' : '100 GSM'}</span>
                      </div>
                    )}
                  </div>
                )}

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#CC0000] hover:bg-[#A30000] text-white font-bold px-4 py-3 rounded-lg transition-colors mb-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {estimate.isCustom ? 'Request Custom Quote' : 'Confirm Quote on WhatsApp'}
                </a>
                <p className="text-xs text-gray-500 text-center">
                  Estimates exclude delivery & taxes. Confirmed by our team.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
