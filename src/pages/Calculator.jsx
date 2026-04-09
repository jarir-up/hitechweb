import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '923343219844'

// ── Product groups ────────────────────────────────────────────────────────
const INSTAGRAM_PRODUCTS = [
  { id: 'thank_you_card', label: 'Thank You Cards', moq: 100, badge: 'Top Pick' },
  { id: 'sticker_label',  label: 'Sticker Labels',  moq: 100, badge: 'New' },
  { id: 'hang_tag',       label: 'Hang Tags',        moq: 100, badge: 'New' },
  { id: 'sticker',        label: 'Sticker Sheets',   moq: 100 },
]

const BUSINESS_PRODUCTS = [
  { id: 'business_card',   label: 'Business Cards',   moq: 500 },
  { id: 'flyer_a4',        label: 'Flyer A4',          moq: 500 },
  { id: 'flyer_a5',        label: 'Flyer A5',          moq: 500 },
  { id: 'brochure_a4',     label: 'Brochure A4',       moq: 500 },
  { id: 'compliment_slip', label: 'Compliment Slips',  moq: 500 },
  { id: 'letterhead',      label: 'Letterhead A4',     moq: 500 },
  { id: 'ncr_form',        label: 'NCR Forms',         moq: 100 },
  { id: 'certificate',     label: 'Certificates',      moq: 100 },
  { id: 'envelope',        label: 'Envelopes',         moq: 500 },
  { id: 'notepad_a5',      label: 'Notepad A5',        moq: 10  },
]

const ALL_PRODUCTS = [...INSTAGRAM_PRODUCTS, ...BUSINESS_PRODUCTS]

// ── Bundles ───────────────────────────────────────────────────────────────
const BUNDLES = [
  {
    id: 'launch',
    name: 'The Launch Box',
    tagline: 'Everything you need to look legit from day one.',
    price: 6500,
    accent: '#1A6B3C',
    savings: '~18% off individual',
    audiences: [
      { icon: '🚀', label: 'New Businesses' },
      { icon: '💼', label: 'Freelancers' },
      { icon: '🌱', label: 'Startups' },
    ],
    gifts: [
      '1× Custom Printed Tissue Box',
      '1× Branded Key Chain',
    ],
    items: [
      { label: '500 Business Cards',   detail: '350 GSM · Matte · Double-sided' },
      { label: '100 Thank You Cards',  detail: 'A6 · 300 GSM · Matte · Double-sided' },
      { label: '200 Sticker Labels',   detail: 'Round 5cm · Paper' },
    ],
  },
  {
    id: 'hustle',
    name: 'The Hustle Box',
    tagline: 'Built for brands that ship orders daily.',
    price: 14000,
    accent: '#1A3A6B',
    savings: '~22% off individual',
    audiences: [
      { icon: '📸', label: 'Instagram Sellers' },
      { icon: '🛒', label: 'Daraz / eCommerce' },
      { icon: '🏠', label: 'Home Businesses' },
    ],
    gifts: [
      '10× Die-cut Swag Stickers',
      '10× Custom Printed Gift Tags',
    ],
    items: [
      { label: '1,000 Business Cards',  detail: '350 GSM · Matte · Double-sided' },
      { label: '500 Thank You Cards',   detail: 'A6 · 300 GSM · Matte · Double-sided' },
      { label: '500 Sticker Labels',    detail: 'Round 5cm · Paper' },
      { label: '500 Compliment Slips',  detail: 'DL · Single-sided' },
      { label: '200 Hang Tags',         detail: 'Kraft paper · Hole punched' },
    ],
  },
  {
    id: 'studio',
    name: 'The Studio Box',
    tagline: 'Full brand collateral for agency client launches.',
    price: 28000,
    accent: '#5B2C8D',
    savings: '~20% off individual',
    audiences: [
      { icon: '🎨', label: 'Creative Agencies' },
      { icon: '📱', label: 'Social Media Agencies' },
      { icon: '🏷️', label: 'Brand Consultants' },
    ],
    gifts: [
      '10× Branded Notepads (A6)',
      '8× Custom Swag Sticker Pack',
    ],
    comingSoon: true,
    items: [
      { label: '1,000 Business Cards',    detail: '350 GSM · Matte · Double-sided' },
      { label: '500 A5 Flyers',           detail: '113 GSM · Double-sided' },
      { label: '500 Tri-fold Brochures',  detail: '113 GSM · Full colour' },
      { label: '500 Compliment Slips',    detail: 'DL · Single-sided' },
      { label: '1 Roll-up Banner',        detail: 'Custom quote added on WhatsApp', note: true },
    ],
  },
]

// ── Slider configs ────────────────────────────────────────────────────────
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
  { id: 'newspaper', label: 'Newspaper', addon: -1 },
  { id: '90gsm',     label: '90 GSM',   addon: 0  },
  { id: '113gsm',    label: '113 GSM',  addon: 1  },
  { id: '128gsm',    label: '128 GSM',  addon: 2  },
  { id: '150gsm',    label: '150 GSM',  addon: 3  },
]
const BROCHURE_PAPERS = FLYER_PAPERS.filter(p => p.id !== 'newspaper')

// ── Dispatch date ─────────────────────────────────────────────────────────
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
    if (cfg.stickerMode === 'offset') return { isCustom: true, customNote: 'Offset sticker printing is done on a per-job basis. MOQ 500 sheets — fully custom sizes. Contact us on WhatsApp with your size, qty & design specs for a fast quote.' }
    const rate = cfg.stickerSize === 'A4' ? 40 : 20
    return { isCustom: false, perUnit: rate, total: rate * qty, unit: 'per sheet' }
  }
  if (product === 'business_card') {
    if (cfg.bcSides === 'single') {
      const rate = cfg.bcPaper === '300' ? (cfg.bcLam === 'matte' ? 2.75 : 2.30) : (cfg.bcLam === 'matte' ? 6.00 : 5.00)
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
    const base = qty >= 1000 ? 6 : 9
    const paper = FLYER_PAPERS.find(p => p.id === cfg.flyerPaper) ?? FLYER_PAPERS[1]
    const rate = base + paper.addon
    const foldCharge = cfg.flyerFold !== 'none' ? 500 : 0
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty) + foldCharge, unit: 'per piece', foldCharge }
  }
  if (product === 'flyer_a5') {
    const base = qty >= 1000 ? 4 : 8
    const paper = FLYER_PAPERS.find(p => p.id === cfg.flyerPaper) ?? FLYER_PAPERS[1]
    const rate = base + paper.addon
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per piece' }
  }
  if (product === 'brochure_a4') {
    const base = qty >= 1000 ? 6 : 9
    const paper = BROCHURE_PAPERS.find(p => p.id === cfg.flyerPaper) ?? BROCHURE_PAPERS[0]
    const rate = base + paper.addon
    const foldCharge = cfg.flyerFold !== 'none' ? 500 : 0
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty) + foldCharge, unit: 'per piece', foldCharge }
  }
  if (product === 'letterhead') {
    const base = qty >= 1000 ? 5 : 8
    const rate = base + (cfg.lhPaper === '100gsm' ? 1 : 0)
    return { isCustom: false, perUnit: rate, total: Math.round(rate * qty), unit: 'per sheet' }
  }
  if (product === 'notepad_a5') return { isCustom: false, perUnit: 450, total: 450 * qty, unit: 'per pad' }
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
    const rate = cfg.csSides === 'single' ? (qty >= 1000 ? 1.8 : 2.5) : (qty >= 1000 ? 2.5 : 3.5)
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

// ── WA message builders ───────────────────────────────────────────────────
function buildWAMessage(product, qty, cfg, estimate, negotiatorActive) {
  const label = ALL_PRODUCTS.find(p => p.id === product)?.label || product
  const lines = [`Hello! I used the Price Calculator on your website.`, ``, `*Product:* ${label}`, `*Quantity:* ${qty.toLocaleString()}`]
  if (product === 'sticker') {
    lines.push(`*Mode:* ${cfg.stickerMode === 'digital' ? 'Digital Printing' : 'Offset Printing'}`)
    if (cfg.stickerMode === 'digital') lines.push(`*Size:* ${cfg.stickerSize}`)
  }
  if (product === 'business_card') {
    lines.push(`*Paper:* ${cfg.bcPaper} GSM`, `*Lamination:* ${cfg.bcLam === 'matte' ? 'Matte' : 'Gloss'}`, `*Sides:* ${cfg.bcSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
    if (cfg.bcSides === 'double' && cfg.bcSpotUV) lines.push(`*Spot UV:* Yes`)
  }
  if (['flyer_a4', 'flyer_a5', 'brochure_a4'].includes(product)) {
    const papers = product === 'brochure_a4' ? BROCHURE_PAPERS : FLYER_PAPERS
    lines.push(`*Paper:* ${papers.find(p => p.id === cfg.flyerPaper)?.label ?? cfg.flyerPaper}`, `*Sides:* ${cfg.flyerSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
    if (product !== 'flyer_a5' && cfg.flyerFold !== 'none') lines.push(`*Fold:* ${cfg.flyerFold === 'bifold' ? 'Bi-fold' : 'Tri-fold'}`)
  }
  if (product === 'letterhead') lines.push(`*Paper:* ${cfg.lhPaper === '80gsm' ? '80 GSM Offset' : '100 GSM'}`)
  if (product === 'thank_you_card') lines.push(`*Sides:* ${cfg.tcSides === 'single' ? 'Single-sided' : 'Double-sided'}`, `*Lamination:* ${cfg.tcLam === 'matte' ? 'Matte' : 'Gloss'}`)
  if (product === 'sticker_label') lines.push(`*Shape:* ${cfg.slShape === 'round' ? 'Round' : 'Oval'}`, `*Size:* ${cfg.slSize} diameter`, `*Material:* ${cfg.slMaterial === 'paper' ? 'Paper (standard)' : 'Vinyl (waterproof)'}`)
  if (product === 'hang_tag') lines.push(`*Material:* ${cfg.htMaterial === 'kraft' ? 'Kraft paper' : 'Coated card'}`)
  if (product === 'compliment_slip') lines.push(`*Sides:* ${cfg.csSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
  if (product === 'ncr_form') lines.push(`*Size:* ${cfg.ncrSize.toUpperCase()}`, `*Parts:* ${cfg.ncrParts}-part`)
  if (product === 'certificate') lines.push(`*Border:* ${cfg.certBorder === 'gold' ? 'Gold printed border' : 'No border'}`)
  if (product === 'envelope') lines.push(`*Size:* ${cfg.envSize}`, `*Sides:* ${cfg.envSides === 'single' ? 'Single-sided' : 'Double-sided'}`)
  lines.push(``)
  if (estimate.isCustom) {
    lines.push(`I'd like a custom quote for the above specs.`)
  } else {
    lines.push(`*Estimated Total:* PKR ${estimate.total.toLocaleString()}`, ``, `Can you confirm the final quote?`)
  }
  if (negotiatorActive) {
    lines.push(``, `🤝 _[Negotiator Mode]_ This customer has requested price negotiation. Please consider a flexible quote.`)
  }
  return lines.join('\n')
}

function buildBundleWAMessage(bundle, negotiatorActive) {
  const lines = [
    `Hello! I'm interested in the *${bundle.name}* from your website.`, ``,
    `*Bundle contents:*`,
    ...bundle.items.map(item => `• ${item.label} — ${item.detail}`),
    ``, `*Estimated price:* PKR ${bundle.price.toLocaleString()}`,
    ``, `Can you confirm availability and final pricing?`,
  ]
  if (negotiatorActive) lines.push(``, `🤝 _[Negotiator Mode]_ This customer has requested price negotiation. Please consider a flexible quote.`)
  return lines.join('\n')
}

// ── UI helpers ────────────────────────────────────────────────────────────
function StepLabel({ n, children }) {
  return (
    <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm">
      <span className="w-6 h-6 bg-[#7E0001] text-white text-xs rounded-full flex items-center justify-center font-black shrink-0" style={{ boxShadow: '0 0 10px rgba(126,0,1,0.4)' }}>{n}</span>
      {children}
    </h3>
  )
}

function OptBtn({ active, onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={active
        ? { background: 'rgba(255,255,255,0.16)', color: '#fff', border: '1px solid rgba(255,255,255,0.22)' }
        : disabled
          ? { background: 'transparent', color: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'not-allowed' }
          : { background: 'transparent', color: 'rgba(255,255,255,0.50)', border: '1px solid rgba(255,255,255,0.10)' }
      }
    >
      {children}
    </button>
  )
}

function RadioOpt({ name, value, checked, onChange, label, note }) {
  return (
    <label className="flex items-start gap-2 cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="calc-rb mt-0.5" />
      <span className="text-sm" style={{ color: checked ? '#fff' : 'rgba(255,255,255,0.60)' }}>
        {label}
        {note && <span className="text-xs ml-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>({note})</span>}
      </span>
    </label>
  )
}

function QtySlider({ value, onChange, min, max, step }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-4xl font-black text-white tabular-nums">{value.toLocaleString()}</span>
        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>pieces</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #7E0001 ${pct}%, rgba(255,255,255,0.12) ${pct}%)` }}
      />
      <div className="flex justify-between text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.30)' }}>
        <span>MOQ {min.toLocaleString()}</span>
        <span>{max.toLocaleString()}+</span>
      </div>
    </div>
  )
}

// ── Claymorphic Price Tag — negotiation trigger ───────────────────────────
function PriceTag({ active, onClick }) {
  const [tip, setTip]         = useState(false)
  const [wobbled, setWobbled] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setWobbled(true), 3200)
    return () => clearTimeout(t)
  }, [])

  const tagBg     = active
    ? 'linear-gradient(145deg, #2ECC71, #1A9C52)'
    : 'linear-gradient(145deg, #9B59B6, #6C2D91)'
  const tagShadow = active
    ? '0 7px 0 #16763C, 0 12px 28px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.18)'
    : '0 7px 0 #4A1A72, 0 12px 28px rgba(0,0,0,0.5), inset 0 1.5px 0 rgba(255,255,255,0.28), inset 0 -2px 4px rgba(0,0,0,0.2)'

  return (
    <div className="fixed right-5 bottom-28 z-40 flex flex-col items-center" style={{ perspective: '600px' }}>

      {/* Tooltip bubble */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, x: 14, scale: 0.88 }}
            animate={{ opacity: 1, x: 0,  scale: 1 }}
            exit={{ opacity: 0, x: 14, scale: 0.88 }}
            transition={{ duration: 0.18, ease: [0.22,1,0.36,1] }}
            style={{
              position: 'absolute',
              right: '92px',
              top: '12px',
              width: '168px',
              padding: '12px 14px',
              borderRadius: '16px',
              background: active
                ? 'linear-gradient(135deg, rgba(20,52,32,0.97), rgba(14,36,22,0.97))'
                : 'linear-gradient(135deg, rgba(30,16,46,0.97), rgba(20,10,32,0.97))',
              backdropFilter: 'blur(20px)',
              border: active ? '1px solid rgba(46,204,113,0.3)' : '1px solid rgba(155,89,182,0.35)',
              boxShadow: '0 18px 40px rgba(0,0,0,0.55), 0 5px 0 rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}
          >
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              {active ? '🤝 Deal mode is on!' : '🏷️ Secret price tag!'}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.45 }}>
              {active
                ? 'Your quote request is flagged for a flexible price discussion with us.'
                : 'Tap to enable negotiation. Your WhatsApp quote gets a special deal flag.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hanging string */}
      <div style={{
        width: '2px', height: '20px',
        background: active
          ? 'linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.25))'
          : 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.06))',
        borderRadius: '1px',
        marginBottom: '-1px',
        transition: 'background 0.4s',
      }} />

      {/* Clay tag */}
      <motion.button
        onClick={() => { onClick(); setTip(s => !s) }}
        onMouseEnter={() => setTip(true)}
        onMouseLeave={() => !active && setTip(false)}
        aria-label="Toggle deal negotiation mode"
        initial={{ rotate: -9, y: 30, opacity: 0 }}
        animate={wobbled && !active
          ? { rotate: [-9, -17, -4, -13, -9], y: 0, opacity: 1 }
          : active
            ? { rotate: -4, y: 0, opacity: 1 }
            : { rotate: -9, y: 0, opacity: 1 }
        }
        transition={{
          rotate: wobbled ? { duration: 0.72, times: [0, 0.2, 0.5, 0.78, 1] } : { duration: 0.45 },
          y:      { duration: 0.6, ease: [0.22,1,0.36,1] },
          opacity:{ duration: 0.4 },
        }}
        whileHover={{ rotate: active ? -4 : -16, scale: 1.09, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.88, rotate: 0 }}
        style={{
          width: '76px',
          cursor: 'pointer',
          transformOrigin: 'top center',
          background: 'none',
          border: 'none',
          padding: 0,
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.55))',
        }}
      >
        <div style={{
          background: tagBg,
          borderRadius: '13px',
          padding: '9px 8px 11px',
          boxShadow: tagShadow,
          border: active ? '1.5px solid rgba(255,255,255,0.32)' : '1.5px solid rgba(255,255,255,0.2)',
          position: 'relative',
          transition: 'background 0.4s, box-shadow 0.4s',
        }}>
          {/* Punch hole */}
          <div style={{
            width: '11px', height: '11px', borderRadius: '50%',
            background: '#0E182A',
            border: '2px solid rgba(255,255,255,0.18)',
            margin: '0 auto 7px',
            boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.8)',
          }} />

          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key="on"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0,  opacity: 1 }}
                exit={{ rotateX: -90,   opacity: 0 }}
                transition={{ duration: 0.24 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: '20px', lineHeight: 1 }}>🤝</div>
                <p style={{ fontSize: '8.5px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: '4px', lineHeight: 1.3 }}>
                  Deal<br/>Mode
                </p>
              </motion.div>
            ) : (
              <motion.div key="off"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0,  opacity: 1 }}
                exit={{ rotateX: -90,   opacity: 0 }}
                transition={{ duration: 0.24 }}
                style={{ textAlign: 'center' }}
              >
                <p style={{ fontSize: '9.5px', fontWeight: 600, color: 'rgba(255,255,255,0.93)', lineHeight: 1.35, letterSpacing: '0.02em' }}>
                  Got a<br/>budget?
                </p>
                <div style={{
                  marginTop: '5px',
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: '5px',
                  padding: '1.5px 5px',
                  display: 'inline-block',
                }}>
                  <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#FFD700', letterSpacing: '0.04em' }}>% OFF</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulsing fire badge */}
        <AnimatePresence>
          {!active && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '-6px', right: '-6px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF6B35, #C0392B)',
                border: '2.5px solid #0E182A',
                boxShadow: '0 2px 10px rgba(255,107,53,0.65)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px',
              }}
            >🔥</motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

// ── Price volatility notification ─────────────────────────────────────────
function PriceNotification({ onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 7000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="fixed top-24 right-5 z-50 rounded-xl p-4 w-56 sm:w-64"
      style={{ background: 'rgba(30,30,30,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(204,102,0,0.30)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-white">Pricing Notice</span>
        </div>
        <button onClick={onDismiss} className="transition-colors text-lg leading-none -mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>×</button>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Prices are estimates subject to market conditions. Final cost confirmed before production.
      </p>
      <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full bg-amber-400"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 7, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────
export default function Calculator() {
  const [tab, setTab] = useState('individual')

  // Individual calculator state
  const [product, setProduct] = useState('thank_you_card')
  const [qty, setQty]         = useState(100)
  const [stickerMode, setStickerMode] = useState('digital')
  const [stickerSize, setStickerSize] = useState('A5')
  const [bcPaper, setBcPaper]   = useState('350')
  const [bcLam,   setBcLam]     = useState('matte')
  const [bcSides, setBcSides]   = useState('double')
  const [bcSpotUV, setBcSpotUV] = useState(false)
  const [flyerPaper, setFlyerPaper] = useState('90gsm')
  const [flyerSides, setFlyerSides] = useState('single')
  const [flyerFold,  setFlyerFold]  = useState('none')
  const [lhPaper, setLhPaper] = useState('80gsm')
  const [tcSides, setTcSides] = useState('double')
  const [tcLam,   setTcLam]   = useState('matte')
  const [slShape,    setSlShape]    = useState('round')
  const [slSize,     setSlSize]     = useState('5cm')
  const [slMaterial, setSlMaterial] = useState('paper')
  const [htMaterial, setHtMaterial] = useState('kraft')
  const [csSides, setCsSides] = useState('single')
  const [ncrSize,  setNcrSize]  = useState('a5')
  const [ncrParts, setNcrParts] = useState('2')
  const [certBorder, setCertBorder] = useState('none')
  const [envSize,  setEnvSize]  = useState('DL')
  const [envSides, setEnvSides] = useState('single')

  // Negotiator & notification
  const [negotiatorActive, setNegotiatorActive] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const notifTriggered = useRef(false)

  const dispatchDate = useMemo(() => getDispatchDate(), [])

  function triggerNotifOnce() {
    if (!notifTriggered.current) {
      notifTriggered.current = true
      setShowNotif(true)
    }
  }

  function switchProduct(pid) {
    setProduct(pid)
    const p = ALL_PRODUCTS.find(x => x.id === pid)
    setQty(p?.moq ?? 500)
    setFlyerFold('none')
    setBcSpotUV(false)
    if (pid === 'sticker') { setStickerMode('digital'); setStickerSize('A5') }
    if (pid === 'brochure_a4') setFlyerPaper('90gsm')
    triggerNotifOnce()
  }

  const cfg = { stickerMode, stickerSize, bcPaper, bcLam, bcSides, bcSpotUV, flyerPaper, flyerSides, flyerFold, lhPaper, tcSides, tcLam, slShape, slSize, slMaterial, htMaterial, csSides, ncrSize, ncrParts, certBorder, envSize, envSides }

  const estimate = useMemo(
    () => calcEstimate(product, qty, cfg),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, qty, stickerMode, stickerSize, bcPaper, bcLam, bcSides, bcSpotUV, flyerPaper, flyerSides, flyerFold, lhPaper, tcSides, tcLam, slShape, slSize, slMaterial, htMaterial, csSides, ncrSize, ncrParts, certBorder, envSize, envSides]
  )

  const isOffsetSticker = product === 'sticker' && stickerMode === 'offset'
  const sliderCfg = SLIDER_CONFIG[product] ?? { min: 500, max: 5000, step: 500 }
  const moq = isOffsetSticker ? 500 : (ALL_PRODUCTS.find(p => p.id === product)?.moq ?? 500)

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildWAMessage(product, qty, cfg, estimate, negotiatorActive))}`

  // Step counter — resets each render
  let _s = 0
  const S = () => ++_s

  const ease = [0.22, 1, 0.36, 1]
  const glass = (a = 0.07, blur = 24) => ({
    background: `rgba(255,255,255,${a})`,
    backdropFilter: `blur(${blur}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
  })

  return (
    <div className="pt-16 min-h-screen bg-[#0E182A]">
      <style>{`
        input[type=range]::-webkit-slider-thumb { width:18px; height:18px; border-radius:50%; background:#7E0001; cursor:pointer; -webkit-appearance:none; border:2px solid rgba(255,255,255,0.2); box-shadow:0 0 12px rgba(126,0,1,0.4); }
        input[type=range]::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#7E0001; cursor:pointer; border:2px solid rgba(255,255,255,0.2); box-shadow:0 0 12px rgba(126,0,1,0.4); }
        .calc-input { background:rgba(255,255,255,0.05) !important; border:1px solid rgba(255,255,255,0.10) !important; color:#fff !important; border-radius:0.75rem; }
        .calc-input:focus { border-color:rgba(126,0,1,0.5) !important; outline:none; }
        input[type=number].calc-input { color-scheme:dark; }
        input[type=checkbox].calc-cb { accent-color:#7E0001; }
        input[type=radio].calc-rb { accent-color:#7E0001; }
        .calc-glass-card { background:rgba(255,255,255,0.06); backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%); border:1px solid rgba(255,255,255,0.10); box-shadow:0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06); }
      `}</style>

      {/* Header */}
      <section className="relative bg-[#0E182A] text-white py-20 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(126,0,1,0.11) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Pricing Tool</p>
            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-tight mb-5 text-white">
              Print Calculator
            </h1>
            <p className="text-white/45 max-w-xl text-lg leading-relaxed">Get a ballpark estimate instantly. Final pricing confirmed via WhatsApp.</p>
          </motion.div>
        </div>
        {/* Section divider */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.4) 30%, rgba(126,0,1,0.4) 70%, transparent)',
        }} />
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab switcher */}
          <div className="flex gap-1 rounded-xl p-1.5 mb-6 w-fit" style={glass(0.06, 16)}>
            {[
              { id: 'individual', label: 'Individual Products' },
              { id: 'bundles',    label: 'Brand in a Box' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                style={tab === t.id
                  ? { background: 'rgba(255,255,255,0.14)', color: '#fff' }
                  : { color: 'rgba(255,255,255,0.40)' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ═══════════ INDIVIDUAL TAB ═══════════ */}
          {tab === 'individual' && (
            <div className="grid lg:grid-cols-3 gap-6 items-start">

              {/* Left: config panels */}
              <div className="lg:col-span-2 space-y-5 order-2 lg:order-1">

                {/* ① Product selector */}
                <div className="calc-glass-card rounded-2xl p-6">
                  <StepLabel n={S()}>What are you printing?</StepLabel>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5" style={{ color: '#25D366' }}>
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#25D366' }} />
                    Popular · Instagram &amp; eCommerce
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                    {INSTAGRAM_PRODUCTS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => switchProduct(p.id)}
                        className={`relative text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                          product === p.id ? 'text-white border-white/25' : 'border-white/10 text-white/60 hover:border-white/25 hover:text-white'
                        }`}
                      style={product === p.id ? { background: 'rgba(126,0,1,0.25)' } : { background: 'rgba(255,255,255,0.04)' }}
                      >
                        {p.badge && (
                          <span className="absolute -top-2 -right-1 bg-[#7E0001] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">{p.badge}</span>
                        )}
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/08 pt-4" style={{ borderTopColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="text-xs text-white/35 uppercase tracking-wider mb-2.5">Business &amp; Corporate</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                      {BUSINESS_PRODUCTS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => switchProduct(p.id)}
                          className={`text-left px-2.5 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${
                            product === p.id ? 'text-white border-white/25' : 'border-white/08 text-white/55 hover:border-white/20 hover:text-white'
                          }`}
                          style={product === p.id ? { background: 'rgba(126,0,1,0.25)', borderColor: 'rgba(255,255,255,0.25)' } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ② Sticker mode — comes before qty for stickers only */}
                {product === 'sticker' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Print Mode</StepLabel>
                    <div className="space-y-2.5">
                      <RadioOpt name="stickerMode" value="digital" checked={stickerMode === 'digital'} onChange={() => { setStickerMode('digital'); setQty(100) }} label="Digital Printing" note="A4 & A5 · MOQ 100 · instant pricing" />
                      <RadioOpt name="stickerMode" value="offset"  checked={stickerMode === 'offset'}  onChange={() => { setStickerMode('offset');  setQty(500) }} label="Offset Printing"  note="custom sizes · MOQ 500 · custom quote" />
                    </div>
                  </div>
                )}

                {/* ② / ③ Quantity slider */}
                {!isOffsetSticker && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Quantity</StepLabel>
                    <QtySlider
                      value={qty}
                      onChange={v => { setQty(v); triggerNotifOnce() }}
                      min={sliderCfg.min}
                      max={sliderCfg.max}
                      step={sliderCfg.step}
                    />
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Custom qty:</span>
                      <input
                        type="number"
                        value={qty}
                        min={moq}
                        max={999999}
                        step={sliderCfg.step}
                        onChange={e => { setQty(Math.max(moq, parseInt(e.target.value) || moq)); triggerNotifOnce() }}
                        className="calc-input text-sm w-28 px-3 py-1.5"
                      />
                    </div>
                  </div>
                )}

                {/* Offset sticker custom quote box */}
                {isOffsetSticker && (
                  <div className="rounded-xl p-5" style={{ background: 'rgba(126,0,1,0.08)', border: '1px dashed rgba(126,0,1,0.30)' }}>
                    <p className="text-sm font-semibold text-white mb-1">Offset stickers — custom quote</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>Significantly lower per-unit cost at 500+ qty. Sizes are fully custom. Hit the button below and send us your size, quantity, and design — we'll quote back fast.</p>
                  </div>
                )}

                {/* Product-specific options */}

                {/* THANK YOU CARDS */}
                {product === 'thank_you_card' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="tcSides" value="double" checked={tcSides === 'double'} onChange={() => setTcSides('double')} label="Double-sided" note="message on back" />
                        <RadioOpt name="tcSides" value="single" checked={tcSides === 'single'} onChange={() => setTcSides('single')} label="Single-sided" />
                      </div>
                    </div>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Lamination</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="tcLam" value="matte" checked={tcLam === 'matte'} onChange={() => setTcLam('matte')} label="Matte" note="premium feel" />
                        <RadioOpt name="tcLam" value="gloss" checked={tcLam === 'gloss'} onChange={() => setTcLam('gloss')} label="Gloss" note="-0.5 PKR/card" />
                      </div>
                    </div>
                  </div>
                )}

                {/* STICKER LABELS */}
                {product === 'sticker_label' && (
                  <>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Shape</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={slShape === 'round'} onClick={() => setSlShape('round')}>Round</OptBtn>
                        <OptBtn active={slShape === 'oval'}  onClick={() => setSlShape('oval')}>Oval</OptBtn>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Size (diameter)</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="slSize" value="3cm" checked={slSize === '3cm'} onChange={() => setSlSize('3cm')} label="3 cm" note="small seal" />
                          <RadioOpt name="slSize" value="5cm" checked={slSize === '5cm'} onChange={() => setSlSize('5cm')} label="5 cm" note="most popular" />
                          <RadioOpt name="slSize" value="7cm" checked={slSize === '7cm'} onChange={() => setSlSize('7cm')} label="7 cm" note="large label" />
                        </div>
                      </div>
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Material</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="slMat" value="paper" checked={slMaterial === 'paper'} onChange={() => setSlMaterial('paper')} label="Paper (standard)" />
                          <RadioOpt name="slMat" value="vinyl" checked={slMaterial === 'vinyl'} onChange={() => setSlMaterial('vinyl')} label="Vinyl — waterproof" note="+50% · jars & bottles" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* HANG TAGS */}
                {product === 'hang_tag' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Material</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={htMaterial === 'kraft'}  onClick={() => setHtMaterial('kraft')}>Kraft Paper</OptBtn>
                      <OptBtn active={htMaterial === 'coated'} onClick={() => setHtMaterial('coated')}>Coated Card</OptBtn>
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>All hang tags include hole punch. Full CMYK. String not included.</p>
                  </div>
                )}

                {/* STICKER SHEETS extra option */}
                {product === 'sticker' && stickerMode === 'digital' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Sheet Size</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={stickerSize === 'A5'} onClick={() => setStickerSize('A5')}>A5 — PKR 20 / sheet</OptBtn>
                      <OptBtn active={stickerSize === 'A4'} onClick={() => setStickerSize('A4')}>A4 — PKR 40 / sheet</OptBtn>
                    </div>
                  </div>
                )}

                {/* BUSINESS CARDS */}
                {product === 'business_card' && (
                  <>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Paper Stock</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={bcPaper === '350'} onClick={() => setBcPaper('350')}>350 GSM</OptBtn>
                        <OptBtn active={bcPaper === '300'} onClick={() => setBcPaper('300')}>300 GSM</OptBtn>
                      </div>
                      <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>350 GSM is premium — stiffer, better feel.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Lamination</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="bcLam" value="matte" checked={bcLam === 'matte'} onChange={() => setBcLam('matte')} label="Matte" />
                          <RadioOpt name="bcLam" value="gloss" checked={bcLam === 'gloss'} onChange={() => setBcLam('gloss')} label="Gloss" note="-1 PKR/card" />
                        </div>
                      </div>
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Print Sides</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="bcSides" value="double" checked={bcSides === 'double'} onChange={() => setBcSides('double')} label="Double-sided" />
                          <RadioOpt name="bcSides" value="single" checked={bcSides === 'single'} onChange={() => { setBcSides('single'); setBcSpotUV(false) }} label="Single-sided" />
                        </div>
                      </div>
                    </div>
                    {bcSides === 'double' && (
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Spot UV Coating</StepLabel>
                        <label className={`flex items-start gap-3 cursor-pointer ${qty < 1000 ? 'opacity-50 pointer-events-none' : ''}`}>
                          <input type="checkbox" checked={bcSpotUV} disabled={qty < 1000} onChange={e => setBcSpotUV(e.target.checked)} className="accent-[#7E0001] w-4 h-4 mt-0.5" />
                          <span className="text-sm text-white/75">
                            Add Spot UV
                            <span className="block text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.40)' }}>+PKR 2/card · available at 1,000+ qty only</span>
                          </span>
                        </label>
                      </div>
                    )}
                  </>
                )}

                {/* FLYER A4 */}
                {product === 'flyer_a4' && (
                  <>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Paper Stock</StepLabel>
                      <div className="flex flex-wrap gap-2">
                        {FLYER_PAPERS.map(p => <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>)}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Print Sides</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="flySides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                          <RadioOpt name="flySides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                        </div>
                      </div>
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Fold Style</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="flyFold" value="none"    checked={flyerFold === 'none'}    onChange={() => setFlyerFold('none')}    label="No Fold" />
                          <RadioOpt name="flyFold" value="bifold"  checked={flyerFold === 'bifold'}  onChange={() => setFlyerFold('bifold')}  label="Bi-fold"  note="+PKR 500" />
                          <RadioOpt name="flyFold" value="trifold" checked={flyerFold === 'trifold'} onChange={() => setFlyerFold('trifold')} label="Tri-fold" note="+PKR 500" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* FLYER A5 */}
                {product === 'flyer_a5' && (
                  <>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Paper Stock</StepLabel>
                      <div className="flex flex-wrap gap-2">
                        {FLYER_PAPERS.map(p => <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>)}
                      </div>
                    </div>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Print Sides</StepLabel>
                      <div className="flex gap-6">
                        <RadioOpt name="flySidesA5" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                        <RadioOpt name="flySidesA5" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                      </div>
                    </div>
                  </>
                )}

                {/* BROCHURE A4 */}
                {product === 'brochure_a4' && (
                  <>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Paper Stock</StepLabel>
                      <div className="flex flex-wrap gap-2">
                        {BROCHURE_PAPERS.map(p => <OptBtn key={p.id} active={flyerPaper === p.id} onClick={() => setFlyerPaper(p.id)}>{p.label}</OptBtn>)}
                      </div>
                      <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Min 90 GSM for brochures.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Print Sides</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="broSides" value="single" checked={flyerSides === 'single'} onChange={() => setFlyerSides('single')} label="Single-sided" />
                          <RadioOpt name="broSides" value="double" checked={flyerSides === 'double'} onChange={() => setFlyerSides('double')} label="Double-sided" />
                        </div>
                      </div>
                      <div className="calc-glass-card rounded-2xl p-6">
                        <StepLabel n={S()}>Fold Style</StepLabel>
                        <div className="space-y-2.5">
                          <RadioOpt name="broFold" value="none"    checked={flyerFold === 'none'}    onChange={() => setFlyerFold('none')}    label="No Fold" />
                          <RadioOpt name="broFold" value="bifold"  checked={flyerFold === 'bifold'}  onChange={() => setFlyerFold('bifold')}  label="Bi-fold"  note="+PKR 500" />
                          <RadioOpt name="broFold" value="trifold" checked={flyerFold === 'trifold'} onChange={() => setFlyerFold('trifold')} label="Tri-fold" note="+PKR 500" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* COMPLIMENT SLIPS */}
                {product === 'compliment_slip' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Print Sides</StepLabel>
                    <div className="flex gap-6">
                      <RadioOpt name="csSides" value="single" checked={csSides === 'single'} onChange={() => setCsSides('single')} label="Single-sided" />
                      <RadioOpt name="csSides" value="double" checked={csSides === 'double'} onChange={() => setCsSides('double')} label="Double-sided" />
                    </div>
                    <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>DL size (99×210mm) · 80 GSM offset · full CMYK</p>
                  </div>
                )}

                {/* LETTERHEAD */}
                {product === 'letterhead' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Paper Stock</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={lhPaper === '80gsm'}  onClick={() => setLhPaper('80gsm')}>80 GSM Offset</OptBtn>
                      <OptBtn active={lhPaper === '100gsm'} onClick={() => setLhPaper('100gsm')}>100 GSM</OptBtn>
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Single-sided only. Full CMYK.</p>
                  </div>
                )}

                {/* NCR FORMS */}
                {product === 'ncr_form' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Size</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={ncrSize === 'a5'} onClick={() => setNcrSize('a5')}>A5</OptBtn>
                        <OptBtn active={ncrSize === 'a4'} onClick={() => setNcrSize('a4')}>A4</OptBtn>
                      </div>
                    </div>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Parts</StepLabel>
                      <div className="flex gap-2">
                        <OptBtn active={ncrParts === '2'} onClick={() => setNcrParts('2')}>2-part</OptBtn>
                        <OptBtn active={ncrParts === '3'} onClick={() => setNcrParts('3')}>3-part</OptBtn>
                      </div>
                    </div>
                  </div>
                )}

                {/* CERTIFICATES */}
                {product === 'certificate' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Border</StepLabel>
                    <div className="flex gap-2">
                      <OptBtn active={certBorder === 'none'} onClick={() => setCertBorder('none')}>No Border</OptBtn>
                      <OptBtn active={certBorder === 'gold'} onClick={() => setCertBorder('gold')}>Gold Border</OptBtn>
                    </div>
                    <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>A4 · 300 GSM · full colour · gold border printed (+PKR 5/cert)</p>
                  </div>
                )}

                {/* ENVELOPES */}
                {product === 'envelope' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Size</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="envSize" value="DL" checked={envSize === 'DL'} onChange={() => setEnvSize('DL')} label="DL (110×220mm)" note="standard letter" />
                        <RadioOpt name="envSize" value="C5" checked={envSize === 'C5'} onChange={() => setEnvSize('C5')} label="C5 (162×229mm)" note="half A4" />
                      </div>
                    </div>
                    <div className="calc-glass-card rounded-2xl p-6">
                      <StepLabel n={S()}>Print Sides</StepLabel>
                      <div className="space-y-2.5">
                        <RadioOpt name="envSides" value="single" checked={envSides === 'single'} onChange={() => setEnvSides('single')} label="Front only" note="logo & address" />
                        <RadioOpt name="envSides" value="double" checked={envSides === 'double'} onChange={() => setEnvSides('double')} label="Front + back" note="+30%" />
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTEPAD */}
                {product === 'notepad_a5' && (
                  <div className="calc-glass-card rounded-2xl p-6">
                    <StepLabel n={S()}>Specifications</StepLabel>
                    <ul className="space-y-1 text-sm text-white/55">
                      <li>• Paper: 70 GSM · Pages: 100 per pad</li>
                      <li>• Size: A5 · Rate: PKR 450 per pad</li>
                    </ul>
                    <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>Custom page counts, sizes or covers — request a quote on WhatsApp.</p>
                  </div>
                )}

              </div>

              {/* Right: estimate panel */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-[#1A1A1A] text-white rounded-xl p-6 shadow-sm lg:sticky lg:top-24">
                  <div className="text-[#7E0001] text-xs font-semibold uppercase tracking-wider mb-4">Your Estimate</div>

                  {estimate.isCustom ? (
                    <div className="mb-6">
                      <div className="text-white/40 text-sm mb-2">{ALL_PRODUCTS.find(p => p.id === product)?.label}</div>
                      <div className="text-2xl font-black text-white mb-3">Custom Quote</div>
                      <p className="text-sm text-white/40 leading-relaxed">{estimate.customNote}</p>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div className="text-white/40 text-sm mb-1">{ALL_PRODUCTS.find(p => p.id === product)?.label}</div>
                      <div className="text-4xl font-black text-white mb-1 tabular-nums">PKR {estimate.total.toLocaleString()}</div>
                      <div className="text-sm text-white/40">≈ PKR {Number(estimate.perUnit).toFixed(2)} {estimate.unit}</div>
                      {estimate.foldCharge > 0 && <div className="text-xs text-[#7E0001] mt-1">incl. PKR 500 fold surcharge</div>}
                    </div>
                  )}

                  {!estimate.isCustom && (
                    <div className="space-y-1.5 text-sm border-t border-white/10 pt-4 mb-5">
                      <div className="flex justify-between"><span className="text-white/40">Qty</span><span>{qty.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-white/40">Per unit</span><span>PKR {Number(estimate.perUnit).toFixed(2)}</span></div>
                      {product === 'business_card' && <>
                        <div className="flex justify-between"><span className="text-white/40">Paper</span><span>{bcPaper} GSM</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Lam</span><span className="capitalize">{bcLam}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Sides</span><span className="capitalize">{bcSides}</span></div>
                        {bcSides === 'double' && bcSpotUV && <div className="flex justify-between"><span className="text-white/40">Spot UV</span><span>Yes</span></div>}
                      </>}
                      {['flyer_a4', 'flyer_a5', 'brochure_a4'].includes(product) && <>
                        <div className="flex justify-between"><span className="text-white/40">Paper</span><span>{(product === 'brochure_a4' ? BROCHURE_PAPERS : FLYER_PAPERS).find(p => p.id === flyerPaper)?.label}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Sides</span><span className="capitalize">{flyerSides}</span></div>
                        {product !== 'flyer_a5' && flyerFold !== 'none' && <div className="flex justify-between"><span className="text-white/40">Fold</span><span className="capitalize">{flyerFold}</span></div>}
                      </>}
                      {product === 'thank_you_card' && <>
                        <div className="flex justify-between"><span className="text-white/40">Sides</span><span className="capitalize">{tcSides}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Lam</span><span className="capitalize">{tcLam}</span></div>
                      </>}
                      {product === 'sticker_label' && <>
                        <div className="flex justify-between"><span className="text-white/40">Shape</span><span className="capitalize">{slShape}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Size</span><span>{slSize}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Material</span><span className="capitalize">{slMaterial}</span></div>
                      </>}
                      {product === 'hang_tag'       && <div className="flex justify-between"><span className="text-white/40">Material</span><span className="capitalize">{htMaterial}</span></div>}
                      {product === 'compliment_slip' && <div className="flex justify-between"><span className="text-white/40">Sides</span><span className="capitalize">{csSides}</span></div>}
                      {product === 'letterhead'      && <div className="flex justify-between"><span className="text-white/40">Paper</span><span>{lhPaper === '80gsm' ? '80 GSM Offset' : '100 GSM'}</span></div>}
                      {product === 'ncr_form' && <>
                        <div className="flex justify-between"><span className="text-white/40">Size</span><span>{ncrSize.toUpperCase()}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Parts</span><span>{ncrParts}-part</span></div>
                      </>}
                      {product === 'certificate' && <div className="flex justify-between"><span className="text-white/40">Border</span><span>{certBorder === 'gold' ? 'Gold' : 'None'}</span></div>}
                      {product === 'envelope' && <>
                        <div className="flex justify-between"><span className="text-white/40">Size</span><span>{envSize}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">Sides</span><span className="capitalize">{envSides}</span></div>
                      </>}
                      <div className="flex justify-between border-t border-white/10 pt-2 mt-1">
                        <span className="text-white/40">Est. ready by</span>
                        <span className="text-[#25D366] font-medium text-xs">{dispatchDate}</span>
                      </div>
                    </div>
                  )}

                  {negotiatorActive && (
                    <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg px-3 py-2 mb-3 flex items-center gap-2">
                      <span className="text-[#25D366] text-xs font-semibold">Negotiator Mode Active</span>
                    </div>
                  )}

                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 text-white font-bold px-4 py-3 rounded-xl transition-all hover:scale-[1.02] mb-3"
                    style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.30)' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {estimate.isCustom ? 'Request Custom Quote' : 'Confirm Quote on WhatsApp'}
                  </a>

                  {/* Disclaimer tooltip */}
                  <div className="flex justify-center">
                    <div className="group relative inline-flex items-center gap-1 text-xs cursor-help" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Pricing info</span>
                      <div className="absolute bottom-full mb-2 right-0 bg-[#2A2A2A] text-white text-xs rounded-lg px-3 py-2 w-52 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                        Estimates exclude delivery &amp; taxes. All pricing confirmed by our team before production starts.
                        <div className="absolute right-4 -bottom-1 w-2 h-2 bg-[#2A2A2A] rotate-45" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ═══════════ BUNDLES TAB ═══════════ */}
          {tab === 'bundles' && (
            <div>
              <p className="text-sm mb-6 max-w-xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Pre-packaged brand kits with everything you need in one order. Savings vs. individual pricing, confirmed on WhatsApp.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {BUNDLES.map(bundle => {
                  const bundleWaUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildBundleWAMessage(bundle, negotiatorActive))}`
                  return (
                    <motion.div
                      key={bundle.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`calc-glass-card rounded-2xl overflow-hidden flex flex-col relative ${bundle.comingSoon ? 'opacity-60' : ''}`}
                    >
                      <div className="h-1" style={{ background: `linear-gradient(90deg, ${bundle.accent}, transparent)` }} />
                      {bundle.comingSoon && (
                        <div className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}>Coming Soon</div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-1">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: bundle.accent }}>{bundle.savings}</span>
                        </div>
                        <h3 className="text-xl font-black text-white mb-1">{bundle.name}</h3>
                        <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.50)' }}>{bundle.tagline}</p>
                        {bundle.audiences && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {bundle.audiences.map(a => (
                              <span key={a.label} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.10)' }}>
                                <span>{a.icon}</span>{a.label}
                              </span>
                            ))}
                          </div>
                        )}
                        <ul className="space-y-2.5 mb-4 flex-1">
                          {bundle.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: bundle.accent }}>
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <span className="text-sm font-semibold text-white">{item.label}</span>
                                <span className="text-xs block" style={{ color: 'rgba(255,255,255,0.38)' }}>{item.detail}</span>
                                {item.note && <span className="text-xs text-amber-400">* quoted separately</span>}
                              </div>
                            </li>
                          ))}
                        </ul>
                        {bundle.gifts && (
                          <div className="rounded-lg px-3 py-2.5 mb-4" style={{ background: 'rgba(204,102,0,0.12)', border: '1px solid rgba(204,102,0,0.25)' }}>
                            <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#CC6600' }}>🎁 Complimentary Gift</p>
                            {bundle.gifts.map((g, i) => (
                              <p key={i} className="text-xs leading-snug" style={{ color: 'rgba(255,255,255,0.55)' }}>{g}</p>
                            ))}
                          </div>
                        )}
                        <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                          <div className="flex items-baseline justify-between mb-4">
                            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Est. price</span>
                            <span className="text-2xl font-black text-white">PKR {bundle.price.toLocaleString()}</span>
                          </div>
                          {negotiatorActive && (
                            <div className="rounded-lg px-3 py-1.5 mb-3 text-xs font-semibold" style={{ background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}>Negotiator Mode Active</div>
                          )}
                          <a
                            href={bundleWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 text-white font-bold px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02] text-sm"
                            style={{ background: '#25D366', boxShadow: '0 4px 16px rgba(37,211,102,0.30)' }}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Order This Bundle
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <p className="text-xs mt-6 text-center" style={{ color: 'rgba(255,255,255,0.28)' }}>Bundle prices are estimates. Final pricing confirmed by our team on WhatsApp. Excludes delivery &amp; taxes.</p>
            </div>
          )}

        </div>
      </section>

      {/* ── Negotiator bot (fixed) ── */}
      <PriceTag active={negotiatorActive} onClick={() => setNegotiatorActive(true)} />

      {/* ── Price volatility notification ── */}
      <AnimatePresence>
        {showNotif && <PriceNotification onDismiss={() => setShowNotif(false)} />}
      </AnimatePresence>

    </div>
  )
}
