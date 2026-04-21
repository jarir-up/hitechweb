import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { NAVY, MAROON, TEAL, AMBER, PURPLE, GREEN, WHITE, FONTS, glass, glassDark, glassTeal, Chip, Stamp } from '../lib/ui.jsx';

const spr = (frame, fps, from, cfg = {}) =>
  spring({ frame: Math.max(0, frame - from), fps, config: { damping: 18, stiffness: 140, ...cfg } });

const PRODUCTS = [
  { name: 'Business Cards',     desc: '350gsm · Soft touch',   color: TEAL      },
  { name: 'Letterheads',        desc: 'A4 · Full colour',       color: AMBER     },
  { name: 'Flyers & Brochures', desc: 'A4/A5 · Both sides',     color: PURPLE    },
  { name: 'Stickers & Labels',  desc: 'Custom cut · Digital',   color: GREEN     },
  { name: 'Notepads',           desc: 'A5 · Custom cover',      color: '#E05480' },
  { name: 'Hang Tags',          desc: 'Custom shape · String',  color: '#3296DC' },
  { name: 'Swag Stickers',      desc: 'Die-cut · Waterproof',   color: '#DC6420' },
  { name: 'Social Media Mktg',  desc: 'Posts · Reels · Ads',    color: '#5064F0' },
];

export const BrandInABox = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blur = interpolate(frame, [0, 20], [10, 0], { extrapolateRight: 'clamp' });
  const op   = interpolate(frame, [0, 16], [0.55, 1], { extrapolateRight: 'clamp' });

  const glowR = frame > 35 ? 0.12 + 0.05 * Math.sin((frame - 35) * 0.03) : 0.12;
  const glowT = frame > 35 ? 0.08 + 0.04 * Math.sin((frame - 35) * 0.035 + 1.2) : 0.08;
  const glowA = frame > 35 ? 0.07 + 0.03 * Math.sin((frame - 35) * 0.04 + 2.4) : 0.07;

  const ruleH = interpolate(frame, [0, 30], [0, 860], { extrapolateRight: 'clamp' });
  const cardX = interpolate(spr(frame, fps, 0, { damping: 20, stiffness: 110 }), [0, 1], [-24, 0]);

  const h1Y = interpolate(spr(frame, fps, 2,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h1O = interpolate(frame, [0, 12],  [0.3, 1], { extrapolateRight: 'clamp' });
  const h2Y = interpolate(spr(frame, fps, 6,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h2O = interpolate(frame, [4, 16],  [0.3, 1], { extrapolateRight: 'clamp' });

  const ITEM_START = 18;
  const ITEM_GAP   = 12;

  const divW = interpolate(frame, [12, 36], [0, 1], { extrapolateRight: 'clamp' });
  const tagO = interpolate(frame, [24, 42], [0, 1], { extrapolateRight: 'clamp' });

  const tabletY = interpolate(spr(frame, fps, 3, { damping: 20, stiffness: 100 }), [0, 1], [22, 0]);
  const floatY  = frame > 50 ? 5 * Math.sin((frame - 50) * 0.026) : 0;
  // Tablet gets a static slide-in only — no float to keep the screenshot crisp
  // Portfolio card inherits the float instead
  const tabletScale = frame > 40 ? 1 + 0.003 * Math.sin((frame - 40) * 0.018) : 1;

  const portO  = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });
  const portY  = interpolate(spr(frame, fps, 40, { damping: 20, stiffness: 90 }), [0, 1], [18, 0]);
  const stampO = interpolate(frame, [56, 76], [0, 1], { extrapolateRight: 'clamp' });

  const chip1O = interpolate(frame, [30, 48], [0, 1], { extrapolateRight: 'clamp' });
  const chip2O = interpolate(frame, [42, 60], [0, 1], { extrapolateRight: 'clamp' });
  const chip3O = interpolate(frame, [54, 72], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: NAVY, filter: `blur(${blur}px)`, opacity: op, overflow: 'hidden' }}>
      <style>{FONTS}</style>

      {/* ── Ambient glow ── */}
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
        display: 'flex', gap: 28, alignItems: 'stretch',
      }}>

        {/* LEFT — text content */}
        <div style={{
          flex: '0 0 440px',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '8px 0 0 20px',
          transform: `translateX(${cardX}px)`,
        }}>
          {/* Headlines */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: 19,
              color: MAROON, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: 14 }}>
              Full Brand Kit · One Print Shop
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 104,
                lineHeight: 0.87, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h1Y}px)`, opacity: h1O }}>
                Print Bold.
              </div>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 6 }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 104,
                lineHeight: 0.87, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h2Y}px)`, opacity: h2O }}>
                Brand Loud.
              </div>
            </div>
          </div>

          {/* Product list — fills remaining height */}
          <div style={{
            ...glassDark(0.70),
            borderRadius: 18, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(126,0,1,${glowR * 1.2}), 0 20px 50px rgba(0,0,0,0.5)`,
            marginBottom: 16,
            flex: 1,
          }}>
            {PRODUCTS.map((p, i) => {
              const f   = ITEM_START + i * ITEM_GAP;
              const iOp = interpolate(frame, [f, f + 14], [0, 1], { extrapolateRight: 'clamp' });
              const iX  = interpolate(frame, [f, f + 18], [-14, 0], { extrapolateRight: 'clamp' });
              return (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flex: 1, padding: '0 20px',
                  borderBottom: i < PRODUCTS.length - 1 ? '1px solid rgba(255,255,255,0.055)' : 'none',
                  opacity: iOp, transform: `translateX(${iX}px)`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: p.color, opacity: 0.9, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700,
                      fontSize: 23, color: WHITE, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                      {p.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300,
                    fontSize: 18, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
                    {p.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Divider + URL */}
          <div>
            <div style={{ height: 1, marginBottom: 14,
              background: 'rgba(126,0,1,0.50)', width: `${divW * 100}%` }} />
            <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start',
              ...glass('rgba(255,255,255,0.07)', 'rgba(255,255,255,0.11)'),
              padding: '10px 20px', borderRadius: 14, width: 'fit-content', opacity: tagO }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 17,
                color: 'rgba(255,255,255,0.58)', letterSpacing: '0.04em' }}>
                hitechprinters.com.pk/calculator
              </span>
              <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 15,
                color: 'rgba(200,120,0,0.85)', letterSpacing: '0.10em', textTransform: 'uppercase',
                marginTop: 4 }}>
                ↑ tap Brand in a Box
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — tablet */}
        <div style={{ flex: 1, position: 'relative' }}>

          {/* Portfolio card — top right */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 152, height: 102,
            borderRadius: 12, overflow: 'hidden',
            opacity: portO, transform: `translateY(${portY + floatY}px)`,
            ...glassDark(0.5),
            boxShadow: `0 0 0 1px rgba(200,120,0,0.28), 0 16px 40px rgba(0,0,0,0.5)`,
            zIndex: 5,
          }}>
            <Img src={staticFile('owner-card.webp')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 35%, rgba(14,24,42,0.75) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10,
              fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 14,
              color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
              Est. 20+ Years
            </span>
          </div>

          {/* Stamp — 1 size up, 1 size left from previous */}
          <div style={{ position: 'absolute', top: 580, left: 70, zIndex: 10, opacity: stampO }}>
            <Stamp line1="Order" line2="Now!" color={AMBER} size={180} rotation={14} />
          </div>

          {/* Tablet — Brand in a Box packages (no float — keeps screenshot pixel-sharp) */}
          <div style={{
            position: 'absolute', top: 118, left: '50%',
            transform: `translateX(-50%) translateY(${tabletY}px) scale(${tabletScale})`,
            width: 490, height: 420, zIndex: 2,
            transformOrigin: 'center center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', position: 'relative',
              background: '#060E1A',
              boxShadow: `0 0 0 1px rgba(126,0,1,${glowR * 2.5}), 0 0 0 3px rgba(14,24,42,0.9), 0 40px 100px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.12)`,
              border: '2px solid rgba(255,255,255,0.16)',
            }}>
              {/* Top camera bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0,
                height: 24, background: 'rgba(4,10,20,0.98)', zIndex: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 34, height: 5, borderRadius: 3, background: '#020609' }} />
              </div>
              {/* Screenshot */}
              <div style={{ position: 'absolute', top: 24, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
                <Img src={staticFile('calculator-biab.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              {/* Edge glare */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)' }} />
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(180deg, transparent 60%, rgba(6,12,24,0.45) 100%)' }} />
            </div>
          </div>

          {/* Bottom chips */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <div style={{ opacity: chip1O }}>
              <Chip label="Offset + Digital" bg="rgba(126,0,1,0.16)" border="rgba(200,60,60,0.30)" color="rgba(255,140,140,0.95)" fontSize={16} />
            </div>
            <div style={{ opacity: chip2O }}>
              <Chip label="S.I.T.E Karachi" bg="rgba(200,120,0,0.15)" border="rgba(200,120,0,0.28)" color="rgba(255,190,80,0.95)" fontSize={16} />
            </div>
            <div style={{ opacity: chip3O }}>
              <Chip label="WhatsApp Ready" bg="rgba(26,122,74,0.16)" border="rgba(37,211,102,0.28)" color="rgba(60,200,120,0.95)" fontSize={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Handle */}
      <div style={{ position: 'absolute', bottom: 14, right: 54, opacity: tagO,
        fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 22,
        color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
        @hitechprinterskhi
      </div>
    </AbsoluteFill>
  );
};
