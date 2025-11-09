# Project Structure

**Scorpion26.10 - Clean, Organized Architecture**

---

## 📁 Root Directory

```
scorpion26.10/
├── .github/                      # GitHub Actions workflows
├── docs/                         # All documentation (organized)
│   ├── design-system/            # Design system docs
│   ├── phases/                   # Phase completion reports
│   ├── archive/                  # Historical documentation
│   └── README.md                 # Documentation index
├── public/                       # Static assets
├── scripts/                      # Build and utility scripts
├── src/                          # Application source code
│   ├── app/                      # Next.js App Router pages
│   ├── components/               # React components
│   ├── design-system/            # Design tokens & utilities
│   ├── emails/                   # Email templates
│   ├── lib/                      # Utilities & helpers
│   ├── middleware/               # Custom middleware
│   ├── services/                 # Business logic services
│   └── types/                    # TypeScript type definitions
├── supabase/                     # Database migrations & schema
├── tests/                        # Test suites
│   ├── e2e/                      # End-to-end tests
│   ├── integration/              # Integration tests
│   └── unit/                     # Unit tests
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── middleware.ts                 # Next.js middleware
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── playwright.config.ts          # E2E test configuration
├── postcss.config.mjs            # PostCSS configuration
├── PRODUCTION_BUILD_VALIDATION.md # Build validation report
├── PROJECT_STRUCTURE.md          # This file
├── README.md                     # Main project README
├── tsconfig.json                 # TypeScript configuration
└── vitest.config.ts              # Unit test configuration
```

---

## 📂 Source Code Structure (`/src`)

### **`/app`** - Next.js App Router
```
app/
├── (auth)/                       # Auth group routes
├── account/                      # User account pages
├── admin/                        # Admin dashboard
├── api/                          # API routes
│   ├── auth/                     # Authentication endpoints
│   ├── products/                 # Product endpoints
│   ├── stripe/                   # Stripe integration
│   └── ...
├── products/                     # Product pages
├── globals.css                   # Global styles
├── layout.tsx                    # Root layout
├── not-found.tsx                 # 404 page
└── page.tsx                      # Homepage
```

### **`/components`** - React Components
```
components/
├── admin/                        # Admin-specific components
├── forms/                        # Form components
├── gdpr/                         # GDPR compliance components
├── layout/                       # Layout components (Header, Footer)
├── products/                     # Product components
├── sections/                     # Page sections
├── ui/                           # UI primitives (Button, Card, etc.)
└── video/                        # Video player components
```

### **`/design-system`** - Design Tokens
```
design-system/
├── tokens/
│   ├── primitives/               # Base tokens (colors, spacing)
│   ├── semantic/                 # Semantic tokens
│   ├── themes/                   # Theme definitions
│   └── tokens.css                # CSS variables
└── utils/                        # Design utilities
```

### **`/lib`** - Utilities & Helpers
```
lib/
├── auth/                         # Authentication utilities
├── cart/                         # Shopping cart logic
├── email/                        # Email sending utilities
├── security/                     # Security utilities
├── stripe/                       # Stripe integration
├── supabase/                     # Supabase client & helpers
├── utils/                        # General utilities
└── ...
```

---

## 📚 Documentation Structure (`/docs`)

### **`/design-system`** - Design System Documentation
- `COLOR_PALETTE_REFERENCE.md` - Color palette guide
- `DESIGN_SYSTEM_INDEX.md` - Component library index
- `DESIGN_SYSTEM_GUIDE.md` - Design system guide
- `IMPLEMENTATION_GUIDE.md` - Implementation instructions
- `README_DESIGN_TRANSFORMATION.md` - Transformation overview

### **`/phases`** - Phase Completion Reports
- `PHASE_1_COMPLETE.md` - Phase 1: Foundation
- `PHASE_2_COMPLETE.md` - Phase 2: Components
- `PHASE_3_COMPLETE.md` - Phase 3: Sections
- `PHASE_4_COMPLETE.md` - Phase 4: Pages
- `PHASE_5_COMPLETE.md` - Phase 5: Polish & Testing
- `EXECUTION_SUMMARY.md` - Overall execution summary

### **`/archive`** - Historical Documentation
- Old status reports
- Legacy audit reports
- Superseded documentation

---

## 🧪 Testing Structure (`/tests`)

```
tests/
├── e2e/                          # End-to-end tests (Playwright)
│   ├── auth.spec.ts
│   └── product-purchase.spec.ts
├── integration/                  # Integration tests
│   └── api/
├── unit/                         # Unit tests (Vitest)
│   ├── lib/
│   └── middleware/
└── setup.ts                      # Test setup
```

---

## 🗄️ Database Structure (`/supabase`)

```
supabase/
├── migrations/                   # Database migrations
│   ├── 001_add_soft_delete_and_audit.sql
│   ├── 20251107_add_subdomain.sql
│   └── 20251107_create_videos_table.sql
├── schema.sql                    # Database schema
└── seed.sql                      # Seed data
```

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.mjs` | ESLint configuration |
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `playwright.config.ts` | E2E test configuration |
| `vitest.config.ts` | Unit test configuration |
| `.lighthouserc.json` | Lighthouse CI configuration |
| `middleware.ts` | Next.js middleware |

---

## 🚫 Ignored Files (`.gitignore`)

- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env*` - Environment variables
- `*.tsbuildinfo` - TypeScript build info
- `coverage/` - Test coverage
- `.vercel/` - Vercel deployment

---

## 📦 Key Dependencies

### **Framework & Core**
- Next.js 16.0.1 (App Router)
- React 19.2.0
- TypeScript 5.x

### **Styling**
- Tailwind CSS v4
- Radix UI (component primitives)

### **Backend & Data**
- Supabase (database & auth)
- Stripe (payments)
- Resend (email)

### **Testing**
- Vitest (unit tests)
- Playwright (E2E tests)
- Testing Library (React testing)

---

## 🎯 Organization Principles

1. **Separation of Concerns** - Clear boundaries between features
2. **Colocation** - Related files grouped together
3. **Flat Structure** - Avoid deep nesting
4. **Consistent Naming** - kebab-case for files, PascalCase for components
5. **Documentation** - All docs organized in `/docs`
6. **Clean Root** - Minimal files in root directory

---

## 📝 File Naming Conventions

- **Components:** `PascalCase.tsx` (e.g., `Button.tsx`)
- **Pages:** `kebab-case/page.tsx` (e.g., `products/page.tsx`)
- **Utilities:** `kebab-case.ts` (e.g., `format-date.ts`)
- **Types:** `kebab-case.ts` (e.g., `database.ts`)
- **Tests:** `*.test.ts` or `*.spec.ts`
- **Config:** `kebab-case.config.ts` (e.g., `next.config.ts`)

---

## 🔍 Quick Navigation

- **Start Development:** `npm run dev`
- **Build Production:** `npm run build`
- **Run Tests:** `npm test`
- **Lint Code:** `npm run lint`
- **View Docs:** `docs/README.md`
- **Design System:** `docs/design-system/DESIGN_SYSTEM_INDEX.md`

---

**Last Updated:** November 9, 2025  
**Status:** ✅ Clean, Organized, Production Ready
