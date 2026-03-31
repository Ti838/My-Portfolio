-- Run this in your Supabase SQL Editor to enable Email OTP storage
CREATE TABLE IF NOT EXISTS auth_otps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL,
  otp_code    TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_auth_otps_email ON auth_otps(email);

-- Optional: RLS Policy (Disable for simplicity if using service_role, but here is a basic one)
ALTER TABLE auth_otps DISABLE ROW LEVEL SECURITY;
