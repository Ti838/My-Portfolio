import { createAdminClient } from "./src/lib/supabase";

async function migrate() {
  const supabase = createAdminClient();
  if (!supabase) {
    console.error("No supabase client");
    return;
  }

  console.log("Adding stats and password columns...");
  const { error: error1 } = await supabase.rpc('admin_exec_sql', {
    sql_query: `
      ALTER TABLE personal_info ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"certificates": "4+", "icpc_rank": "Top", "languages": "C/C++/Java", "projects": "2+"}'::JSONB;
      ALTER TABLE personal_info ADD COLUMN IF NOT EXISTS admin_password TEXT DEFAULT 'admin123';
    `
  });

  if (error1) {
    // If RPC fails (likely not defined), try direct query if possible or just log
    console.log("RPC failed, please run the SQL manually in Supabase Editor:");
    console.log(`
      ALTER TABLE personal_info ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{"certificates": "4+", "icpc_rank": "Top", "languages": "C/C++/Java", "projects": "2+"}'::JSONB;
      ALTER TABLE personal_info ADD COLUMN IF NOT EXISTS admin_password TEXT DEFAULT 'admin123';
    `);
  } else {
    console.log("Database updated successfully.");
  }
}

migrate();
