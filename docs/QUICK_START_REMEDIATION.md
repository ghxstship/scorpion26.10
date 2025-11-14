# QUICK START: Design System Remediation Guide
## Scorpion26.10 - Action Items

**Last Updated**: November 13, 2025

---

## 🎯 IMMEDIATE ACTIONS (Do These First)

### 1. Fix Remaining Email Templates (4-6 hours)

**Files to Fix** (7 files):
```
src/emails/BookingConfirmation.tsx
src/emails/NewsletterTemplate.tsx
src/emails/PasswordReset.tsx
src/emails/WelcomeEmail.tsx
src/emails/components/EmailFooter.tsx
src/emails/components/EmailButton.tsx
src/emails/components/EmailLayout.tsx
src/emails/components/EmailHeader.tsx
```

**How to Fix**:
1. Import email tokens:
   ```typescript
   import { emailColors, emailSpacing, emailTypography, emailBorderRadius } from './styles/emailTokens'
   ```

2. Replace hardcoded values:
   ```typescript
   // ❌ Before
   const heading = {
     color: '#000000',
     fontSize: '24px',
     padding: '20px',
   }
   
   // ✅ After
   const heading = {
     color: emailColors.offWhite,
     fontSize: emailTypography.fontSize['2xl'],
     padding: emailSpacing.lg,
   }
   ```

3. See `OrderConfirmation.tsx` as reference example

### 2. Document Google Brand Color Exception (15 minutes)

**File**: `src/app/login/page.tsx`

**Add Comment**:
```typescript
{/* Google OAuth Button - Brand colors required by Google guidelines */}
<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
  <path d="..." fill="#4285F4" /> {/* Google Blue */}
  <path d="..." fill="#34A853" /> {/* Google Green */}
  <path d="..." fill="#FBBC05" /> {/* Google Yellow */}
  <path d="..." fill="#EA4335" /> {/* Google Red */}
</svg>
```

### 3. Fix CTASection Component (10 minutes)

**File**: `src/components/sections/CTASection.tsx`

Find and replace any hardcoded color with CSS variable or token.

---

## 📋 VALIDATION

### Run Token Validation Script

```bash
# Install dependencies if needed
npm install glob

# Run validation
npx ts-node scripts/validate-design-tokens.ts

# Or add to package.json:
"scripts": {
  "validate:tokens": "ts-node scripts/validate-design-tokens.ts"
}

# Then run:
npm run validate:tokens
```

**Expected Output**:
- Current: ~109 violations
- After email fixes: ~83 violations
- After all fixes: 4 violations (Google brand colors - documented exception)

---

## 📚 KEY DOCUMENTS

### Read These First
1. **FINAL_AUDIT_REPORT.md** - Complete audit findings (this is the main report)
2. **AUDIT_REMEDIATION_SUMMARY.md** - Detailed remediation plan
3. **ATOMIC_DESIGN_SYSTEM_AUDIT_CHECKLIST.md** - 150+ item checklist

### Reference Documents
- **Design Tokens**: `/src/design-system/tokens/`
- **Email Tokens**: `/src/emails/styles/emailTokens.ts`
- **Accessibility Utils**: `/src/design-system/utils/`

---

## 🔧 USING DESIGN TOKENS

### In React Components

```typescript
// Import tokens
import { tokens } from '@/design-system/tokens'

// Use in styles
const styles = {
  color: tokens.colors.text.primary,
  padding: tokens.spacing[4],
  fontSize: tokens.typography.fontSize.base,
}
```

### In CSS/SCSS

```css
/* Use CSS variables */
.my-component {
  color: var(--color-text-primary);
  padding: var(--space-4);
  font-size: var(--font-size-base);
  background: var(--color-bg-primary);
}
```

### In Email Templates

```typescript
// Import email tokens
import { emailColors, emailSpacing, emailTypography } from './styles/emailTokens'

// Use in inline styles
const heading = {
  color: emailColors.offWhite,
  fontSize: emailTypography.fontSize['2xl'],
  padding: emailSpacing.lg,
}
```

---

## 🎨 SPARTAN THEME COLORS

### Primary Colors (Use These)
```typescript
// Greyscale (90% of UI)
emailColors.black          // #000000
emailColors.darkCharcoal   // #0A0A0A
emailColors.charcoal       // #1A1A1A
emailColors.darkGrey       // #2A2A2A
emailColors.mediumGrey     // #5A5A5A
emailColors.lightGrey      // #A0A0A0
emailColors.offWhite       // #E8E8E8
emailColors.nearWhite      // #F5F5F5

// Red Accents (5% of UI - CTAs, alerts)
emailColors.crimson        // #B50000
emailColors.richRed        // #C80000

// Gold Accents (5% of UI - success, premium)
emailColors.richGold       // #D4AF37
emailColors.primaryGold    // #FFD700
```

---

## ✅ COMPLETION CHECKLIST

### Week 1: Critical Fixes
- [ ] Fix 7 email templates
- [ ] Document Google brand color exception
- [ ] Fix CTASection component
- [ ] Run validation script (should show ~4 violations)

### Week 2: Component Library
- [ ] Create Icon component
- [ ] Create Link component
- [ ] Create Tag component
- [ ] Create FormField molecule
- [ ] Create Modal organism

### Week 3: Automation
- [ ] Create ESLint rules
- [ ] Set up jest-axe tests
- [ ] Integrate validation into CI/CD

### Week 4: Documentation
- [ ] Write component usage guides
- [ ] Write contribution guidelines
- [ ] Create Storybook (optional)

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ DON'T DO THIS
```typescript
// Hardcoded colors
const style = { color: '#000000' }

// Hardcoded spacing
const style = { padding: '20px' }

// Directional properties (breaks RTL)
const style = { marginLeft: '10px' }

// Hardcoded font sizes
const style = { fontSize: '16px' }
```

### ✅ DO THIS INSTEAD
```typescript
// Use tokens
const style = { color: emailColors.offWhite }

// Use spacing tokens
const style = { padding: emailSpacing.lg }

// Use logical properties
const style = { marginInlineStart: emailSpacing.md }

// Use typography tokens
const style = { fontSize: emailTypography.fontSize.base }
```

---

## 📞 GETTING HELP

### Questions?
1. Check `/docs/FINAL_AUDIT_REPORT.md` for detailed findings
2. Review `/src/emails/OrderConfirmation.tsx` as example
3. Look at `/src/design-system/tokens/` for available tokens
4. Run validation script to check your work

### Validation Failing?
1. Check if you're using tokens correctly
2. Verify imports are correct
3. Look for typos in token names
4. Check if file is in documented exceptions

---

## 📊 CURRENT STATUS

### Metrics
- **Token Compliance**: 88% (109 violations remain)
- **Component Coverage**: 65%
- **Accessibility**: 90%
- **Overall Grade**: B+ (85/100)

### After Week 1 Fixes
- **Token Compliance**: 93% (83 violations remain)
- **Overall Grade**: A- (90/100)

### After Full Remediation (4 weeks)
- **Token Compliance**: 100% (0 violations)
- **Component Coverage**: 95%
- **Accessibility**: 100%
- **Overall Grade**: A+ (98/100)

---

## 🎯 SUCCESS CRITERIA

You're done when:
1. ✅ Validation script shows 0 violations (except documented exceptions)
2. ✅ All email templates use email tokens
3. ✅ All components use design tokens
4. ✅ ESLint rules prevent new violations
5. ✅ Accessibility tests pass
6. ✅ Documentation is complete

---

**Good luck! You've got this! 💪**

*Remember: The design system is your friend. It makes your life easier, not harder.*
