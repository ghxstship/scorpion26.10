# Typography System Update

## Overview
Updated the typography system to use the following font families:

- **Title**: ANTON
- **H1**: ANTON
- **H2-H6**: Bebas Neue
- **Body**: Share Tech
- **Mono**: Share Tech Mono
- **Subtitle**: Share Tech Mono

## Changes Made

### 1. Font Imports (`src/app/layout.tsx`)
- Added `Anton` font import
- Added `Share_Tech` font import
- Added `Share_Tech_Mono` font import
- Kept `Bebas_Neue` for headings H2-H6
- Applied all font variables to the body element

### 2. CSS Tokens (`src/design-system/tokens/tokens.css`)
Updated font family CSS variables:
```css
--font-title: var(--font-anton), Impact, sans-serif;
--font-h1: var(--font-anton), Impact, sans-serif;
--font-h2: var(--font-bebas), Impact, sans-serif;
--font-h3: var(--font-bebas), Impact, sans-serif;
--font-h4: var(--font-bebas), Impact, sans-serif;
--font-h5: var(--font-bebas), Impact, sans-serif;
--font-h6: var(--font-bebas), Impact, sans-serif;
--font-body: var(--font-share-tech), system-ui, sans-serif;
--font-sans: var(--font-share-tech), system-ui, sans-serif;
--font-mono: var(--font-share-tech-mono), Consolas, monospace;
--font-subtitle: var(--font-share-tech-mono), Consolas, monospace;
--font-display: var(--font-anton), Impact, sans-serif;
```

### 3. TypeScript Tokens (`src/design-system/tokens/primitives/typography.ts`)
Updated the typography object to include all new font families with proper type definitions.

### 4. Global Styles (`src/app/globals.css`)
Added global typography rules that automatically apply fonts to all elements:
```css
body {
  font-family: var(--font-body); /* Share Tech */
}

h1 {
  font-family: var(--font-h1); /* Anton */
}

h2, h3, h4, h5, h6 {
  font-family: var(--font-h2); /* Bebas Neue */
}

.subtitle,
[class*="subtitle"] {
  font-family: var(--font-subtitle); /* Share Tech Mono */
}

code, pre, kbd, samp {
  font-family: var(--font-mono); /* Share Tech Mono */
}
```

### 5. Component Updates
- Updated `HeroSection.tsx` to remove inline font-family styles (now handled globally)
- Stats numbers use Bebas Neue via inline style for consistency

## Usage

### Automatic Application
All headings, body text, code blocks, and subtitles now automatically use the correct fonts. No additional classes needed.

### Manual Override (if needed)
You can override fonts using CSS variables:
```tsx
<div style={{ fontFamily: 'var(--font-h2)' }}>Custom text</div>
```

Or using Tailwind utilities:
```tsx
<div className="font-[family-name:var(--font-mono)]">Monospace text</div>
```

## Font Fallbacks
All fonts include appropriate fallbacks:
- **Anton/Bebas Neue**: Falls back to Impact, then sans-serif
- **Share Tech**: Falls back to system-ui, then sans-serif
- **Share Tech Mono**: Falls back to Consolas, then monospace

## Testing
Build completed successfully with no errors. All fonts are loaded via Next.js Google Fonts integration for optimal performance.
