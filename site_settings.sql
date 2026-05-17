-- ══════════════════════════════════════════════════════════════
--  site_settings Table — Run once in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  type        TEXT DEFAULT 'text',   -- text | textarea | image_url | boolean | color | json
  label       TEXT,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS (same as other tables)
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;

-- Seed default site settings
INSERT INTO site_settings (key, value, type, label, description) VALUES
  ('site_tagline',         'CSE Student · AI & ML Enthusiast · Competitive Programmer · Vocalist', 'text',     'Site Tagline',         'Main tagline shown in the navbar / meta tags'),
  ('announcement_text',   'Open to internship opportunities! 🚀',                                  'text',     'Announcement Text',    'Banner message shown at top of site'),
  ('announcement_active', 'true',                                                                   'boolean',  'Announcement Active',  'Show or hide the announcement banner'),
  ('announcement_link',   '',                                                                       'text',     'Announcement Link',    'Optional CTA link for the announcement banner'),
  ('hero_subtitle',       'Software should feel natural.',                                          'text',     'Hero Subtitle',        'Italic sentence in the hero section'),
  ('hero_belief_1',       'Tirelessly pursue clarity.',                                             'text',     'Hero Belief 1',        'First principle listed in hero'),
  ('hero_belief_2',       'Design for moments.',                                                    'text',     'Hero Belief 2',        'Second principle listed in hero'),
  ('hero_belief_3',       'Software should empower.',                                               'text',     'Hero Belief 3',        'Third principle listed in hero'),
  ('about_label',         '01 // The Journey',                                                     'text',     'About Section Label',  'Mono label above about heading'),
  ('about_title',         'Engineering with Purpose & Precision.',                                  'text',     'About Section Title',  'Main heading in about section'),
  ('skills_label',        '02 // The Stack',                                                       'text',     'Skills Section Label', 'Mono label above skills heading'),
  ('skills_title',        'Technical Expertise',                                                   'text',     'Skills Section Title', 'Main heading in skills section'),
  ('projects_label',      '03 // The Forge',                                                       'text',     'Projects Section Label','Mono label above projects heading'),
  ('projects_title',      'Selected Creations',                                                    'text',     'Projects Section Title','Main heading in projects section'),
  ('experience_label',    '04 // The Tenure',                                                      'text',     'Experience Label',     'Mono label above experience heading'),
  ('experience_title',    'Professional Path',                                                     'text',     'Experience Title',     'Main heading in experience section'),
  ('contact_label',       '09 // The Connection',                                                  'text',     'Contact Section Label','Mono label above contact heading'),
  ('contact_title',       'Let''s build the exceptional together.',                                'text',     'Contact Title',        'Main heading in contact section'),
  ('contact_summary',     'Currently seeking new opportunities. If you have a project in mind, let''s start the conversation.', 'textarea', 'Contact Summary', 'Paragraph below the contact title'),
  ('accent_color',        '#6366f1',                                                               'color',    'Accent Color',         'Primary accent color used across the site'),
  ('favicon_url',         '/favicon.svg',                                                          'image_url','Favicon URL',          'URL to the site favicon')
ON CONFLICT (key) DO NOTHING;
