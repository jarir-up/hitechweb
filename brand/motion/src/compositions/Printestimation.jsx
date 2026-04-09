import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { NAVY, MAROON, TEAL, AMBER, PURPLE, WHITE, FONTS, glass, glassDark, glassMaroon, glassTeal, glassAmber, Chip, Stamp } from '../lib/ui.jsx';

const spr = (frame, fps, from, cfg = {}) =>
  spring({ frame: Math.max(0, frame - from), fps, config: { damping: 18, stiffness: 140, ...cfg } });

export const Printestimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blur = interpolate(frame, [0, 20], [10, 0], { extrapolateRight: 'clamp' });
  const op   = interpolate(frame, [0, 16], [0.55, 1], { extrapolateRight: 'clamp' });

  const glowR = frame > 35 ? 0.13 + 0.06 * Math.sin((frame - 35) * 0.04) : 0.13;
  const glowT = frame > 35 ? 0.09 + 0.04 * Math.sin((frame - 35) * 0.035 + 1) : 0.09;

  // Card + phones
  const cardX   = interpolate(spr(frame, fps, 0, { damping: 20, stiffness: 110 }), [0, 1], [-28, 0]);
  const phone1X = interpolate(spr(frame, fps, 0, { damping: 20, stiffness: 110 }), [0, 1], [36, 0]);
  const phone2Y = interpolate(spr(frame, fps, 38, { damping: 20, stiffness: 90 }),  [0, 1], [28, 0]);
  const phone2O = interpolate(frame, [36, 56], [0, 1], { extrapolateRight: 'clamp' });

  const floatY = frame > 45 ? 5 * Math.sin((frame - 45) * 0.028) : 0;

  // Text cascade
  const h1Y = interpolate(spr(frame, fps, 2,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h1O = interpolate(frame, [0, 12],  [0.3, 1], { extrapolateRight: 'clamp' });
  const h2Y = interpolate(spr(frame, fps, 6,  { damping: 14, stiffness: 160 }), [0, 1], [28, 0]);
  const h2O = interpolate(frame, [4, 16],  [0.3, 1], { extrapolateRight: 'clamp' });
  const divW   = interpolate(frame, [8, 35],  [0, 1], { extrapolateRight: 'clamp' });
  const subO   = interpolate(frame, [10, 28], [0, 1], { extrapolateRight: 'clamp' });
  const subY   = interpolate(frame, [10, 28], [12, 0], { extrapolateRight: 'clamp' });

  // Badges stagger in
  const badge1O = interpolate(frame, [30, 48], [0, 1], { extrapolateRight: 'clamp' });
  const badge2O = interpolate(frame, [40, 58], [0, 1], { extrapolateRight: 'clamp' });
  const badge3O = interpolate(frame, [50, 68], [0, 1], { extrapolateRight: 'clamp' });
  const stampO  = interpolate(frame, [58, 78], [0, 1], { extrapolateRight: 'clamp' });

  // Portfolio card
  const portO = interpolate(frame, [44, 64], [0, 1], { extrapolateRight: 'clamp' });
  const portY = interpolate(spr(frame, fps, 44, { damping: 20, stiffness: 90 }), [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ background: NAVY, filter: `blur(${blur}px)`, opacity: op, overflow: 'hidden' }}>
      <style>{FONTS}</style>

      {/* ── Multi-color glow layers ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 65% 50% at 85% 60%, rgba(126,0,1,${glowR}) 0%, transparent 58%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 50% 40% at 10% 30%, rgba(13,155,160,${glowT}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 40% 35% at 50% 100%, rgba(123,79,160,0.07) 0%, transparent 55%)` }} />

      {/* ── Logo + tag bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '44px 54px 0', zIndex: 20,
      }}>
        <Img src={staticFile('hitech-logo-inverted-nobg.png')}
          style={{ height: 76, width: 'auto', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
        <div style={{ ...glassTeal(0.15), padding: '8px 20px', borderRadius: 100 }}>
          <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 15,
            color: 'rgba(100,225,230,0.95)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            The Printestimation
          </span>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{
        position: 'absolute', top: 144, bottom: 44, left: 44, right: 44,
        display: 'flex', gap: 20, alignItems: 'stretch',
      }}>

        {/* LEFT — liquid glass card */}
        <div style={{
          flex: '0 0 468px', borderRadius: 22, padding: '38px 42px 36px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          transform: `translateX(${cardX}px)`,
          ...glassDark(0.75),
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.14), 0 0 0 1px rgba(126,0,1,${glowR * 1.3}), 0 24px 64px rgba(0,0,0,0.55)`,
        }}>
          {/* Eyebrow */}
          <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: 13,
            color: MAROON, textTransform: 'uppercase', letterSpacing: '0.28em', marginBottom: 16 }}>
            Pakistan's First
          </div>

          {/* Headlines */}
          <div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 96,
                lineHeight: 0.88, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h1Y}px)`, opacity: h1O }}>
                No Calls.
              </div>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 96,
                lineHeight: 0.88, color: WHITE, textTransform: 'uppercase', letterSpacing: '-0.025em',
                transform: `translateY(${h2Y}px)`, opacity: h2O }}>
                No Haggling.
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, marginBottom: 20, background: 'rgba(126,0,1,0.55)', width: `${divW * 100}%` }} />

          {/* Sub */}
          <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 19, lineHeight: 1.55,
            color: 'rgba(255,255,255,0.55)', marginBottom: 24, opacity: subO, transform: `translateY(${subY}px)` }}>
            Real Karachi prices.<br />Instant. Online. Free.
          </div>

          {/* Chips row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 }}>
            <div style={{ opacity: badge1O }}>
              <Chip label="37+ Products" bg="rgba(13,155,160,0.16)" border="rgba(13,155,160,0.32)" color="rgba(80,210,215,0.95)" fontSize={12} />
            </div>
            <div style={{ opacity: badge2O }}>
              <Chip label="Instant Quote" bg="rgba(200,120,0,0.16)" border="rgba(200,120,0,0.30)" color="rgba(255,185,70,0.95)" fontSize={12} />
            </div>
            <div style={{ opacity: badge3O }}>
              <Chip label="Free Tool" bg="rgba(26,122,74,0.16)" border="rgba(26,122,74,0.30)" color="rgba(60,200,120,0.95)" fontSize={12} />
            </div>
          </div>

          {/* URL */}
          <div style={{ ...glass('rgba(255,255,255,0.08)', 'rgba(255,255,255,0.13)'),
            padding: '11px 22px', borderRadius: 100, display: 'inline-flex', width: 'fit-content', opacity: subO }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 13,
              color: 'rgba(255,255,255,0.65)', letterSpacing: '0.03em' }}>
              hitechprinters.com.pk/calculator
            </span>
          </div>
        </div>

        {/* RIGHT — phones + extras */}
        <div style={{ flex: 1, position: 'relative' }}>

          {/* Portfolio mini-card — top right */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 168, height: 112,
            borderRadius: 14, overflow: 'hidden',
            opacity: portO, transform: `translateY(${portY}px)`,
            ...glassDark(0.5),
            boxShadow: `0 0 0 1px rgba(13,155,160,0.25), 0 16px 40px rgba(0,0,0,0.5)`,
            zIndex: 5,
          }}>
            <Img src={staticFile('biz-card-deck.webp')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(14,24,42,0.70) 100%)' }} />
            <span style={{ position: 'absolute', bottom: 9, left: 12,
              fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: 11,
              color: 'rgba(255,255,255,0.70)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
              Our Work
            </span>
          </div>

          {/* Stamp — left of phones, shifted down */}
          <div style={{ position: 'absolute', top: '58%', left: 14, zIndex: 10, opacity: stampO }}>
            <Stamp line1="First" line2="in Pakistan" color={TEAL} size={96} rotation={-12} />
          </div>

          {/* Back phone — homepage mobile, tilted */}
          <div style={{
            position: 'absolute', top: '12%', right: 4,
            width: 205, height: 410,
            opacity: phone2O, transform: `translateY(${phone2Y}px) rotate(5deg)`,
            zIndex: 1,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 28, overflow: 'hidden', position: 'relative',
              ...glassDark(0.4),
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 20px 55px rgba(0,0,0,0.55)',
            }}>
              <Img src={staticFile('home-mobile.png')}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,24,42,0.20)' }} />
            </div>
          </div>

          {/* Front phone — calculator, prominent */}
          <div style={{
            position: 'absolute', top: '5%', left: 12,
            width: 242, height: 484,
            transform: `translateX(${phone1X}px) translateY(${floatY}px)`,
            zIndex: 2,
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', position: 'relative',
              background: '#060E1A',
              boxShadow: `0 0 0 1px rgba(126,0,1,${glowR * 2}), 0 0 0 2px rgba(13,155,160,${glowT * 0.8}), 0 40px 90px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.12)`,
              border: '1px solid rgba(255,255,255,0.13)',
            }}>
              {/* Notch */}
              <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                width: 64, height: 7, borderRadius: 4, background: '#040A14', zIndex: 10 }} />
              {/* Screenshot — mobile fit */}
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#0B1523' }}>
                <Img src={staticFile('calculator-mobile.png')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
              </div>
              {/* Glare */}
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)' }} />
            </div>
          </div>

          {/* Bottom stat chips — moved up */}
          <div style={{
            position: 'absolute', bottom: 140, left: 0, right: 0,
            display: 'flex', gap: 10, justifyContent: 'center',
          }}>
            <div style={{ opacity: badge1O }}>
              <Chip label="2–3 Day Turnaround" bg="rgba(123,79,160,0.16)" border="rgba(123,79,160,0.30)" color="rgba(200,160,240,0.95)" fontSize={12} />
            </div>
            <div style={{ opacity: badge3O }}>
              <Chip label="WhatsApp Confirm" bg="rgba(26,122,74,0.16)" border="rgba(37,211,102,0.28)" color="rgba(60,200,120,0.95)" fontSize={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Handle */}
      <div style={{ position: 'absolute', bottom: 14, right: 54, opacity: subO,
        fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 16,
        color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
        @hitechprinterskhi
      </div>
    </AbsoluteFill>
  );
};
