#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Files to process
const files = await glob('src/app/api/**/*.ts', { ignore: ['**/typed-client.ts'] });

let fixedCount = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  let modified = false;

  // Check if file needs fixing
  const needsTypedInsert = content.includes('.insert(') && !content.includes('typedInsert');
  const needsTypedUpdate = content.includes('.update(') && !content.includes('typedUpdate');
  const needsTypedUpsert = content.includes('.upsert(') && !content.includes('typedUpsert');
  const needsTypedFrom = content.includes('.from(') && content.includes('.select(') && !content.includes('typedFrom');

  if (!needsTypedInsert && !needsTypedUpdate && !needsTypedUpsert && !needsTypedFrom) {
    continue;
  }

  // Add imports if needed
  const imports = [];
  if (needsTypedInsert) imports.push('typedInsert');
  if (needsTypedUpdate) imports.push('typedUpdate');
  if (needsTypedUpsert) imports.push('typedUpsert');
  if (needsTypedFrom) imports.push('typedFrom');

  if (imports.length > 0) {
    const importStatement = `import { ${imports.join(', ')} } from '@/lib/supabase/typed-client'\n`;
    
    // Find the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i;
      }
    }

    if (lastImportIndex >= 0 && !content.includes("from '@/lib/supabase/typed-client'")) {
      lines.splice(lastImportIndex + 1, 0, importStatement.trim());
      content = lines.join('\n');
      modified = true;
    }
  }

  if (modified) {
    writeFileSync(file, content);
    fixedCount++;
    console.log(`Fixed: ${file}`);
  }
}

console.log(`\nTotal files fixed: ${fixedCount}`);
console.log('\nNote: This script only adds imports. Manual fixes still needed for:');
console.log('- Replacing .from().insert() with typedInsert()');
console.log('- Replacing .from().update() with typedUpdate()');
console.log('- Replacing .from().upsert() with typedUpsert()');
console.log('- Replacing .from().select() with typedFrom().select()');
