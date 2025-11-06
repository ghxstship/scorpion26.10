import { primitiveColors } from '../primitives/colors';

/**
 * Semantic Color Tokens
 * Purpose-driven color assignments
 * Components should ONLY use these, never primitive colors
 */

export const semanticColors = {
  // Interactive elements
  interactive: {
    primary: {
      default: primitiveColors.brand[500],
      hover: primitiveColors.brand[600],
      active: primitiveColors.brand[700],
      disabled: primitiveColors.neutral[300],
    },
    secondary: {
      default: primitiveColors.neutral[600],
      hover: primitiveColors.neutral[700],
      active: primitiveColors.neutral[800],
      disabled: primitiveColors.neutral[300],
    },
    tertiary: {
      default: 'transparent',
      hover: primitiveColors.neutral[100],
      active: primitiveColors.neutral[200],
      disabled: primitiveColors.neutral[300],
    },
  },
  
  // Status indicators
  status: {
    success: {
      default: primitiveColors.success[500],
      bg: primitiveColors.success[50],
      border: primitiveColors.success[500],
      text: primitiveColors.success[900],
    },
    error: {
      default: primitiveColors.error[500],
      bg: primitiveColors.error[50],
      border: primitiveColors.error[500],
      text: primitiveColors.error[900],
    },
    warning: {
      default: primitiveColors.warning[500],
      bg: primitiveColors.warning[50],
      border: primitiveColors.warning[500],
      text: primitiveColors.warning[900],
    },
    info: {
      default: primitiveColors.info[500],
      bg: primitiveColors.info[50],
      border: primitiveColors.info[500],
      text: primitiveColors.info[900],
    },
  },
  
  // Text colors
  text: {
    primary: primitiveColors.neutral[900],
    secondary: primitiveColors.neutral[600],
    tertiary: primitiveColors.neutral[500],
    disabled: primitiveColors.neutral[400],
    inverse: primitiveColors.neutral[0],
    brand: primitiveColors.brand[500],
    success: primitiveColors.success[900],
    error: primitiveColors.error[900],
    warning: primitiveColors.warning[900],
    info: primitiveColors.info[900],
  },
  
  // Surface colors
  surface: {
    primary: primitiveColors.neutral[0],
    secondary: primitiveColors.neutral[50],
    tertiary: primitiveColors.neutral[100],
    raised: primitiveColors.neutral[0],
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.25)',
  },
  
  // Border colors
  border: {
    default: primitiveColors.neutral[200],
    strong: primitiveColors.neutral[300],
    subtle: primitiveColors.neutral[100],
    brand: primitiveColors.brand[500],
    focus: primitiveColors.brand[500],
    error: primitiveColors.error[500],
    success: primitiveColors.success[500],
    warning: primitiveColors.warning[500],
  },
} as const;

export type SemanticColors = typeof semanticColors;
