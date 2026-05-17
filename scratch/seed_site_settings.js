const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnv = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.+)$`, 'm'));
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : undefined;
};

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl, serviceKey, {
  db: { schema: 'public' }
});

// Use Supabase REST API to execute SQL directly via the management API
const https = require('https');
const url = new URL(supabaseUrl);
const projectRef = url.hostname.split('.')[0];

const sql = `
CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  type        TEXT DEFAULT 'text',
  label       TEXT,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
`;

async function execSQL(sqlStatement) {
  // Use Supabase's pg REST endpoint
  const payload = JSON.stringify({ query: sqlStatement });
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      path: '/rest/v1/rpc/exec',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const settings = [
  { key: 'site_tagline',        value: 'CSE Student · AI & ML Enthusiast · Competitive Programmer · Vocalist', type: 'text',     label: 'Site Tagline',        description: 'Main tagline shown in meta tags' },
  { key: 'announcement_text',   value: 'Open to internship opportunities! 🚀',                                  type: 'text',     label: 'Announcement Text',   description: 'Banner message' },
  { key: 'announcement_active', value: 'true',                                                                  type: 'boolean',  label: 'Announcement Active', description: 'Show/hide banner' },
  { key: 'announcement_link',   value: '',                                                                       type: 'text',     label: 'Announcement Link',   description: 'Optional CTA link' },
  { key: 'hero_subtitle',       value: 'Software should feel natural.',                                         type: 'text',     label: 'Hero Subtitle',       description: 'Hero italic sentence' },
  { key: 'hero_belief_1',       value: 'Tirelessly pursue clarity.',                                            type: 'text',     label: 'Hero Belief 1',       description: 'First principle' },
  { key: 'hero_belief_2',       value: 'Design for moments.',                                                   type: 'text',     label: 'Hero Belief 2',       description: 'Second principle' },
  { key: 'hero_belief_3',       value: 'Software should empower.',                                              type: 'text',     label: 'Hero Belief 3',       description: 'Third principle' },
  { key: 'about_label',         value: '01 // The Journey',                                                     type: 'text',     label: 'About Label',         description: 'Mono label' },
  { key: 'about_title',         value: 'Engineering with Purpose & Precision.',                                 type: 'text',     label: 'About Title',         description: 'Section heading' },
  { key: 'skills_label',        value: '02 // The Stack',                                                       type: 'text',     label: 'Skills Label',        description: 'Mono label' },
  { key: 'skills_title',        value: 'Technical Expertise',                                                   type: 'text',     label: 'Skills Title',        description: 'Section heading' },
  { key: 'projects_label',      value: '03 // The Forge',                                                       type: 'text',     label: 'Projects Label',      description: 'Mono label' },
  { key: 'projects_title',      value: 'Selected Creations',                                                    type: 'text',     label: 'Projects Title',      description: 'Section heading' },
  { key: 'experience_label',    value: '04 // The Tenure',                                                      type: 'text',     label: 'Experience Label',    description: 'Mono label' },
  { key: 'experience_title',    value: 'Professional Path',                                                     type: 'text',     label: 'Experience Title',    description: 'Section heading' },
  { key: 'contact_label',       value: '09 // The Connection',                                                  type: 'text',     label: 'Contact Label',       description: 'Mono label' },
  { key: 'contact_title',       value: "Let's build the exceptional together.",                                 type: 'text',     label: 'Contact Title',       description: 'Section heading' },
  { key: 'contact_summary',     value: "Currently seeking new opportunities. If you have a project in mind, let's start the conversation.", type: 'textarea', label: 'Contact Summary', description: 'Paragraph below heading' },
  { key: 'accent_color',        value: '#6366f1',                                                               type: 'color',    label: 'Accent Color',        description: 'Primary accent color' },
];

async function seed() {
  console.log('Creating site_settings table via SQL...');
  
  // Try the SQL endpoint (Supabase management API)
  const sqlUrl = `${supabaseUrl}/rest/v1/`;
  
  // First try: direct upsert (will fail if table doesn't exist)
  const { error: testError } = await supabase.from('site_settings').select('key').limit(1);
  
  if (testError && testError.code === '42P01') {
    console.log('Table does not exist. Please run the following SQL in Supabase SQL Editor:');
    console.log('\n--- COPY THIS SQL ---');
    console.log(`
CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  type        TEXT DEFAULT 'text',
  label       TEXT,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
    `);
    console.log('--- END SQL ---\n');
    console.log('File with full SQL: site_settings.sql');
    process.exit(0);
  }

  if (testError) {
    console.error('Unexpected error:', testError.message);
    process.exit(1);
  }

  console.log('Table exists! Seeding...');
  const { error } = await supabase.from('site_settings').upsert(settings, { onConflict: 'key' });

  if (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }

  console.log(`✅ Seeded ${settings.length} settings.`);

  const { data } = await supabase.from('site_settings').select('key, value').order('key');
  console.log(`\n📋 site_settings (${data?.length ?? 0} rows):`);
  data?.forEach(s => console.log(`  ${s.key}: ${(s.value || '').substring(0, 60)}`));
}

seed().catch(console.error);
