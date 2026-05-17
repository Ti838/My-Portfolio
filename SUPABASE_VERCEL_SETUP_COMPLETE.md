# Complete Supabase + Vercel Setup Guide

Follow this guide **exactly** step-by-step. This will fix your deployment issue.

---

## ⚠️ IMPORTANT: Why Your Site Isn't Loading

Your site shows fallback data because **environment variables are missing** in Vercel. The code doesn't error—it just uses hardcoded data instead of fetching from Supabase.

---

## PART 1: SUPABASE SETUP (Fresh Installation)

### Step 1.1: Create a New Supabase Project
1. Go to https://supabase.com/dashboard
2. Click **New Project**
3. Fill in:
   - **Name**: `timon-portfolio` (or any name)
   - **Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
4. Click **Create new project** and wait 2-3 minutes for setup

### Step 1.2: Create Database Tables
After project is created:

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. **Copy ALL** the SQL from your local file:
   ```
   c:\Users\TIMON\Desktop\portfolio\supabase_schema.sql
   ```
4. Paste it into the SQL Editor
5. Click **Run** (blue button, top-right)
6. Wait for tables to be created (check for green checkmarks)

**Tables created should be:**
- `personal_info`
- `projects`
- `skills`
- `skill_categories`
- `experiences`
- `education`
- `achievements`
- `social_links`
- `blog_posts`
- `announcements`

### Step 1.3: Get Your API Keys
These are **CRITICAL**—copy them exactly!

1. Click **Settings** (bottom-left gear icon)
2. Click **API**
3. You'll see:
   - **Project URL** (blue box)
   - **anon public** (under "Project API keys")
   - **service_role** (under "Project API keys")

**SAVE THESE THREE VALUES:**
```
NEXT_PUBLIC_SUPABASE_URL = [Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [anon public value]
SUPABASE_SERVICE_ROLE_KEY = [service_role value]
```

### Step 1.4: Disable Email Verification (Optional, but easier for testing)
1. Click **Settings** → **Authentication**
2. Scroll to **Email Auth**
3. Toggle off **Confirm email**
4. Save changes

---

## PART 2: VERCEL SETUP

### Step 2.1: Connect Your GitHub Repository
1. Go to https://vercel.com/dashboard
2. Click **New Project**
3. Click **Import Git Repository**
4. Search for `portfolio` and select your GitHub repo
5. Click **Import**

### Step 2.2: Add Environment Variables
**This is the most important step!**

1. After import, you'll see **Environment Variables** section
2. Add these **exactly** (copy-paste from Step 1.3):

| Variable Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service_role key |

**COPY CAREFULLY:**
- No extra spaces before/after
- Match variable names exactly (case-sensitive)
- Keep the `NEXT_PUBLIC_` prefix (don't remove it)

### Step 2.3: Deploy
1. Click **Deploy**
2. Wait for build to complete (5-10 minutes)
3. You should see a green checkmark and a URL like:
   ```
   https://your-project-name.vercel.app
   ```

### Step 2.4: Verify Deployment
1. Click the deployment URL
2. Your site should load with **real data from Supabase**
3. Check browser console (F12):
   ```javascript
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
   ```
   Should show your Supabase URL, **not `undefined`**

---

## PART 3: LOCAL DEVELOPMENT SETUP

### Step 3.1: Set Local Environment Variables
1. In your project root, create a file named `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Replace with actual values from Step 1.3

3. Save the file

### Step 3.2: Test Locally
```bash
npm install
npm run dev
```

Visit http://localhost:3000 and verify data loads.

---

## PART 4: POPULATE YOUR DATA (IMPORTANT!)

Your database tables are empty. You need to add data:

### Option A: Add Data via Supabase UI
1. Go to Supabase Dashboard → **Table Editor**
2. Click each table and add your data manually
3. Start with `personal_info` (required for layout)

### Option B: Use Your Admin Dashboard
1. Deploy site to Vercel (even with empty data)
2. Visit https://your-vercel-url/admin
3. Login with TOTP setup (see [SUPABASE_VERCEL_CHECKLIST_EN.md](./SUPABASE_VERCEL_CHECKLIST_EN.md))
4. Use the admin panel to add all data

**Required minimum data:**
- `personal_info`: 1 record (your name, bio, etc.)
- `projects`: At least 3 projects
- `skills`: Categories with skills
- `experiences`: Work/internship history
- `education`: Your degree info

---

## PART 5: TROUBLESHOOTING

### ❌ Issue: "Website loads but shows fallback content"
**Cause:** Missing environment variables in Vercel

**Fix:**
1. Go to Vercel → Project Settings → Environment Variables
2. Verify all 3 variables are there
3. Click **Redeploy** (top-right)

### ❌ Issue: "Supabase connection error in logs"
**Cause:** Wrong API key

**Fix:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (check Supabase Settings → API)
2. It should start with `eyJ...` (long string)
3. Re-add to Vercel and redeploy

### ❌ Issue: "Cannot read properties of null"
**Cause:** Database tables don't exist or are empty

**Fix:**
1. Go to Supabase → SQL Editor
2. Run your schema SQL again
3. Check Supabase → Table Editor to see tables
4. Add sample data to at least `personal_info`

### ❌ Issue: "401 Unauthorized" errors
**Cause:** Supabase has row-level security (RLS) enabled

**Fix:**
1. Go to Supabase → SQL Editor
2. Run:
   ```sql
   ALTER TABLE personal_info DISABLE ROW LEVEL SECURITY;
   ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
   ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
   ALTER TABLE skill_categories DISABLE ROW LEVEL SECURITY;
   ALTER TABLE experiences DISABLE ROW LEVEL SECURITY;
   ALTER TABLE education DISABLE ROW LEVEL SECURITY;
   ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
   ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
   ALTER TABLE announcements DISABLE ROW LEVEL SECURITY;
   ```
3. Redeploy Vercel

### ❌ Issue: "Build fails on Vercel"
**Cause:** Missing Node dependencies or TS errors

**Fix:**
1. Check **Vercel Logs** (Deployments → Click latest → View Logs)
2. Fix any TypeScript errors locally:
   ```bash
   npm run build
   ```
3. Push changes to GitHub
4. Vercel auto-redeploys

---

## PART 6: VERIFICATION CHECKLIST

After completing all steps above, verify:

- [ ] Supabase project created
- [ ] Database schema imported (tables visible in Table Editor)
- [ ] 3 API keys copied correctly
- [ ] Vercel project connected to GitHub
- [ ] All 3 environment variables added to Vercel
- [ ] Vercel deployment successful (green checkmark)
- [ ] Website loads at Vercel URL
- [ ] Console shows Supabase URL (not `undefined`)
- [ ] At least `personal_info` table has 1 row
- [ ] Admin dashboard accessible at `/admin`

---

## PART 7: QUICK REFERENCE

### Supabase URLs
- Dashboard: https://supabase.com/dashboard
- Your Project: `https://[project-id].supabase.co`
- SQL Editor: Click on your project → SQL Editor

### Vercel URLs
- Dashboard: https://vercel.com/dashboard
- Project Settings: Click on your project → Settings

### Environment Variables Location
- **Local:** `.env.local` in project root
- **Vercel:** Project Settings → Environment Variables
- **Supabase:** Settings → API

---

## PART 8: FINAL STEPS

1. **Complete all steps above sequentially**
2. **After Vercel redeploys**, visit your URL and test
3. **If still not working**, create file: `DEPLOYMENT_DEBUG.log` and share:
   - Vercel build logs (last 50 lines)
   - Browser console errors (F12)
   - Screenshot of Vercel Environment Variables

---

## 🎉 SUCCESS INDICATORS

You'll know it worked when:
✅ Site loads with real data (not hardcoded names)
✅ Console shows your Supabase URL
✅ Admin panel loads at `/admin`
✅ No "404" or "undefined" errors
✅ Your personal info displays correctly

---

**Good luck! Follow this exactly and it WILL work.** 🚀
