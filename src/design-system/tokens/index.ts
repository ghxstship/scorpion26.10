/**
 * Design Tokens Central Export
 * Single source of truth for all design tokens
 */

export * from './primitives';
export * from './semantic';
export * from './themes';

// Re-export for convenience
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';

export const tokens = {
  light: lightTheme,
  dark: darkTheme,
};

export type { Theme } from './themes/light';
export type { DarkTheme } from './themes/dark';
