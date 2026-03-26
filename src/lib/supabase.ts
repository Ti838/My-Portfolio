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
  : (null as any); // Fallback to null; components should handle null or use catch-blocks

// Server-side admin client (uses service role key — never expose to browser)
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isUrlValid(supabaseUrl) || !serviceRoleKey) {
    // Return a dummy client or throw a more descriptive error that can be caught
    // Instead of throwing, we can return null and handle it in the fetchers
    return null;
  }
  return createClient(supabaseUrl!, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
