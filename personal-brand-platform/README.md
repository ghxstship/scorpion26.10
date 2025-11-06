# Personal Brand Platform - White Label SaaS

A comprehensive full-stack white label platform that enables coaches, speakers, authors, and public figures to create their own premium personal brand website. Built with Next.js 14+, Supabase, Stripe, and modern web technologies.

## 🚀 Features

### Multi-Tenant Architecture
- White label system for multiple public figures
- Tenant isolation at database level
- Custom domain support per tenant
- Tenant-specific branding (colors, fonts, logos)
- Subdomain routing

### Content Management
- Custom admin dashboard for content creators
- Page builder with rich text editor
- Blog management system
- Media library for images, videos, and PDFs
- SEO settings per page
- Theme customization

### E-Commerce & Products
- Digital products (books, courses, training programs)
- Physical products (merchandise)
- Services (coaching packages, speaking engagements)
- Subscription programs
- Shopping cart and checkout with Stripe
- Order management dashboard

### Booking System
- Calendar integration for coaching sessions
- Availability management
- Automated confirmation emails
- Booking management dashboard

### Email Marketing
- Newsletter subscription forms
- Subscriber list management
- Email campaign creation via Resend
- Transactional email templates

### Authentication & User Management
- User registration and login (Supabase Auth)
- Social auth options (Google, LinkedIn)
- User profiles with purchase history
- Course/program access management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Email**: Resend
- **Hosting**: Vercel
- **Media Storage**: Supabase Storage

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Stripe account
- Resend account
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd personal-brand-platform
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the database schema:
   ```bash
   # Copy the SQL from supabase/schema.sql and run it in the Supabase SQL Editor
   ```
3. Get your Supabase credentials from Project Settings > API

### 3. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhook endpoints for payment events

### 4. Set Up Resend

1. Create a Resend account at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Update the following variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Resend
RESEND_API_KEY=your_resend_api_key
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
personal-brand-platform/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (public)/          # Public-facing pages
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── sections/          # Homepage sections
│   │   ├── ui/                # Reusable UI components
│   │   ├── products/          # Product-related components
│   │   ├── blog/              # Blog components
│   │   └── admin/             # Admin components
│   ├── lib/
│   │   ├── supabase/          # Supabase client configurations
│   │   ├── stripe.ts          # Stripe configuration
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── database.ts        # TypeScript database types
├── supabase/
│   └── schema.sql             # Database schema
└── public/                    # Static assets
```

## 🗄️ Database Schema

The platform uses a multi-tenant PostgreSQL database with the following main tables:

- **tenants**: Public figure/brand configurations
- **users**: User accounts and profiles
- **products**: Digital/physical products and services
- **orders**: Purchase orders and transactions
- **pages**: Custom pages and content
- **blog_posts**: Blog articles
- **bookings**: Coaching session bookings
- **testimonials**: Customer testimonials
- **email_subscribers**: Newsletter subscribers

See `supabase/schema.sql` for the complete schema with Row Level Security policies.

## 🔐 Security Features

- Row-level security in Supabase
- Environment variable management
- API rate limiting
- Input sanitization
- SQL injection prevention
- XSS protection
- Secure payment handling (PCI compliance via Stripe)

## 🎨 Customization

### Theme Colors

Update the color scheme in `src/app/globals.css`:

```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... other colors */
}
```

### Branding

Each tenant can customize:
- Logo
- Primary and secondary colors
- Custom domain
- Navigation structure
- Page content

## 📧 Email Templates

Email templates are built with React Email. Create new templates in `src/emails/`:

```tsx
import { Html, Button } from '@react-email/components'

export default function WelcomeEmail() {
  return (
    <Html>
      <Button href="https://example.com">Get Started</Button>
    </Html>
  )
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
npm run build
```

### Custom Domains

Configure custom domains for each tenant:
1. Add domain in Vercel
2. Update tenant record in database
3. Configure DNS settings

## 📊 Analytics & Monitoring

- Google Analytics integration
- Plausible Analytics (privacy-friendly alternative)
- Error tracking with Sentry (optional)
- Performance monitoring

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check
```

## 📝 API Routes

Key API endpoints:

- `/api/auth/*` - Authentication
- `/api/products/*` - Product management
- `/api/orders/*` - Order processing
- `/api/stripe/webhook` - Stripe webhooks
- `/api/bookings/*` - Booking management
- `/api/email/*` - Email operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@example.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered content suggestions
- [ ] Multi-language support
- [ ] Advanced SEO tools
- [ ] Integration marketplace

## 📚 Documentation

For detailed documentation, visit [docs.example.com](https://docs.example.com)

---

Built with ❤️ using Next.js, Supabase, and Stripe
