import { describe, it, expect } from 'vitest'
import {
  checkColorContrast,
  validateAriaAttributes,
  validateTouchTarget,
  validateHeadingHierarchy,
  validateFormField,
  validateImageAlt,
  validateLinkText,
  validateKeyboardNavigation,
  generateAccessibilityReport
} from '@/lib/utils/accessibility-validator'

describe('Accessibility Validator', () => {
  describe('checkColorContrast', () => {
    it('should pass for high contrast colors', () => {
      const result = checkColorContrast('#000000', '#FFFFFF')
      expect(result.passes).toBe(true)
      expect(result.ratio).toBeGreaterThan(4.5)
    })

    it('should fail for low contrast colors', () => {
      const result = checkColorContrast('#777777', '#888888')
      expect(result.passes).toBe(false)
      expect(result.ratio).toBeLessThan(4.5)
    })

    it('should use lower threshold for large text', () => {
      const result = checkColorContrast('#767676', '#FFFFFF', true)
      expect(result.required).toBe(3)
    })
  })

  describe('validateAriaAttributes', () => {
    it('should pass for button with aria-label', () => {
      const result = validateAriaAttributes({
        role: 'button',
        ariaLabel: 'Submit form'
      })
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should fail for button without accessible name', () => {
      const result = validateAriaAttributes({
        role: 'button'
      })
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should pass for non-interactive elements', () => {
      const result = validateAriaAttributes({
        role: 'article'
      })
      expect(result.valid).toBe(true)
    })
  })

  describe('validateTouchTarget', () => {
    it('should pass for 44x44px target', () => {
      const result = validateTouchTarget(44, 44)
      expect(result.passes).toBe(true)
    })

    it('should pass for larger targets', () => {
      const result = validateTouchTarget(48, 48)
      expect(result.passes).toBe(true)
    })

    it('should fail for small targets', () => {
      const result = validateTouchTarget(32, 32)
      expect(result.passes).toBe(false)
    })

    it('should fail if only one dimension is too small', () => {
      const result = validateTouchTarget(44, 30)
      expect(result.passes).toBe(false)
    })
  })

  describe('validateHeadingHierarchy', () => {
    it('should pass for proper hierarchy', () => {
      const headings = [
        { level: 1, text: 'Main Title' },
        { level: 2, text: 'Section' },
        { level: 3, text: 'Subsection' },
        { level: 2, text: 'Another Section' }
      ]
      const result = validateHeadingHierarchy(headings)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should fail if first heading is not h1', () => {
      const headings = [
        { level: 2, text: 'Section' }
      ]
      const result = validateHeadingHierarchy(headings)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('h1'))).toBe(true)
    })

    it('should fail for skipped levels', () => {
      const headings = [
        { level: 1, text: 'Main' },
        { level: 3, text: 'Skipped h2' }
      ]
      const result = validateHeadingHierarchy(headings)
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('skipped'))).toBe(true)
    })

    it('should pass for empty headings array', () => {
      const result = validateHeadingHierarchy([])
      expect(result.valid).toBe(true)
    })
  })

  describe('validateFormField', () => {
    it('should pass for field with label', () => {
      const result = validateFormField({
        id: 'email',
        name: 'email',
        label: 'Email Address'
      })
      expect(result.valid).toBe(true)
    })

    it('should pass for field with aria-label', () => {
      const result = validateFormField({
        id: 'search',
        ariaLabel: 'Search products'
      })
      expect(result.valid).toBe(true)
    })

    it('should fail for field without label', () => {
      const result = validateFormField({
        id: 'field'
      })
      expect(result.valid).toBe(false)
    })

    it('should warn if field has no id or name', () => {
      const result = validateFormField({
        label: 'Field'
      })
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('id or name'))).toBe(true)
    })
  })

  describe('validateImageAlt', () => {
    it('should pass for descriptive alt text', () => {
      const result = validateImageAlt('A red apple on a wooden table')
      expect(result.valid).toBe(true)
    })

    it('should fail for missing alt text', () => {
      const result = validateImageAlt(undefined)
      expect(result.valid).toBe(false)
    })

    it('should fail for empty alt text on non-decorative image', () => {
      const result = validateImageAlt('')
      expect(result.valid).toBe(false)
    })

    it('should pass for empty alt on decorative image', () => {
      const result = validateImageAlt('', true)
      expect(result.valid).toBe(true)
    })

    it('should fail for too short alt text', () => {
      const result = validateImageAlt('ab')
      expect(result.valid).toBe(false)
    })

    it('should fail for too long alt text', () => {
      const longAlt = 'a'.repeat(130)
      const result = validateImageAlt(longAlt)
      expect(result.valid).toBe(false)
    })
  })

  describe('validateLinkText', () => {
    it('should pass for descriptive link text', () => {
      const result = validateLinkText('View product details')
      expect(result.valid).toBe(true)
    })

    it('should fail for generic link text', () => {
      const result = validateLinkText('click here')
      expect(result.valid).toBe(false)
    })

    it('should fail for empty link text', () => {
      const result = validateLinkText('')
      expect(result.valid).toBe(false)
    })

    it('should detect other generic texts', () => {
      const genericTexts = ['read more', 'learn more', 'here', 'link']
      genericTexts.forEach(text => {
        const result = validateLinkText(text)
        expect(result.valid).toBe(false)
      })
    })
  })

  describe('validateKeyboardNavigation', () => {
    it('should pass for keyboard accessible button', () => {
      const result = validateKeyboardNavigation({
        role: 'button',
        tabIndex: 0
      })
      expect(result.valid).toBe(true)
    })

    it('should fail for non-accessible interactive element', () => {
      const result = validateKeyboardNavigation({
        role: 'button',
        tabIndex: -1
      })
      expect(result.valid).toBe(false)
    })

    it('should warn about positive tabIndex', () => {
      const result = validateKeyboardNavigation({
        role: 'button',
        tabIndex: 1
      })
      expect(result.valid).toBe(false)
      expect(result.errors.some(e => e.includes('positive tabIndex'))).toBe(true)
    })

    it('should pass for disabled elements', () => {
      const result = validateKeyboardNavigation({
        role: 'button',
        tabIndex: -1,
        disabled: true
      })
      expect(result.valid).toBe(true)
    })
  })

  describe('generateAccessibilityReport', () => {
    it('should generate report with passed and failed checks', () => {
      const checks = [
        {
          name: 'Color Contrast',
          result: { valid: true, errors: [] }
        },
        {
          name: 'ARIA Attributes',
          result: { valid: false, errors: ['Missing aria-label'] }
        },
        {
          name: 'Touch Targets',
          result: { valid: true, errors: [] }
        }
      ]

      const report = generateAccessibilityReport(checks)
      
      expect(report.passed).toBe(2)
      expect(report.failed).toBe(1)
      expect(report.errors).toHaveLength(1)
      expect(report.errors[0].type).toBe('ARIA Attributes')
      expect(report.errors[0].message).toBe('Missing aria-label')
    })

    it('should handle all passing checks', () => {
      const checks = [
        { name: 'Check 1', result: { valid: true, errors: [] } },
        { name: 'Check 2', result: { valid: true, errors: [] } }
      ]

      const report = generateAccessibilityReport(checks)
      
      expect(report.passed).toBe(2)
      expect(report.failed).toBe(0)
      expect(report.errors).toHaveLength(0)
    })
  })
})
