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

async function checkRows() {
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

  console.log('Querying table row counts and previews...');
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
      console.log(`Table ${table}: ERROR (${error.message})`);
    } else {
      console.log(`Table ${table}: ${data.length} rows`);
      if (data.length > 0) {
        console.log(`  Sample row id/name:`, data.slice(0, 1).map(r => ({ id: r.id, name: r.name || r.title || r.category || r.label })));
      }
    }
  }
}

checkRows();
