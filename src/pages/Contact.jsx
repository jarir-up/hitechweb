import { useState } from 'react'
import { motion } from 'framer-motion'
import { services, categories } from '../data/services'

const WHATSAPP_NUMBER = '923343219844'

function buildWhatsAppUrl({ name, company, product, quantity, notes }) {
  const lines = [
    'Hi Hi-Tech Printers! I need a quote.',
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Product: ${product}`,
    `Quantity: ${quantity}`,
    notes ? `Notes: ${notes}` : null,
  ]
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`
}

const WA_DIRECT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Hi-Tech Printers! I'd like to get in touch.")}`

const ease = [0.22, 1, 0.36, 1]

const glass = (a = 0.07, blur = 24) => ({
  background: `rgba(255,255,255,${a})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
})

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '0.75rem',
  padding: '0.625rem 0.875rem',
  fontSize: '0.875rem',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'rgba(126,0,1,0.15)', border: '1px solid rgba(126,0,1,0.25)' }}
      >
        <span style={{ color: '#7E0001' }}>{icon}</span>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {label}
        </div>
        {children}
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', product: '', quantity: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    window.open(buildWhatsAppUrl(form), '_blank')
    setSubmitted(true)
  }

  function fieldStyle(name) {
    return {
      ...inputStyle,
      borderColor: focusedField === name ? 'rgba(126,0,1,0.55)' : 'rgba(255,255,255,0.10)',
      boxShadow: focusedField === name ? '0 0 0 3px rgba(126,0,1,0.10)' : 'none',
    }
  }

  const grouped = categories
    .filter((c) => c.id !== 'all')
    .map((cat) => ({
      label: cat.label,
      items: services.filter((s) => s.category === cat.id),
    }))

  return (
    <div className="pt-16 min-h-screen bg-[#0E182A]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-[#0E182A] text-white py-20 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.09) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Contact Us</p>
            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-tight mb-5 text-white">
              Get in Touch
            </h1>
            <p className="text-white/45 max-w-xl text-lg leading-relaxed">
              S.I.T.E Industrial Area, Karachi. WhatsApp for instant response or fill the form below.
            </p>
          </motion.div>
        </div>
        {/* Section divider */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.4) 30%, rgba(126,0,1,0.4) 70%, transparent)',
        }} />
      </section>

      {/* ── Two-column layout ─────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ── Left: Contact info ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Info card */}
              <div className="rounded-2xl p-6 space-y-5" style={glass(0.06, 20)}>
                <h2 className="font-black text-white text-xl mb-2">
                  Hi-Tech Printers
                </h2>

                <InfoRow
                  icon={<WhatsAppIcon className="w-4 h-4" />}
                  label="WhatsApp"
                >
                  <a
                    href={WA_DIRECT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-[#25D366] transition-colors text-sm"
                  >
                    +92 334 321 9844
                  </a>
                </InfoRow>

                <InfoRow
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                  label="Address"
                >
                  <div className="text-sm text-white font-medium leading-snug">
                    D-123/A, S.I.T.E Industrial Area
                    <br />
                    <span className="text-white/45 font-normal">Near Bawani Chali, Karachi</span>
                  </div>
                </InfoRow>

                <InfoRow
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  }
                  label="Delivery"
                >
                  <div className="text-sm text-white font-medium">We deliver across Karachi</div>
                  <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    SITE · Nazimabad · DHA · Clifton · Korangi
                  </div>
                </InfoRow>

                <InfoRow
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Hours"
                >
                  <div className="text-sm text-white font-medium">Mon – Sat · 9 AM – 7 PM</div>
                </InfoRow>
              </div>

              {/* WhatsApp fast-response card */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.04) 100%)',
                  border: '1px solid rgba(37,211,102,0.20)',
                }}
              >
                <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: '#25D366' }}>
                  Fastest Response
                </p>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  For urgent quotes, send your file directly on WhatsApp — we respond within minutes.
                </p>
                <a
                  href={WA_DIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 font-bold px-4 py-2.5 rounded-xl text-white text-sm w-full transition-all hover:scale-[1.02]"
                  style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Open WhatsApp
                </a>
              </div>
            </motion.div>

            {/* ── Right: Quote form ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl p-7" style={glass(0.06, 20)}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}
                    >
                      <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      WhatsApp Opened!
                    </h3>
                    <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      Your quote request is pre-filled. Hit send to reach us.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#7E0001] font-semibold hover:underline text-sm"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-black text-white text-2xl mb-1">
                      Quick Quote
                    </h2>
                    <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.40)' }}>
                      Fill in your details — we'll open WhatsApp with your message pre-filled.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            Name <span className="text-[#7E0001]">*</span>
                          </label>
                          <input
                            type="text" name="name" required
                            value={form.name} onChange={handleChange}
                            placeholder="Your name"
                            style={fieldStyle('name')}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            Company <span className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
                          </label>
                          <input
                            type="text" name="company"
                            value={form.company} onChange={handleChange}
                            placeholder="Company name"
                            style={fieldStyle('company')}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          Product Needed <span className="text-[#7E0001]">*</span>
                        </label>
                        <select
                          name="product" required
                          value={form.product} onChange={handleChange}
                          style={{ ...fieldStyle('product'), colorScheme: 'dark' }}
                          onFocus={() => setFocusedField('product')}
                          onBlur={() => setFocusedField(null)}
                        >
                          <option value="" style={{ background: '#1a1a1a' }}>Select a product…</option>
                          {grouped.map((group) => (
                            <optgroup key={group.label} label={group.label} style={{ background: '#1a1a1a' }}>
                              {group.items.map((s) => (
                                <option key={s.id} value={s.name} style={{ background: '#1a1a1a' }}>
                                  {s.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="Other / Not listed" style={{ background: '#1a1a1a' }}>Other / Not listed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          Quantity <span className="text-[#7E0001]">*</span>
                        </label>
                        <input
                          type="text" name="quantity" required
                          value={form.quantity} onChange={handleChange}
                          placeholder="e.g. 500, 1000, 5000"
                          style={fieldStyle('quantity')}
                          onFocus={() => setFocusedField('quantity')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          Notes <span className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.3)' }}>(optional)</span>
                        </label>
                        <textarea
                          name="notes"
                          value={form.notes} onChange={handleChange}
                          rows={4}
                          placeholder="Size, paper stock, finishing, deadline…"
                          style={{ ...fieldStyle('notes'), resize: 'none' }}
                          onFocus={() => setFocusedField('notes')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>

                      {/* Message preview */}
                      {form.name && form.product && form.quantity && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="rounded-xl p-3 text-xs font-mono leading-relaxed overflow-hidden"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                        >
                          <div className="text-[10px] uppercase tracking-wider font-sans font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            Message preview
                          </div>
                          Hi Hi-Tech Printers! I need a quote.<br />
                          Name: {form.name}<br />
                          {form.company && <>Company: {form.company}<br /></>}
                          Product: {form.product}<br />
                          Quantity: {form.quantity}<br />
                          {form.notes && <>Notes: {form.notes}</>}
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-xl text-white transition-all hover:scale-[1.02]"
                        style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.30)' }}
                      >
                        <WhatsAppIcon />
                        Send Quote Request on WhatsApp
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Google Maps ───────────────────────────────────────── */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold text-white/40 mb-4 uppercase tracking-widest">Find Us</h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.398976001866!2d67.00275427607602!3d24.918474742932332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f001a4c178f%3A0x19cc58d13a7c6e7b!2sHi-Tech%20Printers!5e0!3m2!1sen!2s!4v1774948713464!5m2!1sen!2s"
              width="100%" height="360"
              style={{ border: 0, filter: 'grayscale(0.6) brightness(0.85)' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hi-Tech Printers Location"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
