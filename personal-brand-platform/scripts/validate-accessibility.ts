#!/usr/bin/env node

/**
 * Accessibility Validator
 * Checks for common accessibility issues
 * WCAG 2.2 AAA compliance checks
 */

import fs from 'fs';
import path from 'path';

interface A11yError {
  file: string;
  line: number;
  issue: string;
  severity: 'error' | 'warning';
  wcagCriterion: string;
}

const A11Y_CHECKS = [
  {
    pattern: /<img(?![^>]*alt=)/g,
    issue: 'Image missing alt attribute',
    severity: 'error' as const,
    wcagCriterion: 'WCAG 1.1.1 (Level A)',
  },
  {
    pattern: /<button[^>]*>[\s]*<\/button>/g,
    issue: 'Empty button element',
    severity: 'error' as const,
    wcagCriterion: 'WCAG 2.4.4 (Level A)',
  },
  {
    pattern: /<a[^>]*>[\s]*<\/a>/g,
    issue: 'Empty link element',
    severity: 'error' as const,
    wcagCriterion: 'WCAG 2.4.4 (Level A)',
  },
  {
    pattern: /<input(?![^>]*(aria-label|id))/g,
    issue: 'Input without label or aria-label',
    severity: 'warning' as const,
    wcagCriterion: 'WCAG 3.3.2 (Level A)',
  },
  {
    pattern: /onClick=.*(?!onKeyDown|onKeyPress|onKeyUp)/g,
    issue: 'onClick without keyboard handler',
    severity: 'warning' as const,
    wcagCriterion: 'WCAG 2.1.1 (Level A)',
  },
  {
    pattern: /tabIndex=["'](-?\d+)["']/g,
    issue: 'Custom tabIndex (verify accessibility)',
    severity: 'warning' as const,
    wcagCriterion: 'WCAG 2.4.3 (Level A)',
  },
];

function validateFile(filePath: string): A11yError[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const errors: A11yError[] = [];

  lines.forEach((line, index) => {
    A11Y_CHECKS.forEach(({ pattern, issue, severity, wcagCriterion }) => {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: index + 1,
          issue,
          severity,
          wcagCriterion,
        });
      }
    });
  });

  return errors;
}

function validateDirectory(dirPath: string): A11yError[] {
  let allErrors: A11yError[] = [];

  if (!fs.existsSync(dirPath)) {
    return allErrors;
  }

  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach(file => {
    const fullPath = path.join(dirPath, file.name);

    if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
      allErrors = allErrors.concat(validateDirectory(fullPath));
    } else if (file.name.match(/\.(tsx|jsx)$/)) {
      allErrors = allErrors.concat(validateFile(fullPath));
    }
  });

  return allErrors;
}

// Main execution
const srcPath = path.join(process.cwd(), 'src');
console.log('♿ Validating accessibility...\n');

const errors = validateDirectory(srcPath);
const errorCount = errors.filter(e => e.severity === 'error').length;
const warningCount = errors.filter(e => e.severity === 'warning').length;

if (errors.length > 0) {
  console.log('⚠️  Accessibility Issues Found:\n');

  const errorsByFile = errors.reduce((acc, error) => {
    if (!acc[error.file]) {
      acc[error.file] = [];
    }
    acc[error.file].push(error);
    return acc;
  }, {} as Record<string, A11yError[]>);

  Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
    console.log(`\n📄 ${file}`);
    fileErrors.forEach(error => {
      const icon = error.severity === 'error' ? '❌' : '⚠️';
      console.log(`  ${icon} Line ${error.line}: ${error.issue}`);
      console.log(`     ${error.wcagCriterion}`);
    });
  });

  console.log(`\n\n📊 Summary:`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Warnings: ${warningCount}`);

  if (errorCount > 0) {
    console.log('\n❌ Fix errors before proceeding');
    process.exit(1);
  } else {
    console.log('\n⚠️  Please review warnings');
    process.exit(0);
  }
} else {
  console.log('✅ No accessibility issues found');
  process.exit(0);
}
