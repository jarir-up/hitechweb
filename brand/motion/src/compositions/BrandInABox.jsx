import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { NAVY, MAROON, TEAL, AMBER, PURPLE, GREEN, WHITE, FONTS, glass, glassDark, glassTeal, glassAmber, glassPurple, Chip, Stamp } from '../lib/ui.jsx';

const spr = (frame, fps, from, cfg = {}) =>
  spring({ frame: Math.max(0, frame - from), fps, config: { damping: 18, stiffness: 140, ...cfg } });

const PRODUCTS = [
  { name: 'Business Cards',     desc: '350gsm · Soft touch',   color: TEAL,   chipBg: 'rgba(13,155,160,0.16)',   chipBorder: 'rgba(13,155,160,0.32)',   chipColor: 'rgba(80,210,215,0.95)' },
  { name: 'Letterheads',        desc: 'A4 · Full colour',       color: AMBER,  chipBg: 'rgba(200,120,0,0.16)',    chipBorder: 'rgba(200,120,0,0.30)',    chipColor: 'rgba(255,185,70,0.95)' },
  { name: 'Flyers & Brochures', desc: 'A4/A5 · Both sides',     color: PURPLE, chipBg: 'rgba(123,79,160,0.16)',  chipBorder: 'rgba(123,79,160,0.30)',  chipColor: 'rgba(200,160,240,0.95)' },
  { name: 'Stickers & Labels',  desc: 'Custom cut · Digital',   color: GREEN,  chipBg: 'rgba(26,122,74,0.16)',   chipBorder: 'rgba(26,122,74,0.30)',   chipColor: 'rgba(60,200,120,0.95)' },
];

export const BrandInABox = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blur = interpolate(frame, [0, 20], [10, 0], { extrapolateRight: 'clamp' });
  const op   = interpolate(frame, [0, 16], [0.55, 1], { extrapolateRight: 'clamp' });

  const glowR = frame > 35 ? 0.12 + 0.05 * Math.sin((frame - 35) * 0.03) : 0.12;
  const glowT = frame > 35 ? 0.08 + 0.04 * Math.sin((frame - 35) * 0.035 + 1.2) : 0.08;
  const glowA = frame > 35 ? 0.07 + 0.03 * Math.sin((frame - 35) * 0.04 + 2.4) : 0.07;

  // Maroon rule draws fast
  const ruleH = interpolate(frame, [0, 30], [0, 860], { extrapolateRight: 'clamp' });

  // Card slides in
  const cardX = interpolate(spr(frame, fps, 0, { damping: 20, stiffness: 110 }), [0, 1], [-24, 0]);

  // Headlines
  const h1Y = interpolate(spr(frame, fps, 2,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h1O = interpolate(frame, [0, 12],  [0.3, 1], { extrapolateRight: 'clamp' });
  const h2Y = interpolate(spr(frame, fps, 6,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h2O = interpolate(frame, [4, 16],  [0.3, 1], { extrapolateRight: 'clamp' });

  // Product items stagger
  const ITEM_START = 18;
  const ITEM_GAP   = 12;

  // Divider + tag
  const divW     = interpolate(frame, [12, 36], [0, 1], { extrapolateRight: 'clamp' });
  const tagO     = interpolate(frame, [24, 42], [0, 1], { extrapolateRight: 'clamp' });

  // Phone mockup
  const phoneY = interpolate(spr(frame, fps, 3, { damping: 20, stiffness: 100 }), [0, 1], [22, 0]);
  const floatY = frame > 50 ? 5 * Math.sin((frame - 50) * 0.026) : 0;

  // Portfolio card + stamp
  const portO  = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });
  const portY  = interpolate(spr(frame, fps, 40, { damping: 20, stiffness: 90 }), [0, 1], [18, 0]);
  const stampO = interpolate(frame, [56, 76], [0, 1], { extrapolateRight: 'clamp' });

  // Bottom chips
  const chip1O = interpolate(frame, [30, 48], [0, 1], { extrapolateRight: 'clamp' });
  const chip2O = interpolate(frame, [42, 60], [0, 1], { extrapolateRight: 'clamp' });
  const chip3O = interpolate(frame, [54, 72], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: NAVY, filter: `blur(${blur}px)`, opacity: op, overflow: 'hidden' }}>
      <style>{FONTS}</style>

      {/* ── Multi-color ambient glow ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 8% 80%, rgba(126,0,1,${glowR}) 0%, transparent 58%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 40% at 90% 20%, rgba(13,155,160,${glowT}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 40% 35% at 85% 85%, rgba(200,120,0,${glowA}) 0%, transparent 52%)` }} />

      {/* ── Top bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '44px 54px 0', zIndex: 20,
      }}>
        <Img src={staticFile('hitech-logo-inverted-nobg.png')}
          style={{ height: 76, width: 'auto', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
        <div style={{ ...glassTeal(0.13), padding: '8px 20px', borderRadius: 100 }}>
          <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 15,
            color: 'rgba(100,225,230,0.95)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Brand in a Box
          </span>
        </div>
      </div>

      {/* ── Maroon vertical rule ── */}
      <div style={{
        position: 'absolute', left: 52, top: 140,
        width: 5, height: ruleH,
        background: MAROON, borderRadius: 3, zIndex: 5,
      }} />

      {/* ── Main layout ── */}
      <div style={{
        position: 'absolute', top: 144, bottom: 44, left: 76, right: 44,
        display: 'flex', gap: 24, alignItems: 'stretch',
      }}>

        {/* LEFT — text content */}
        <div style={{
          flex: '0 0 494px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '8px 0 0 20px',
          transform: `translateX(${cardX}px)`,
        }}>
          {/* Headlines */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: 14,
              color: MAROON, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: 16 }}>
              One Address. Everything.
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 100,
                lineHeight: 0.87, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h1Y}px)`, opacity: h1O }}>
                Your Brand.
              </div>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 100,
                lineHeight: 0.87, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h2Y}px)`, opacity: h2O }}>
                One Address.
              </div>
            </div>
          </div>

          {/* Product list */}
          <div style={{
            ...glassDark(0.70),
            borderRadius: 18, overflow: 'hidden',
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(126,0,1,${glowR * 1.2}), 0 20px 50px rgba(0,0,0,0.5)`,
            marginBottom: 20,
            flex: 1,
          }}>
            {PRODUCTS.map((p, i) => {
              const f   = ITEM_START + i * ITEM_GAP;
              const iOp = interpolate(frame, [f, f + 14], [0, 1], { extrapolateRight: 'clamp' });
              const iX  = interpolate(frame, [f, f + 18], [-14, 0], { extrapolateRight: 'clamp' });
              return (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 22px',
                  borderBottom: i < PRODUCTS.length - 1 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  opacity: iOp, transform: `translateX(${iX}px)`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, opacity: 0.9, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                      fontSize: 24, color: WHITE, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      {p.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300,
                    fontSize: 13, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
                    {p.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Divider + URL */}
          <div>
            <div style={{ height: 1, marginBottom: 18,
              background: 'rgba(126,0,1,0.50)', width: `${divW * 100}%` }} />
            <div style={{ display: 'inline-flex',
              ...glass('rgba(255,255,255,0.07)', 'rgba(255,255,255,0.11)'),
              padding: '10px 22px', borderRadius: 100, width: 'fit-content', opacity: tagO }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 14,
                color: 'rgba(255,255,255,0.58)', letterSpacing: '0.04em' }}>
                hitechprinters.com.pk
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — phone + extras */}
        <div style={{ flex: 1, position: 'relative' }}>

          {/* Portfolio card — top right */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 172, height: 116,
            borderRadius: 14, overflow: 'hidden',
            opacity: portO, transform: `translateY(${portY}px)`,
            ...glassDark(0.5),
            boxShadow: `0 0 0 1px rgba(200,120,0,0.28), 0 16px 40px rgba(0,0,0,0.5)`,
            zIndex: 5,
          }}>
            <Img src={staticFile('owner-card.webp')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 35%, rgba(14,24,42,0.75) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 9, left: 12,
              fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 11,
              color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
              Est. 20+ Years
            </span>
          </div>

          {/* Stamp — overlaid on phone screen center */}
          <div style={{ position: 'absolute', top: 240, left: 174, zIndex: 10, opacity: stampO }}>
            <Stamp line1="20+" line2="years" color={AMBER} size={94} rotation={14} />
          </div>

          {/* Phone — homepage */}
          <div style={{
            position: 'absolute', top: '4%', left: '50%', transform: `translateX(-50%) translateY(${phoneY + floatY}px)`,
            width: 244, height: 488, zIndex: 2,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 38, overflow: 'hidden', position: 'relative',
              background: '#060E1A',
              boxShadow: `0 0 0 1px rgba(126,0,1,${glowR * 2}), 0 0 0 2px rgba(200,120,0,${glowA * 0.9}), 0 40px 90px rgba(0,0,0,0.70), inset 0 1px 0 rgba(255,255,255,0.12)`,
              border: '1px solid rgba(255,255,255,0.13)',
            }}>
              {/* Notch */}
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                width: 64, height: 7, borderRadius: 4, background: '#040A14', zIndex: 10 }} />
              {/* Screenshot — mobile */}
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#060E1A' }}>
                <Img src={staticFile('home-mobile.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              {/* Glare */}
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)' }} />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 55%, rgba(6,12,24,0.50) 100%)' }} />
            </div>
          </div>

          {/* Bottom chips */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <div style={{ opacity: chip1O }}>
              <Chip label="Offset + Digital" bg="rgba(126,0,1,0.16)" border="rgba(200,60,60,0.30)" color="rgba(255,140,140,0.95)" fontSize={12} />
            </div>
            <div style={{ opacity: chip2O }}>
              <Chip label="S.I.T.E Karachi" bg="rgba(200,120,0,0.15)" border="rgba(200,120,0,0.28)" color="rgba(255,190,80,0.95)" fontSize={12} />
            </div>
            <div style={{ opacity: chip3O }}>
              <Chip label="WhatsApp Ready" bg="rgba(26,122,74,0.16)" border="rgba(37,211,102,0.28)" color="rgba(60,200,120,0.95)" fontSize={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Handle */}
      <div style={{ position: 'absolute', bottom: 14, right: 54, opacity: tagO,
        fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 16,
        color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
        @hitechprinterskhi
      </div>
    </AbsoluteFill>
  );
};
