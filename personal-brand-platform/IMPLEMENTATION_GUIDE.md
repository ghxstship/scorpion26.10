# UI Normalization Implementation Guide
**Bold Spartan Warrior Aesthetic - Step-by-Step Implementation**

---

## 🚀 Quick Start

### Phase 1: Foundation (Week 1-2)
1. Update color tokens
2. Update typography tokens
3. Test contrast ratios
4. Update theme files

### Phase 2: Core Components (Week 3-4)
1. Buttons
2. Forms
3. Cards
4. Navigation

### Phase 3: Pages (Week 5-6)
1. Homepage
2. Product pages
3. About pages
4. Blog pages

---

## 📋 STEP-BY-STEP IMPLEMENTATION

### STEP 1: Update Color Tokens (Day 1)

#### 1.1 Update Primitive Colors
**File:** `/src/design-system/tokens/primitives/colors.ts`

```typescript
export const primitiveColors = {
  // Greyscale Foundation
  grey: {
    950: '#000000',  // Pure black
    900: '#0A0A0A',  // Deep charcoal
    850: '#141414',  // Dark charcoal
    800: '#1A1A1A',  // Charcoal
    700: '#2A2A2A',  // Dark grey
    600: '#404040',  // Medium-dark grey
    500: '#5A5A5A',  // Medium grey
    400: '#7A7A7A',  // Light-medium grey
    300: '#A0A0A0',  // Light grey
    200: '#C8C8C8',  // Very light grey
    100: '#E8E8E8',  // Off-white
    50: '#F5F5F5',   // Near-white
  },
  
  // Deep Red Accents (Spartan Blood)
  red: {
    900: '#8B0000',  // Blood red
    800: '#A00000',  // Deep crimson
    700: '#B50000',  // Crimson (primary)
    600: '#C80000',  // Rich red
    500: '#DC0000',  // Primary red
    400: '#E61A1A',  // Bright red
    300: '#F04040',  // Light red
  },
  
  // Gold Accents (Spartan Glory)
  gold: {
    900: '#6B4E00',  // Deep bronze
    800: '#8B6500',  // Dark gold
    700: '#B8860B',  // Antique gold
    600: '#D4AF37',  // Rich gold (primary)
    500: '#FFD700',  // Primary gold
    400: '#FFE44D',  // Bright gold
    300: '#FFF099',  // Light gold
  },
} as const;
```

#### 1.2 Update Semantic Colors
**File:** `/src/design-system/tokens/semantic/colors.ts`

```typescript
import { primitiveColors } from '../primitives/colors';

export const semanticColors = {
  // Interactive elements
  interactive: {
    primary: {
      default: primitiveColors.red[700],
      hover: primitiveColors.red[600],
      active: primitiveColors.red[800],
      disabled: primitiveColors.grey[600],
    },
    secondary: {
      default: primitiveColors.gold[600],
      hover: primitiveColors.gold[500],
      active: primitiveColors.gold[700],
      disabled: primitiveColors.grey[600],
    },
    tertiary: {
      default: 'transparent',
      hover: primitiveColors.grey[800],
      active: primitiveColors.grey[700],
      disabled: primitiveColors.grey[600],
    },
  },
  
  // Status indicators
  status: {
    success: {
      default: primitiveColors.gold[600],
      bg: 'rgba(212, 175, 55, 0.1)',
      border: primitiveColors.gold[700],
      text: primitiveColors.gold[600],
    },
    error: {
      default: primitiveColors.red[600],
      bg: 'rgba(200, 0, 0, 0.1)',
      border: primitiveColors.red[700],
      text: primitiveColors.red[600],
    },
    warning: {
      default: primitiveColors.gold[500],
      bg: 'rgba(255, 215, 0, 0.1)',
      border: primitiveColors.gold[600],
      text: primitiveColors.gold[500],
    },
    info: {
      default: primitiveColors.grey[300],
      bg: 'rgba(160, 160, 160, 0.1)',
      border: primitiveColors.grey[400],
      text: primitiveColors.grey[300],
    },
  },
  
  // Text colors
  text: {
    primary: primitiveColors.grey[100],
    secondary: primitiveColors.grey[300],
    tertiary: primitiveColors.grey[400],
    disabled: primitiveColors.grey[600],
    inverse: primitiveColors.grey[950],
    brand: primitiveColors.gold[600],
    success: primitiveColors.gold[600],
    error: primitiveColors.red[600],
  },
  
  // Surface colors
  surface: {
    primary: primitiveColors.grey[950],
    secondary: primitiveColors.grey[900],
    tertiary: primitiveColors.grey[850],
    raised: primitiveColors.grey[800],
    overlay: 'rgba(0, 0, 0, 0.85)',
  },
  
  // Border colors
  border: {
    default: primitiveColors.grey[700],
    strong: primitiveColors.grey[600],
    subtle: primitiveColors.grey[900],
    brand: primitiveColors.gold[600],
    focus: primitiveColors.gold[600],
    error: primitiveColors.red[600],
    success: primitiveColors.gold[600],
  },
} as const;
```

#### 1.3 Update CSS Variables
**File:** `/src/design-system/tokens/tokens.css`

Update the `:root` section with new color values:

```css
:root {
  /* Greyscale */
  --grey-950: #000000;
  --grey-900: #0A0A0A;
  --grey-850: #141414;
  --grey-800: #1A1A1A;
  --grey-700: #2A2A2A;
  --grey-600: #404040;
  --grey-500: #5A5A5A;
  --grey-400: #7A7A7A;
  --grey-300: #A0A0A0;
  --grey-200: #C8C8C8;
  --grey-100: #E8E8E8;
  --grey-50: #F5F5F5;
  
  /* Deep Red */
  --red-900: #8B0000;
  --red-800: #A00000;
  --red-700: #B50000;
  --red-600: #C80000;
  --red-500: #DC0000;
  --red-400: #E61A1A;
  --red-300: #F04040;
  
  /* Gold */
  --gold-900: #6B4E00;
  --gold-800: #8B6500;
  --gold-700: #B8860B;
  --gold-600: #D4AF37;
  --gold-500: #FFD700;
  --gold-400: #FFE44D;
  --gold-300: #FFF099;
  
  /* Semantic - Interactive */
  --color-interactive-primary: var(--red-700);
  --color-interactive-primary-hover: var(--red-600);
  --color-interactive-primary-active: var(--red-800);
  --color-interactive-primary-disabled: var(--grey-600);
  
  --color-interactive-secondary: var(--gold-600);
  --color-interactive-secondary-hover: var(--gold-500);
  --color-interactive-secondary-active: var(--gold-700);
  --color-interactive-secondary-disabled: var(--grey-600);
  
  /* Semantic - Text */
  --color-text-primary: var(--grey-100);
  --color-text-secondary: var(--grey-300);
  --color-text-tertiary: var(--grey-400);
  --color-text-disabled: var(--grey-600);
  --color-text-inverse: var(--grey-950);
  --color-text-brand: var(--gold-600);
  
  /* Semantic - Surface */
  --color-surface-primary: var(--grey-950);
  --color-surface-secondary: var(--grey-900);
  --color-surface-tertiary: var(--grey-850);
  --color-surface-raised: var(--grey-800);
  --color-surface-overlay: rgba(0, 0, 0, 0.85);
  
  /* Semantic - Border */
  --color-border-default: var(--grey-700);
  --color-border-strong: var(--grey-600);
  --color-border-subtle: var(--grey-900);
  --color-border-focus: var(--gold-600);
  --color-border-error: var(--red-600);
  --color-border-success: var(--gold-600);
  
  /* Glow Effects */
  --glow-red: 0 0 20px rgba(181, 0, 0, 0.5);
  --glow-red-strong: 0 0 40px rgba(181, 0, 0, 0.3);
  --glow-gold: 0 0 20px rgba(212, 175, 55, 0.5);
  --glow-gold-strong: 0 0 40px rgba(255, 215, 0, 0.3);
  --glow-white: 0 0 40px rgba(255, 255, 255, 0.1);
}
```

---

### STEP 2: Update Typography (Day 2)

#### 2.1 Add Display Font
**File:** `/src/app/layout.tsx` or font configuration

```typescript
import { Inter, Bebas_Neue } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas',
});

// In your HTML
<html className={`${inter.variable} ${bebasNeue.variable}`}>
```

#### 2.2 Update Typography Tokens
**File:** `/src/design-system/tokens/primitives/typography.ts`

```typescript
export const typography = {
  fontFamily: {
    sans: 'var(--font-inter), system-ui, sans-serif',
    display: 'var(--font-bebas), Impact, sans-serif',
    mono: 'var(--font-jetbrains-mono), Consolas, monospace',
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
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.15em',
  },
} as const;
```

#### 2.3 Update CSS Typography Variables
**File:** `/src/design-system/tokens/tokens.css`

```css
:root {
  /* Font Families */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-bebas), Impact, sans-serif;
  --font-mono: var(--font-jetbrains-mono), Consolas, monospace;
  
  /* Letter Spacing for Display Text */
  --letter-spacing-display: 0.1em;
  --letter-spacing-heading: 0.05em;
}
```

---

### STEP 3: Update Button Component (Day 3)

#### 3.1 Button Styles
**File:** `/src/components/ui/Button/Button.module.css`

```css
.button {
  /* Base styles */
  font-family: var(--font-display);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  border-radius: var(--radius-sm);
  transition: all var(--duration-fast) var(--easing-out);
  border: 2px solid transparent;
  cursor: pointer;
  min-height: 44px;
  padding: var(--space-3) var(--space-8);
  font-size: var(--font-size-sm);
  
  /* Focus state */
  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Primary Variant (Red - Call to Arms) */
.button[data-variant="primary"] {
  background: linear-gradient(135deg, var(--red-700) 0%, var(--red-800) 100%);
  color: var(--grey-50);
  border-color: var(--red-900);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, var(--red-600) 0%, var(--red-700) 100%);
    box-shadow: var(--glow-red);
    transform: scale(1.02);
  }
  
  &:active:not(:disabled) {
    background: var(--red-800);
    transform: scale(0.98);
  }
}

/* Secondary Variant (Gold - Shield) */
.button[data-variant="secondary"] {
  background: transparent;
  color: var(--gold-600);
  border-color: var(--gold-600);
  
  &:hover:not(:disabled) {
    background: var(--gold-600);
    color: var(--grey-950);
    box-shadow: var(--glow-gold);
  }
  
  &:active:not(:disabled) {
    background: var(--gold-700);
    border-color: var(--gold-700);
  }
}

/* Tertiary Variant (Ghost) */
.button[data-variant="tertiary"] {
  background: transparent;
  color: var(--grey-200);
  border-color: var(--grey-600);
  
  &:hover:not(:disabled) {
    background: var(--grey-800);
    border-color: var(--grey-500);
  }
  
  &:active:not(:disabled) {
    background: var(--grey-700);
  }
}

/* Size Variants */
.button[data-size="sm"] {
  padding: var(--space-2) var(--space-6);
  font-size: var(--font-size-xs);
  min-height: 36px;
}

.button[data-size="md"] {
  padding: var(--space-3) var(--space-8);
  font-size: var(--font-size-sm);
  min-height: 44px;
}

.button[data-size="lg"] {
  padding: var(--space-4) var(--space-12);
  font-size: var(--font-size-base);
  min-height: 52px;
}
```

---

### STEP 4: Update Card Component (Day 4)

#### 4.1 Card Styles
**File:** `/src/components/ui/Card/Card.module.css`

```css
.card {
  background: var(--color-surface-tertiary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-base) var(--easing-out);
  overflow: hidden;
  
  &:hover {
    border-color: var(--gold-600);
    box-shadow: var(--glow-gold);
    transform: translateY(-2px);
  }
}

.cardHeader {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border-default);
  border-top: 2px solid var(--gold-600); /* Gold accent */
}

.cardTitle {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0;
}

.cardContent {
  padding: var(--space-6);
  color: var(--color-text-secondary);
}

.cardFooter {
  padding: var(--space-6);
  border-top: 1px solid var(--color-border-default);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---

### STEP 5: Update Navigation (Day 5)

#### 5.1 Navigation Styles
**File:** `/src/components/layout/Navigation/Navigation.module.css`

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--grey-800);
}

.navContainer {
  max-width: 1536px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-black);
  color: var(--gold-600);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  text-decoration: none;
  
  &:hover {
    color: var(--gold-500);
  }
}

.navLinks {
  display: flex;
  gap: var(--space-8);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navLink {
  font-family: var(--font-display);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--grey-200);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  text-decoration: none;
  padding: var(--space-2) 0;
  border-bottom: 3px solid transparent;
  transition: all var(--duration-fast) var(--easing-out);
  
  &:hover {
    color: var(--red-600);
  }
  
  &.active {
    color: var(--gold-600);
    border-bottom-color: var(--gold-600);
  }
}
```

---

### STEP 6: Update Hero Section (Day 6)

#### 6.1 Hero Styles
**File:** `/src/components/sections/Hero/Hero.module.css`

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--grey-950);
  overflow: hidden;
  
  /* Subtle texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/textures/grain.png');
    opacity: 0.03;
    pointer-events: none;
  }
}

.heroContent {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 1200px;
  padding: var(--space-8);
}

.heroTitle {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: var(--font-weight-black);
  color: var(--grey-50);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
  line-height: var(--line-height-none);
  margin: 0 0 var(--space-6) 0;
  text-shadow: var(--glow-white);
  
  /* Responsive */
  @media (min-width: 768px) {
    font-size: clamp(4rem, 12vw, 10rem);
  }
}

.heroSubtitle {
  font-family: var(--font-sans);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: var(--font-weight-medium);
  color: var(--gold-600);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0 0 var(--space-12) 0;
}

.heroCta {
  display: inline-flex;
  gap: var(--space-4);
}

.heroImage {
  position: absolute;
  inset: 0;
  z-index: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.2);
    opacity: 0.2;
  }
  
  /* Dark gradient overlay */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
}
```

---

### STEP 7: Update Product Card (Day 7)

#### 7.1 Product Card Styles (REDCON1 Inspired)
**File:** `/src/components/products/ProductCard/ProductCard.module.css`

```css
.productCard {
  background: var(--grey-850);
  border: 1px solid var(--grey-700);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: all var(--duration-base) var(--easing-out);
  
  &:hover {
    border-color: var(--gold-600);
    box-shadow: var(--glow-gold);
    transform: translateY(-4px);
    
    .productImage img {
      transform: scale(1.1);
    }
  }
}

.productImage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: var(--grey-900);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--easing-out);
  }
}

.productBadge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: var(--red-700);
  color: var(--grey-50);
  font-family: var(--font-display);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
}

.productInfo {
  padding: var(--space-6);
}

.productTitle {
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--grey-100);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0 0 var(--space-2) 0;
  
  /* Truncate long titles */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.productDescription {
  font-size: var(--font-size-sm);
  color: var(--grey-300);
  margin: 0 0 var(--space-4) 0;
  line-height: var(--line-height-relaxed);
  
  /* Limit to 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.productPrice {
  font-family: var(--font-display);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-black);
  color: var(--gold-600);
  margin: 0 0 var(--space-6) 0;
}

.productButton {
  width: 100%;
}
```

---

## 🧪 TESTING CHECKLIST

### After Each Component Update
- [ ] Test in Chrome, Firefox, Safari
- [ ] Test at mobile (375px)
- [ ] Test at tablet (768px)
- [ ] Test at desktop (1440px)
- [ ] Test keyboard navigation
- [ ] Test screen reader
- [ ] Verify color contrast (use browser DevTools)
- [ ] Check for console errors

### Validation Commands
```bash
# Validate design tokens
npx tsx scripts/validate-tokens.ts

# Validate accessibility
npx tsx scripts/validate-accessibility.ts

# Run all validations
npm run validate:all
```

---

## 📊 PROGRESS TRACKING

Create a simple progress tracker:

**File:** `/IMPLEMENTATION_PROGRESS.md`

```markdown
# Implementation Progress

## Week 1: Foundation
- [x] Color tokens updated
- [x] Typography tokens updated
- [x] CSS variables updated
- [ ] Theme files updated
- [ ] Validation passed

## Week 2: Core Components
- [ ] Button component
- [ ] Card component
- [ ] Form components
- [ ] Navigation component

## Week 3: Pages
- [ ] Homepage
- [ ] Product pages
- [ ] About pages
- [ ] Blog pages

## Week 4: Polish & Testing
- [ ] All validations passing
- [ ] Accessibility audit complete
- [ ] Performance optimization
- [ ] Final QA
```

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue: Colors not updating
**Solution:** Clear Next.js cache
```bash
rm -rf .next
npm run dev
```

### Issue: Fonts not loading
**Solution:** Check font configuration in `layout.tsx`

### Issue: Contrast ratio failures
**Solution:** Use lighter grey shades for text on dark backgrounds

### Issue: Components breaking
**Solution:** Update one component at a time, test thoroughly

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Next Review:** After Week 1 completion
