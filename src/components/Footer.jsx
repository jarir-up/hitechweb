import { Link } from 'react-router-dom'

const WHATSAPP_NUMBER = '923343219844'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const serviceLinks = [
  { label: 'Sticker Sheets', to: '/services' },
  { label: 'Business Cards', to: '/services' },
  { label: 'Brochures & Flyers', to: '/services' },
  { label: 'Letterheads & Notepads', to: '/services' },
  { label: 'Packaging & Labels', to: '/services' },
  { label: 'Posters & Banners', to: '/services' },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Price Calculator', to: '/calculator' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1A1A1A] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/hitech-logo.png"
                alt="Hi-Tech Printers"
                className="h-9 w-auto object-contain"
              />
              <span className="text-white font-bold text-lg tracking-tight">Hi-Tech Printers</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Precision Print. Karachi's Trusted Press.
              <br />
              20+ years of quality offset printing.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-[#1EB854] transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#CC0000] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>D-123/A, S.I.T.E Industrial Area,<br />Near Bawani Chali, Karachi</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#CC0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+923343219844" className="hover:text-white transition-colors">
                  +92 334 321 9844
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#CC0000] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@hitechprinters.pk" className="hover:text-white transition-colors">
                  info@hitechprinters.pk
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#CC0000] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>&copy; {year} Hi-Tech Printers. All rights reserved.</p>
          <p>Delivering across Karachi &mdash; S.I.T.E &bull; Nazimabad &bull; Korangi &bull; DHA &bull; Clifton</p>
        </div>
      </div>
    </footer>
  )
}
