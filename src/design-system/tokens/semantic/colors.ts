import { primitiveColors } from '../primitives/colors';

/**
 * Semantic Color Tokens - Spartan Warrior Aesthetic
 * Purpose-driven color assignments
 * Components should ONLY use these, never primitive colors
 * 
 * Color Distribution: 90% Greyscale, 5% Red, 5% Gold
 */

export const semanticColors = {
  // Interactive elements
  interactive: {
    // Primary actions (Deep Red - Call to Arms)
    primary: {
      default: primitiveColors.red[700],      // Crimson
      hover: primitiveColors.red[600],        // Rich red
      active: primitiveColors.red[800],       // Deep crimson
      disabled: primitiveColors.grey[600],    // Medium-dark grey
    },
    // Secondary actions (Gold - Shield)
    secondary: {
      default: primitiveColors.gold[600],     // Rich gold
      hover: primitiveColors.gold[500],       // Primary gold
      active: primitiveColors.gold[700],      // Antique gold
      disabled: primitiveColors.grey[600],    // Medium-dark grey
    },
    // Tertiary actions (Ghost)
    tertiary: {
      default: 'transparent',
      hover: primitiveColors.grey[800],       // Charcoal
      active: primitiveColors.grey[700],      // Dark grey
      disabled: primitiveColors.grey[600],    // Medium-dark grey
    },
  },
  
  // Status indicators
  status: {
    success: {
      default: primitiveColors.gold[600],           // Rich gold
      bg: 'rgba(212, 175, 55, 0.1)',               // Gold with 10% opacity
      border: primitiveColors.gold[700],            // Antique gold
      text: primitiveColors.gold[600],              // Rich gold
    },
    error: {
      default: primitiveColors.red[600],            // Rich red
      bg: 'rgba(200, 0, 0, 0.1)',                  // Red with 10% opacity
      border: primitiveColors.red[700],             // Crimson
      text: primitiveColors.red[600],               // Rich red
    },
    warning: {
      default: primitiveColors.gold[500],           // Primary gold
      bg: 'rgba(255, 215, 0, 0.1)',                // Gold with 10% opacity
      border: primitiveColors.gold[600],            // Rich gold
      text: primitiveColors.gold[500],              // Primary gold
    },
    info: {
      default: primitiveColors.grey[300],           // Light grey
      bg: 'rgba(160, 160, 160, 0.1)',              // Grey with 10% opacity
      border: primitiveColors.grey[400],            // Light-medium grey
      text: primitiveColors.grey[300],              // Light grey
    },
  },
  
  // Text colors (for dark backgrounds)
  text: {
    primary: primitiveColors.grey[100],       // Off-white
    secondary: primitiveColors.grey[300],     // Light grey
    tertiary: primitiveColors.grey[400],      // Light-medium grey
    disabled: primitiveColors.grey[600],      // Medium-dark grey
    inverse: primitiveColors.grey[950],       // Pure black (for light backgrounds)
    brand: primitiveColors.gold[600],         // Rich gold
    success: primitiveColors.gold[600],       // Rich gold
    error: primitiveColors.red[600],          // Rich red
    warning: primitiveColors.gold[500],       // Primary gold
    info: primitiveColors.grey[300],          // Light grey
  },
  
  // Surface colors (dark theme default)
  surface: {
    primary: primitiveColors.grey[950],       // Pure black
    secondary: primitiveColors.grey[900],     // Deep charcoal
    tertiary: primitiveColors.grey[850],      // Dark charcoal
    raised: primitiveColors.grey[800],        // Charcoal
    overlay: 'rgba(0, 0, 0, 0.85)',          // Black with 85% opacity
    overlayLight: 'rgba(0, 0, 0, 0.5)',      // Black with 50% opacity
  },
  
  // Border colors
  border: {
    default: primitiveColors.grey[700],       // Dark grey
    strong: primitiveColors.grey[600],        // Medium-dark grey
    subtle: primitiveColors.grey[900],        // Deep charcoal
    brand: primitiveColors.gold[600],         // Rich gold
    focus: primitiveColors.gold[600],         // Rich gold
    error: primitiveColors.red[600],          // Rich red
    success: primitiveColors.gold[600],       // Rich gold
    warning: primitiveColors.gold[500],       // Primary gold
  },
  
  // Glow effects (for dramatic emphasis)
  glow: {
    red: '0 0 20px rgba(181, 0, 0, 0.5)',
    redStrong: '0 0 40px rgba(181, 0, 0, 0.3)',
    gold: '0 0 20px rgba(212, 175, 55, 0.5)',
    goldStrong: '0 0 40px rgba(255, 215, 0, 0.3)',
    white: '0 0 40px rgba(255, 255, 255, 0.1)',
  },
} as const;

export type SemanticColors = typeof semanticColors;
