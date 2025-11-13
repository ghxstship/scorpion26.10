import { primitiveColors } from '../primitives/colors'
import { lightTheme } from './light'

const colors = primitiveColors as Record<string, Record<number, string>>;

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
        default: colors.brand[400],
        hover: colors.brand[500],
        active: colors.brand[600],
        disabled: colors.neutral[700],
      },
      secondary: {
        default: colors.neutral[400],
        hover: colors.neutral[300],
        active: colors.neutral[200],
        disabled: colors.neutral[700],
      },
      tertiary: {
        default: 'transparent',
        hover: colors.neutral[800],
        active: colors.neutral[700],
        disabled: colors.neutral[700],
      },
    },
    
    // Status indicators
    status: {
      success: {
        default: colors.success[400],
        bg: colors.success[950],
        border: colors.success[400],
        text: colors.success[100],
      },
      error: {
        default: colors.error[400],
        bg: colors.error[950],
        border: colors.error[400],
        text: colors.error[100],
      },
      warning: {
        default: colors.warning[400],
        bg: colors.warning[950],
        border: colors.warning[400],
        text: colors.warning[100],
      },
      info: {
        default: colors.info[400],
        bg: colors.info[950],
        border: colors.info[400],
        text: colors.info[100],
      },
    },
    
    // Text colors
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[400],
      tertiary: colors.neutral[500],
      disabled: colors.neutral[600],
      inverse: colors.neutral[900],
      brand: colors.brand[400],
      success: colors.success[100],
      error: colors.error[100],
      warning: colors.warning[100],
      info: colors.info[100],
    },
    
    // Surface colors
    surface: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
      raised: colors.neutral[800],
      overlay: 'rgba(0, 0, 0, 0.7)',
      overlayLight: 'rgba(0, 0, 0, 0.5)',
    },
    
    // Border colors
    border: {
      default: colors.neutral[700],
      strong: colors.neutral[600],
      subtle: colors.neutral[800],
      brand: colors.brand[400],
      focus: colors.brand[400],
      error: colors.error[400],
      success: colors.success[400],
      warning: colors.warning[400],
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
