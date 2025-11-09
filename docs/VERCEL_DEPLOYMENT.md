# Vercel Deployment Guide

**Scorpion26.10 - Production Deployment**

---

## ✅ Build Status

**Local Build:** ✅ **PASSING**  
**TypeScript:** ✅ **0 errors**  
**ESLint:** ✅ **0 errors**  
**Pages:** ✅ **82/82 compiled**

---

## 🚀 Quick Deploy

### **1. Push to GitHub**
```bash
git push origin main
```

Vercel will automatically deploy from the `main` branch.

---

## 🔧 Required Environment Variables

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### **Supabase (Required)**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Stripe (Optional - for payments)**
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### **Resend (Optional - for emails)**
```env
RESEND_API_KEY=re_...
```

### **Site URL (Required)**
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## 📋 Deployment Checklist

### **Before Deployment:**
- [x] ✅ Repository structure cleaned
- [x] ✅ All TypeScript errors fixed
- [x] ✅ Build passes locally
- [x] ✅ Stripe lazy-loading implemented
- [x] ✅ Code pushed to GitHub

### **In Vercel Dashboard:**
- [ ] Set environment variables (see above)
- [ ] Configure custom domain (optional)
- [ ] Enable automatic deployments from `main` branch

### **After Deployment:**
- [ ] Test homepage loads
- [ ] Test API routes (if env vars set)
- [ ] Check Vercel logs for any runtime errors

---

## 🔍 Troubleshooting

### **Build Fails: "No Next.js version detected"**
✅ **FIXED** - package.json is now at repository root

### **Build Fails: "Neither apiKey nor config.authenticator provided"**
✅ **FIXED** - Stripe now uses lazy loading

### **Runtime Error: "STRIPE_SECRET_KEY is not set"**
**Solution:** Add `STRIPE_SECRET_KEY` to Vercel environment variables

### **Runtime Error: "SUPABASE_URL is not set"**
**Solution:** Add Supabase environment variables to Vercel

---

## 📁 Project Structure

```
scorpion26.10/                 ← Repository root
├── package.json               ← At root (Vercel finds this)
├── next.config.ts             ← At root
├── src/                       ← Source code
├── public/                    ← Static assets
└── docs/                      ← Documentation
```

**No subdirectory configuration needed!**

---

## 🎯 Deployment Settings

### **Framework Preset:** Next.js
### **Build Command:** `npm run build`
### **Output Directory:** `.next`
### **Install Command:** `npm install`
### **Node Version:** 18.x or higher

---

## 🔐 Environment Variables Reference

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Yes | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | ✅ Yes | Your site URL |
| `STRIPE_SECRET_KEY` | ⚠️ Optional | Stripe payments (server) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⚠️ Optional | Stripe payments (client) |
| `RESEND_API_KEY` | ⚠️ Optional | Email sending |

---

## 📊 Build Performance

**Build Time:** ~20-30 seconds  
**Pages Compiled:** 82/82  
**Bundle Size:** Optimized  
**TypeScript Check:** < 15 seconds

---

## 🎉 Success Indicators

After deployment, you should see:

✅ **Build Status:** "Ready"  
✅ **Deployment URL:** Active and accessible  
✅ **Homepage:** Loads without errors  
✅ **Console:** No critical errors

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/ghxstship/scorpion26.10
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs

---

## 📝 Notes

### **Lazy Loading**
- Stripe client is lazy-loaded to prevent build-time errors
- API keys are only required at runtime when features are used
- Build will succeed even without optional env vars

### **Automatic Deployments**
- Every push to `main` triggers a deployment
- Preview deployments for pull requests
- Rollback available in Vercel dashboard

### **Custom Domains**
- Add custom domain in Vercel dashboard
- Configure DNS records as instructed
- SSL certificate auto-provisioned

---

**Last Updated:** November 9, 2025  
**Status:** 🚀 **READY FOR DEPLOYMENT**
