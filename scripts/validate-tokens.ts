#!/usr/bin/env node

/**
 * Design Token Validator
 * Validates that all components use design tokens
 * Run in CI/CD pipeline to enforce token usage
 */

import fs from 'fs';
import path from 'path';

interface ValidationError {
  file: string;
  line: number;
  violation: string;
  suggestion: string;
  code: string;
}

const FORBIDDEN_PATTERNS = [
  // Hardcoded colors
  {
    pattern: /#[0-9A-Fa-f]{3,8}(?![0-9A-Fa-f])/g,
    name: 'hardcoded hex color',
    suggestion: 'Use var(--color-*) or semantic color token',
  },
  {
    pattern: /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g,
    name: 'hardcoded RGB color',
    suggestion: 'Use var(--color-*) or semantic color token',
  },
  {
    pattern: /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g,
    name: 'hardcoded RGBA color',
    suggestion: 'Use var(--color-*) or semantic color token',
  },

  // Hardcoded spacing (px values in CSS)
  {
    pattern: /:\s*\d+px(?!\s*\/)/g,
    name: 'hardcoded pixel spacing',
    suggestion: 'Use var(--space-*) token or rem units',
  },

  // Hardcoded font sizes
  {
    pattern: /font-size:\s*\d+px/g,
    name: 'hardcoded font size',
    suggestion: 'Use var(--font-size-*) token',
  },

  // Directional properties (should use logical)
  {
    pattern: /(margin|padding)-(left|right):/g,
    name: 'directional property (not RTL-friendly)',
    suggestion: 'Use margin-inline-start or margin-inline-end',
  },
  {
    pattern: /text-align:\s*(left|right)/g,
    name: 'directional text-align (not RTL-friendly)',
    suggestion: 'Use text-align: start or text-align: end',
  },
];

// Files to exclude from validation
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /tokens\.css$/, // Exclude the tokens file itself
  /globals\.css$/, // Exclude globals which has Tailwind compatibility
];

function shouldExcludeFile(filePath: string): boolean {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

function validateFile(filePath: string): ValidationError[] {
  if (shouldExcludeFile(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors: ValidationError[] = [];

  lines.forEach((line, index) => {
    FORBIDDEN_PATTERNS.forEach(({ pattern, name, suggestion }) => {
      const regex = new RegExp(pattern);
      const matches = line.match(regex);

      if (matches) {
        matches.forEach(match => {
          errors.push({
            file: filePath,
            line: index + 1,
            violation: name,
            suggestion,
            code: line.trim(),
          });
        });
      }
    });
  });

  return errors;
}

function validateDirectory(dirPath: string): ValidationError[] {
  let allErrors: ValidationError[] = [];

  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return allErrors;
  }

  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach(file => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory() && !file.name.startsWith('.')) {
      allErrors = allErrors.concat(validateDirectory(fullPath));
    } else if (file.name.match(/\.(css|scss|tsx|jsx|ts|js)$/)) {
      allErrors = allErrors.concat(validateFile(fullPath));
    }
  });

  return allErrors;
}

// Main execution
const srcPath = path.join(process.cwd(), 'src');
console.log('🔍 Validating design token usage...\n');

const errors = validateDirectory(srcPath);

if (errors.length > 0) {
  console.error('❌ Design Token Violations Found:\n');
  
  // Group errors by file
  const errorsByFile = errors.reduce((acc, error) => {
    if (!acc[error.file]) {
      acc[error.file] = [];
    }
    acc[error.file].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
    console.error(`\n📄 ${file}`);
    fileErrors.forEach(error => {
      console.error(`  Line ${error.line}: ${error.violation}`);
      console.error(`    Code: ${error.code}`);
      console.error(`    💡 ${error.suggestion}`);
    });
  });

  console.error(`\n\n❌ Total violations: ${errors.length}`);
  process.exit(1);
} else {
  console.log('✅ All files comply with design token requirements');
  console.log('✅ No hardcoded values found');
  process.exit(0);
}
