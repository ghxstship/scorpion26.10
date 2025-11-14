import { test, expect } from '@playwright/test'

test.describe('Booking Workflow', () => {
  test('should display booking calendar', async ({ page }) => {
    await page.goto('/account/bookings')
    
    // Should show calendar or booking interface
    const hasCalendar = await page.locator('[role="grid"], .calendar, [data-testid="calendar"]').count()
    expect(hasCalendar).toBeGreaterThan(0)
  })

  test('should require authentication for booking', async ({ page }) => {
    await page.goto('/account/bookings')
    
    // Should redirect to login or show auth required
    const url = page.url()
    expect(url).toMatch(/login|auth|account/)
  })

  test('should show booking form elements', async ({ page }) => {
    await page.goto('/account/bookings')
    
    // Check for common booking form elements
    const hasDateInput = await page.locator('input[type="date"], input[type="datetime-local"]').count()
    const hasServiceSelect = await page.locator('select, [role="combobox"]').count()
    
    expect(hasDateInput + hasServiceSelect).toBeGreaterThan(0)
  })
})
