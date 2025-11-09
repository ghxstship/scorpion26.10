/**
 * Primitive Color Tokens - Spartan Warrior Aesthetic
 * Base color palette - do not use directly in components
 * Use semantic tokens instead for better maintainability
 * 
 * Inspired by: Movie "300" + Elite Performance Brands
 * Philosophy: Greyscale dominant with deep red and gold accents
 */

export const primitiveColors = {
  // Greyscale Foundation (90% of UI)
  grey: {
    950: '#000000',  // Pure black
    900: '#0A0A0A',  // Deep charcoal
    850: '#141414',  // Dark charcoal
    800: '#1A1A1A',  // Charcoal
    700: '#2A2A2A',  // Dark grey
    600: '#404040',  // Medium-dark grey
    500: '#5A5A5A',  // Medium grey
    400: '#7A7A7A',  // Light-medium grey
    300: '#A0A0A0',  // Light grey
    200: '#C8C8C8',  // Very light grey
    100: '#E8E8E8',  // Off-white
    50: '#F5F5F5',   // Near-white
  },
  
  // Deep Red Accents - Spartan Blood (5% of UI)
  // Use for: Primary CTAs, urgent actions, alerts, badges
  red: {
    900: '#8B0000',  // Blood red (darkest)
    800: '#A00000',  // Deep crimson
    700: '#B50000',  // Crimson (PRIMARY)
    600: '#C80000',  // Rich red
    500: '#DC0000',  // Primary red
    400: '#E61A1A',  // Bright red
    300: '#F04040',  // Light red
  },
  
  // Gold Accents - Spartan Glory (5% of UI)
  // Use for: Premium features, success states, highlights, focus
  gold: {
    900: '#6B4E00',  // Deep bronze (darkest)
    800: '#8B6500',  // Dark gold
    700: '#B8860B',  // Antique gold
    600: '#D4AF37',  // Rich gold (PRIMARY)
    500: '#FFD700',  // Primary gold
    400: '#FFE44D',  // Bright gold
    300: '#FFF099',  // Light gold
  },
  
  // Legacy color bases (kept for backward compatibility)
  // NOTE: Prefer grey/red/gold above for new implementations
  success: {
    50: '#F0FDF4',
    500: '#22C55E',
    900: '#14532D',
  },
  
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    900: '#7F1D1D',
  },
  
  warning: {
    50: '#FFFBEB',
    500: '#F59E0B',
    900: '#78350F',
  },
  
  info: {
    50: '#EFF6FF',
    500: '#3B82F6',
    900: '#1E3A8A',
  },
} as const;

// Type safety for token access
export type PrimitiveColor = typeof primitiveColors;
