#!/bin/bash

# Fix all (supabase as any) to just supabase
# The supabase client is already properly typed with Database type

find src/app/api -type f -name "*.ts" -exec sed -i '' 's/(supabase as any)/supabase/g' {} \;
find src/app/api -type f -name "*.ts" -exec sed -i '' 's/(await supabase as any)/(await supabase)/g' {} \;

echo "Fixed all supabase type assertions in API routes"
