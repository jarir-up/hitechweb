// Shared UI primitives for Hitech Remotion compositions

export const NAVY    = '#0E182A';
export const NAVY2   = '#162035';
export const MAROON  = '#7E0001';
export const TEAL    = '#0D9BA0';
export const AMBER   = '#C87800';
export const PURPLE  = '#7B4FA0';
export const GREEN   = '#1A7A4A';
export const WHITE   = '#FFFFFF';

export const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;900&family=Barlow:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
`;

// Liquid glass panel
export const glass = (bg = 'rgba(255,255,255,0.07)', border = 'rgba(255,255,255,0.13)', extra = '') => ({
  background: bg,
  backdropFilter: 'blur(40px) saturate(200%)',
  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
  border: `1px solid ${border}`,
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.14),
    inset 0 -1px 0 rgba(0,0,0,0.14),
    0 24px 64px rgba(0,0,0,0.5)
    ${extra ? ', ' + extra : ''}
  `,
});

// Tinted glass variants
export const glassMaroon = (a = 0.12) =>
  glass(`rgba(126,0,1,${a})`, `rgba(126,0,1,${a * 1.5})`);
export const glassTeal = (a = 0.12) =>
  glass(`rgba(13,155,160,${a})`, `rgba(13,155,160,${a * 1.8})`);
export const glassAmber = (a = 0.12) =>
  glass(`rgba(200,120,0,${a})`, `rgba(200,120,0,${a * 1.8})`);
export const glassPurple = (a = 0.12) =>
  glass(`rgba(123,79,160,${a})`, `rgba(123,79,160,${a * 1.8})`);
export const glassDark = (a = 0.72) =>
  glass(`rgba(14,24,42,${a})`, 'rgba(255,255,255,0.11)');

// Spring helper
export { spring, interpolate } from 'remotion';
export const spr = (frame, fps, from, config = {}) => {
  const { spring } = require('remotion');
  return spring({ frame: Math.max(0, frame - from), fps, config: { damping: 18, stiffness: 140, ...config } });
};

// Floating chip / badge
export const Chip = ({ label, color = WHITE, bg = 'rgba(255,255,255,0.08)', border = 'rgba(255,255,255,0.12)', fontSize = 13 }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 7,
    background: bg, border: `1px solid ${border}`,
    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    borderRadius: 100, padding: '7px 16px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
  }}>
    <span style={{
      fontFamily: 'Barlow, sans-serif', fontWeight: 600,
      fontSize, color, textTransform: 'uppercase', letterSpacing: '0.10em',
    }}>
      {label}
    </span>
  </div>
);

// Circular stamp badge
export const Stamp = ({ line1, line2, color = MAROON, size = 110, rotation = -14 }) => (
  <div style={{
    width: size, height: size,
    border: `3px solid ${color}`,
    borderRadius: '50%',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    transform: `rotate(${rotation}deg)`,
    background: `${color}18`,
    backdropFilter: 'blur(8px)',
    boxShadow: `0 0 0 1px ${color}30, 0 0 20px ${color}25`,
    gap: 2,
  }}>
    <span style={{
      fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900,
      fontSize: size * 0.155, color, textTransform: 'uppercase',
      letterSpacing: '0.08em', lineHeight: 1.1, textAlign: 'center',
    }}>
      {line1}
    </span>
    {line2 && (
      <span style={{
        fontFamily: 'Barlow, sans-serif', fontWeight: 500,
        fontSize: size * 0.105, color, textTransform: 'uppercase',
        letterSpacing: '0.18em', lineHeight: 1, textAlign: 'center',
        opacity: 0.85,
      }}>
        {line2}
      </span>
    )}
  </div>
);
