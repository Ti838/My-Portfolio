# Supabase + Vercel (Live Site) — Re-check Checklist (EN)

If your site is already live on Vercel and the project is connected to GitHub, then **pushing to GitHub is usually enough** (Vercel will auto-deploy). This checklist is a quick “re-check” to make sure Supabase (DB + Storage) and owner-only admin flows keep working after deploy.

---

## 1) GitHub Push → Vercel Auto-Deploy (Confirm)

1. Vercel Dashboard → your Project → **Git**
   - Confirm the connected repo
   - Confirm the production branch (usually `main`)
2. Push to that branch
3. After push: Vercel → **Deployments** → verify the latest deployment becomes **Ready**

---

## 2) Vercel Environment Variables (Most Important)

Vercel Dashboard → Project → **Settings → Environment Variables**

### Required (Must)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `TOTP_SECRET`

### Recommended
- `NEXT_PUBLIC_SITE_URL` (your production domain)

### Notes
- Never expose `SUPABASE_SERVICE_ROLE_KEY` as `NEXT_PUBLIC_*`
- If you change env vars, redeploy (Vercel usually triggers a deploy automatically, but you can also click **Redeploy**)

---

## 3) Supabase Database — Table/Column Verify

Supabase Dashboard → Table Editor

Expected tables for CMS/data (based on this repo):
- `personal_info`
- `projects`
- `achievements`
- `experiences`
- `education`
- `skills`
- `skill_categories`
- `social_links`
- Inbox/messages table: `messages`

### Common gotchas
- `projects.image_url` column exists
- Your snake_case columns exist where needed (examples: `bio_extended`, `profile_image`)

---

## 4) Supabase Storage — Buckets

Supabase Dashboard → Storage

### CMS asset uploads (images/files from Admin)
- Bucket name: `portfolio`
- Visibility: **Public** (recommended for portfolio images)

Admin uploads should store a public URL back into the database.

---

## 5) RLS (Row Level Security) — What to Expect

This project performs sensitive writes server-side using the **Service Role** (server actions / API). Typically:

- Public pages read via anon key
- Admin edits/saves happen on the server via service role

If you enabled RLS for public-read tables, confirm your **SELECT policies** allow the intended public reads.

---

## 6) Admin + 2FA (TOTP) — Live Verification

### `/admin` (Password + 2FA)
- `ADMIN_PASSWORD` is correct
- `TOTP_SECRET` is correct

### `/admin/download` (2FA-only)
- 6-digit TOTP unlock works
- The short-lived session expires after some time (expected)

---

## 7) 3-Minute Smoke Test (After Deploy)

1. Home page loads
2. `/admin` login works
3. Make a small edit → Save
4. Refresh the page → confirm persistence
5. Upload an image asset → confirm URL is saved and still works after refresh

---

## 8) Troubleshooting (Common)

### A) Admin saves don’t persist (falls back to draft)
- `SUPABASE_SERVICE_ROLE_KEY` missing/wrong in Vercel
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` wrong

### B) Image upload fails
- `portfolio` bucket missing
- Bucket is not public (or policies block access)

### C) 2FA code always invalid
- `TOTP_SECRET` mismatch between local and Vercel
- Rare: server time skew

---

## 9) Safe Push Routine (Recommended)

1. Local check: `npm.cmd run build`
2. Then push:
   - `git add .`
   - `git commit -m "..."`
   - `git push`

If `build` passes locally, production deploy is usually smooth.
