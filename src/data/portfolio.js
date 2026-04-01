export const sectors = [
  { id: 'all',       label: 'All Work' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'schools',   label: 'Schools' },
  { id: 'pharma',    label: 'Pharma' },
  { id: 'textile',   label: 'Textile' },
  { id: 'events',    label: 'Events' },
  { id: 'retail',    label: 'Retail' },
]

/* Color assigned per sector — used for placeholder blocks.
   Swap a card's imagePlaceholder to false and add an imageSrc
   field when Umair's real photos are ready. */
export const sectorColors = {
  corporate: { bg: '#1A3A6B', light: '#EEF2FA' },
  schools:   { bg: '#1A6B3C', light: '#EEF7F2' },
  pharma:    { bg: '#0D7377', light: '#EEF7F7' },
  textile:   { bg: '#5B2C8D', light: '#F3EEF9' },
  events:    { bg: '#CC6600', light: '#FBF3E8' },
  retail:    { bg: '#CC0000', light: '#FAEAEA' },
}

export const portfolioItems = [
  /* ── Corporate (3) ──────────────────────────────────────────── */
  {
    id: 1,
    title: 'Annual Report 2024',
    sector: 'corporate',
    description: '48-page perfect-bound annual report on 130 GSM gloss stock with spot-UV cover, delivered to a Karachi-based manufacturing group.',
    imagePlaceholder: true,
  },
  {
    id: 2,
    title: 'Corporate Stationery Suite',
    sector: 'corporate',
    description: 'Full identity kit — business cards (400 GSM spot UV), letterheads, envelopes, and branded notepads — for a DHA law firm.',
    imagePlaceholder: true,
  },
  {
    id: 3,
    title: 'Company Profile Booklet',
    sector: 'corporate',
    description: '24-page saddle-stitched company profile with gloss lamination, printed in a 1,000-unit run for a SITE-area engineering firm.',
    imagePlaceholder: true,
  },

  /* ── Schools (2) ─────────────────────────────────────────────── */
  {
    id: 4,
    title: 'Back-to-School Stationery Pack',
    sector: 'schools',
    description: 'Branded exercise books, result cards, admission forms, and diaries for a Nazimabad private school network — 5,000-unit run.',
    imagePlaceholder: true,
  },
  {
    id: 5,
    title: 'University Prospectus',
    sector: 'schools',
    description: '36-page A4 prospectus with full-colour photography placeholders and matte lamination for a Karachi university admissions cycle.',
    imagePlaceholder: true,
  },

  /* ── Pharma (2) ──────────────────────────────────────────────── */
  {
    id: 6,
    title: 'Medication Labels — Bulk Run',
    sector: 'pharma',
    description: 'High-precision pharma-grade product labels with barcodes, compliance text, and sequential numbering for a pharmaceutical distributor.',
    imagePlaceholder: true,
  },
  {
    id: 7,
    title: 'Product Packaging Cartons',
    sector: 'pharma',
    description: 'Custom die-cut folding cartons for OTC medication packaging — printed on solid board with matte lamination and regulatory text.',
    imagePlaceholder: true,
  },

  /* ── Textile (2) ─────────────────────────────────────────────── */
  {
    id: 8,
    title: 'Fabric Catalogue 2024',
    sector: 'textile',
    description: '64-page A4 fabric catalogue with colour-accurate CMYK print for a Korangi textile export house, saddle-stitched with gloss cover.',
    imagePlaceholder: true,
  },
  {
    id: 9,
    title: 'Hang Tags & Woven Labels',
    sector: 'textile',
    description: 'Swing tags on 350 GSM board with spot-UV branding and gold foil, paired with printed woven-look inner labels for a garment brand.',
    imagePlaceholder: true,
  },

  /* ── Events (2) ──────────────────────────────────────────────── */
  {
    id: 10,
    title: 'Wedding Invitation Suite',
    sector: 'events',
    description: 'Luxury wedding cards on 300 GSM pearl-finish stock with gold foil stamping, matching envelopes, and RSVP inserts — 500 sets.',
    imagePlaceholder: true,
  },
  {
    id: 11,
    title: 'Corporate Event Collateral',
    sector: 'events',
    description: 'A5 event programmes, numbered tickets, and 24-hour rush A4 flyers for a Karachi business conference — 2,000-unit print run.',
    imagePlaceholder: true,
  },

  /* ── Retail (1) ──────────────────────────────────────────────── */
  {
    id: 12,
    title: 'Retail Packaging Range',
    sector: 'retail',
    description: 'Custom folding boxes, product labels, and sticker sheets for a consumer goods brand launching across Karachi retail outlets.',
    imagePlaceholder: true,
  },
]
