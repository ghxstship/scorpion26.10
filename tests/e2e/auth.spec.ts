import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.locator('h1')).toContainText(/login|sign in/i)
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/invalid.*email/i')).toBeVisible()
  })

  test('should show error for empty fields', async ({ page }) => {
    await page.goto('/login')
    
    await page.click('button[type="submit"]')
    
    // Should show validation errors
    const errors = page.locator('[role="alert"], .error, .text-red-500')
    await expect(errors.first()).toBeVisible()
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login')
    
    await page.click('text=/sign up|create account|register/i')
    
    await expect(page).toHaveURL(/\/signup/)
  })

  test('should display signup page with all fields', async ({ page }) => {
    await page.goto('/signup')
    
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.locator('input[name="fullName"]')).toBeVisible()
  })

  test('should enforce password minimum length', async ({ page }) => {
    await page.goto('/signup')
    
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'short')
    await page.fill('input[name="fullName"]', 'Test User')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=/password.*8.*characters/i')).toBeVisible()
  })

  test('should navigate to password reset page', async ({ page }) => {
    await page.goto('/login')
    
    await page.click('text=/forgot.*password/i')
    
    await expect(page).toHaveURL(/\/reset-password/)
  })
})

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing protected route', async ({ page }) => {
    await page.goto('/dashboard')
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })

  test('should redirect to login when accessing admin route', async ({ page }) => {
    await page.goto('/admin')
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/login/)
  })
})
