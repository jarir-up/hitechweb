import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const WHATSAPP_URL = `https://wa.me/923343219844?text=Hello%2C%20I'd%20like%20to%20get%20a%20quote%20from%20Hi-Tech%20Printers.`

const serviceLinks = [
  { label: 'Sticker Sheets',          to: '/services', color: '#CC0000' },
  { label: 'Business Cards',          to: '/services', color: '#1A3A6B' },
  { label: 'Brochures & Flyers',      to: '/services', color: '#0D6B6B' },
  { label: 'Letterheads & Notepads',  to: '/services', color: '#1A6B3C' },
  { label: 'Packaging & Labels',      to: '/services', color: '#5B2C8D' },
  { label: 'Posters & Banners',       to: '/services', color: '#CC6600' },
]

const quickLinks = [
  { label: 'Home',             to: '/' },
  { label: 'Services',         to: '/services' },
  { label: 'Portfolio',        to: '/portfolio' },
  { label: 'Price Calculator', to: '/calculator' },
  { label: 'FAQ',              to: '/faq' },
  { label: 'Contact Us',       to: '/contact' },
]

const coverageAreas = ['S.I.T.E', 'Nazimabad', 'Korangi', 'DHA', 'Clifton', 'Gulshan', 'Saddar']

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-5">
              <img
                src="/hitech-logo.png"
                alt="Hi-Tech Printers"
                className="h-9 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-[#CC0000] transition-colors">
                Hi-Tech Printers
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Karachi's trusted offset print house. Precision printing for corporate, school, pharma, and textile clients since 2005.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366',
              }}
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>

            {/* Hours */}
            <div className="mt-5 flex items-center gap-2 text-xs text-white/30">
              <svg className="w-3.5 h-3.5 text-[#CC0000] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon – Sat &nbsp;·&nbsp; 9:00 AM – 7:00 PM
            </div>
          </div>

          {/* ── Services column */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-[#CC0000] rounded-full" />
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, to, color }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2.5 text-sm text-white/45 hover:text-white transition-colors duration-150 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                      style={{ background: color }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick links column */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-[#CC0000] rounded-full" />
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-[0.18em] mb-5 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-[#CC0000] rounded-full" />
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:+923343219844"
                  className="flex items-center gap-3 text-white/45 hover:text-white transition-colors duration-150"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.18)' }}>
                    <svg className="w-3.5 h-3.5 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  +92 334 321 9844
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hitechprinters.pk"
                  className="flex items-center gap-3 text-white/45 hover:text-white transition-colors duration-150"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.18)' }}>
                    <svg className="w-3.5 h-3.5 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  info@hitechprinters.pk
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.18)' }}>
                  <svg className="w-3.5 h-3.5 text-[#CC0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="leading-relaxed">D-123/A, S.I.T.E Industrial Area,<br />Near Bawani Chali, Karachi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coverage strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/25 mr-1">Delivering to:</span>
          {coverageAreas.map((area) => (
            <span
              key={area}
              className="text-[11px] text-white/30 px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">&copy; {year} Hi-Tech Printers. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" style={{ boxShadow: '0 0 6px rgba(37,211,102,0.7)' }} />
            Precision Offset Printing · S.I.T.E, Karachi
          </div>
        </div>
      </div>

    </footer>
  )
}
