#!/bin/bash

# Script to fix Next.js 16 async params in all route files
# This converts { params }: { params: { id: string } } to { params }: { params: Promise<{ id: string }> }

echo "Fixing async params in route files..."

# Find all route.ts files with old params syntax
files=$(find src/app/api -type f -name "route.ts" -exec grep -l "{ params }: { params: { " {} \;)

for file in $files; do
  echo "Processing: $file"
  
  # Create backup
  cp "$file" "$file.bak"
  
  # Fix the params type declaration
  sed -i '' 's/{ params }: { params: { \([^}]*\) }/{ params }: { params: Promise<{ \1 }>/g' "$file"
  
  # Add await params destructuring after the function signature
  # This is a simplified approach - manual review may be needed
  echo "  - Updated params type to Promise"
done

echo "Done! Please review the changes and add 'const { id } = await params' where needed."
echo "Backup files created with .bak extension"
