import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { NAVY, MAROON, TEAL, AMBER, WHITE, FONTS, glass, glassDark, Chip, Stamp } from '../lib/ui.jsx';

const spr = (frame, fps, from, cfg = {}) =>
  spring({ frame: Math.max(0, frame - from), fps, config: { damping: 18, stiffness: 140, ...cfg } });

export const WebsiteLaunch = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blur  = interpolate(frame, [0, 22], [10, 0], { extrapolateRight: 'clamp' });
  const op    = interpolate(frame, [0, 18], [0.55, 1], { extrapolateRight: 'clamp' });

  const tabletY   = interpolate(spr(frame, fps, 0, { damping: 22, stiffness: 110 }), [0, 1], [28, 0]);
  const overlayY  = interpolate(spr(frame, fps, 8, { damping: 20, stiffness: 130 }), [0, 1], [26, 0]);
  const headScale = 0.96 + 0.04 * spr(frame, fps, 5, { damping: 16, stiffness: 160 });
  const headOp    = interpolate(frame, [0, 14], [0.45, 1], { extrapolateRight: 'clamp' });
  const urlOp     = interpolate(frame, [12, 30], [0, 1], { extrapolateRight: 'clamp' });
  const lineW     = interpolate(frame, [4, 30], [0, 1], { extrapolateRight: 'clamp' });
  const chipOp1   = interpolate(frame, [28, 44], [0, 1], { extrapolateRight: 'clamp' });
  const chipOp2   = interpolate(frame, [36, 52], [0, 1], { extrapolateRight: 'clamp' });
  const chipOp3   = interpolate(frame, [44, 60], [0, 1], { extrapolateRight: 'clamp' });
  const stampOp   = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: 'clamp' });

  const glowR  = frame > 40 ? 0.14 + 0.06 * Math.sin((frame - 40) * 0.03) : 0.14;
  const glowT  = frame > 40 ? 0.08 + 0.04 * Math.sin((frame - 40) * 0.04 + 1) : 0.08;
  const floatY = frame > 50 ? 4 * Math.sin((frame - 50) * 0.025) : 0;

  return (
    <AbsoluteFill style={{ background: NAVY, filter: `blur(${blur}px)`, opacity: op, overflow: 'hidden' }}>
      <style>{FONTS}</style>

      {/* ── Multi-color ambient glow ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 70% 50% at 15% 90%, rgba(126,0,1,${glowR * 1.4}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 55% 40% at 85% 15%, rgba(13,155,160,${glowT}) 0%, transparent 55%)` }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 40% 30% at 85% 85%, rgba(200,120,0,0.06) 0%, transparent 50%)` }} />

      {/* ── Logo + handle ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '44px 54px 0', zIndex: 20,
      }}>
        <Img src={staticFile('hitech-logo-inverted-nobg.png')}
          style={{ height: 76, width: 'auto', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.6))' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: 'Barlow, sans-serif', fontWeight: 400,
            fontSize: 22, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em',
          }}>@hitechprinterskhi</span>
        </div>
      </div>

      {/* ── Full-width tablet mockup ── */}
      <div style={{
        position: 'absolute', top: 150, left: 46, right: 46, height: 572,
        transform: `translateY(${tabletY + floatY}px)`, zIndex: 5,
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: 24, overflow: 'hidden', position: 'relative',
          ...glassDark(0.35),
          boxShadow: `0 0 0 1px rgba(126,0,1,${glowR * 1.8}), 0 0 0 2px rgba(13,155,160,${glowT}), 0 50px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.16)`,
          border: '1px solid rgba(255,255,255,0.14)',
        }}>
          {/* Browser chrome */}
          <div style={{
            height: 34, background: 'rgba(6,12,24,0.96)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, flexShrink: 0,
          }}>
            {[MAROON, `rgba(200,120,0,0.80)`, `rgba(26,122,74,0.75)`].map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1, marginLeft: 12, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: 6, height: 20,
              display: 'flex', alignItems: 'center', padding: '0 10px',
            }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.40)' }}>
                hitechprinters.com.pk
              </span>
            </div>
          </div>
          {/* Screenshot — full width, top-aligned */}
          <div style={{ width: '100%', height: 'calc(100% - 34px)', overflow: 'hidden', background: '#060E1A' }}>
            <Img src={staticFile('home-desktop.png')}
              style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(6,12,24,0.45) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* ── Floating chips — below tablet, clear space ── */}
      <div style={{ position: 'absolute', top: 752, right: 56, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 15 }}>
        <div style={{ opacity: chipOp1 }}>
          <Chip label="20+ Years" bg="rgba(13,155,160,0.18)" border="rgba(13,155,160,0.35)" color={`rgba(100,220,225,0.95)`} fontSize={13} />
        </div>
        <div style={{ opacity: chipOp2 }}>
          <Chip label="Offset + Digital" bg="rgba(126,0,1,0.18)" border="rgba(200,60,60,0.35)" color="rgba(255,140,140,0.95)" fontSize={13} />
        </div>
        <div style={{ opacity: chipOp3 }}>
          <Chip label="S.I.T.E Karachi" bg="rgba(200,120,0,0.15)" border="rgba(200,120,0,0.30)" color="rgba(255,190,80,0.95)" fontSize={13} />
        </div>
      </div>

      {/* ── Stamp — centered on tablet screen ── */}
      <div style={{ position: 'absolute', top: 361, left: 465, zIndex: 15, opacity: stampOp }}>
        <Stamp line1="Now" line2="Online" color={TEAL} size={150} rotation={-10} />
      </div>

      {/* ── Bottom glass bar ── */}
      <div style={{
        position: 'absolute', bottom: 44, left: 46, right: 46,
        borderRadius: 18, padding: '24px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transform: `translateY(${overlayY}px)`, zIndex: 20,
        ...glassDark(0.80),
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.13), 0 -1px 0 rgba(126,0,1,0.15), 0 20px 60px rgba(0,0,0,0.45)`,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ height: 3, width: `${lineW * 88}px`, background: MAROON, borderRadius: 2, marginBottom: 12 }} />
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
            fontSize: 80, lineHeight: 0.88, color: WHITE,
            textTransform: 'uppercase', letterSpacing: '-0.02em',
            transform: `scale(${headScale})`, transformOrigin: 'left center', opacity: headOp,
          }}>
            We're Online.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, opacity: urlOp }}>
          <div style={{ ...glass('rgba(255,255,255,0.09)', 'rgba(255,255,255,0.14)'), padding: '10px 22px', borderRadius: 100 }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 18, color: 'rgba(255,255,255,0.80)', letterSpacing: '0.03em' }}>
              hitechprinters.com.pk
            </span>
          </div>
          <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.30)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
            Karachi · Est. 20+ Years
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
