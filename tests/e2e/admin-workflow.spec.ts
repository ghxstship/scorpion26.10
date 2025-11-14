import { test, expect } from '@playwright/test'

test.describe('Admin Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@test.com')
    await page.fill('input[type="password"]', 'AdminP@ssw0rd123!')
    await page.click('button[type="submit"]')
    await page.waitForURL('/admin')
  })

  test('should access admin dashboard', async ({ page }) => {
    await expect(page).toHaveURL('/admin')
    await expect(page.locator('h1')).toContainText(/dashboard/i)
  })

  test('should view products list', async ({ page }) => {
    await page.goto('/admin/products')
    await expect(page).toHaveURL('/admin/products')
    await expect(page.locator('h1')).toContainText(/products/i)
  })

  test('should view orders list', async ({ page }) => {
    await page.goto('/admin/orders')
    await expect(page).toHaveURL('/admin/orders')
    await expect(page.locator('h1')).toContainText(/orders/i)
  })

  test('should view blog posts', async ({ page }) => {
    await page.goto('/admin/blog')
    await expect(page).toHaveURL('/admin/blog')
  })

  test('should access settings', async ({ page }) => {
    await page.goto('/admin/settings/payments')
    await expect(page).toHaveURL('/admin/settings/payments')
  })
})
