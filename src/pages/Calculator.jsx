import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const WA_NUMBER = '923343219844'

// ── Product groups ────────────────────────────────────────────────────────
const INSTAGRAM_PRODUCTS = [
  { id: 'thank_you_card', label: 'Thank You Cards', moq: 100, badge: 'Top Pick' },
  { id: 'sticker_label',  label: 'Sticker Labels',  moq: 100, badge: 'New' },
  { id: 'hang_tag',       label: 'Hang Tags',        moq: 100, badge: 'New' },
  { id: 'sticker',        label: 'Sticker Sheets',   moq: 100 },
]

const BUSINESS_PRODUCTS = [
  { id: 'business_card',   label: 'Business Cards',    moq: 500 },
  { id: 'flyer_a4',        label: 'Flyer A4',           moq: 500 },
  { id: 'flyer_a5',        label: 'Flyer A5',           moq: 500 },
  { id: 'brochure_a4',     label: 'Brochure A4',        moq: 500 },
  { id: 'compliment_slip', label: 'Compliment Slips',   moq: 500 },
  { id: 'letterhead',      label: 'Letterhead A4',      moq: 500 },
  { id: 'ncr_form',        label: 'NCR Forms',          moq: 100 },
  { id: 'certificate',     label: 'Certificates',       moq: 100 },
  { id: 'envelope',        label: 'Envelopes',          moq: 500 },
  { id: 'notepad_a5',      label: 'Notepad A5',         moq: 10  },
]

const ALL_PRODUCTS = [...INSTAGRAM_PRODUCTS, ...BUSINESS_PRODUCTS]

// ── Slider configs per product ────────────────────────────────────────────
const SLIDER_CONFIG = {
  thank_you_card:  { min: 100,  max: 2000, step: 50  },
  sticker_label:   { min: 100,  max: 2000, step: 50  },
  hang_tag:        { min: 100,  max: 2000, step: 50  },
  sticker:         { min: 100,  max: 2000, step: 100 },
  business_card:   { min: 500,  max: 5000, step: 500 },
  flyer_a4:        { min: 500,  max: 5000, step: 500 },
  flyer_a5:        { min: 500,  max: 5000, step: 500 },
  brochure_a4:     { min: 500,  max: 2500, step: 500 },
  compliment_slip: { min: 500,  max: 5000, step: 500 },
  letterhead:      { min: 500,  max: 5000, step: 500 },
  ncr_form:        { min: 100,  max: 1000, step: 50  },
  certificate:     { min: 100,  max: 1000, step: 50  },
  envelope:        { min: 500,  max: 2500, step: 500 },
  notepad_a5:      { min: 10,   max: 100,  step: 10  },
}

const FLYER_PAPERS = [
  { id: 'newspaper', label: 'Newspaper',  addon: -1 },
  { id: '90gsm',     label: '90 GSM',     addon: 0  },
  { id: '113gsm',    label: '113 GSM',    addon: 1  },
  { id: '128gsm',    label: '128 GSM',    addon: 2  },
  { id: '150gsm',    label: '150 GSM',    addon: 3  },
]
const BROCHURE_PAPERS = FLYER_PAPERS.filter(p => p.id !== 'newspaper')

// ── Dispatch date (4 working days, skip Sundays) ──────────────────────────
function getDispatchDate() {
  const d = new Date()
  let added = 0
  while (added < 4) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) added++
  }
  return d.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' })
}

// ── Pricing engine ────────────────────────────────────────────────────────
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
    const tier = qty >= 1000 ? 1000 : 500
    let rate = tier === 1000 ? 8 : 12
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

  if (product === 'thank_you_card') {
    let rate
    if (cfg.tcSides === 'single') {
      rate = qty >= 1000 ? 2.2 : qty >= 500 ? 2.8 : 4.0
      if (cfg.tcLam === 'gloss') rate -= 0.5
    } else {
      rate = qty >= 1000 ? 3.5 : qty >= 500 ? 4.5 : 6.5
      if (cfg.tcLam === 'gloss') rate -= 0.8
    }
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per card' }
  }

  if (product === 'sticker_label') {
    const sizes = { '3cm': [18, 12], '5cm': [25, 16], '7cm': [35, 22] }
    const [hi, lo] = sizes[cfg.slSize] || sizes['5cm']
    let rate = qty >= 500 ? lo : hi
    if (cfg.slMaterial === 'vinyl') rate = Math.round(rate * 1.5)
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per sticker' }
  }

  if (product === 'hang_tag') {
    const rate = cfg.htMaterial === 'kraft'
      ? (qty >= 500 ? 6 : qty >= 250 ? 8 : 12)
      : (qty >= 500 ? 5 : qty >= 250 ? 7 : 10)
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per tag' }
  }

  if (product === 'compliment_slip') {
    const rate = cfg.csSides === 'single'
      ? (qty >= 1000 ? 1.8 : 2.5)
      : (qty >= 1000 ? 2.5 : 3.5)
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per slip' }
  }

  if (product === 'ncr_form') {
    const base = cfg.ncrParts === '2'
      ? (qty >= 500 ? 18 : qty >= 250 ? 25 : 35)
      : (qty >= 500 ? 25 : qty >= 250 ? 35 : 50)
    const rate = cfg.ncrSize === 'a4' ? Math.round(base * 1.3) : base
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per set' }
  }

  if (product === 'certificate') {
    let rate = qty >= 500 ? 13 : qty >= 250 ? 18 : 25
    if (cfg.certBorder === 'gold') rate += 5
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per certificate' }
  }

  if (product === 'envelope') {
    let rate = cfg.envSize === 'DL'
      ? (qty >= 2500 ? 10 : qty >= 1000 ? 13 : 18)
      : (qty >= 1000 ? 18 : 25)
    if (cfg.envSides === 'double') rate = Math.round(rate * 1.3)
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per envelope' }
  }

  return { isCustom: true, customNote: 'Please contact us for a quote.' }
}

// ── WA message builder ────────────────────────────────────────────────────
function buildWAMessage(product, qty, cfg, estimate) {
  const label = ALL_PRODUCTS.find(p => p.id === product)?.label || product
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
  if (product === 'thank_you_card') {
    lines.push(`*Sides:* ${cfg.tcSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
    lines.push(`*Lamination:* ${cfg.tcLam === 'matte' ? 'Matte' : 'Gloss'}`)
  }
  if (product === 'sticker_label') {
    lines.push(`*Shape:* ${cfg.slShape === 'round' ? 'Round' : 'Oval'}`)
    lines.push(`*Size:* ${cfg.slSize} diameter`)
    lines.push(`*Material:* ${cfg.slMaterial === 'paper' ? 'Paper (standard)' : 'Vinyl (waterproof)'}`)
  }
  if (product === 'hang_tag') {
    lines.push(`*Material:* ${cfg.htMaterial === 'kraft' ? 'Kraft paper' : 'Coated card'}`)
  }
  if (product === 'compliment_slip') {
    lines.push(`*Sides:* ${cfg.csSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
  }
  if (product === 'ncr_form') {
    lines.push(`*Size:* ${cfg.ncrSize.toUpperCase()}`)
    lines.push(`*Parts:* ${cfg.ncrParts}-part`)
  }
  if (product === 'certificate') {
    lines.push(`*Border:* ${cfg.certBorder === 'gold' ? 'Gold printed border' : 'No border'}`)
  }
  if (product === 'envelope') {
    lines.push(`*Size:* ${cfg.envSize}`)
    lines.push(`*Sides:* ${cfg.envSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
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

// ── UI helpers ────────────────────────────────────────────────────────────
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
          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
          : disabled
          ? 'border-gray-100 text-gray-300 cursor-not-allowed'
          : 'border-gray-200 text-gray-700 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
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

function QtySlider({ value, onChange, min, max, step }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-4xl font-black text-[#1A1A1A] tabular-nums">{value.toLocaleString()}</span>
        <span className="text-sm text-gray-400">pieces</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#CC0000] bg-gray-200"
          style={{
            background: `linear-gradient(to right, #CC0000 ${pct}%, #E5E7EB ${pct}%)`
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1.5">
        <span>MOQ {min.toLocaleString()}</span>
        <span>{max.toLocaleString()}+</span>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function Calculator() {
  const [product, setProduct] = useState('thank_you_card')
  const [qty, setQty]         = useState(100)

  // sticker sheets
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
  // thank you card
  const [tcSides, setTcSides] = useState('double')
  const [tcLam,   setTcLam]   = useState('matte')
  // sticker labels
  const [slShape,    setSlShape]    = useState('round')
  const [slSize,     setSlSize]     = useState('5cm')
  const [slMaterial, setSlMaterial] = useState('paper')
  // hang tags
  const [htMaterial, setHtMaterial] = useState('kraft')
  // compliment slips
  const [csSides, setCsSides] = useState('single')
  // ncr forms
  const [ncrSize,  setNcrSize]  = useState('a5')
  const [ncrParts, setNcrParts] = useState('2')
  // certificates
  const [certBorder, setCertBorder] = useState('none')
  // envelopes
  const [envSize,  setEnvSize]  = useState('DL')
  const [envSides, setEnvSides] = useState('single')

  const dispatchDate = useMemo(() => getDispatchDate(), [])

  function switchProduct(pid) {
    setProduct(pid)
    const p = ALL_PRODUCTS.find(x => x.id === pid)
    setQty(p?.moq ?? 500)
    setFlyerFold('none')
    setBcSpotUV(false)
    if (pid === 'sticker') { setStickerMode('digital'); setStickerSize('A5') }
    if (pid === 'brochure_a4') setFlyerPaper('90gsm')
  }

  const cfg = {
    stickerMode, stickerSize,
    bcPaper, bcLam, bcSides, bcSpotUV,
    flyerPaper, flyerSides, flyerFold,
    lhPaper,
    tcSides, tcLam,
    slShape, slSize, slMaterial,
    htMaterial,
    csSides,
    ncrSize, ncrParts,
    certBorder,
    envSize, envSides,
  }

  const estimate = useMemo(
    () => calcEstimate(product, qty, cfg),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, qty, stickerMode, stickerSize, bcPaper, bcLam, bcSides, bcSpotUV,
     flyerPaper, flyerSides, flyerFold, lhPaper, tcSides, tcLam,
     slShape, slSize, slMaterial, htMaterial, csSides, ncrSize, ncrParts,
     certBorder, envSize, envSides]
  )

  const isOffsetSticker = product === 'sticker' && stickerMode === 'offset'
  const sliderCfg = SLIDER_CONFIG[product] ?? { min: 500, max: 5000, step: 500 }
  const moq = isOffsetSticker ? 500 : (ALL_PRODUCTS.find(p => p.id === product)?.moq ?? 500)

  const waMessage = buildWAMessage(product, qty, cfg, estimate)
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`

  // step counter helper
  let stepN = 1
  const nextStep = () => stepN++

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

              {/* ① Product selector */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <StepLabel n={nextStep()}>What are you printing?</StepLabel>

                {/* Instagram group */}
                <p className="text-xs font-semibold text-[#1A6B3C] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B3C] inline-block" />
                  Popular · Instagram &amp; eCommerce
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                  {INSTAGRAM_PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => switchProduct(p.id)}
                      className={`relative text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        product === p.id
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'border-gray-200 text-gray-700 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {p.badge && (
                        <span className="absolute -top-2 -right-1 bg-[#CC0000] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                          {p.badge}
                        </span>
                      )}
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Business group */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2.5">Business &amp; Corporate</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {BUSINESS_PRODUCTS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => switchProduct(p.id)}
                        className={`text-left px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          product === p.id
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ─── THANK YOU CARDS ─── */}
              {product === 'thank_you_card' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="tcSides" value="double" checked={tcSides === 'double'} onChange={() => setTcSides('double')} label="Double-sided" note="message on back" />
                        <RadioOpt name="tcSides" value="single" checked={tcSides === 'single'} onChange={() => setTcSides('single')} label="Single-sided" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Lamination</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="tcLam" value="matte" checked={tcLam === 'matte'} onChange={() => setTcLam('matte')} label="Matte" note="premium feel" />
                        <RadioOpt name="tcLam" value="gloss" checked={tcLam === 'gloss'} onChange={() => setTcLam('gloss')} label="Gloss" note="-0.5 PKR/card" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F5F0EB] rounded-xl p-4 text-xs text-gray-500">
                    A6 size (105×148mm) · 300 GSM coated card · CMYK full colour both sides
                  </div>
                </>
              )}

              {/* ─── STICKER LABELS ─── */}
              {product === 'sticker_label' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Shape</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={slShape === 'round'} onClick={() => setSlShape('round')}>Round</OptBtn>
                      <OptBtn active={slShape === 'oval'}  onClick={() => setSlShape('oval')}>Oval</OptBtn>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Size</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="slSize" value="3cm" checked={slSize === '3cm'} onChange={() => setSlSize('3cm')} label="3 cm" note="small seal size" />
                        <RadioOpt name="slSize" value="5cm" checked={slSize === '5cm'} onChange={() => setSlSize('5cm')} label="5 cm" note="most popular" />
                        <RadioOpt name="slSize" value="7cm" checked={slSize === '7cm'} onChange={() => setSlSize('7cm')} label="7 cm" note="large label" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Material</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="slMat" value="paper"  checked={slMaterial === 'paper'}  onChange={() => setSlMaterial('paper')}  label="Paper (standard)" />
                        <RadioOpt name="slMat" value="vinyl"  checked={slMaterial === 'vinyl'}  onChange={() => setSlMaterial('vinyl')}  label="Vinyl — waterproof" note="+50% · for jars & bottles" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─── HANG TAGS ─── */}
              {product === 'hang_tag' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Material</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={htMaterial === 'kraft'} onClick={() => setHtMaterial('kraft')}>Kraft Paper</OptBtn>
                      <OptBtn active={htMaterial === 'coated'} onClick={() => setHtMaterial('coated')}>Coated Card</OptBtn>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">All hang tags include hole punch. Full CMYK colour. String not included.</p>
                  </div>
                </>
              )}

              {/* ─── STICKER SHEETS ─── */}
              {product === 'sticker' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Print Mode</StepLabel>
                    <div className="space-y-2.5">
                      <RadioOpt name="stickerMode" value="digital" checked={stickerMode === 'digital'} onChange={() => { setStickerMode('digital'); setQty(100) }} label="Digital Printing" note="A4 & A5 · MOQ 100 · instant pricing" />
                      <RadioOpt name="stickerMode" value="offset"  checked={stickerMode === 'offset'}  onChange={() => { setStickerMode('offset');  setQty(500) }} label="Offset Printing"  note="custom sizes · MOQ 500 · custom quote" />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Glossy finish only. All designs accepted.</p>
                  </div>
                  {stickerMode === 'digital' && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Sheet Size</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={stickerSize === 'A5'} onClick={() => setStickerSize('A5')}>A5 — PKR 20 / sheet</OptBtn>
                        <OptBtn active={stickerSize === 'A4'} onClick={() => setStickerSize('A4')}>A4 — PKR 40 / sheet</OptBtn>
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

              {/* ─── BUSINESS CARDS ─── */}
              {product === 'business_card' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Paper Stock</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={bcPaper === '350'} onClick={() => setBcPaper('350')}>350 GSM</OptBtn>
                      <OptBtn active={bcPaper === '300'} onClick={() => setBcPaper('300')}>300 GSM</OptBtn>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">350 GSM is premium — stiffer, better feel.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Lamination</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="bcLam" value="matte" checked={bcLam === 'matte'} onChange={() => setBcLam('matte')} label="Matte" />
                        <RadioOpt name="bcLam" value="gloss" checked={bcLam === 'gloss'} onChange={() => setBcLam('gloss')} label="Gloss" note="-1 PKR/card" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="bcSides" value="double" checked={bcSides === 'double'} onChange={() => setBcSides('double')} label="Double-sided" />
                        <RadioOpt name="bcSides" value="single" checked={bcSides === 'single'} onChange={() => { setBcSides('single'); setBcSpotUV(false) }} label="Single-sided" />
                      </div>
                    </div>
                  </div>
                  {bcSides === 'double' && (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Spot UV Coating</StepLabel>
                      <label className={`flex items-start gap-3 cursor-pointer ${qty < 1000 ? 'opacity-50 pointer-events-none' : ''}`}>
                        <input type="checkbox" checked={bcSpotUV} disabled={qty < 1000} onChange={e => setBcSpotUV(e.target.checked)} className="accent-[#CC0000] w-4 h-4 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          Add Spot UV
                          <span className="block text-xs text-gray-400 mt-0.5">+PKR 2/card · available at 1,000+ qty only</span>
                        </span>
                      </label>
                    </div>
                  )}
                </>
              )}

              {/* ─── FLYER A4 ─── */}
              {product === 'flyer_a4' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {FLYER_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="flySides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                        <RadioOpt name="flySides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Fold Style</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="flyFold" value="none"    checked={flyerFold === 'none'}    onChange={() => setFlyerFold('none')}    label="No Fold" />
                        <RadioOpt name="flyFold" value="bifold"  checked={flyerFold === 'bifold'}  onChange={() => setFlyerFold('bifold')}  label="Bi-fold"  note="+PKR 500 flat" />
                        <RadioOpt name="flyFold" value="trifold" checked={flyerFold === 'trifold'} onChange={() => setFlyerFold('trifold')} label="Tri-fold" note="+PKR 500 flat" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─── FLYER A5 ─── */}
              {product === 'flyer_a5' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {FLYER_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Print Sides</StepLabel>
                    <div className="flex gap-6">
                      <RadioOpt name="flySidesA5" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                      <RadioOpt name="flySidesA5" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                    </div>
                  </div>
                </>
              )}

              {/* ─── BROCHURE A4 ─── */}
              {product === 'brochure_a4' && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <StepLabel n={nextStep()}>Paper Stock</StepLabel>
                    <div className="flex flex-wrap gap-2">
                      {BROCHURE_PAPERS.map(p => (
                        <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Min 90 GSM for brochures. Full CMYK.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="broSides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                        <RadioOpt name="broSides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Fold Style</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="broFold" value="none"    checked={flyerFold === 'none'}    onChange={() => setFlyerFold('none')}    label="No Fold" />
                        <RadioOpt name="broFold" value="bifold"  checked={flyerFold === 'bifold'}  onChange={() => setFlyerFold('bifold')}  label="Bi-fold"  note="+PKR 500 flat" />
                        <RadioOpt name="broFold" value="trifold" checked={flyerFold === 'trifold'} onChange={() => setFlyerFold('trifold')} label="Tri-fold" note="+PKR 500 flat" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─── COMPLIMENT SLIPS ─── */}
              {product === 'compliment_slip' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={nextStep()}>Print Sides</StepLabel>
                  <div className="flex gap-6">
                    <RadioOpt name="csSides" value="single" checked={csSides === 'single'} onChange={() => setCsSides('single')} label="Single-sided" />
                    <RadioOpt name="csSides" value="double" checked={csSides === 'double'} onChange={() => setCsSides('double')} label="Double-sided" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3">DL size (99×210mm) · 80 GSM offset · full CMYK</p>
                </div>
              )}

              {/* ─── LETTERHEAD ─── */}
              {product === 'letterhead' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={nextStep()}>Paper Stock</StepLabel>
                  <div className="flex gap-2">
                    <OptBtn active={lhPaper === '80gsm'}  onClick={() => setLhPaper('80gsm')}>80 GSM Offset</OptBtn>
                    <OptBtn active={lhPaper === '100gsm'} onClick={() => setLhPaper('100gsm')}>100 GSM</OptBtn>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Single-sided only. Full CMYK. No finishing.</p>
                </div>
              )}

              {/* ─── NCR FORMS ─── */}
              {product === 'ncr_form' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Size</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={ncrSize === 'a5'} onClick={() => setNcrSize('a5')}>A5</OptBtn>
                        <OptBtn active={ncrSize === 'a4'} onClick={() => setNcrSize('a4')}>A4</OptBtn>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Parts</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={ncrParts === '2'} onClick={() => setNcrParts('2')}>2-part</OptBtn>
                        <OptBtn active={ncrParts === '3'} onClick={() => setNcrParts('3')}>3-part</OptBtn>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F5F0EB] rounded-xl p-4 text-xs text-gray-500">
                    Carbonless copy paper · qty = number of sets · full CMYK · serial numbering available on request
                  </div>
                </>
              )}

              {/* ─── CERTIFICATES ─── */}
              {product === 'certificate' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={nextStep()}>Border</StepLabel>
                  <div className="flex gap-2">
                    <OptBtn active={certBorder === 'none'} onClick={() => setCertBorder('none')}>No Border</OptBtn>
                    <OptBtn active={certBorder === 'gold'} onClick={() => setCertBorder('gold')}>Gold Border</OptBtn>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">A4 · 300 GSM · full colour · gold border printed (+PKR 5/certificate)</p>
                </div>
              )}

              {/* ─── ENVELOPES ─── */}
              {product === 'envelope' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Size</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="envSize" value="DL" checked={envSize === 'DL'} onChange={() => setEnvSize('DL')} label="DL (110×220mm)" note="standard letter" />
                        <RadioOpt name="envSize" value="C5" checked={envSize === 'C5'} onChange={() => setEnvSize('C5')} label="C5 (162×229mm)" note="half A4" />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                      <StepLabel n={nextStep()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="envSides" value="single" checked={envSides === 'single'} onChange={() => setEnvSides('single')} label="Front only" note="logo & address" />
                        <RadioOpt name="envSides" value="double" checked={envSides === 'double'} onChange={() => setEnvSides('double')} label="Front + back" note="+30%" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ─── NOTEPAD ─── */}
              {product === 'notepad_a5' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={nextStep()}>Specifications</StepLabel>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Paper: 70 GSM</li>
                    <li>• Pages: 100 per pad (standard)</li>
                    <li>• Size: A5</li>
                    <li>• Rate: PKR 450 per pad</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">Custom page counts, sizes or covers — request a quote on WhatsApp.</p>
                </div>
              )}

              {/* ─── QUANTITY (slider) ─── */}
              {!isOffsetSticker && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <StepLabel n={nextStep()}>Quantity</StepLabel>
                  <QtySlider
                    value={qty}
                    onChange={setQty}
                    min={sliderCfg.min}
                    max={sliderCfg.max}
                    step={sliderCfg.step}
                  />
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Custom qty:</span>
                    <input
                      type="number"
                      value={qty}
                      min={moq}
                      max={999999}
                      step={sliderCfg.step}
                      onChange={e => setQty(Math.max(moq, parseInt(e.target.value) || moq))}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-28 focus:outline-none focus:border-[#CC0000]"
                    />
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
                    <div className="text-gray-400 text-sm mb-2">{ALL_PRODUCTS.find(p => p.id === product)?.label}</div>
                    <div className="text-2xl font-black text-white mb-3">Custom Quote</div>
                    <p className="text-sm text-gray-400 leading-relaxed">{estimate.customNote}</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="text-gray-400 text-sm mb-1">{ALL_PRODUCTS.find(p => p.id === product)?.label}</div>
                    <div className="text-4xl font-black text-white mb-1 tabular-nums">
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
                  <div className="space-y-2 text-sm border-t border-white/10 pt-4 mb-5">
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
                        <div className="flex justify-between"><span className="text-gray-400">Paper</span><span>{bcPaper} GSM</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Lam</span><span className="capitalize">{bcLam}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Sides</span><span className="capitalize">{bcSides}</span></div>
                        {bcSides === 'double' && bcSpotUV && <div className="flex justify-between"><span className="text-gray-400">Spot UV</span><span>Yes</span></div>}
                      </>
                    )}
                    {['flyer_a4', 'flyer_a5', 'brochure_a4'].includes(product) && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Paper</span>
                          <span>{(product === 'brochure_a4' ? BROCHURE_PAPERS : FLYER_PAPERS).find(p => p.id === flyerPaper)?.label}</span>
                        </div>
                        <div className="flex justify-between"><span className="text-gray-400">Sides</span><span className="capitalize">{flyerSides}</span></div>
                        {product !== 'flyer_a5' && flyerFold !== 'none' && <div className="flex justify-between"><span className="text-gray-400">Fold</span><span className="capitalize">{flyerFold}</span></div>}
                      </>
                    )}
                    {product === 'letterhead' && <div className="flex justify-between"><span className="text-gray-400">Paper</span><span>{lhPaper === '80gsm' ? '80 GSM Offset' : '100 GSM'}</span></div>}
                    {product === 'thank_you_card' && (
                      <>
                        <div className="flex justify-between"><span className="text-gray-400">Sides</span><span className="capitalize">{tcSides}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Lam</span><span className="capitalize">{tcLam}</span></div>
                      </>
                    )}
                    {product === 'sticker_label' && (
                      <>
                        <div className="flex justify-between"><span className="text-gray-400">Shape</span><span className="capitalize">{slShape}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Size</span><span>{slSize}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Material</span><span className="capitalize">{slMaterial}</span></div>
                      </>
                    )}
                    {product === 'hang_tag'       && <div className="flex justify-between"><span className="text-gray-400">Material</span><span className="capitalize">{htMaterial}</span></div>}
                    {product === 'compliment_slip' && <div className="flex justify-between"><span className="text-gray-400">Sides</span><span className="capitalize">{csSides}</span></div>}
                    {product === 'ncr_form' && (
                      <>
                        <div className="flex justify-between"><span className="text-gray-400">Size</span><span>{ncrSize.toUpperCase()}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Parts</span><span>{ncrParts}-part</span></div>
                      </>
                    )}
                    {product === 'certificate' && <div className="flex justify-between"><span className="text-gray-400">Border</span><span>{certBorder === 'gold' ? 'Gold' : 'None'}</span></div>}
                    {product === 'envelope' && (
                      <>
                        <div className="flex justify-between"><span className="text-gray-400">Size</span><span>{envSize}</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Sides</span><span className="capitalize">{envSides}</span></div>
                      </>
                    )}

                    {/* Dispatch date */}
                    <div className="flex justify-between border-t border-white/10 pt-2 mt-2">
                      <span className="text-gray-400">Est. ready by</span>
                      <span className="text-[#25D366] font-medium">{dispatchDate}</span>
                    </div>
                  </div>
                )}

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EB854] text-white font-bold px-4 py-3 rounded-lg transition-colors mb-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {estimate.isCustom ? 'Request Custom Quote' : 'Confirm Quote on WhatsApp'}
                </a>
                <p className="text-xs text-gray-500 text-center">
                  Estimates exclude delivery &amp; taxes. Confirmed by our team.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
