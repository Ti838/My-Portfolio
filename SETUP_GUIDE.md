# Timon Biswas Portfolio — Complete Setup & Deployment Guide

## 📁 Project Structure

```
timon-biswas-portfolio/
├── public/
│   └── images/
│       ├── profile.jpg
│       ├── logo.png
│       ├── cert-icpc.png
│       ├── cert-green-skills.png
│       ├── cert-sdg.png
│       ├── cert-british-council.png
│       ├── university-logo.png
│       ├── college-logo.png
│       └── school-logo.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout + metadata + SEO
│   │   ├── page.tsx                ← Home / Hero
│   │   ├── globals.css             ← Design tokens + global styles
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── about/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── achievements/page.tsx   ← Certificate lightbox
│   │   ├── blog/
│   │   │   ├── page.tsx            ← Blog list (Supabase ISR)
│   │   │   └── [slug]/page.tsx     ← Blog post
│   │   ├── contact/page.tsx        ← Supabase contact form
│   │   ├── admin/page.tsx          ← Admin login (password + 2FA)
│   │   ├── admin/download/page.tsx ← 2FA-only unlock → preview/edit/download Resume/CV
│   │   └── api/
│   │       ├── contact/route.ts    ← Saves message to Supabase
│   │       ├── resume/route.ts     ← Retired (returns 410)
│   │       ├── totp/route.ts       ← TOTP verify → sets short-lived cookie (totp_session)
│   │       └── admin/
│   │           └── setup-totp/route.ts  ← First-time TOTP QR generator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       └── Section.tsx
│   ├── data/
│   │   └── portfolio.ts            ← All your real content (edit here!)
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── totp.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗄️ STEP 1 — Supabase Database Setup

Go to **<https://supabase.com>** → New Project → Copy your URL and keys.

Then run this SQL in the **Supabase SQL Editor**:

```sql
-- ── Contact Messages Table ──────────────────────────────────────────
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Only the service role can read messages (you read them in the dashboard)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON contact_messages
  FOR ALL USING (auth.role() = 'service_role');

-- ── Blog Posts Table ────────────────────────────────────────────────
CREATE TABLE blog_posts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  excerpt       TEXT,
  content       TEXT,           -- raw markdown
  content_html  TEXT,           -- rendered HTML (optional, set manually)
  cover_image   TEXT,
  tags          TEXT[] DEFAULT '{}',
  published     BOOLEAN DEFAULT FALSE,
  reading_time  INT,            -- minutes
  published_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public read published" ON blog_posts
  FOR SELECT USING (published = TRUE);

-- Only service role can insert/update/delete
CREATE POLICY "Service role write" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');
```

---

## 🗂️ STEP 2 — Supabase Storage (Resume)

1. Go to **Storage** in Supabase dashboard
2. Click **New Bucket** → name it `resume` → set to **Private**
3. Upload your PDF: `timon-biswas-cv.pdf` inside the `resume` bucket
4. Note: the site now generates Resume/CV PDFs in-browser from your website data.

- The old static storage download endpoint `/api/resume` is retired.

---

## 🖼️ STEP 2B — Supabase Storage (CMS Assets)

To make logo/profile/project images persist from the Admin dashboard:

1. Go to **Storage** in Supabase dashboard
2. Click **New Bucket** → name it `portfolio`
3. Set bucket to **Public** (recommended for portfolio images)
4. (Optional) Create folders inside the bucket: `logo/`, `profile/`, `projects/`, `achievements/`

The Admin dashboard will upload files into this bucket and store the returned public URL in the database.

---

## 🔐 STEP 3 — Google Authenticator TOTP Setup

### Generate your secret (do this ONCE)

```bash
node -e "
const s = require('speakeasy');
const r = s.generateSecret({ name: 'Timon Portfolio', length: 20 });
console.log('base32:', r.base32);
console.log('otpauth:', r.otpauth_url);
"
```

**Or use the built-in setup route (after installing deps):**

1. Add a temporary env var: `TOTP_SETUP_KEY=my-secret-setup-key`
2. Start the dev server: `npm run dev`
3. Visit: `http://localhost:3000/api/admin/setup-totp?key=my-secret-setup-key`
4. You'll get a JSON response with:
   - `base32` — copy this to `TOTP_SECRET` in your `.env.local`
   - `qr_code_data_url` — paste in browser to see QR code, scan with Google Authenticator

### Add to Google Authenticator

- Open **Google Authenticator** app → tap **+** → **Scan a QR code** (or Enter Setup Key)
- Enter the base32 key manually if scanning doesn't work
- You'll see "Timon Portfolio" appear with a 6-digit rotating code

---

## ⚙️ STEP 4 — Environment Variables

Create `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# TOTP (Google Authenticator) — base32 from Step 3
TOTP_SECRET=JBSWY3DPEHPK3PXP

# Admin password (required for /admin)
ADMIN_PASSWORD=your_secure_password

# Temp setup key (remove after setup)
TOTP_SETUP_KEY=my-secret-setup-key

# Site URL
NEXT_PUBLIC_SITE_URL=https://timonbiswas.vercel.app

# Optional legacy (not used anymore)
# RESUME_STORAGE_PATH=resume/timon-biswas-cv.pdf
```

---

## 💻 STEP 5 — Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.local.example .env.local
# → Fill in your values

# 3. Run development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 🚀 STEP 6 — Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Follow prompts, then deploy to production:
vercel --prod
```

### Option B: GitHub + Vercel Dashboard

1. Push your project to GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/Ti838/portfolio.git
   git push -u origin main
   ```

2. Go to **<https://vercel.com>** → **New Project** → Import your GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Add **all environment variables** from Step 4 in the Vercel dashboard
5. Click **Deploy**

### Vercel Environment Variables to Add

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `TOTP_SECRET` | Your base32 TOTP secret |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
| `RESUME_STORAGE_PATH` | `resume/timon-biswas-cv.pdf` |

---

## ✅ Content Customization Checklist

Open `src/data/portfolio.ts` and update:

- [ ] `personalInfo.email` — your email
- [ ] `personalInfo.phone` — your phone
- [ ] `socialLinks` — GitHub, LinkedIn, Codeforces URLs
- [ ] `projects` — add new projects as you build them
- [ ] `skillCategories` — adjust skill levels (0–100)
- [ ] `experiences` — add new experiences
- [ ] `achievements` — add new certificates (put image in `public/images/`)

Other files to update:

- [ ] `public/images/profile.jpg` — replace with your latest photo anytime
- [ ] `public/images/logo.png` — your custom logo
- [ ] `src/app/layout.tsx` — update `NEXT_PUBLIC_SITE_URL` after deploying
- [ ] Upload resume PDF to Supabase Storage bucket named `resume`

---

## 📝 How to Write a Blog Post

1. Go to **Supabase dashboard** → **Table Editor** → `blog_posts`
2. Insert a new row:
   - `slug`: `my-first-post` (URL-friendly, no spaces)
   - `title`: `My First Blog Post`
   - `excerpt`: Short 1–2 sentence summary
   - `content`: Write in **Markdown**
   - `content_html`: Paste rendered HTML (use <https://markdowntohtml.com/>)
   - `tags`: `["C++", "Competitive Programming"]`
   - `reading_time`: estimated minutes
   - `published`: `true`
   - `published_at`: today's date
3. Post instantly appears at `/blog/my-first-post`

---

## 🛡️ Security Notes

- The `/admin` page requires a valid Google Authenticator code — nobody else can download your resume
- The TOTP code is only valid for 30 seconds (±30s window for clock drift)
- Contact messages are stored in Supabase and only readable with the service role key
- The setup TOTP route (`/api/admin/setup-totp`) should be **removed or disabled** after initial setup
- All env vars with `NEXT_PUBLIC_` prefix are safe to expose; others (service role, TOTP secret) are server-only

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| Images not showing | Make sure all images are in `public/images/` with exact filenames |
| Contact form fails | Check `SUPABASE_SERVICE_ROLE_KEY` is set correctly in Vercel env vars |
| TOTP always invalid | Check system clock is synced; also verify `TOTP_SECRET` matches what you scanned |
| Resume download fails | Ensure file is uploaded to the `resume` bucket in Supabase Storage as `timon-biswas-cv.pdf` |
| Build fails on Vercel | Run `npm run build` locally first to catch TypeScript errors |
| Blog posts not showing | Make sure `published = true` and `published_at` is set in Supabase |
# Current Design Setup Notes

- Main logo: `public/images/logo.svg`
- Main favicon: `public/favicon.svg`
- Theme provider: `src/components/providers/ThemeProvider.tsx`
- Theme toggle: `src/components/ui/ThemeToggle.tsx`
- Public 3D command hero shell: `src/components/sections/Hero.tsx`
- Real 3D scene: `src/components/sections/PortfolioScene3D.tsx`
- 3D dependencies: `three`, `@react-three/fiber`, `@react-three/drei`
- Editable home copy lives in `personal_info.stats.siteCopy`
