/**
 * Email Design Tokens
 * Token-based inline styles for email templates
 * Email clients require inline styles, but we still use tokens for consistency
 */

import { primitiveColors } from '@/design-system/tokens/primitives/colors';

/**
 * Email-safe color tokens
 * Using the Spartan theme colors
 */
export const emailColors = {
  // Greyscale
  black: primitiveColors.grey[950],
  darkCharcoal: primitiveColors.grey[900],
  charcoal: primitiveColors.grey[800],
  darkGrey: primitiveColors.grey[700],
  mediumGrey: primitiveColors.grey[500],
  lightGrey: primitiveColors.grey[300],
  offWhite: primitiveColors.grey[100],
  nearWhite: primitiveColors.grey[50],
  
  // Brand colors
  crimson: primitiveColors.red[700],
  richRed: primitiveColors.red[600],
  richGold: primitiveColors.gold[600],
  primaryGold: primitiveColors.gold[500],
  
  // Status colors
  success: primitiveColors.gold[600],
  error: primitiveColors.red[600],
  warning: primitiveColors.gold[500],
  info: primitiveColors.grey[300],
} as const;

/**
 * Email-safe spacing tokens (in pixels for email compatibility)
 */
export const emailSpacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

/**
 * Email-safe typography tokens
 */
export const emailTypography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", Times, serif',
    mono: 'Consolas, Monaco, "Courier New", monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

/**
 * Email-safe border radius
 */
export const emailBorderRadius = {
  none: '0',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  full: '9999px',
} as const;

/**
 * Common email styles as objects
 */
export const emailStyles = {
  // Layout containers
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: emailColors.black,
  },
  
  // Content section
  content: {
    padding: emailSpacing.lg,
    backgroundColor: emailColors.darkCharcoal,
  },
  
  // Typography
  heading: {
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize['2xl'],
    fontWeight: emailTypography.fontWeight.bold,
    color: emailColors.offWhite,
    margin: '0 0 16px 0',
    lineHeight: emailTypography.lineHeight.tight,
  },
  
  subheading: {
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.lg,
    fontWeight: emailTypography.fontWeight.semibold,
    color: emailColors.offWhite,
    margin: '24px 0 12px 0',
    lineHeight: emailTypography.lineHeight.normal,
  },
  
  paragraph: {
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.base,
    fontWeight: emailTypography.fontWeight.normal,
    color: emailColors.lightGrey,
    margin: '0 0 16px 0',
    lineHeight: emailTypography.lineHeight.relaxed,
  },
  
  // Buttons
  buttonPrimary: {
    backgroundColor: emailColors.crimson,
    color: emailColors.offWhite,
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.base,
    fontWeight: emailTypography.fontWeight.semibold,
    padding: '12px 24px',
    borderRadius: emailBorderRadius.md,
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
  },
  
  buttonSecondary: {
    backgroundColor: emailColors.richGold,
    color: emailColors.black,
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.base,
    fontWeight: emailTypography.fontWeight.semibold,
    padding: '12px 24px',
    borderRadius: emailBorderRadius.md,
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
  },
  
  // Dividers
  hr: {
    borderTop: `1px solid ${emailColors.darkGrey}`,
    borderBottom: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    margin: '24px 0',
  },
  
  // Info boxes
  infoBox: {
    backgroundColor: emailColors.charcoal,
    padding: emailSpacing.md,
    borderRadius: emailBorderRadius.md,
    borderLeft: `4px solid ${emailColors.richGold}`,
    margin: '16px 0',
  },
  
  // Tables
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    margin: '16px 0',
  },
  
  tableCell: {
    padding: emailSpacing.sm,
    borderBottom: `1px solid ${emailColors.darkGrey}`,
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.base,
    color: emailColors.lightGrey,
  },
  
  // Footer
  footer: {
    padding: emailSpacing.lg,
    backgroundColor: emailColors.black,
    borderTop: `1px solid ${emailColors.darkGrey}`,
  },
  
  footerText: {
    fontFamily: emailTypography.fontFamily.sans,
    fontSize: emailTypography.fontSize.sm,
    color: emailColors.mediumGrey,
    margin: '0 0 8px 0',
    lineHeight: emailTypography.lineHeight.normal,
  },
  
  footerLink: {
    color: emailColors.richGold,
    textDecoration: 'none',
  },
} as const;

/**
 * Helper function to merge email styles
 */
export function mergeEmailStyles(...styles: React.CSSProperties[]): React.CSSProperties {
  return Object.assign({}, ...styles);
}

/**
 * Type for email style objects
 */
export type EmailStyle = React.CSSProperties;
