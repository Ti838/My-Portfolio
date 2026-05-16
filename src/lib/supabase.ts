import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isUrlValid = (url: string | undefined) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Client-side Supabase client (uses anon key)
export const supabase = isUrlValid(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl!, supabaseAnonKey)
  : (null as any);

// Server-side admin client (uses service role key — never expose to browser)
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!isUrlValid(supabaseUrl)) {
    console.warn("[SUPABASE] Invalid or missing NEXT_PUBLIC_SUPABASE_URL.");
    return null;
  }
  
  if (!serviceRoleKey) {
    console.warn("[SUPABASE] Missing SUPABASE_SERVICE_ROLE_KEY.");
    return null;
  }

  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
