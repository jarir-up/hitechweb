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
  const msg = lines.filter(Boolean).join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const WA_DIRECT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Hi-Tech Printers! I'd like to get in touch.")}`

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC0000] transition-colors bg-white'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    product: '',
    quantity: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    window.open(buildWhatsAppUrl(form), '_blank')
    setSubmitted(true)
  }

  // Group services by category for <optgroup> — skip 'all'
  const grouped = categories
    .filter((c) => c.id !== 'all')
    .map((cat) => ({
      label: cat.label,
      items: services.filter((s) => s.category === cat.id),
    }))

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
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Get in Touch</h1>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
              Based in S.I.T.E Industrial Area, Karachi. Send us your specs on WhatsApp or fill the quote form below — we respond fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Two-column layout ─────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Left: Contact details ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Info card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5">
                <h2 className="font-black text-[#1A1A1A] text-xl">Hi-Tech Printers</h2>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#25D366]/10 rounded-lg flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</div>
                    <a
                      href={WA_DIRECT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1A1A1A] font-bold hover:text-[#CC0000] transition-colors text-sm"
                    >
                      +92 334 321 9844
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#CC0000]/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Address</div>
                    <div className="text-sm text-[#1A1A1A] font-medium leading-snug">
                      D-123/A, S.I.T.E Industrial Area<br />
                      <span className="text-gray-500 font-normal">Near Bawani Chali, Karachi</span>
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#CC0000]/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Delivery</div>
                    <div className="text-sm text-[#1A1A1A] font-medium">We deliver across Karachi</div>
                    <div className="text-xs text-gray-400 mt-0.5">SITE · Nazimabad · DHA · Clifton · Korangi</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#CC0000]/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Hours</div>
                    <div className="text-sm text-[#1A1A1A] font-medium">Mon – Sat · 9 AM – 7 PM</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA card */}
              <div className="bg-[#1A1A1A] text-white rounded-xl p-5">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Fastest Response</p>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  For urgent quotes, send your design file directly on WhatsApp — we'll respond within minutes.
                </p>
                <a
                  href={WA_DIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-4 py-2.5 rounded-lg transition-colors text-sm w-full"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Open WhatsApp
                </a>
              </div>
            </motion.div>

            {/* ── Right: Quick quote form ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl p-7 shadow-sm border border-gray-100">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#1A1A1A] mb-2">WhatsApp Opened!</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                      Your quote request has been pre-filled. Hit send to reach us directly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#CC0000] font-semibold hover:underline text-sm"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-black text-[#1A1A1A] text-2xl mb-1">Quick Quote</h2>
                    <p className="text-gray-400 text-sm mb-6">
                      Fill in your details — we'll open WhatsApp with your message pre-filled.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name + Company */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Name <span className="text-[#CC0000]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                            Company <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Company name"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      {/* Product dropdown */}
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                          Product Needed <span className="text-[#CC0000]">*</span>
                        </label>
                        <select
                          name="product"
                          required
                          value={form.product}
                          onChange={handleChange}
                          className={inputCls}
                        >
                          <option value="">Select a product…</option>
                          {grouped.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                              {group.items.map((s) => (
                                <option key={s.id} value={s.name}>
                                  {s.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="Other / Not listed">Other / Not listed</option>
                        </select>
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                          Quantity <span className="text-[#CC0000]">*</span>
                        </label>
                        <input
                          type="text"
                          name="quantity"
                          required
                          value={form.quantity}
                          onChange={handleChange}
                          placeholder="e.g. 500, 1000, 5000"
                          className={inputCls}
                        />
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                          Notes <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Size, paper stock, finishing, deadline, or any other details…"
                          className={`${inputCls} resize-none`}
                        />
                      </div>

                      {/* WhatsApp message preview */}
                      {form.name && form.product && form.quantity && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-[#F5F0EB] rounded-lg p-3 border border-gray-200 text-xs text-gray-500 font-mono leading-relaxed"
                        >
                          <div className="text-[10px] uppercase tracking-wider font-sans font-semibold text-gray-400 mb-1.5">
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
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EB854] text-white font-bold px-6 py-3.5 rounded-lg transition-colors"
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
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Find Us</h2>
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.398976001866!2d67.00275427607602!3d24.918474742932332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f001a4c178f%3A0x19cc58d13a7c6e7b!2sHi-Tech%20Printers!5e0!3m2!1sen!2s!4v1774948713464!5m2!1sen!2s"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hi-Tech Printers Location"
            />
          </div>
        </div>
      </section>

    </div>
  )
}
