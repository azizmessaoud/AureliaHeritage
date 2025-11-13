// Setup verification script
// Run: node scripts/check-setup.js

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Checking Phase 1 setup...\n');

// Check 1: package.json has required dependencies
console.log('1️⃣ Checking dependencies...');
try {
  const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
  const required = ['@prisma/client', 'prisma', '@vercel/node'];
  const missing = required.filter(dep => 
    !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]
  );
  
  if (missing.length === 0) {
    console.log('   ✅ All required dependencies found');
  } else {
    console.log(`   ⚠️  Missing: ${missing.join(', ')}`);
    console.log('   Run: npm install');
  }
} catch (error) {
  console.log('   ❌ Could not read package.json');
}
console.log('');

// Check 2: Prisma schema exists
console.log('2️⃣ Checking Prisma schema...');
try {
  const schemaPath = join(rootDir, 'prisma', 'schema.prisma');
  const schema = readFileSync(schemaPath, 'utf-8');
  const models = (schema.match(/^model \w+/gm) || []).length;
  console.log(`   ✅ Schema found with ${models} models`);
} catch (error) {
  console.log('   ❌ Prisma schema not found');
}
console.log('');

// Check 3: API routes exist
console.log('3️⃣ Checking API routes...');
const apiRoutes = [
  'api/listings/index.ts',
  'api/listings/[id].ts',
  'api/bookings/index.ts',
  'api/user/me.ts',
  'api/user/bookings.ts',
  'api/partners/[id].ts'
];

let apiCount = 0;
apiRoutes.forEach(route => {
  try {
    const routePath = join(rootDir, route);
    readFileSync(routePath, 'utf-8');
    apiCount++;
  } catch (error) {
    // Route file doesn't exist
  }
});

if (apiCount === apiRoutes.length) {
  console.log(`   ✅ All ${apiRoutes.length} API routes found`);
} else {
  console.log(`   ⚠️  Found ${apiCount}/${apiRoutes.length} API routes`);
}
console.log('');

// Check 4: Database client exists
console.log('4️⃣ Checking database client...');
try {
  const dbPath = join(rootDir, 'src', 'lib', 'db.ts');
  readFileSync(dbPath, 'utf-8');
  console.log('   ✅ Database client configured');
} catch (error) {
  console.log('   ❌ Database client not found');
}
console.log('');

// Check 5: Environment file
console.log('5️⃣ Checking environment setup...');
try {
  const envPath = join(rootDir, '.env.local');
  const env = readFileSync(envPath, 'utf-8');
  if (env.includes('DATABASE_URL')) {
    console.log('   ✅ .env.local found with DATABASE_URL');
  } else {
    console.log('   ⚠️  .env.local exists but missing DATABASE_URL');
  }
} catch (error) {
  console.log('   ⚠️  .env.local not found');
  console.log('   📝 Create .env.local with: DATABASE_URL="..."');
}
console.log('');

console.log('✅ Setup check complete!\n');
console.log('📋 Next steps:');
console.log('   1. Install dependencies: npm install');
console.log('   2. Set up Supabase and add DATABASE_URL to .env.local');
console.log('   3. Initialize database: npm run db:generate && npm run db:push');
console.log('   4. Seed data: npm run db:seed');
console.log('   5. Test API: npm run dev (then node scripts/test-api.js)');

