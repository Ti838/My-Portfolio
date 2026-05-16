
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log(`Testing connection to: ${supabaseUrl}`);
  const { data, error } = await supabase.from('personal_info').select('*').eq('id', 1).maybeSingle();
  
  if (error) {
    console.error("Connection failed:", error.message);
    if (error.message.includes("JWT")) {
      console.error("This usually means your SUPABASE_SERVICE_ROLE_KEY is invalid or expired.");
    }
  } else {
    console.log("Connection successful!");
    console.log("Data found:", data ? "Yes" : "No (Table might be empty or ID 1 missing)");
  }
}

test();
