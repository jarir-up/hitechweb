export const sectors = [
  { id: 'all',       label: 'All Work' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'schools',   label: 'Schools' },
  { id: 'pharma',    label: 'Pharma' },
  { id: 'textile',   label: 'Textile' },
  { id: 'events',    label: 'Events' },
  { id: 'retail',    label: 'Retail' },
]

/* Color assigned per sector — used for placeholder blocks */
export const sectorColors = {
  corporate: { bg: '#1A3A6B', light: '#EEF2FA' },
  schools:   { bg: '#1A6B3C', light: '#EEF7F2' },
  pharma:    { bg: '#0D7377', light: '#EEF7F7' },
  textile:   { bg: '#5B2C8D', light: '#F3EEF9' },
  events:    { bg: '#CC6600', light: '#FBF3E8' },
  retail:    { bg: '#CC0000', light: '#FAEAEA' },
}

export const portfolioItems = [
  /* ── Corporate ───────────────────────────────────────────── */
  {
    id: 1,
    title: 'ICMA Pakistan — Bifold Brochure',
    sector: 'corporate',
    description: 'Full-colour A4 bifold brochure on 130 GSM gloss coated stock for ICMA Pakistan, a leading professional accounting body.',
    imageSrc: '/images/A4 Brochure Bifold-ICMA Pakistan.webp',
  },
  {
    id: 2,
    title: 'ICMA Pakistan — Letterheads',
    sector: 'corporate',
    description: 'Branded corporate letterheads with precise colour matching on 90 GSM bond paper, printed in a bulk run for ICMA Pakistan.',
    imageSrc: '/images/Letterheads-ICMA Pakistan.webp',
  },
  {
    id: 3,
    title: 'Port & Protocol — Corporate Letterhead',
    sector: 'corporate',
    description: 'Crisp single-colour letterhead on premium 90 GSM paper for Port & Protocol, delivered in a 1,000-sheet run.',
    imageSrc: '/images/Letterhead-Port & Protocol.webp',
  },
  {
    id: 4,
    title: 'First Paramount Modarba — Certificate',
    sector: 'corporate',
    description: 'Formal certificate on heavyweight art board with precision offset printing for First Paramount Modarba.',
    imageSrc: '/images/Certificate-First Paramount Modarba.webp',
  },
  {
    id: 5,
    title: 'Panj Soora — 4-Colour Book',
    sector: 'corporate',
    description: '4-colour offset-printed religious book by Molana Modudi, produced with accurate CMYK registration on 80 GSM book paper.',
    imageSrc: '/images/4 color book-Panj Soora by Molana Modudi.webp',
  },

  /* ── Schools ─────────────────────────────────────────────── */
  {
    id: 6,
    title: 'Dar e Arqam Schools — Diary & Register',
    sector: 'schools',
    description: 'Branded student diaries and registers for Dar e Arqam Schools, printed on 70 GSM ruled paper with gloss laminated covers.',
    imageSrc: '/images/Diary & Register- Dar e Arqam Schools.webp',
  },
  {
    id: 7,
    title: 'Dar e Arqam Schools — Hifz Diary',
    sector: 'schools',
    description: 'Specialised Hifz (Quran memorisation) diary for Dar e Arqam Schools, custom-ruled with Islamic branding throughout.',
    imageSrc: '/images/Hifz Diary- Dar e Arqam Schools.webp',
  },
  {
    id: 8,
    title: 'Cadet College Karampur — Prospectus',
    sector: 'schools',
    description: 'Full-colour admissions prospectus for Cadet College Karampur, saddle-stitched with a matte laminated cover.',
    imageSrc: '/images/Prospectus Book-Cadet College Karampur.webp',
  },
  {
    id: 9,
    title: 'Cadet College Larkana — Prospectus',
    sector: 'schools',
    description: 'Multi-page full-colour prospectus for Cadet College Larkana with photography and structured layout, matte laminated cover.',
    imageSrc: '/images/Prospectus Book-Cadet College Larkana.webp',
  },
  {
    id: 10,
    title: 'Iqra Teachers Training School — Book Cover',
    sector: 'schools',
    description: 'Hard cover book title page for Iqra Teachers Training School, printed in full colour on heavy board with lamination.',
    imageSrc: '/images/Hard Cover Book Title-Iqra Teachers Training School.webp',
  },
  {
    id: 11,
    title: 'Riphah College — A5 Flyer',
    sector: 'schools',
    description: 'Single-sided A5 promotional flyer on 130 GSM gloss stock for Riphah College, produced in a rush run.',
    imageSrc: '/images/A5 Flyer-Riphah College.webp',
  },

  /* ── Pharma ──────────────────────────────────────────────── */
  {
    id: 12,
    title: 'Pharma Product Labels',
    sector: 'pharma',
    description: 'High-precision pharmaceutical product labels with barcodes, compliance text, and sequential numbering for a Karachi distributor.',
    imagePlaceholder: true,
  },

  /* ── Textile ─────────────────────────────────────────────── */
  {
    id: 13,
    title: 'Textile Channel — Barcode & Label Stickers',
    sector: 'textile',
    description: 'Barcode and product label stickers in bulk for Textile Channel, printed on self-adhesive stock with precision die-cutting.',
    imageSrc: '/images/Barcode Stickers-Textile Channel.webp',
  },
  {
    id: 14,
    title: 'Cotton Valley — A5 Bifold Flyer',
    sector: 'textile',
    description: 'A5 bifold promotional flyer for Cotton Valley garment brand, full-colour on 130 GSM gloss coated paper.',
    imageSrc: '/images/A5 Flyer BiFold-Cotton Valley.webp',
  },
  {
    id: 15,
    title: 'Pulevlor — A4 Trifold Flyer',
    sector: 'textile',
    description: 'A4 trifold flyer with vivid CMYK print on 130 GSM silk for Pulevlor — a high-fold job requiring precise registration.',
    imageSrc: '/images/A4 Flyer TriFold-Pulevlor.webp',
  },

  /* ── Events ──────────────────────────────────────────────── */
  {
    id: 16,
    title: 'Luxury Wedding Invitation Cards',
    sector: 'events',
    description: 'Premium wedding cards on 300 GSM pearl-finish stock with full-colour offset print — produced for a Karachi family.',
    imageSrc: '/images/Wedding Cards.webp',
  },

  /* ── Retail ──────────────────────────────────────────────── */
  {
    id: 17,
    title: 'Gift Labs — Taffeta Clothing Labels',
    sector: 'retail',
    description: 'Taffeta fabric labels for Gift Labs, offset-printed with fine detail on satin-finish label stock.',
    imageSrc: '/images/Taffeta Labels-Gift Labs.webp',
  },
  {
    id: 18,
    title: 'Shanghai Dry Cleaners — Bill Book',
    sector: 'retail',
    description: 'Custom carbonless bill books for Shanghai Dry Cleaners with branded header and serial numbering.',
    imageSrc: '/images/BillBook- Shanghai Dry Cleaners.webp',
  },
]
