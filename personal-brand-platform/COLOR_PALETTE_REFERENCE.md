# Color Palette Reference - Spartan Warrior Aesthetic
**Inspired by:** Movie "300" + SVG3 Fitness + Elite Performance Brands

---

## 🎨 Color Philosophy

This palette embodies the bold, upscale aesthetic of Spartan warriors:
- **Greyscale Dominance:** Black to light grey foundation (90% of UI)
- **Deep Red Accents:** Blood, power, action, urgency (5% of UI)
- **Gold Accents:** Glory, premium, success, achievement (5% of UI)

---

## 🖤 GREYSCALE FOUNDATION (Primary Palette)

### Pure Blacks & Deep Charcoals
```
--grey-950: #000000  ████████  Pure Black
Use: Primary background, hero sections, navigation

--grey-900: #0A0A0A  ████████  Deep Charcoal
Use: Secondary backgrounds, cards, panels

--grey-850: #141414  ████████  Dark Charcoal
Use: Elevated surfaces, modals, dropdowns

--grey-800: #1A1A1A  ████████  Charcoal
Use: Input backgrounds, tertiary surfaces
```

### Medium Greys
```
--grey-700: #2A2A2A  ████████  Dark Grey
Use: Borders, dividers, disabled backgrounds

--grey-600: #404040  ████████  Medium-Dark Grey
Use: Hover states, secondary borders

--grey-500: #5A5A5A  ████████  Medium Grey
Use: Tertiary text, subtle elements
```

### Light Greys
```
--grey-400: #7A7A7A  ████████  Light-Medium Grey
Use: Secondary text, placeholders

--grey-300: #A0A0A0  ████████  Light Grey
Use: Secondary text, icons

--grey-200: #C8C8C8  ████████  Very Light Grey
Use: Primary text on dark backgrounds

--grey-100: #E8E8E8  ████████  Off-White
Use: Headings, emphasized text

--grey-50: #F5F5F5   ████████  Near-White
Use: Maximum contrast text (rare use)
```

---

## 🩸 DEEP RED ACCENTS (Spartan Blood)

### Usage Guidelines
- **Primary CTAs:** Main action buttons, "Buy Now", "Get Started"
- **Urgent Actions:** Delete, remove, critical alerts
- **Hover States:** Interactive element emphasis
- **Badges:** "New", "Sale", "Limited"
- **Maximum Usage:** 5% of total UI

### Red Scale
```
--red-900: #8B0000  ████████  Blood Red (Darkest)
Use: Shadows, depth, pressed states

--red-800: #A00000  ████████  Deep Crimson
Use: Dark mode backgrounds for red elements

--red-700: #B50000  ████████  Crimson (Primary)
Use: PRIMARY CTA buttons, main red accent

--red-600: #C80000  ████████  Rich Red
Use: Hover states for primary CTAs

--red-500: #DC0000  ████████  Primary Red
Use: Bright accent, focus states

--red-400: #E61A1A  ████████  Bright Red
Use: Active states, pressed buttons

--red-300: #F04040  ████████  Light Red
Use: Error backgrounds, light accents
```

### Red Glow Effect
```css
/* For dramatic emphasis on CTAs */
box-shadow: 0 0 20px rgba(181, 0, 0, 0.5);
box-shadow: 0 0 40px rgba(181, 0, 0, 0.3); /* Stronger */
```

---

## 🏆 GOLD ACCENTS (Spartan Glory)

### Usage Guidelines
- **Premium Features:** Pro badges, exclusive content
- **Success States:** Completed actions, achievements
- **Highlights:** Featured products, special offers
- **Navigation:** Active links, current page indicators
- **Focus States:** Input fields, interactive elements
- **Maximum Usage:** 5% of total UI

### Gold Scale
```
--gold-900: #6B4E00  ████████  Deep Bronze (Darkest)
Use: Shadows, depth, pressed states

--gold-800: #8B6500  ████████  Dark Gold
Use: Dark backgrounds for gold elements

--gold-700: #B8860B  ████████  Antique Gold
Use: Subtle gold accents, borders

--gold-600: #D4AF37  ████████  Rich Gold (Primary)
Use: PRIMARY gold accent, focus rings

--gold-500: #FFD700  ████████  Primary Gold
Use: Bright accents, success indicators

--gold-400: #FFE44D  ████████  Bright Gold
Use: Hover states, active elements

--gold-300: #FFF099  ████████  Light Gold
Use: Subtle highlights, backgrounds
```

### Gold Glow Effect
```css
/* For premium element emphasis */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
box-shadow: 0 0 40px rgba(255, 215, 0, 0.3); /* Stronger */
```

---

## 🎯 SEMANTIC COLOR MAPPING

### Interactive States

#### Primary Actions (Deep Red)
```css
/* Button, Link, CTA */
Default:  --red-700 (#B50000)
Hover:    --red-600 (#C80000)
Active:   --red-800 (#A00000)
Disabled: --grey-600 (#404040)
```

#### Secondary Actions (Gold)
```css
/* Secondary Button, Alternative CTA */
Default:  --gold-600 (#D4AF37)
Hover:    --gold-500 (#FFD700)
Active:   --gold-700 (#B8860B)
Disabled: --grey-600 (#404040)
```

#### Tertiary Actions (Grey)
```css
/* Ghost Button, Subtle Actions */
Default:  transparent
Hover:    --grey-800 (#1A1A1A)
Active:   --grey-700 (#2A2A2A)
Disabled: --grey-600 (#404040)
```

### Text Hierarchy
```css
Primary:   --grey-100 (#E8E8E8)  /* Main content */
Secondary: --grey-300 (#A0A0A0)  /* Supporting text */
Tertiary:  --grey-400 (#7A7A7A)  /* Subtle text */
Disabled:  --grey-600 (#404040)  /* Inactive text */
Inverse:   --grey-950 (#000000)  /* Text on light bg */
Brand:     --gold-600 (#D4AF37)  /* Branded text */
```

### Surface Colors
```css
Primary:    --grey-950 (#000000)  /* Main background */
Secondary:  --grey-900 (#0A0A0A)  /* Cards, panels */
Tertiary:   --grey-850 (#141414)  /* Nested elements */
Raised:     --grey-800 (#1A1A1A)  /* Elevated elements */
Overlay:    rgba(0, 0, 0, 0.85)   /* Modal backdrops */
```

### Border Colors
```css
Default:  --grey-700 (#2A2A2A)   /* Standard borders */
Strong:   --grey-600 (#404040)   /* Emphasized borders */
Subtle:   --grey-900 (#0A0A0A)   /* Minimal borders */
Focus:    --gold-600 (#D4AF37)   /* Focus indicators */
Error:    --red-600 (#C80000)    /* Error states */
Success:  --gold-600 (#D4AF37)   /* Success states */
```

### Status Colors
```css
Success:
  - Icon/Text: --gold-600 (#D4AF37)
  - Background: rgba(212, 175, 55, 0.1)
  - Border: --gold-700 (#B8860B)

Error:
  - Icon/Text: --red-600 (#C80000)
  - Background: rgba(200, 0, 0, 0.1)
  - Border: --red-700 (#B50000)

Warning:
  - Icon/Text: --gold-500 (#FFD700)
  - Background: rgba(255, 215, 0, 0.1)
  - Border: --gold-600 (#D4AF37)

Info:
  - Icon/Text: --grey-300 (#A0A0A0)
  - Background: rgba(160, 160, 160, 0.1)
  - Border: --grey-400 (#7A7A7A)
```

---

## ✅ WCAG AAA CONTRAST RATIOS

### Text Contrast (Minimum 7:1 for AAA)

#### White/Light Text on Dark Backgrounds
```
#E8E8E8 on #000000 = 18.5:1 ✅ (Excellent)
#C8C8C8 on #000000 = 14.2:1 ✅ (Excellent)
#A0A0A0 on #000000 = 9.8:1  ✅ (Good)
#7A7A7A on #000000 = 6.2:1  ⚠️ (AA only, use for large text)
```

#### Gold on Dark Backgrounds
```
#FFD700 on #000000 = 12.8:1 ✅ (Excellent)
#D4AF37 on #000000 = 8.9:1  ✅ (Good)
#B8860B on #000000 = 5.8:1  ⚠️ (AA only)
```

#### Red on Dark Backgrounds
```
#E61A1A on #000000 = 5.2:1  ⚠️ (AA only, use for large text/buttons)
#DC0000 on #000000 = 4.8:1  ⚠️ (AA only, buttons/large text)
#C80000 on #000000 = 4.1:1  ⚠️ (AA only, buttons/large text)
```

**Note:** Red is primarily for buttons and large UI elements, not body text.

### Interactive Element Contrast (Minimum 3:1)
```
Gold border on black = 8.9:1  ✅
Red border on black = 4.1:1   ✅
Grey-600 border on black = 2.8:1 ⚠️ (Use grey-500 or lighter)
```

---

## 🎨 USAGE EXAMPLES

### Hero Section
```css
.hero {
  background: var(--grey-950);
  color: var(--grey-100);
}

.hero h1 {
  color: var(--grey-50);
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
}

.hero .subtitle {
  color: var(--gold-600);
}

.hero .cta {
  background: var(--red-700);
  color: var(--grey-50);
  box-shadow: 0 0 20px rgba(181, 0, 0, 0.5);
}
```

### Product Card
```css
.product-card {
  background: var(--grey-850);
  border: 1px solid var(--grey-700);
}

.product-card:hover {
  border-color: var(--gold-600);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
}

.product-title {
  color: var(--grey-100);
}

.product-price {
  color: var(--gold-600);
  font-weight: bold;
}

.product-badge {
  background: var(--red-700);
  color: var(--grey-50);
}
```

### Navigation
```css
.nav {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--grey-800);
}

.nav-link {
  color: var(--grey-200);
}

.nav-link:hover {
  color: var(--red-600);
}

.nav-link.active {
  color: var(--gold-600);
  border-bottom: 3px solid var(--gold-600);
}
```

### Form Input
```css
.input {
  background: var(--grey-800);
  border: 1px solid var(--grey-600);
  color: var(--grey-100);
}

.input:focus {
  border-color: var(--gold-600);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
}

.input.error {
  border-color: var(--red-600);
}
```

---

## 🚫 ANTI-PATTERNS (What NOT to Do)

### ❌ Overuse of Accent Colors
```css
/* DON'T: Too much red/gold */
.container {
  background: var(--red-700);
  border: 2px solid var(--gold-600);
  color: var(--gold-500);
}
```

### ❌ Poor Contrast
```css
/* DON'T: Grey-400 text on grey-800 background */
.text {
  background: var(--grey-800);
  color: var(--grey-400); /* Only 2.5:1 contrast */
}
```

### ❌ Mixing Too Many Colors
```css
/* DON'T: Red and gold together in same element */
.button {
  background: var(--red-700);
  border: 2px solid var(--gold-600); /* Conflicting accents */
}
```

### ✅ Correct Approach
```css
/* DO: Greyscale dominant with single accent */
.container {
  background: var(--grey-850);
  border: 1px solid var(--grey-700);
  color: var(--grey-100);
}

.container .cta {
  background: var(--red-700); /* Single accent for emphasis */
  color: var(--grey-50);
}
```

---

## 📊 Color Distribution Guidelines

### Ideal Color Usage Breakdown
- **Greyscale:** 90% of UI
  - Backgrounds: 60%
  - Text: 25%
  - Borders: 5%

- **Deep Red:** 5% of UI
  - Primary CTAs: 3%
  - Alerts/Badges: 2%

- **Gold:** 5% of UI
  - Highlights: 2%
  - Focus states: 2%
  - Success indicators: 1%

### Per-Page Color Budget
- **Maximum red elements:** 3-5 per page
- **Maximum gold elements:** 5-8 per page
- **Primary CTA:** Always red
- **Secondary CTA:** Gold or grey
- **Tertiary actions:** Grey only

---

## 🎯 Quick Reference Card

```
BACKGROUNDS:     #000000, #0A0A0A, #141414, #1A1A1A
TEXT:            #E8E8E8, #C8C8C8, #A0A0A0
BORDERS:         #2A2A2A, #404040
PRIMARY CTA:     #B50000 (red)
SECONDARY CTA:   #D4AF37 (gold)
FOCUS:           #D4AF37 (gold)
SUCCESS:         #D4AF37 (gold)
ERROR:           #C80000 (red)
HOVER (red):     #C80000
HOVER (gold):    #FFD700
```

---

**Document Version:** 1.0  
**Last Updated:** November 9, 2025  
**Maintained By:** Design System Team
