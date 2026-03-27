# Supabase + Vercel (Live Site) — Re-check Checklist (বাংলা)

আপনার সাইট already live থাকলে সাধারণত **GitHub-এ push দিলেই Vercel অটো-deploy** করে। কিন্তু Supabase related কিছু জিনিস ঠিক আছে কিনা একবার re-check করা জরুরি—বিশেষ করে Admin CMS write, Storage upload, এবং 2FA (TOTP) নিয়ে।

---

## 1) GitHub Push → Vercel Update (Confirm)

1. Vercel Dashboard → আপনার Project → **Git**
   - কোন repo connected আছে
   - কোন branch production deploy হয় (সাধারণত `main`)
2. আপনি সেই branch-এ code push করছেন কিনা নিশ্চিত করুন
3. Push করার পর Vercel → **Deployments** ট্যাবে গিয়ে নতুন deployment status দেখুন

---

## 2) Vercel Environment Variables (সবচেয়ে গুরুত্বপূর্ণ)

Vercel Dashboard → Project → **Settings → Environment Variables** এ নিচেরগুলো ঠিকমত আছে কিনা দেখুন:

### Required (Must)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `TOTP_SECRET`

### Recommended
- `NEXT_PUBLIC_SITE_URL` (আপনার production domain)

### Notes
- `SUPABASE_SERVICE_ROLE_KEY` **কখনোই** `NEXT_PUBLIC_` দিয়ে client-side এ রাখবেন না
- env change করলে Vercel সাধারণত auto redeploy করে, না করলে **Redeploy** দিন

---

## 3) Supabase Database — Table/Column Verify

আপনার CMS persistence ঠিক রাখতে DB-তে এই টেবিলগুলো আছে কিনা দেখুন (Supabase → Table Editor):

- `personal_info`
- `projects`
- `achievements`
- `experiences`
- `education`
- `skills`
- `skill_categories`
- `social_links`
- Messages এর জন্য (আপনার কোড অনুযায়ী) `messages` টেবিল

### Common gotchas
- `projects` টেবিলে `image_url` কলাম আছে কিনা
- snake_case field গুলো (যেমন `bio_extended`, `profile_image`) ঠিকমত আছে কিনা

---

## 4) Supabase Storage — Bucket Setup

Supabase Dashboard → Storage:

### CMS asset upload (Admin থেকে ছবি আপলোড)
- Bucket name: `portfolio`
- Visibility: **Public** (portfolio images এর জন্য recommended)

Admin upload এই bucket-এ যাবে এবং public URL DB-তে save হবে।

---

## 5) RLS (Row Level Security) — কী expect করবেন

এই প্রোজেক্টে sensitive write অপারেশনগুলো server-side এ **Service Role** দিয়ে করা হয় (server actions / API routes)। তাই সাধারণত:

- Public pages read করতে পারবে (anon key)
- Admin edit/save server থেকে হবে (service role)

**যদি আপনি RLS enable করে থাকেন** এবং public read দরকার হয়, তাহলে public read policy সঠিক আছে কিনা দেখবেন।

---

## 6) Admin + 2FA (TOTP) — Live এ Verify

### `/admin` (Password + 2FA)
- `ADMIN_PASSWORD` সঠিক
- `TOTP_SECRET` সঠিক

### `/admin/download` (2FA-only)
- 6-digit code দিয়ে unlock হচ্ছে কিনা
- unlock session কিছু সময় পর expire হচ্ছে কিনা (expected)

---

## 7) Quick Smoke Test (Deploy-এর পর 3 মিনিট)

Deploy হওয়ার পর live site এ:
1. Home page load
2. `/admin` login
3. ছোট একটা edit → save
4. page refresh দিয়ে confirm data persist হচ্ছে
5. Storage image upload করে URL persist হচ্ছে কিনা

---

## 8) Troubleshooting (Common)

### A) Admin save হচ্ছে না / draft mode এ যাচ্ছে
- Vercel env এ `SUPABASE_SERVICE_ROLE_KEY` missing/ভুল
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` ভুল

### B) Image upload কাজ করছে না
- Storage bucket `portfolio` নেই
- Bucket public না (অথবা policy ব্লক করছে)

### C) 2FA code invalid
- `TOTP_SECRET` mismatch (dev/live আলাদা হয়ে গেছে)
- Server time skew (কমন না, কিন্তু হতে পারে)

---

## 9) Push করার “সেফ” নিয়ম (Recommended)

1. Local এ: `npm.cmd run build`
2. তারপর push:
   - `git add .`
   - `git commit -m "..."`
   - `git push`

Build pass থাকলে Vercel deploy সাধারণত smooth হবে।
