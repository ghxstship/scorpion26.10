/**
 * Accessibility Validation Utilities
 * WCAG 2.1 AA Compliance Helpers
 */

/**
 * Check if color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  isLargeText = false
): { passes: boolean; ratio: number; required: number } {
  const fgLuminance = getRelativeLuminance(foreground)
  const bgLuminance = getRelativeLuminance(background)
  
  const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                (Math.min(fgLuminance, bgLuminance) + 0.05)
  
  const required = isLargeText ? 3 : 4.5
  
  return {
    passes: ratio >= required,
    ratio: Math.round(ratio * 100) / 100,
    required
  }
}

/**
 * Calculate relative luminance for a color
 */
function getRelativeLuminance(color: string): number {
  const rgb = hexToRgb(color)
  if (!rgb) return 0
  
  const [r, g, b] = rgb.map(val => {
    const normalized = val / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null
}

/**
 * Validate ARIA attributes
 */
export function validateAriaAttributes(element: {
  role?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check if interactive elements have accessible names
  const interactiveRoles = ['button', 'link', 'textbox', 'checkbox', 'radio', 'combobox']
  if (element.role && interactiveRoles.includes(element.role)) {
    if (!element.ariaLabel && !element.ariaLabelledBy) {
      errors.push(`Interactive element with role="${element.role}" must have aria-label or aria-labelledby`)
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Check if touch target meets minimum size (44x44px)
 */
export function validateTouchTarget(width: number, height: number): {
  passes: boolean
  width: number
  height: number
  minSize: number
} {
  const minSize = 44
  return {
    passes: width >= minSize && height >= minSize,
    width,
    height,
    minSize
  }
}

/**
 * Validate heading hierarchy
 */
export function validateHeadingHierarchy(headings: Array<{ level: number; text: string }>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (headings.length === 0) {
    return { valid: true, errors: [] }
  }
  
  // Check if first heading is h1
  if (headings[0].level !== 1) {
    errors.push('Page should start with an h1 heading')
  }
  
  // Check for skipped levels
  for (let i = 1; i < headings.length; i++) {
    const prevLevel = headings[i - 1].level
    const currentLevel = headings[i].level
    
    if (currentLevel > prevLevel + 1) {
      errors.push(
        `Heading level skipped: h${prevLevel} followed by h${currentLevel} (should be h${prevLevel + 1})`
      )
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Check if form field has proper label
 */
export function validateFormField(field: {
  id?: string
  name?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  label?: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!field.ariaLabel && !field.ariaLabelledBy && !field.label) {
    errors.push('Form field must have a label, aria-label, or aria-labelledby')
  }
  
  if (!field.id && !field.name) {
    errors.push('Form field should have an id or name attribute')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate image alt text
 */
export function validateImageAlt(alt: string | undefined, isDecorative = false): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (isDecorative) {
    if (alt !== '') {
      errors.push('Decorative images should have empty alt text (alt="")')
    }
  } else {
    if (!alt || alt.trim() === '') {
      errors.push('Non-decorative images must have descriptive alt text')
    } else if (alt.length < 3) {
      errors.push('Alt text should be descriptive (at least 3 characters)')
    } else if (alt.length > 125) {
      errors.push('Alt text should be concise (max 125 characters)')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Check if link text is descriptive
 */
export function validateLinkText(text: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  const genericTexts = ['click here', 'read more', 'learn more', 'here', 'link']
  const lowerText = text.toLowerCase().trim()
  
  if (genericTexts.includes(lowerText)) {
    errors.push(`Link text "${text}" is not descriptive. Use meaningful text that describes the destination.`)
  }
  
  if (text.trim().length === 0) {
    errors.push('Link must have text content or aria-label')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Validate keyboard navigation
 */
export function validateKeyboardNavigation(element: {
  tabIndex?: number
  role?: string
  disabled?: boolean
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Check if interactive elements are keyboard accessible
  const interactiveRoles = ['button', 'link', 'textbox', 'checkbox', 'radio']
  if (element.role && interactiveRoles.includes(element.role)) {
    if (element.tabIndex !== undefined && element.tabIndex < 0 && !element.disabled) {
      errors.push('Interactive elements should be keyboard accessible (tabIndex >= 0 or undefined)')
    }
  }
  
  // Warn about positive tabIndex
  if (element.tabIndex && element.tabIndex > 0) {
    errors.push('Avoid positive tabIndex values as they disrupt natural tab order')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Generate accessibility report for a component
 */
export interface AccessibilityReport {
  passed: number
  failed: number
  warnings: number
  errors: Array<{ type: string; message: string }>
}

export function generateAccessibilityReport(
  checks: Array<{ name: string; result: { valid: boolean; errors: string[] } }>
): AccessibilityReport {
  const report: AccessibilityReport = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: []
  }
  
  checks.forEach(check => {
    if (check.result.valid) {
      report.passed++
    } else {
      report.failed++
      check.result.errors.forEach(error => {
        report.errors.push({
          type: check.name,
          message: error
        })
      })
    }
  })
  
  return report
}
