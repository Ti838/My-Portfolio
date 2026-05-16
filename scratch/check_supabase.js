const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnv = (key) => {
  const match = envContent.match(new RegExp(`${key}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSetup() {
  const tables = [
    'personal_info',
    'projects',
    'achievements',
    'experiences',
    'education',
    'skills',
    'skill_categories',
    'social_links',
    'messages',
    'auth_otps',
    'blog_posts'
  ];

  console.log('Checking tables...');
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
    if (error) {
      console.log(`Table ${table}: ERROR (${error.message})`);
    } else if (data) {
      console.log(`Table ${table}: EXISTS (Count: ${data.count})`);
    } else {
      console.log(`Table ${table}: EXISTS (Data is null)`);
    }
  }

  console.log('\nChecking storage...');
  const { data: buckets, error: storageError } = await supabase.storage.listBuckets();
  if (storageError) {
    console.log(`Storage: ERROR (${storageError.message})`);
  } else {
    const bucketNames = buckets.map(b => b.name);
    console.log(`Buckets: ${bucketNames.join(', ')}`);
  }
}

checkSetup();
