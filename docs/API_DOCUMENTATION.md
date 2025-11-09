# API Documentation

## Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:3000/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Rate Limiting

- **API Routes**: 100 requests per 15 minutes
- **Auth Routes**: 5 requests per 15 minutes
- **Strict Routes**: 10 requests per 1 minute

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "details": [] // Optional validation details
}
```

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "tenantId": "uuid" // Optional
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "session": {
    "access_token": "token",
    "refresh_token": "token"
  }
}
```

### POST /api/auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "user": {...},
  "session": {...}
}
```

### POST /api/auth/logout
Logout current user.

**Response:** `200 OK`
```json
{
  "success": true
}
```

### POST /api/auth/refresh-token
Refresh access token.

**Request Body:**
```json
{
  "refresh_token": "token"
}
```

**Response:** `200 OK`
```json
{
  "data": {
    "access_token": "new_token",
    "refresh_token": "new_refresh_token",
    "expires_at": 1234567890
  }
}
```

### POST /api/auth/change-password
Change user password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "oldpass",
  "newPassword": "newpass123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Password changed successfully"
}
```

## Product Endpoints

### GET /api/products
List all products for a tenant.

**Query Parameters:**
- `tenantId` (required): UUID
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "title": "Product Name",
    "description": "Description",
    "price": 99.99,
    "type": "digital",
    "is_active": true
  }
]
```

### POST /api/products
Create a new product (requires admin).

**Request Body:**
```json
{
  "tenantId": "uuid",
  "title": "Product Name",
  "description": "Description",
  "type": "digital",
  "price": 99.99
}
```

**Response:** `201 Created`

### PUT /api/products/[id]
Update a product (requires admin).

### DELETE /api/products/[id]
Soft delete a product (requires admin).

## Order Endpoints

### GET /api/orders
List user's orders (requires authentication).

**Response:** `200 OK`
```json
[
  {
    "id": "uuid",
    "total_amount": 99.99,
    "status": "completed",
    "created_at": "2024-01-01T00:00:00Z",
    "order_items": [...]
  }
]
```

### POST /api/orders
Create a new order (requires authentication).

**Request Body:**
```json
{
  "tenantId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "quantity": 1,
      "price": 99.99
    }
  ]
}
```

**Response:** `201 Created`

## Blog Endpoints

### GET /api/blog
List published blog posts.

**Query Parameters:**
- `tenantId` (required): UUID

**Response:** `200 OK`

### POST /api/blog
Create a blog post (requires admin).

### PUT /api/blog/[id]
Update a blog post (requires admin).

### DELETE /api/blog/[id]
Soft delete a blog post (requires admin).

### POST /api/blog/[id]/publish
Toggle publish status (requires admin).

## Booking Endpoints

### GET /api/bookings
List user's bookings (requires authentication).

### POST /api/bookings
Create a new booking (requires authentication).

### POST /api/bookings/[id]/cancel
Cancel a booking (requires authentication).

### POST /api/bookings/[id]/reschedule
Reschedule a booking (requires authentication).

### GET /api/bookings/availability
Check availability for booking.

## Admin Endpoints

### GET /api/admin/dashboard
Get dashboard statistics (requires admin).

**Query Parameters:**
- `tenantId` (required): UUID

**Response:** `200 OK`
```json
{
  "stats": {
    "totalRevenue": 10000,
    "totalOrders": 100,
    "totalProducts": 50,
    "totalUsers": 200
  }
}
```

### GET /api/admin/users
List all users with pagination (requires admin).

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `role` (optional): Filter by role
- `search` (optional): Search by name or email

### PUT /api/admin/users/[id]
Update user details (requires admin).

### DELETE /api/admin/users/[id]
Soft delete user (requires admin).

### POST /api/admin/users/[id]/restore
Restore soft-deleted user (requires admin).

## Email Endpoints

### POST /api/email/subscribe
Subscribe to email list.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "tenantId": "uuid"
}
```

### POST /api/email/unsubscribe
Unsubscribe from email list.

### POST /api/email/send-campaign
Send email campaign (requires admin).

## Media Endpoints

### POST /api/media/upload
Upload media file (requires authentication).

**Request:** `multipart/form-data`
- `file`: File (max 10MB)
- `tenantId`: UUID

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "file_url": "https://...",
  "file_name": "image.jpg",
  "file_type": "image/jpeg",
  "file_size": 123456
}
```

### DELETE /api/media/[id]
Delete media file (requires authentication).

## Webhook Endpoints

### POST /api/webhooks/stripe
Handle Stripe webhooks.

**Headers:**
- `stripe-signature`: Webhook signature

## Status Codes

- `200 OK`: Success
- `201 Created`: Resource created
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Pagination

Paginated endpoints return:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Validation

All endpoints validate input using Zod schemas. Validation errors return:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email"
    }
  ]
}
```
