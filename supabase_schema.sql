-- ══════════════════════════════════════════════════════════════
--  Timon Biswas Portfolio – Full Database Schema
--  Run this ONCE in your Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS personal_info (
  id             INT PRIMARY KEY DEFAULT 1,
  name           TEXT NOT NULL DEFAULT 'Timon Biswas',
  tagline        TEXT DEFAULT 'CSE Student & AI Enthusiast',
  admin_password TEXT,
  totp_secret    TEXT,
  bio            TEXT,
  bio_extended   TEXT,
  location       TEXT DEFAULT 'Dhaka, Bangladesh',
  email          TEXT DEFAULT 'timonbiswas33@gmail.com',
  phone          TEXT DEFAULT '+8801779976858',
  profile_image  TEXT DEFAULT '/images/profile.jpg',
  logo_image     TEXT DEFAULT '/images/logo.png',
  university     TEXT DEFAULT 'SMUCT',
  student_id     TEXT DEFAULT '241071015',
  batch          TEXT DEFAULT '34th',
  stats          JSONB DEFAULT '{"certificates":"4+","icpc_rank":"Honorable Mention","languages":"Java/C++/PHP","projects":"14+"}',
  announcement   JSONB DEFAULT '{"text":"Open to opportunities!","link":"","active":true}',
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_row CHECK (id = 1)
);

-- Seed initial row (won't fail if it already exists)
INSERT INTO personal_info (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 2. Projects
CREATE TABLE IF NOT EXISTS projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE,
  description  TEXT,
  tech_stack   TEXT[] DEFAULT '{}',
  github_url   TEXT DEFAULT '',
  live_url     TEXT DEFAULT '',
  image_url    TEXT DEFAULT '',
  featured     BOOLEAN DEFAULT FALSE,
  status       TEXT DEFAULT 'completed',
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Backfill/upgrade for existing databases (safe if column already exists)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

-- 3. Achievements / Certificates
CREATE TABLE IF NOT EXISTS achievements (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  image_url    TEXT DEFAULT '',
  category     TEXT DEFAULT 'Award',
  date         DATE,
  issuer       TEXT,
  sort_order   INT DEFAULT 0
);

-- 4. Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  type         TEXT DEFAULT 'Part-time',
  duration     TEXT,
  description  TEXT,
  tags         TEXT[] DEFAULT '{}',
  sort_order   INT DEFAULT 0
);

-- Seed default experiences
INSERT INTO experiences (title, type, duration, description, tags, sort_order) VALUES
  ('AI Developer — Jerry AI Voice Assistant', 'work', '2026 – Present', 'Built an advanced voice assistant equipped with Hugging Face free AI models and PC/Android automation capabilities.', ARRAY['Python', 'Hugging Face API', 'AI Agent'], 1),
  ('Full Stack Developer — Philomedis Web App', 'work', '2025 – Present', 'Developed the core web infrastructure for Philomedis, a hospital management ecosystem.', ARRAY['Next.js', 'Supabase', 'Tailwind CSS'], 2),
  ('Solo Developer — Philomedis Mobile App', 'work', '2026 – Present', 'Developing a comprehensive medical management application designed to streamline hospital operations.', ARRAY['Java', 'Firebase', 'Android Studio'], 3),
  ('Full Stack Developer — Task Management System', 'work', '2026', 'Developed a modern task management application featuring a Next.js drag-and-drop board.', ARRAY['Next.js', 'Firebase', 'Tailwind CSS'], 4)
ON CONFLICT DO NOTHING;

-- 5. Education
CREATE TABLE IF NOT EXISTS education (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution  TEXT NOT NULL,
  degree       TEXT,
  field        TEXT,
  duration     TEXT,
  logo_url     TEXT DEFAULT '',
  url          TEXT DEFAULT '',
  details      TEXT,
  sort_order   INT DEFAULT 0
);

-- 6. Skill Categories
CREATE TABLE IF NOT EXISTS skill_categories (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  sort_order   INT DEFAULT 0
);

-- 7. Skills
CREATE TABLE IF NOT EXISTS skills (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  level        INT DEFAULT 80,
  category_id  UUID REFERENCES skill_categories(id) ON DELETE CASCADE,
  sort_order   INT DEFAULT 0
);

-- 8. Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label        TEXT NOT NULL,
  url          TEXT NOT NULL,
  icon         TEXT DEFAULT 'FiLink',
  sort_order   INT DEFAULT 0
);

-- Seed default social links
INSERT INTO social_links (label, url, icon, sort_order) VALUES
  ('GitHub', 'https://github.com/Ti838', 'FiGithub', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/timon-biswas-83493a328/', 'FiLinkedin', 2),
  ('Email', 'mailto:timonbiswas33@gmail.com', 'FiMail', 3),
  ('Codeforces', 'https://codeforces.com/profile/Timon15', 'FiCode', 4),
  ('WhatsApp', 'https://wa.me/+8801779976858', 'FiMessageCircle', 5)
ON CONFLICT DO NOTHING;

-- 9. Contact Messages (Inbox)
CREATE TABLE IF NOT EXISTS messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  subject      TEXT,
  message      TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  cover_image  TEXT,
  tags         TEXT[] DEFAULT '{}',
  published    BOOLEAN DEFAULT FALSE,
  reading_time INT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ══ Row Level Security (RLS) ══
-- Disable for now so the service_role can read/write everything
-- You can enable per-table policies later if needed

ALTER TABLE personal_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
ALTER TABLE education DISABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
