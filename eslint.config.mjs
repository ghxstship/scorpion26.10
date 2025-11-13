import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Allow 'any' types in test files for mocking
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  // Allow 'any' in typed helper files (controlled type assertions)
  {
    files: ["**/typed-client.ts", "**/typed-helpers.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  // Production-grade rules - zero tolerance
  {
    rules: {
      "react/no-unescaped-entities": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
]);

export default eslintConfig;
