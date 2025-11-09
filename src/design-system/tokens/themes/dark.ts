import { primitiveColors } from '../primitives/colors';
import { lightTheme } from './light';

/**
 * Dark Theme
 * Dark mode configuration with adjusted colors
 */

export const darkTheme = {
  ...lightTheme,
  
  colors: {
    // Interactive elements
    interactive: {
      primary: {
        default: primitiveColors.brand[400],
        hover: primitiveColors.brand[500],
        active: primitiveColors.brand[600],
        disabled: primitiveColors.neutral[700],
      },
      secondary: {
        default: primitiveColors.neutral[400],
        hover: primitiveColors.neutral[300],
        active: primitiveColors.neutral[200],
        disabled: primitiveColors.neutral[700],
      },
      tertiary: {
        default: 'transparent',
        hover: primitiveColors.neutral[800],
        active: primitiveColors.neutral[700],
        disabled: primitiveColors.neutral[700],
      },
    },
    
    // Status indicators
    status: {
      success: {
        default: primitiveColors.success[400],
        bg: primitiveColors.success[950],
        border: primitiveColors.success[400],
        text: primitiveColors.success[100],
      },
      error: {
        default: primitiveColors.error[400],
        bg: primitiveColors.error[950],
        border: primitiveColors.error[400],
        text: primitiveColors.error[100],
      },
      warning: {
        default: primitiveColors.warning[400],
        bg: primitiveColors.warning[950],
        border: primitiveColors.warning[400],
        text: primitiveColors.warning[100],
      },
      info: {
        default: primitiveColors.info[400],
        bg: primitiveColors.info[950],
        border: primitiveColors.info[400],
        text: primitiveColors.info[100],
      },
    },
    
    // Text colors
    text: {
      primary: primitiveColors.neutral[50],
      secondary: primitiveColors.neutral[400],
      tertiary: primitiveColors.neutral[500],
      disabled: primitiveColors.neutral[600],
      inverse: primitiveColors.neutral[900],
      brand: primitiveColors.brand[400],
      success: primitiveColors.success[100],
      error: primitiveColors.error[100],
      warning: primitiveColors.warning[100],
      info: primitiveColors.info[100],
    },
    
    // Surface colors
    surface: {
      primary: primitiveColors.neutral[900],
      secondary: primitiveColors.neutral[800],
      tertiary: primitiveColors.neutral[700],
      raised: primitiveColors.neutral[800],
      overlay: 'rgba(0, 0, 0, 0.7)',
      overlayLight: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Border colors
    border: {
      default: primitiveColors.neutral[700],
      strong: primitiveColors.neutral[600],
      subtle: primitiveColors.neutral[800],
      brand: primitiveColors.brand[400],
      focus: primitiveColors.brand[400],
      error: primitiveColors.error[400],
      success: primitiveColors.success[400],
      warning: primitiveColors.warning[400],
    },
  },
  
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  },
} as const;

export type DarkTheme = typeof darkTheme;
