import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'

const Home       = lazy(() => import('./pages/Home'))
const Services   = lazy(() => import('./pages/Services'))
const Portfolio  = lazy(() => import('./pages/Portfolio'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Contact    = lazy(() => import('./pages/Contact'))
const FAQ        = lazy(() => import('./pages/FAQ'))

function App() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%c Hi-Tech Printers ',
      'background:#7E0001;color:#fff;font-size:15px;font-weight:700;padding:4px 12px;border-radius:4px;letter-spacing:0.06em;'
    )
    // eslint-disable-next-line no-console
    console.log(
      '%cPrecision offset printing · SITE Industrial Area, Karachi · Since 2005\n%cNot the internet — actual ink on actual paper.',
      'color:#7E0001;font-size:12px;font-weight:600;',
      'color:rgba(0,0,0,0.4);font-size:12px;'
    )
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0E182A' }} />}>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/portfolio"  element={<Portfolio />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/faq"        element={<FAQ />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
