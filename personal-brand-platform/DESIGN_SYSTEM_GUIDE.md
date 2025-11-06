# Design System Implementation Guide

Complete guide for using the atomic design system with zero hardcoded values.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Design Tokens](#design-tokens)
3. [Component Guidelines](#component-guidelines)
4. [Accessibility](#accessibility)
5. [Internationalization](#internationalization)
6. [Data Compliance](#data-compliance)
7. [Validation](#validation)

---

## Quick Start

### Using Design Tokens in CSS

```css
/* ❌ FORBIDDEN - Hardcoded values */
.button {
  padding: 12px 24px;
  background-color: #6366F1;
  border-radius: 8px;
  font-size: 14px;
}

/* ✅ REQUIRED - Token-based */
.button {
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-interactive-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
}
```

### Using Design Tokens in TypeScript

```typescript
import { tokens } from '@/design-system/tokens';

// Access tokens programmatically
const primaryColor = tokens.light.colors.interactive.primary.default;
const spacing = tokens.light.spacing[4];
const fontSize = tokens.light.typography.fontSize.base;
```

---

## Design Tokens

### Color Tokens

#### Interactive Colors
```css
/* Primary actions (buttons, links) */
--color-interactive-primary
--color-interactive-primary-hover
--color-interactive-primary-active
--color-interactive-primary-disabled

/* Secondary actions */
--color-interactive-secondary
--color-interactive-secondary-hover
--color-interactive-secondary-active
--color-interactive-secondary-disabled

/* Tertiary/ghost actions */
--color-interactive-tertiary
--color-interactive-tertiary-hover
--color-interactive-tertiary-active
--color-interactive-tertiary-disabled
```

#### Status Colors
```css
/* Success states */
--color-status-success
--color-status-success-bg
--color-status-success-border
--color-status-success-text

/* Error states */
--color-status-error
--color-status-error-bg
--color-status-error-border
--color-status-error-text

/* Warning states */
--color-status-warning
--color-status-warning-bg
--color-status-warning-border
--color-status-warning-text

/* Info states */
--color-status-info
--color-status-info-bg
--color-status-info-border
--color-status-info-text
```

#### Text Colors
```css
--color-text-primary      /* Main body text */
--color-text-secondary    /* Supporting text */
--color-text-tertiary     /* Subtle text */
--color-text-disabled     /* Disabled state */
--color-text-inverse      /* Text on dark backgrounds */
--color-text-brand        /* Brand-colored text */
```

#### Surface Colors
```css
--color-surface-primary    /* Main background */
--color-surface-secondary  /* Cards, panels */
--color-surface-tertiary   /* Nested elements */
--color-surface-raised     /* Elevated elements */
--color-surface-overlay    /* Modal backdrops */
```

#### Border Colors
```css
--color-border-default
--color-border-strong
--color-border-subtle
--color-border-brand
--color-border-focus
--color-border-error
--color-border-success
--color-border-warning
```

### Spacing Tokens

Based on 4px grid system:

```css
--space-0    /* 0 */
--space-px   /* 1px */
--space-1    /* 4px */
--space-2    /* 8px */
--space-3    /* 12px */
--space-4    /* 16px */
--space-6    /* 24px */
--space-8    /* 32px */
--space-12   /* 48px */
--space-16   /* 64px */
--space-24   /* 96px */
/* ... up to --space-96 (384px) */
```

### Typography Tokens

```css
/* Font Families */
--font-sans
--font-serif
--font-mono
--font-display

/* Font Sizes */
--font-size-xs    /* 12px */
--font-size-sm    /* 14px */
--font-size-base  /* 16px */
--font-size-lg    /* 18px */
--font-size-xl    /* 20px */
--font-size-2xl   /* 24px */
/* ... up to --font-size-9xl (128px) */

/* Font Weights */
--font-weight-normal
--font-weight-medium
--font-weight-semibold
--font-weight-bold

/* Line Heights */
--line-height-tight
--line-height-normal
--line-height-relaxed
--line-height-loose
```

### Shadow Tokens

```css
--shadow-xs
--shadow-sm
--shadow-base
--shadow-md
--shadow-lg
--shadow-xl
--shadow-2xl
--shadow-inner
```

### Border Radius Tokens

```css
--radius-none
--radius-sm
--radius-base
--radius-md
--radius-lg
--radius-xl
--radius-2xl
--radius-3xl
--radius-full
```

### Transition Tokens

```css
/* Durations */
--duration-instant  /* 0ms */
--duration-fast     /* 150ms */
--duration-base     /* 250ms */
--duration-slow     /* 350ms */
--duration-slower   /* 500ms */

/* Easing Functions */
--easing-linear
--easing-in
--easing-out
--easing-in-out
--easing-spring
```

### Z-Index Tokens

```css
--z-base           /* 0 */
--z-dropdown       /* 1000 */
--z-sticky         /* 1020 */
--z-fixed          /* 1030 */
--z-modal-backdrop /* 1040 */
--z-modal          /* 1050 */
--z-popover        /* 1060 */
--z-tooltip        /* 1070 */
```

---

## Component Guidelines

### Creating Token-Based Components

```typescript
// ❌ FORBIDDEN
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        padding: '12px 24px',
        backgroundColor: '#6366F1',
        borderRadius: '8px',
      }}
    >
      {children}
    </button>
  );
}

// ✅ REQUIRED
export function Button({ 
  variant = 'primary',
  size = 'md',
  children 
}: ButtonProps) {
  return (
    <button 
      className={styles.button}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  );
}

// styles.module.css
.button {
  font-family: var(--font-sans);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--easing-out);
  min-height: 44px; /* WCAG AAA touch target */
}

.button[data-variant="primary"] {
  background-color: var(--color-interactive-primary);
  color: var(--color-text-inverse);
}

.button[data-variant="primary"]:hover {
  background-color: var(--color-interactive-primary-hover);
}

.button[data-size="md"] {
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
}
```

### Responsive Design

Use mobile-first approach with tokens:

```css
.container {
  /* Mobile base */
  padding-inline: var(--space-4);
  
  /* Tablet */
  @media (min-width: 768px) {
    padding-inline: var(--space-6);
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    padding-inline: var(--space-8);
  }
}
```

### RTL Support

Always use logical properties:

```css
/* ❌ FORBIDDEN */
.element {
  margin-left: var(--space-4);
  padding-right: var(--space-6);
  text-align: left;
}

/* ✅ REQUIRED */
.element {
  margin-inline-start: var(--space-4);
  padding-inline-end: var(--space-6);
  text-align: start;
}
```

---

## Accessibility

### Focus Management

```typescript
import { focusManager } from '@/design-system/utils';

// In a modal component
useEffect(() => {
  if (isOpen) {
    focusManager.saveFocus();
    const cleanup = focusManager.trapFocus(modalRef.current);
    
    return () => {
      cleanup();
      focusManager.restoreFocus();
    };
  }
}, [isOpen]);
```

### ARIA Attributes

```typescript
// Modal example
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Title</h2>
  <p id="modal-description">Description</p>
</div>

// Button with loading state
<button
  aria-label="Save changes"
  aria-busy={isLoading}
  disabled={isLoading}
>
  {isLoading ? 'Saving...' : 'Save'}
</button>
```

### Keyboard Navigation

```typescript
// Tab navigation example
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      focusNextTab();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      focusPreviousTab();
      break;
    case 'Home':
      e.preventDefault();
      focusFirstTab();
      break;
    case 'End':
      e.preventDefault();
      focusLastTab();
      break;
  }
};
```

### Color Contrast

```typescript
import { meetsWCAG_AAA, getContrastRatio } from '@/design-system/utils';

// Check if color combination is accessible
const isAccessible = meetsWCAG_AAA('#6366F1', '#FFFFFF');
const ratio = getContrastRatio('#6366F1', '#FFFFFF');
console.log(`Contrast ratio: ${ratio}:1`);
```

### Touch Targets

Ensure all interactive elements meet 44x44px minimum:

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: var(--space-3) var(--space-6);
}
```

---

## Internationalization

### Locale-Aware Formatting

```typescript
import { Formatters } from '@/design-system/utils';

const formatters = new Formatters('en-US');

// Date formatting
formatters.formatDate(new Date()); // "Nov 6, 2025"

// Currency formatting
formatters.formatCurrency(1234.56, 'USD'); // "$1,234.56"

// Number formatting
formatters.formatNumber(1234567); // "1,234,567"

// Relative time
formatters.formatRelativeTime(-2, 'hours'); // "2 hours ago"

// List formatting
formatters.formatList(['Apple', 'Banana', 'Orange']); // "Apple, Banana, and Orange"

// File size
formatters.formatFileSize(1024 * 1024); // "1 MB"
```

### RTL Layout

The design system automatically supports RTL via the `[dir="rtl"]` attribute:

```html
<html dir="rtl">
  <!-- All logical properties will flip automatically -->
</html>
```

---

## Data Compliance

### Cookie Consent

```typescript
import { CookieConsent } from '@/components/compliance/CookieConsent';

// Add to your root layout
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
```

### Privacy Manager

```typescript
import { PrivacyManager } from '@/lib/utils/privacy';

// Check consent
if (PrivacyManager.hasConsent('analytics')) {
  initializeAnalytics();
}

// Get preferences
const prefs = PrivacyManager.getPreferences();

// Anonymize IP
const anonymizedIP = PrivacyManager.anonymizeIP('192.168.1.100');

// Hash PII
const hashedEmail = await PrivacyManager.hashPII('user@example.com');

// Pseudonymize data
const safeData = PrivacyManager.pseudonymize({
  email: 'user@example.com',
  name: 'John Doe',
  userId: '12345',
});
```

---

## Validation

### Running Validators

```bash
# Validate design token usage
npx tsx scripts/validate-tokens.ts

# Validate accessibility
npx tsx scripts/validate-accessibility.ts
```

### CI/CD Integration

Add to your `package.json`:

```json
{
  "scripts": {
    "validate:tokens": "tsx scripts/validate-tokens.ts",
    "validate:a11y": "tsx scripts/validate-accessibility.ts",
    "validate:all": "npm run validate:tokens && npm run validate:a11y"
  }
}
```

Add to your CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Validate Design System
  run: |
    npm run validate:all
```

---

## Best Practices

### DO ✅

- Use CSS custom properties for all styling
- Use semantic tokens, not primitive colors
- Use logical properties for RTL support
- Ensure 44x44px minimum touch targets
- Add ARIA attributes to interactive elements
- Use locale-aware formatters for dates/numbers
- Check cookie consent before analytics
- Run validators before committing

### DON'T ❌

- Hardcode hex colors, RGB values, or pixel sizes
- Use directional properties (margin-left, padding-right)
- Skip ARIA attributes on custom components
- Forget keyboard navigation
- Hardcode strings (use i18n)
- Track users without consent
- Commit code with validation errors

---

## Support

For questions or issues with the design system:

1. Check this guide
2. Review the audit report (`DESIGN_SYSTEM_AUDIT_REPORT.md`)
3. Run validators to identify issues
4. Check component examples in `/src/components`

---

**Last Updated:** November 6, 2025  
**Version:** 1.0.0  
**Maintained By:** Development Team
