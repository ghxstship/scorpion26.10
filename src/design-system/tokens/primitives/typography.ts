/**
 * Typography Tokens
 * Font families, sizes, weights, and related properties
 */

export const typography = {
  fontFamily: {
    title: 'var(--font-title), Impact, sans-serif',
    h1: 'var(--font-h1), Impact, sans-serif',
    h2: 'var(--font-h2), Impact, sans-serif',
    h3: 'var(--font-h3), Impact, sans-serif',
    h4: 'var(--font-h4), Impact, sans-serif',
    h5: 'var(--font-h5), Impact, sans-serif',
    h6: 'var(--font-h6), Impact, sans-serif',
    body: 'var(--font-body), system-ui, sans-serif',
    sans: 'var(--font-sans), system-ui, sans-serif',
    mono: 'var(--font-mono), Consolas, monospace',
    subtitle: 'var(--font-subtitle), Consolas, monospace',
    display: 'var(--font-display), Impact, sans-serif',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type Typography = typeof typography;
