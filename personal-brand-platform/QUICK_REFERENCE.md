# Design System Quick Reference

Fast reference for common design system usage patterns.

---

## 🎨 Most Used Color Tokens

```css
/* Interactive (Buttons, Links) */
var(--color-interactive-primary)
var(--color-interactive-primary-hover)
var(--color-interactive-secondary)

/* Text */
var(--color-text-primary)
var(--color-text-secondary)
var(--color-text-tertiary)

/* Backgrounds */
var(--color-surface-primary)
var(--color-surface-secondary)

/* Borders */
var(--color-border-default)
var(--color-border-focus)

/* Status */
var(--color-status-success)
var(--color-status-error)
var(--color-status-warning)
```

---

## 📏 Most Used Spacing Tokens

```css
var(--space-2)   /* 8px  - Tight spacing */
var(--space-3)   /* 12px - Small spacing */
var(--space-4)   /* 16px - Base spacing */
var(--space-6)   /* 24px - Medium spacing */
var(--space-8)   /* 32px - Large spacing */
var(--space-12)  /* 48px - XL spacing */
var(--space-16)  /* 64px - Section spacing */
```

---

## 🔤 Most Used Typography Tokens

```css
/* Font Sizes */
var(--font-size-sm)    /* 14px */
var(--font-size-base)  /* 16px */
var(--font-size-lg)    /* 18px */
var(--font-size-xl)    /* 20px */
var(--font-size-2xl)   /* 24px */
var(--font-size-3xl)   /* 30px */
var(--font-size-4xl)   /* 36px */

/* Font Weights */
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */
```

---

## 🎭 Common Component Patterns

### Button
```css
.button {
  padding: var(--space-3) var(--space-6);
  background: var(--color-interactive-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-fast) var(--easing-out);
  min-height: 44px; /* WCAG AAA */
}

.button:hover {
  background: var(--color-interactive-primary-hover);
}

.button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

### Card
```css
.card {
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
```

### Input
```css
.input {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  min-height: 44px; /* WCAG AAA */
}

.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px var(--color-border-focus);
}
```

---

## 📱 Responsive Patterns

```css
/* Mobile First */
.container {
  padding: var(--space-4);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    padding: var(--space-6);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: var(--space-8);
  }
}
```

---

## 🌍 RTL Support

```css
/* ❌ Wrong */
margin-left: var(--space-4);
padding-right: var(--space-6);
text-align: left;

/* ✅ Correct */
margin-inline-start: var(--space-4);
padding-inline-end: var(--space-6);
text-align: start;
```

---

## ♿ Accessibility Checklist

- [ ] Min 44x44px touch targets
- [ ] Color contrast 7:1 (AAA) or 4.5:1 (AA)
- [ ] Keyboard navigation support
- [ ] Focus visible on all interactive elements
- [ ] ARIA labels on custom components
- [ ] Alt text on all images
- [ ] Proper heading hierarchy (h1 → h6)

---

## 🔧 Common Utilities

### Focus Management
```typescript
import { focusManager } from '@/design-system/utils';

// Trap focus in modal
const cleanup = focusManager.trapFocus(modalRef.current);

// Announce to screen reader
focusManager.announce('Item added to cart', 'polite');
```

### Formatting
```typescript
import { Formatters } from '@/design-system/utils';

const fmt = new Formatters('en-US');
fmt.formatDate(new Date());           // "Nov 6, 2025"
fmt.formatCurrency(99.99, 'USD');     // "$99.99"
fmt.formatRelativeTime(-2, 'hours');  // "2 hours ago"
```

### Privacy
```typescript
import { PrivacyManager } from '@/lib/utils/privacy';

// Check consent
if (PrivacyManager.hasConsent('analytics')) {
  initAnalytics();
}
```

---

## 🚫 Common Mistakes

### ❌ DON'T
```css
/* Hardcoded values */
color: #6366F1;
padding: 16px;
margin-left: 24px;
font-size: 14px;
```

### ✅ DO
```css
/* Token-based */
color: var(--color-interactive-primary);
padding: var(--space-4);
margin-inline-start: var(--space-6);
font-size: var(--font-size-sm);
```

---

## 🧪 Validation Commands

```bash
# Validate tokens
npx tsx scripts/validate-tokens.ts

# Validate accessibility
npx tsx scripts/validate-accessibility.ts

# Validate all
npm run validate:all
```

---

## 📚 Full Documentation

- **Complete Guide:** `DESIGN_SYSTEM_GUIDE.md`
- **Audit Report:** `DESIGN_SYSTEM_AUDIT_REPORT.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`

---

**Quick Tip:** Use your IDE's autocomplete with `var(--` to see all available tokens!
