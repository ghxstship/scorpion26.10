# Quick Start Guide

Get your Personal Brand Platform running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/command line access

## 1. Initial Setup (1 minute)

The project is already initialized! Just verify:

```bash
cd personal-brand-platform
npm install  # Already done, but run if needed
```

## 2. Start Development Server (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:3000**

You should see the homepage with:
- Hero section
- About section
- Testimonials
- Call-to-action

## 3. Explore the Platform (2 minutes)

### Available Pages
- **Homepage**: http://localhost:3000
- **Products**: http://localhost:3000/products
- **Contact**: http://localhost:3000/contact
- **Login**: http://localhost:3000/login
- **Admin**: http://localhost:3000/admin

### Navigation
- Click through the header menu
- Test mobile menu (resize browser)
- Try the contact form
- View product cards

## 4. Configure Services (Optional - for full functionality)

### Option A: Quick Test (No Setup Required)
The platform works without external services! You can:
- ✅ View all pages
- ✅ Navigate the site
- ✅ See the UI/UX
- ✅ Test responsive design
- ❌ Can't login (needs Supabase)
- ❌ Can't process payments (needs Stripe)
- ❌ Can't send emails (needs Resend)

### Option B: Full Setup (30 minutes)
Follow the detailed guide: **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**

Quick version:
1. Create Supabase project → Get API keys
2. Create Stripe account → Get API keys
3. Create Resend account → Get API key
4. Update `.env.local` with keys
5. Run database schema in Supabase
6. Restart dev server

## 5. Customize Your Brand (5 minutes)

### Update Colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: 240 5.9% 10%;  /* Change this */
  --secondary: 240 4.8% 95.9%;  /* And this */
}
```

### Update Content
Edit homepage sections in `src/components/sections/`:
- `HeroSection.tsx` - Main headline
- `AboutSection.tsx` - Your story
- `TestimonialsSection.tsx` - Client quotes
- `CTASection.tsx` - Call to action

### Update Branding
Edit `src/components/layout/Header.tsx`:
```tsx
<span className="text-2xl font-bold">YOUR BRAND</span>
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Project Structure

```
src/
├── app/              # Pages and routes
│   ├── page.tsx     # Homepage
│   ├── login/       # Auth
│   ├── products/    # Products
│   ├── contact/     # Contact
│   ├── admin/       # Dashboard
│   └── api/         # API routes
├── components/
│   ├── layout/      # Header, Footer
│   ├── sections/    # Homepage sections
│   └── ui/          # Reusable components
└── lib/             # Utilities and configs
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors in API routes
These are expected until you set up Supabase. They won't prevent the app from running.

### Can't see changes
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

## Next Steps

1. ✅ **Explore the codebase** - Check out the components
2. ✅ **Read the docs** - See README.md and SETUP_GUIDE.md
3. ✅ **Customize design** - Make it your own
4. ✅ **Set up services** - Connect Supabase, Stripe, Resend
5. ✅ **Add features** - Check FEATURES.md for ideas
6. ✅ **Deploy** - Push to Vercel when ready

## Resources

- **Main Documentation**: [README.md](./README.md)
- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Features & Roadmap**: [FEATURES.md](./FEATURES.md)
- **Project Summary**: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

## Get Help

- Check documentation files
- Review code comments
- Search Next.js docs: https://nextjs.org/docs
- Search Supabase docs: https://supabase.com/docs
- Search Stripe docs: https://stripe.com/docs

## What's Working Right Now

✅ **Fully Functional (No Setup Required)**
- Homepage with all sections
- Product listing page
- Contact form UI
- Login page UI
- Admin dashboard UI
- Responsive navigation
- Mobile menu
- All UI components

🔄 **Requires Setup**
- User authentication (Supabase)
- Database operations (Supabase)
- Payment processing (Stripe)
- Email sending (Resend)

## Development Tips

1. **Hot Reload**: Save any file to see changes instantly
2. **Component Isolation**: Test components individually
3. **Mobile First**: Always check mobile view
4. **Console**: Keep browser console open for errors
5. **TypeScript**: Let it guide you with autocomplete

## Quick Wins

Want to see immediate results? Try these:

### 1. Change the Hero Text (30 seconds)
File: `src/components/sections/HeroSection.tsx`
```tsx
<h1>Your Custom Headline Here</h1>
```

### 2. Add a Product (1 minute)
File: `src/app/products/page.tsx`
Add to the `products` array

### 3. Update Footer Links (1 minute)
File: `src/components/layout/Footer.tsx`
Change social media URLs

### 4. Customize Colors (2 minutes)
File: `src/app/globals.css`
Update CSS variables

## Ready to Build?

You now have a fully functional personal brand platform foundation!

**Current Status**: ✅ Development server running
**Next Action**: Customize and build features
**Documentation**: All guides available in project root

---

**Happy Building! 🚀**
