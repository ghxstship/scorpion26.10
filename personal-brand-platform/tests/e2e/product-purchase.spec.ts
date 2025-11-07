import { test, expect } from '@playwright/test'

test.describe('Product Purchase Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login')
    await page.fill('input[name="email"]', 'customer@test.com')
    await page.fill('input[name="password"]', 'testpassword')
    await page.click('button[type="submit"]')
    await page.waitForURL('/dashboard')
  })

  test('should complete full purchase flow', async ({ page }) => {
    // Navigate to products
    await page.goto('/products')
    await expect(page.locator('h1')).toContainText(/products/i)

    // Select a product
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await firstProduct.click()

    // Add to cart
    await page.click('button:has-text("Add to Cart")')
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1')

    // Go to checkout
    await page.click('[data-testid="cart-button"]')
    await page.click('button:has-text("Checkout")')

    // Fill checkout form
    await page.fill('input[name="address"]', '123 Test St')
    await page.fill('input[name="city"]', 'Test City')
    await page.fill('input[name="zip"]', '12345')

    // Complete purchase
    await page.click('button:has-text("Complete Purchase")')

    // Verify success
    await expect(page).toHaveURL(/\/thank-you/)
    await expect(page.locator('h1')).toContainText(/thank you/i)
  })

  test('should handle out of stock products', async ({ page }) => {
    await page.goto('/products')
    
    const outOfStockProduct = page.locator('[data-testid="product-card"]:has-text("Out of Stock")').first()
    if (await outOfStockProduct.count() > 0) {
      await outOfStockProduct.click()
      
      const addToCartButton = page.locator('button:has-text("Add to Cart")')
      await expect(addToCartButton).toBeDisabled()
    }
  })

  test('should apply discount code', async ({ page }) => {
    // Add product to cart
    await page.goto('/products')
    await page.locator('[data-testid="product-card"]').first().click()
    await page.click('button:has-text("Add to Cart")')

    // Go to checkout
    await page.click('[data-testid="cart-button"]')
    await page.click('button:has-text("Checkout")')

    // Apply discount
    await page.fill('input[name="discountCode"]', 'TEST10')
    await page.click('button:has-text("Apply")')

    // Verify discount applied
    await expect(page.locator('[data-testid="discount-amount"]')).toBeVisible()
  })
})
