# Typography Quick Reference

## Font Assignments

| Element | Font Family | CSS Variable | Use Case |
|---------|-------------|--------------|----------|
| Title | ANTON | `--font-title` | Special titles, hero text |
| H1 | ANTON | `--font-h1` | Main page headings |
| H2-H6 | Bebas Neue | `--font-h2` through `--font-h6` | Section headings |
| Body | Share Tech | `--font-body` / `--font-sans` | All body text, paragraphs |
| Mono | Share Tech Mono | `--font-mono` | Code blocks, technical text |
| Subtitle | Share Tech Mono | `--font-subtitle` | Subtitles, captions |

## Automatic Application

All fonts are automatically applied via global CSS. Simply use semantic HTML:

```tsx
<h1>This uses ANTON automatically</h1>
<h2>This uses Bebas Neue automatically</h2>
<p>This uses Share Tech automatically</p>
<code>This uses Share Tech Mono automatically</code>
```

## Manual Override Examples

### Using CSS Variables
```tsx
<div style={{ fontFamily: 'var(--font-h2)' }}>
  Uses Bebas Neue
</div>
```

### Using Tailwind (if needed)
```tsx
<div className="font-[family-name:var(--font-mono)]">
  Uses Share Tech Mono
</div>
```

### Subtitle Class
```tsx
<p className="subtitle">
  Uses Share Tech Mono automatically
</p>
```

## TypeScript Usage

Import typography tokens in TypeScript:

```typescript
import { typography } from '@/design-system/tokens/primitives/typography';

// Access font families
const headingFont = typography.fontFamily.h1; // 'var(--font-h1), Impact, sans-serif'
const bodyFont = typography.fontFamily.body;  // 'var(--font-body), system-ui, sans-serif'
```

## Best Practices

1. **Use semantic HTML** - Let the global styles handle fonts automatically
2. **Avoid inline font-family** - Unless you have a specific override need
3. **Use CSS variables** - For consistency and maintainability
4. **Test fallbacks** - All fonts have appropriate fallback stacks

## Font Loading

Fonts are loaded via Next.js Google Fonts integration:
- Optimized for performance
- Automatic font subsetting
- Self-hosted for GDPR compliance
- Preloaded for faster rendering

## Common Patterns

### Hero Section
```tsx
<h1>Main Headline</h1>  {/* ANTON */}
<h2>Subheadline</h2>    {/* Bebas Neue */}
<p>Body text</p>        {/* Share Tech */}
```

### Card Component
```tsx
<h3>Card Title</h3>           {/* Bebas Neue */}
<p className="subtitle">      {/* Share Tech Mono */}
  Card subtitle
</p>
<p>Card description</p>       {/* Share Tech */}
```

### Code Display
```tsx
<pre>
  <code>
    // Automatically uses Share Tech Mono
    const example = 'code';
  </code>
</pre>
```
