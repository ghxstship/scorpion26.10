#!/usr/bin/env ts-node

/**
 * Design Token Validation Script
 * Scans codebase for hardcoded values and reports violations
 * Run in CI/CD pipeline to enforce token usage
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface ValidationError {
  file: string;
  line: number;
  column: number;
  violation: string;
  match: string;
  suggestion: string;
}

/**
 * Patterns to detect violations
 */
const FORBIDDEN_PATTERNS = [
  {
    pattern: /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/g,
    name: 'hardcoded hex color',
    suggestion: 'Use var(--color-*) or semantic color token from design system',
    severity: 'error' as const,
  },
  {
    pattern: /\brgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/g,
    name: 'hardcoded RGB color',
    suggestion: 'Use var(--color-*) or semantic color token',
    severity: 'error' as const,
  },
  {
    pattern: /\brgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g,
    name: 'hardcoded RGBA color',
    suggestion: 'Use var(--color-*) with opacity or semantic color token',
    severity: 'error' as const,
  },
  {
    pattern: /:\s*\d+px(?!\s*\d)/g,
    name: 'hardcoded pixel value',
    suggestion: 'Use var(--space-*) token or rem units',
    severity: 'warning' as const,
  },
  {
    pattern: /font-size:\s*\d+px/g,
    name: 'hardcoded font size',
    suggestion: 'Use var(--font-size-*) token',
    severity: 'error' as const,
  },
  {
    pattern: /\b(margin|padding)-(left|right):/g,
    name: 'directional property (not RTL-friendly)',
    suggestion: 'Use margin-inline-start/end or padding-inline-start/end for RTL support',
    severity: 'warning' as const,
  },
  {
    pattern: /\btext-align:\s*(left|right)\b/g,
    name: 'directional text-align',
    suggestion: 'Use text-align: start or text-align: end for RTL support',
    severity: 'warning' as const,
  },
];

/**
 * Files and directories to exclude from validation
 */
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/coverage/**',
  // Design token definition files (these DEFINE the tokens)
  '**/design-system/tokens/**',
  '**/emailTokens.ts',
  // Test files may have hardcoded values for testing
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
];

/**
 * Exceptions: Files that are allowed to have hardcoded values
 * with documented reasons
 */
const DOCUMENTED_EXCEPTIONS = [
  {
    file: 'src/app/login/page.tsx',
    reason: 'Google OAuth brand colors (required by Google brand guidelines)',
    patterns: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
  },
  {
    file: 'src/app/manifest.ts',
    reason: 'PWA manifest requires specific color format',
    patterns: ['#'],
  },
];

/**
 * Check if a file is an exception
 */
function isException(filePath: string, match: string): boolean {
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  for (const exception of DOCUMENTED_EXCEPTIONS) {
    if (normalizedPath.includes(exception.file)) {
      // Check if this specific match is in the exception patterns
      return exception.patterns.some(pattern => match.includes(pattern));
    }
  }
  
  return false;
}

/**
 * Validate a single file
 */
function validateFile(filePath: string): ValidationError[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors: ValidationError[] = [];
  
  lines.forEach((line, lineIndex) => {
    FORBIDDEN_PATTERNS.forEach(({ pattern, name, suggestion }) => {
      // Reset regex lastIndex for each line
      pattern.lastIndex = 0;
      
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(line)) !== null) {
        const matchText = match[0];
        
        // Skip if this is a documented exception
        if (isException(filePath, matchText)) {
          continue;
        }
        
        errors.push({
          file: filePath,
          line: lineIndex + 1,
          column: match.index + 1,
          violation: name,
          match: matchText,
          suggestion,
        });
      }
    });
  });
  
  return errors;
}

/**
 * Main validation function
 */
async function validateTokens() {
  console.log('🔍 Scanning codebase for design token violations...\n');
  
  // Find all files to validate
  const files = await glob('src/**/*.{ts,tsx,css,scss}', {
    ignore: EXCLUDE_PATTERNS,
    absolute: true,
  });
  
  console.log(`📁 Found ${files.length} files to validate\n`);
  
  let allErrors: ValidationError[] = [];
  let filesWithErrors = 0;
  
  // Validate each file
  for (const file of files) {
    const errors = validateFile(file);
    if (errors.length > 0) {
      allErrors = allErrors.concat(errors);
      filesWithErrors++;
    }
  }
  
  // Report results
  if (allErrors.length === 0) {
    console.log('✅ No violations found! All files comply with design token requirements.\n');
    return 0;
  }
  
  console.log(`❌ Found ${allErrors.length} violations in ${filesWithErrors} files:\n`);
  
  // Group errors by file
  const errorsByFile = allErrors.reduce((acc, error) => {
    if (!acc[error.file]) {
      acc[error.file] = [];
    }
    acc[error.file].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);
  
  // Print errors grouped by file
  Object.entries(errorsByFile).forEach(([file, errors]) => {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`\n📄 ${relativePath} (${errors.length} violations)`);
    
    errors.forEach(error => {
      console.log(`  Line ${error.line}:${error.column}`);
      console.log(`    ❌ ${error.violation}: "${error.match}"`);
      console.log(`    💡 ${error.suggestion}`);
    });
  });
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 Summary:`);
  console.log(`   Total violations: ${allErrors.length}`);
  console.log(`   Files affected: ${filesWithErrors}`);
  console.log(`   Files scanned: ${files.length}`);
  
  // Print documented exceptions
  if (DOCUMENTED_EXCEPTIONS.length > 0) {
    console.log(`\n📝 Documented Exceptions:`);
    DOCUMENTED_EXCEPTIONS.forEach(exception => {
      console.log(`   ${exception.file}: ${exception.reason}`);
    });
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\n💡 To fix these violations:');
  console.log('   1. Import design tokens: import { tokens } from "@/design-system/tokens"');
  console.log('   2. Replace hardcoded values with tokens');
  console.log('   3. Use CSS variables: var(--color-primary), var(--space-4), etc.');
  console.log('   4. For emails, use emailTokens from "@/emails/styles/emailTokens"');
  console.log('\n📚 Documentation: /docs/design-system/TOKEN_USAGE_GUIDE.md\n');
  
  return 1; // Exit with error code
}

/**
 * CLI interface
 */
if (require.main === module) {
  validateTokens()
    .then(exitCode => {
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Validation failed with error:', error);
      process.exit(1);
    });
}

export { validateTokens };
export type { ValidationError };
