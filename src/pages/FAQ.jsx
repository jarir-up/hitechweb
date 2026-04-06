import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const WA_FAQ = `https://wa.me/923343219844?text=${encodeURIComponent("Hi, I have a question about printing services at Hi-Tech Printers.")}`

const faqs = [
  {
    q: 'What is the minimum order quantity for business cards in Karachi?',
    a: 'Our minimum order for business cards is 500 pieces. This is standard for offset printing, which gives you the best price-per-card at volume. If you need fewer than 500, we can advise on digital alternatives — but for professional quality at the right price, 500+ offset cards is the sweet spot.',
  },
  {
    q: 'How much does offset printing cost in Pakistan?',
    a: 'Pricing depends on the product, quantity, paper stock, and finish. As a rough guide: 500 business cards start from PKR 1,200–2,000; A4 flyers (500 pcs) from PKR 2,500–4,500; sticker sheets from PKR 1,500–3,000. Use our Price Calculator on the website for an instant estimate on 14 common products. Final pricing is confirmed via WhatsApp after reviewing your artwork.',
  },
  {
    q: 'What is the difference between offset and digital printing?',
    a: 'Offset printing uses physical printing plates and produces sharper, more consistent colour across large runs — ideal for 500+ units. It has a setup cost but the per-unit price drops significantly with volume. Digital printing skips the plates and prints directly, making it cost-effective for small runs (under 100 units) but more expensive per piece at scale. Hi-Tech Printers specialises in offset printing for bulk and repeat orders.',
  },
  {
    q: 'How long does printing take at Hi-Tech Printers?',
    a: 'Standard turnaround is 3–5 working days after artwork approval. Rush orders for flyers, business cards, and stickers can be done in 24–48 hours depending on our press schedule. Items requiring specialty finishes (spot UV, foil stamping, lamination) or binding take 5–7 days. WhatsApp us with your deadline and we will tell you straight if we can make it.',
  },
  {
    q: 'Do you deliver printed materials across Karachi?',
    a: 'Yes. We deliver to all major areas of Karachi including S.I.T.E, Nazimabad, Korangi, DHA, Clifton, Gulshan, Saddar, and surrounding areas. Delivery charges depend on location and order size. You can also collect directly from our press in S.I.T.E Industrial Area. WhatsApp us to arrange delivery.',
  },
  {
    q: 'Can you print waterproof sticker labels in Karachi?',
    a: 'Yes. We print waterproof product labels on BOPP (biaxially oriented polypropylene) and vinyl stock — suitable for bottles, jars, soap, food packaging, and outdoor use. Labels can be printed in full colour, kiss-cut, or die-cut into custom shapes, and are available in sheets or bulk rolls.',
  },
  {
    q: 'What printing services are available in S.I.T.E Industrial Area, Karachi?',
    a: 'Hi-Tech Printers in S.I.T.E Industrial Area offers 37 print products across 6 categories: corporate stationery (business cards, letterheads, envelopes, folders, notepads, compliment slips, certificates, bill books), marketing materials (flyers, brochures, posters, banners, catalogues, booklets), packaging and labels (product labels, sticker sheets, carton boxes, hang tags, wrappers, fabric labels), school and institutional printing (prospectuses, exercise books, diaries, result cards, bound books), event printing (wedding cards, invitation cards, event programmes, tickets), and bulk custom orders.',
  },
  {
    q: 'How do I get a quote for bulk printing in Karachi?',
    a: 'The fastest way is to WhatsApp us at +92 334 321 9844 with: (1) what you need to print, (2) the quantity, and (3) any finish requirements (lamination, spot UV, etc.). You can also use our online Price Calculator for an instant estimate on common products. We respond to all WhatsApp inquiries within a few hours during business hours.',
  },
  {
    q: 'Do you print for Instagram businesses and small eCommerce sellers?',
    a: 'Yes — this is a growing part of our work. We print thank you cards, custom sticker sheets, hang tags, packaging labels, and product wrappers for online sellers and Instagram brands. Minimum orders are designed for small businesses: sticker sheets from 100 units (digital) or 500 (offset), thank you cards from 500 units. We also offer Brand-in-a-Box bundles that include multiple items at a combined price.',
  },
  {
    q: 'Where can I print school prospectuses in Karachi?',
    a: 'Hi-Tech Printers specialises in institutional printing including school and college admissions prospectuses. We print 24–80 page full-colour prospectuses with saddle-stitch or perfect binding and a matte laminated cover. We have printed for Dar e Arqam Schools, Cadet Colleges Karampur and Larkana, Iqra Teachers Training, and Riphah College. Contact us for institutional bulk pricing.',
  },
  {
    q: 'What paper stocks and GSM weights do you use?',
    a: 'GSM (grams per square metre) indicates paper thickness. Common stocks we use: 90–120 GSM for letterheads and flyers, 300–400 GSM for business cards, 200–300 GSM for brochure covers, 130–170 GSM for brochure inserts, 350–450 GSM for hang tags and certificates. For packaging, we use E-flute and solid board depending on box requirements. We can advise on the best stock for your product.',
  },
  {
    q: 'Can you do rush or same-day printing in Karachi?',
    a: 'Rush printing (24–48 hour turnaround) is available for flyers, business cards, and sticker sheets subject to press availability. Same-day is possible in exceptional cases for simple single-sided jobs if artwork is approved by morning. WhatsApp us as early as possible with your deadline — we will confirm whether it is achievable before you commit.',
  },
  {
    q: 'Do you offer spot UV, foil stamping, and embossing?',
    a: 'Yes. Our specialty finish options include spot UV coating (gloss raised coating on selected areas), gold and silver foil stamping, embossing (raised texture), debossing (pressed-in texture), and soft-touch matte lamination. These finishes are popular for business cards, wedding cards, packaging, and premium stationery. They typically add 3–5 days to the production timeline.',
  },
  {
    q: 'Can you print carbonless NCR bill books and receipt pads?',
    a: 'Yes. We print 2-part and 3-part carbonless NCR bill books, receipt pads, and delivery challan books. Pages are serial-numbered, and we can customise the header, columns, and layout to match your business requirements. They are available in glue-bound or spiral-bound pads. Minimum order is typically 50 booklets.',
  },
  {
    q: 'Do you print wedding cards and invitation cards?',
    a: 'Yes. We print wedding invitations, Nikkah cards, and formal invitation cards on premium stocks including pearl paper, textured board, and satin-finish card. Options include gold and silver foil accents, custom envelope printing, and RSVP insert cards. We recommend starting the wedding card process at least 2–3 weeks before your event date to allow time for design approval, printing, and finishing.',
  },
  {
    q: 'Can you match specific brand colours (Pantone) for my print job?',
    a: 'For offset printing, we print in full CMYK (four-colour process), which reproduces most brand colours accurately. If your brand has a specific Pantone colour, we can work from the CMYK equivalent to get as close as possible. For exact Pantone spot colour matching on specific jobs, please discuss this with us before placing the order. We recommend requesting a physical proof before a full print run for colour-critical work.',
  },
  {
    q: 'Do you handle large volume orders — 10,000 units and above?',
    a: 'Yes. Large print runs are where offset printing becomes most cost-effective. We handle runs from 1,000 to 100,000+ units with volume-tiered pricing — the more you print, the lower the per-unit cost. For very large orders we offer phased delivery and dedicated press scheduling. Corporate clients, institutions, and pharma companies regularly place high-volume orders with us.',
  },
  {
    q: 'How should I prepare my file for printing at Hi-Tech Printers?',
    a: 'Send your artwork as a PDF with 3mm bleed on all sides and all fonts embedded or converted to outlines. Resolution should be 300 DPI at print size. Colour mode should be CMYK (not RGB — RGB colours shift when converted). If you are sending an AI or PSD file, include all linked images. If you are not sure about your file, send it to us on WhatsApp and we will check it for free before going to print.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
}

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05 } },
}

const glass = (a = 0.07, blur = 24) => ({
  background: `rgba(255,255,255,${a})`,
  backdropFilter: `blur(${blur}px) saturate(180%)`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
  border: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)',
})

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-2xl overflow-hidden group"
      style={glass(open ? 0.10 : 0.05, 20)}
      whileHover={!open ? {
        boxShadow: '0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(126,0,1,0.25)',
        transition: { duration: 0.2 },
      } : {}}
    >
      {/* Top glow accent */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.7), transparent)',
          opacity: open ? 1 : 0.3,
        }}
      />
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start gap-4 px-6 py-5"
      >
        <span
          className="text-xs font-black shrink-0 w-6 mt-0.5 tabular-nums"
          style={{ color: open ? '#7E0001' : 'rgba(255,255,255,0.25)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="font-semibold text-[15px] leading-snug flex-1 transition-colors duration-200"
          style={{ color: open ? '#fff' : 'rgba(255,255,255,0.75)' }}
        >
          {item.q}
        </span>
        <span style={{ color: open ? '#7E0001' : 'rgba(255,255,255,0.3)' }} className="transition-colors duration-200 mt-0.5">
          <ChevronIcon open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="px-6 pb-6 pl-16 text-sm leading-relaxed pt-2"
              style={{ color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  useEffect(() => {
    document.title = 'Printing FAQ Karachi | Hi-Tech Printers — Common Questions Answered'
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'faq-schema'
    script.textContent = JSON.stringify(faqSchema)
    document.head.appendChild(script)
    return () => {
      document.title = "Hi-Tech Printers — Karachi's Precision Print House"
      const el = document.getElementById('faq-schema')
      if (el) el.remove()
    }
  }, [])

  return (
    <div className="pt-16 min-h-screen bg-[#0E182A]">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-[#0E182A] text-white py-20 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(126,0,1,0.11) 0%, transparent 65%)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.014) 60px,rgba(255,255,255,0.014) 61px)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease }}>
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Got Questions?</p>
            <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-tight tracking-tight mb-5 text-white">
              Printing FAQ
            </h1>
            <p className="text-white/45 max-w-xl text-lg leading-relaxed">
              Pricing, turnaround, file formats, and what we can produce — answered straight.
            </p>
          </motion.div>
        </div>
        {/* Section divider */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{
          background: 'linear-gradient(90deg, transparent, rgba(126,0,1,0.4) 30%, rgba(126,0,1,0.4) 70%, transparent)',
        }} />
      </section>

      {/* ── FAQ List ──────────────────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-3"
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(37,211,102,0.07) 0%, transparent 65%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[#7E0001] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">Still Not Sure?</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 tracking-tight">
              Ask Us Directly
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto text-[15px] leading-relaxed">
              WhatsApp us — we respond fast and can advise on your specific job before you commit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WA_FAQ}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-white transition-all duration-200 hover:scale-[1.03]"
                style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.35)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask on WhatsApp
              </a>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-xl text-white transition-all duration-200 hover:scale-[1.03]"
                style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                Get a Price Estimate
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
