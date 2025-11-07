# Admin Guide - Personal Brand Platform

**Version:** 1.0.0  
**Last Updated:** November 6, 2025

---

## Table of Contents

1. [Admin Dashboard](#admin-dashboard)
2. [User Management](#user-management)
3. [Content Management](#content-management)
4. [Product Management](#product-management)
5. [Order Management](#order-management)
6. [Analytics & Reporting](#analytics--reporting)
7. [System Settings](#system-settings)
8. [Security & Maintenance](#security--maintenance)

---

## Admin Dashboard

### Accessing the Dashboard

1. Log in with admin credentials
2. Navigate to `/admin`
3. View key metrics and recent activity

### Dashboard Overview

**Key Metrics:**
- Total users
- Active subscriptions
- Revenue (today, week, month)
- Pending orders
- Upcoming bookings
- Recent activity

---

## User Management

### Viewing Users

**Path:** `/admin/users`

**Actions:**
- View all users
- Search by email/name
- Filter by role (admin, customer)
- Sort by registration date, last login

### Managing User Accounts

**View User Details:**
1. Click on a user in the list
2. View profile information
3. See purchase history
4. Check booking history

**Edit User:**
1. Click **Edit** on user profile
2. Update information:
   - Full name
   - Email
   - Role (admin/customer)
3. Click **Save Changes**

**Delete User:**
1. Click **Delete** on user profile
2. Confirm deletion
3. User data is soft-deleted (can be restored)

**Restore Deleted User:**
1. Filter users by "Deleted"
2. Click **Restore** on user
3. User account is reactivated

### Role Management

**Admin Role:**
- Full access to all features
- Can manage users
- Can view analytics
- Can modify content

**Customer Role:**
- Can purchase products
- Can make bookings
- Can view own data
- Limited access

---

## Content Management

### Blog Posts

**Path:** `/admin/blog`

**Create New Post:**
1. Click **New Post**
2. Enter title and content
3. Add featured image
4. Set SEO metadata
5. Save as draft or publish

**Edit Post:**
1. Click on post in list
2. Make changes
3. Click **Update**

**Publish/Unpublish:**
1. Toggle publish status
2. Set publish date (optional)
3. Confirm action

**Delete Post:**
1. Click **Delete**
2. Confirm deletion
3. Post is soft-deleted

### Pages

**Path:** `/admin/pages`

**Create Page:**
1. Click **New Page**
2. Enter page content
3. Set URL slug
4. Configure SEO
5. Publish

**Edit Page:**
- Same process as blog posts
- Can set as homepage
- Can hide from navigation

---

## Product Management

### Managing Products

**Path:** `/admin/products`

**Add New Product:**
1. Click **Add Product**
2. Enter details:
   - Title
   - Description
   - Type (Digital, Physical, Service, Subscription)
   - Price
   - Images
3. Configure Stripe integration
4. Set availability
5. Click **Create**

**Edit Product:**
1. Click on product
2. Update information
3. Click **Save**

**Pricing:**
- Set base price
- Configure Stripe price ID
- Set up subscription intervals (if applicable)

**Inventory:**
- Track stock (for physical products)
- Set low stock alerts
- Manage variants

**Deactivate Product:**
1. Toggle "Active" status
2. Product hidden from customers
3. Existing orders unaffected

---

## Order Management

### Viewing Orders

**Path:** `/admin/orders`

**Order List:**
- View all orders
- Filter by status (pending, completed, refunded)
- Search by order ID or customer
- Sort by date, amount

### Processing Orders

**Order Details:**
1. Click on order
2. View:
   - Customer information
   - Items ordered
   - Payment status
   - Shipping details (if applicable)

**Update Order Status:**
1. Select new status
2. Add notes (optional)
3. Customer receives notification

**Process Refund:**
1. Click **Refund** on order
2. Enter refund amount
3. Add reason
4. Confirm refund
5. Stripe processes refund automatically

### Booking Management

**Path:** `/admin/bookings`

**View Bookings:**
- See all bookings
- Filter by date, status
- View calendar view

**Manage Booking:**
1. Click on booking
2. Actions:
   - Reschedule
   - Cancel
   - Mark as completed
   - Add notes

---

## Analytics & Reporting

### Dashboard Analytics

**Key Metrics:**
- Revenue trends
- User growth
- Conversion rates
- Popular products
- Booking utilization

### Custom Reports

**Generate Report:**
1. Go to **Analytics** → **Reports**
2. Select report type:
   - Sales report
   - User activity
   - Product performance
   - Booking analytics
3. Set date range
4. Click **Generate**
5. Export as CSV or PDF

### Email Campaign Analytics

**Track Performance:**
- Open rates
- Click-through rates
- Unsubscribe rates
- Conversion rates

---

## System Settings

### General Settings

**Path:** `/admin/settings`

**Configure:**
- Site name and tagline
- Contact information
- Business hours
- Time zone
- Currency

### Email Settings

**Transactional Emails:**
- Configure Resend API key
- Customize email templates
- Set sender name and email
- Test email delivery

**Email Campaigns:**
- Manage subscriber lists
- Create email templates
- Schedule campaigns
- Track performance

### Payment Settings

**Stripe Integration:**
- Configure API keys (test/live)
- Set up webhooks
- Configure payment methods
- Set currency

**Refund Policy:**
- Set refund window (days)
- Configure automatic refunds
- Set refund reasons

### Booking Settings

**Configure:**
- Available time slots
- Booking duration
- Buffer time between bookings
- Cancellation policy
- Reminder timing

---

## Security & Maintenance

### Security Monitoring

**Check:**
- Failed login attempts
- Account lockouts
- Suspicious activity
- API rate limit hits

**View Audit Log:**
1. Go to **Admin** → **Audit Log**
2. View all system actions
3. Filter by:
   - User
   - Action type
   - Date range
4. Export for compliance

### User Security

**Account Lockout:**
- Automatic after 5 failed attempts
- 15-minute lockout period
- Manual unlock available

**Session Management:**
- 30-minute idle timeout
- 12-hour absolute timeout
- Force logout all sessions

### Rate Limiting

**Current Limits:**
- General API: 100 requests/15min
- Auth endpoints: 10 requests/15min
- Sensitive operations: 5 requests/15min

**Monitor:**
- View rate limit hits
- Identify abusive IPs
- Adjust limits if needed

### Backups

**Database Backups:**
- Automatic daily backups
- 30-day retention
- Manual backup option
- Restore procedures documented

**File Backups:**
- Media files backed up daily
- Stored in cloud storage
- Versioning enabled

### System Health

**Monitor:**
- Database performance
- API response times
- Error rates
- Storage usage
- Bandwidth usage

**Alerts:**
- Set up email alerts for:
  - High error rates
  - Slow response times
  - Storage limits
  - Failed payments

---

## Maintenance Tasks

### Daily

- [ ] Check pending orders
- [ ] Review failed payments
- [ ] Monitor error logs
- [ ] Check booking confirmations

### Weekly

- [ ] Review analytics
- [ ] Check user feedback
- [ ] Update content
- [ ] Review security logs

### Monthly

- [ ] Generate financial reports
- [ ] Review user growth
- [ ] Update documentation
- [ ] Security audit
- [ ] Backup verification

---

## Troubleshooting

### Common Issues

**Payment Webhook Failures:**
1. Check Stripe webhook configuration
2. Verify webhook secret
3. Check error logs
4. Test webhook manually

**Email Delivery Issues:**
1. Verify Resend API key
2. Check email templates
3. Review bounce/spam reports
4. Test with different providers

**Performance Issues:**
1. Check database query performance
2. Review slow API endpoints
3. Monitor server resources
4. Optimize images

### Getting Support

**Technical Support:**
- Email: tech@yourdomain.com
- Include error logs
- Describe steps to reproduce

**Emergency Contact:**
- Phone: 1-800-XXX-XXXX
- Available 24/7 for critical issues

---

## Best Practices

### Content Management

1. **Regular Updates** - Keep content fresh
2. **SEO Optimization** - Use keywords naturally
3. **Image Optimization** - Compress before upload
4. **Mobile Preview** - Check on mobile devices
5. **Backup Before Major Changes** - Save drafts

### User Management

1. **Regular Audits** - Review user roles quarterly
2. **Prompt Support** - Respond within 24 hours
3. **Privacy Compliance** - Follow GDPR/CCPA
4. **Data Cleanup** - Remove inactive accounts (with notice)

### Security

1. **Strong Passwords** - Enforce for admin accounts
2. **Two-Factor Auth** - Enable for all admins
3. **Regular Updates** - Keep system updated
4. **Monitor Logs** - Check audit logs weekly
5. **Limit Access** - Principle of least privilege

---

## API Access

### Admin API Endpoints

**Authentication:**
```
Authorization: Bearer <admin_token>
```

**Key Endpoints:**
- `GET /api/admin/users` - List users
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/dashboard` - Dashboard data
- `PUT /api/admin/settings` - Update settings

**Rate Limits:**
- Admin endpoints: 1000 requests/hour
- Bulk operations: 100 requests/hour

---

## Compliance

### GDPR Compliance

**User Rights:**
- Right to access data
- Right to deletion
- Right to portability
- Right to rectification

**Admin Actions:**
1. Export user data: `/admin/users/[id]/export`
2. Delete user data: `/admin/users/[id]/delete`
3. View data processing: `/admin/audit-log`

### Data Retention

**Policy:**
- Active user data: Indefinite
- Deleted user data: 30 days (soft delete)
- Audit logs: 1 year
- Backups: 30 days

---

## Updates & Changelog

### Version 1.0.0 (Nov 6, 2025)

**New Features:**
- Complete admin dashboard
- User management system
- Product management
- Order processing
- Analytics & reporting

**Security:**
- Rate limiting
- Account lockout
- Audit logging
- CSRF protection

---

**Questions?**

Contact the development team:
- Email: dev@yourdomain.com
- Documentation: `/docs`
- API Docs: `/docs/API_DOCUMENTATION.md`

---

*This guide is regularly updated. Last update: November 6, 2025*
